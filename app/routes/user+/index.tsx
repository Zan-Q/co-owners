import { invariantResponse } from '@epic-web/invariant'
import { json, LoaderFunction, type LoaderFunctionArgs } from '@remix-run/node'
import { Form, Link, useLoaderData, type MetaFunction } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { Spacer } from '#app/components/spacer.tsx'
import { Button } from '#app/components/ui/button.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { getUserImgSrc } from '#app/utils/misc.tsx'
import { useOptionalUser } from '#app/utils/user.ts'
import { sessionKey } from '#app/utils/auth.server.ts'
import { authSessionStorage } from '#app/utils/session.server.ts'

import { redirect } from '@remix-run/node'

//API Call
// @ts-ignore
import { userAPI } from '../../api/userAPI';

// Define the User type
interface User {
	_id: string;
	name: string;
	username: string;
	email: string;
	balance: number;
	history: [{
		type: string;
		price: number;
		businessName: string;
	}];
	investments: [{
		isActive: boolean;
	}];
	createdAt: Date;
}

export const loader: LoaderFunction = async ({ params, request }) => {

	//Get Token
	//See if we are logged in by checking the session
	const authSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)
  	const session = authSession.get(sessionKey);

	if (session) {
		//Get User
		const user = await userAPI.checklogintoken(session);

		if (user) {
			return json({ user, userJoinedDisplay: new Date(user.createdAt).toLocaleDateString() })
		}
		else {
			return redirect('/');
		}
	}
	else {
		return redirect('/');
	}
}

export default function ProfileRoute() {
	//const data = useLoaderData<typeof loader>()
	//const user = data.user
	const { user, userJoinedDisplay }  = useLoaderData<{ user: User, userJoinedDisplay: Date}>();

	const loggedInUser = useOptionalUser()
	const isLoggedInUser = user._id === loggedInUser?._id

	return (
		<div className="container mb-48 mt-36 flex flex-col items-center justify-center">
			<Spacer size="4xs" />

			<div className="container flex flex-col items-center rounded-3xl bg-muted p-12">

				<Spacer size="sm" />

				<div className="flex flex-col items-center">
					<div className="flex flex-wrap items-center justify-center gap-4">
						<h1 className="text-center text-h2">{user.name}</h1>
					</div>
					<p className="mt-2 text-center text-muted-foreground">
						Joined: {userJoinedDisplay}
					</p>
					<div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-5">
						<h2 className="text-2xl text-center font-bold mb-4">User Statistics</h2>
						<div className="flex flex-row justify-between gap-4">
							<div className="flex flex-col justify-between">
								<span className="text-center text-lg">{user.history.length}</span> 
								<span className="text-sm"> Trades Lifetime</span>
							</div>
							<div className="flex flex-col justify-between">
								<span className="text-center text-lg">{user.investments.length}</span>
								<span className="text-sm"> Investments Lifetime</span>
							</div>
						</div>
					</div>
					{isLoggedInUser ? (
						<Form action="/logout" method="POST" className="mt-3">
							<Button type="submit" variant="link" size="pill">
								<Icon name="exit" className="scale-125 max-md:scale-150">
									Logout
								</Icon>
							</Button>
						</Form>
					) : null}
					<div className="mt-10 flex gap-4">
							<Button asChild>
								<Link to="/dashboard" prefetch="intent">
									Dashboard
								</Link>
							</Button>	
							<Button asChild>
								<Link 
									to={{
										pathname: "/settings/profile",
										search: `?id=${user._id}&username=${user.username}&name=${user.name}&email=${user.email}`,
									}}
									prefetch="intent"
								>
									Edit profile
								</Link>
							</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export function ErrorBoundary() {
	return (
		<GeneralErrorBoundary
			statusHandlers={{
				404: ({ params }) => (
					<p>No user with the username "{params.username}" exists</p>
				),
			}}
		/>
	)
}
