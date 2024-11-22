import { redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { requireUserId, logout } from '#app/utils/auth.server.ts'

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await requireUserId(request)
	if (!user) {
		const requestUrl = new URL(request.url)
		const loginParams = new URLSearchParams([
			['redirectTo', `${requestUrl.pathname}${requestUrl.search}`],
		])
		const redirectTo = `/login?${loginParams}`
		await logout({ request, redirectTo })
		return redirect(redirectTo)
	}
	return redirect(`/user`)
}
