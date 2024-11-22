import { type Connection, type Password, type User } from '@prisma/client'
import { redirect } from '@remix-run/node'
import bcrypt from 'bcryptjs'
import { Authenticator } from 'remix-auth'
import { safeRedirect } from 'remix-utils/safe-redirect'
import { connectionSessionStorage, providers } from './connections.server.ts'
import { prisma } from './db.server.ts'
import { combineHeaders, downloadFile } from './misc.tsx'
import { type ProviderUser } from './providers/provider.ts'
import { authSessionStorage } from './session.server.ts' 
import { createToastHeaders } from '#app/utils/toast.server.ts'

//API
// @ts-ignore
import { userAPI } from '../api/userAPI'

export const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30
export const getSessionExpirationDate = () =>
	new Date(Date.now() + SESSION_EXPIRATION_TIME)

export const sessionKey = 'sessionId'

export const authenticator = new Authenticator<ProviderUser>(
	connectionSessionStorage,
)

for (const [providerName, provider] of Object.entries(providers)) {
	authenticator.use(provider.getAuthStrategy(), providerName)
}

export async function getUserId(request: Request) {
	const authSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)
	const sessionId = authSession.get(sessionKey);

	if (!sessionId) return null

	const user = await userAPI.checklogintoken(sessionId);

	return user;
}

export async function requireUserId(
	request: Request,
	{ redirectTo }: { redirectTo?: string | null } = {},
) {
	const user = await getUserId(request)

	if (!user) {
		const requestUrl = new URL(request.url)
		redirectTo =
			redirectTo === null
				? null
				: (redirectTo ?? `${requestUrl.pathname}${requestUrl.search}`)
		const loginParams = redirectTo ? new URLSearchParams({ redirectTo }) : null
		const loginRedirect = ['/login', loginParams?.toString()]
			.filter(Boolean)
			.join('?')
		throw redirect(loginRedirect)
	}
	return user
}

export async function requireAnonymous(request: Request) {
	const user = await getUserId(request)
	if (user) {
		throw redirect('/')
	}
}

export async function login({
	username,
	password,
}: {
	username: User['username']
	password: string
}) {
	
	const user = await userAPI.login(username, password);

	if (!user) return null
	return user.data;
}

export async function resetUserPassword({
	username,
	password,
}: {
	username: User['username']
	password: string
}) {
	
	return userAPI.updatePassword( username, password );
}

export async function signup({
	email,
	username,
	password,
	name,
}: {
	email: User['email']
	username: User['username']
	name: User['name']
	password: string
}) {
	//const hashedPassword = await getPasswordHash(password)

	const data = userAPI.register(username, name, email, password);

	return data
}

export async function signupWithConnection({
	email,
	username,
	name,
	providerId,
	providerName,
	imageUrl,
}: {
	email: User['email']
	username: User['username']
	name: User['name']
	providerId: Connection['providerId']
	providerName: Connection['providerName']
	imageUrl?: string
}) {
 
	const data = userAPI.signUpWithGoogle(email, username, name, providerId, providerName, imageUrl);

	return data
}

export async function logout(
	{
		request,
		redirectTo = '/',
	}: {
		request: Request
		redirectTo?: string
	},
	responseInit?: ResponseInit,
) {
	const authSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)
	const sessionId = authSession.get(sessionKey)
	
	return redirect(safeRedirect(redirectTo), {
		...responseInit,
		headers: combineHeaders(
			{ 'set-cookie': await authSessionStorage.destroySession(authSession) },
			responseInit?.headers,
		),
	});
}

export async function getPasswordHash(password: string) {
	const hash = await bcrypt.hash(password, 10)
	return hash
}

