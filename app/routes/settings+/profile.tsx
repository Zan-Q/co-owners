import { type SEOHandle } from '@nasa-gcn/remix-seo'
import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { Link, Outlet, useMatches, useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { Spacer } from '#app/components/spacer.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { requireUserId } from '#app/utils/auth.server.ts'
import { cn } from '#app/utils/misc.tsx'
import { useUser } from '#app/utils/user.ts'
import { useLocation } from 'react-router-dom';


export const BreadcrumbHandle = z.object({ breadcrumb: z.any() })
export type BreadcrumbHandle = z.infer<typeof BreadcrumbHandle>

export const handle: BreadcrumbHandle & SEOHandle = {
	breadcrumb: <Icon name="file-text">Edit Profile</Icon>,
	getSitemapEntries: () => null,
}

const BreadcrumbHandleMatch = z.object({
	handle: BreadcrumbHandle,
})

export async function loader({ request }: LoaderFunctionArgs) {

	// Parse the URL and query parameters
	const url = new URL(request.url);
	const searchParams = new URLSearchParams(url.search);
   
	// Retrieve the query parameters
	const username = searchParams.get('username');

	return json({
		username
	})
}

export default function EditUserProfile() {

	const data = useLoaderData<typeof loader>()

	const matches = useMatches()
	const breadcrumbs = matches
		.map((m) => {
			const result = BreadcrumbHandleMatch.safeParse(m)
			if (!result.success || !result.data.handle.breadcrumb) return null
			return (
				<Link key={m.id} to={m.pathname} className="flex items-center">
					{result.data.handle.breadcrumb}
				</Link>
			)
		})
		.filter(Boolean)

	return (
		<div className="m-auto mb-24 mt-16 max-w-3xl">
			<div className="container">
				<ul className="flex gap-3">
					<li>
						<Link
							className="text-muted-foreground"
							to={`/user`}
						>
							Profile
						</Link>
					</li>
					{breadcrumbs.map((breadcrumb, i, arr) => (
						<li
							key={i}
							className={cn('flex items-center gap-3', {
								'text-muted-foreground': i < arr.length - 1,
							})}
						>
							▶️ {breadcrumb}
						</li>
					))}
				</ul>
			</div>
			<Spacer size="xs" />
			<main className="mx-auto bg-muted px-6 py-8 md:container md:rounded-3xl">
				<Outlet />
			</main>
		</div>
	)
}
