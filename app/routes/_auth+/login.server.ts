import { invariant } from '@epic-web/invariant'
import { redirect } from '@remix-run/node'
import { safeRedirect } from 'remix-utils/safe-redirect'
import { twoFAVerificationType } from '#app/routes/settings+/profile.two-factor.tsx'
import { getUserId, sessionKey } from '#app/utils/auth.server.ts'
import { combineResponseInits } from '#app/utils/misc.tsx'
import { authSessionStorage } from '#app/utils/session.server.ts'
import { redirectWithToast } from '#app/utils/toast.server.ts'
import { verifySessionStorage } from '#app/utils/verification.server.ts'
import { getRedirectToUrl, type VerifyFunctionArgs } from './verify.server.ts'

const verifiedTimeKey = 'verified-time'
const unverifiedSessionIdKey = 'unverified-session-id'
const rememberKey = 'remember'

export async function handleNewSession(
	{
		request,
		session,
		redirectTo,
		remember,
	}: {
		request: Request
		session: { userId: string; id: string; expirationDate: Date }
		redirectTo?: string
		remember: boolean
	},
	responseInit?: ResponseInit,
) {
	
		const authSession = await authSessionStorage.getSession(
			request.headers.get('cookie'),
		)
		authSession.set(sessionKey, session.id)

		return redirect(
			safeRedirect(redirectTo),
			combineResponseInits(
				{
					headers: {
						'set-cookie': await authSessionStorage.commitSession(authSession, {
							expires: remember ? session.expirationDate : undefined,
						}),
					},
				},
				responseInit,
			),
		)
	//}
}

export async function handleVerification({
	request,
	submission,
}: VerifyFunctionArgs) {
	invariant(
		submission.status === 'success',
		'Submission should be successful by now',
	)
	const authSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)
	const verifySession = await verifySessionStorage.getSession(
		request.headers.get('cookie'),
	)

	const remember = verifySession.get(rememberKey)
	const { redirectTo } = submission.value
	const headers = new Headers()
	authSession.set(verifiedTimeKey, Date.now())

	headers.append(
		'set-cookie',
		await verifySessionStorage.destroySession(verifySession),
	)

	return redirect(safeRedirect(redirectTo), { headers })
}

export async function shouldRequestTwoFA(request: Request) {
	const authSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)
	const verifySession = await verifySessionStorage.getSession(
		request.headers.get('cookie'),
	)
	if (verifySession.has(unverifiedSessionIdKey)) return true
	const user = await getUserId(request)
	if (!user) return false
	
	const verifiedTime = authSession.get(verifiedTimeKey) ?? new Date(0)
	const twoHours = 1000 * 60 * 2
	return Date.now() - verifiedTime > twoHours
}
