import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { requireUserId } from '#app/utils/auth.server.ts'
import { getDomainUrl } from '#app/utils/misc.tsx'

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await requireUserId(request)

	const domain = getDomainUrl(request)

	return json({
		user: {
			...user,
			image: user.image
				? {
						...user.image,
						url: `${domain}/resources/user-images/${user.image.id}`,
					}
				: null,
		},
	})
}
