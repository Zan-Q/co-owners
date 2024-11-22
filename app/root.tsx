import {
	json,
	type LoaderFunctionArgs,
	type HeadersFunction,
	type LinksFunction,
	type MetaFunction,
} from '@remix-run/node'
import {
	Form,
	Link,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	useMatches,
	useSubmit,
} from '@remix-run/react'
import { withSentry } from '@sentry/remix'
import { useRef } from 'react'
import { HoneypotProvider } from 'remix-utils/honeypot/react'
import appleTouchIconAssetUrl from './assets/favicons/apple-touch-icon.png'
import faviconAssetUrl from './assets/favicons/favicon.svg'
import { GeneralErrorBoundary } from './components/error-boundary.tsx'
import { EpicProgress } from './components/progress-bar.tsx'
import { SearchBar } from './components/search-bar.tsx'
import { useToast } from './components/toaster.tsx'
import { Button } from './components/ui/button.tsx'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuTrigger,
} from './components/ui/dropdown-menu.tsx'
import { Icon, href as iconsHref } from './components/ui/icon.tsx'
import { EpicToaster } from './components/ui/sonner.tsx'
import { ThemeSwitch, useTheme } from './routes/resources+/theme-switch.tsx'
import tailwindStyleSheetUrl from './styles/tailwind.css?url'
import { getUserId, logout } from './utils/auth.server.ts'
import { ClientHintCheck, getHints } from './utils/client-hints.tsx'
import { getEnv } from './utils/env.server.ts'
import { honeypot } from './utils/honeypot.server.ts'
import { combineHeaders, getDomainUrl, getUserImgSrc } from './utils/misc.tsx'
import { useNonce } from './utils/nonce-provider.ts'
import { type Theme, getTheme } from './utils/theme.server.ts'
import { makeTimings, time } from './utils/timing.server.ts'
import { getToast } from './utils/toast.server.ts'
import { useOptionalUser, useUser } from './utils/user.ts'
import { useNavigate, useNavigationType, NavigationType } from 'react-router-dom'
import { MantineProvider } from '@mantine/core';

export const links: LinksFunction = () => {
	return [
		// Preload svg sprite as a resource to avoid render blocking
		{ rel: 'preload', href: iconsHref, as: 'image' },
		{
			rel: 'icon',
			href: '/favicon.ico',
			sizes: '48x48',
		},
		{ rel: 'icon', type: 'image/svg+xml', href: faviconAssetUrl },
		{ rel: 'apple-touch-icon', href: appleTouchIconAssetUrl },
		{
			rel: 'manifest',
			href: '/site.webmanifest',
			crossOrigin: 'use-credentials',
		} as const, // necessary to make typescript happy
		{ rel: 'stylesheet', href: tailwindStyleSheetUrl },
	].filter(Boolean)
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	return [
		{ title: data ? 'Co Owners' : 'Error | Co Owners' },
		{ name: 'description', content: `CommUnity Owners Platform` },
	]
}

export async function loader({ request }: LoaderFunctionArgs) {
	const timings = makeTimings('root loader')

	const user = await time(() => getUserId(request), {
		timings,
		type: 'getUserId',
		desc: 'getUserId in root',
	})

	if (!user) {
		//Remove cookie and redirect to login page
		await logout({ request, redirectTo: '/' })
	}
	const { toast, headers: toastHeaders } = await getToast(request)
	const honeyProps = honeypot.getInputProps()

	return json(
		{
			user,
			requestInfo: {
				hints: getHints(request),
				origin: getDomainUrl(request),
				path: new URL(request.url).pathname,
				userPrefs: {
					theme: getTheme(request),
				},
			},
			ENV: getEnv(),
			toast,
			honeyProps,
		},
		{
			headers: combineHeaders(
				{ 'Server-Timing': timings.toString() },
				toastHeaders,
			),
		},
	)
}

export const headers: HeadersFunction = ({ loaderHeaders }) => {
	const headers = {
		'Server-Timing': loaderHeaders.get('Server-Timing') ?? '',
	}
	return headers
}

function Document({
	children,
	nonce,
	theme = 'light',
	env = {},
	allowIndexing = true,
}: {
	children: React.ReactNode
	nonce: string
	theme?: Theme
	env?: Record<string, string>
	allowIndexing?: boolean
}) {
	return (
		<html lang="en" className={`${theme} h-full overflow-x-hidden`}>
			<head>
				<ClientHintCheck nonce={nonce} />
				<Meta />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				{allowIndexing ? null : (
					<meta name="robots" content="noindex, nofollow" />
				)}
				<Links />
			</head>
			<body className="bg-background text-foreground">
				{children}
				<script
					nonce={nonce}
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(env)}`,
					}}
				/>
				<ScrollRestoration nonce={nonce} />
				<Scripts nonce={nonce} />
			</body>
		</html>
	)
}

function App() {
	const data = useLoaderData<typeof loader>()
	const nonce = useNonce()
	const user = useOptionalUser()
	const theme = useTheme()
	const matches = useMatches()
	const isOnSearchPage = matches.find((m) => m.id === 'routes/users+/index')
	const searchBar = isOnSearchPage ? null : <SearchBar status="idle" />
	const allowIndexing = data.ENV.ALLOW_INDEXING !== 'false'
	useToast(data.toast)
	const navigate = useNavigate()
    const navigationType = useNavigationType()

	return (
		<Document
			nonce={nonce}
			theme={theme}
			allowIndexing={allowIndexing}
			env={data.ENV}
		>
			{/*//@ts-ignore*/}
			<MantineProvider theme={{ withGlobalStyles: true, withNormalizeCSS: true }}>

			<div className="flex h-screen flex-col justify-between">
				<header className="container py-6">
					<nav className="flex flex-wrap items-center justify-between gap-4 sm:flex-nowrap md:gap-8">
						<Logo navigationType={navigationType} navigate={navigate} type="header"/>
						{/*<div className="ml-auto hidden max-w-sm flex-1 sm:block">
							{searchBar}
						</div>*/}
						<div className="flex items-center gap-10">
							{user ? (
								<UserDropdown />
							) : (
								<Button asChild variant="default" size="lg">
									<Link to="/login">Log In</Link>
								</Button>
							)}
						</div>
						{/*<div className="block w-full sm:hidden">{searchBar}</div>*/}
					</nav>
				</header>

				<div className="flex-1">
					<Outlet />
				</div>

				{/* Footer */}
				<div className="container pb-5 mt-5 w-full">
					<Logo navigationType={navigationType} navigate={navigate} type="footer"/>
					{/*<ThemeSwitch userPreference={data.requestInfo.userPrefs.theme} />*/}
				</div>
			</div>
			<EpicToaster closeButton position="top-center" theme={theme} />
			<EpicProgress />
		</MantineProvider>
	</Document>
	)
}

function Logo({ navigationType, navigate, type}: { navigationType: ReturnType<typeof useNavigationType>, navigate?: ReturnType<typeof useNavigate>, type?: string }) {
	return (
		<div className="flex items-center">
			<Link to="/" className="group grid leading-snug">
				<img
					src="/logo.png"
					alt="Co-Owners"
					className="h-10 w-auto group-hover:scale-150"
				/>
			</Link>
				{type === "header" && navigationType !== NavigationType.Pop && (
					<button
						onClick={() => navigate?.(-1)}
						className="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
					>
						<svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a1 1 0 01-.707-.293l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 1.414L4.414 10H18a1 1 0 110 2H4.414l6.293 6.293A1 1 0 0110 18z"
                            clipRule="evenodd"
                        />
                    </svg>
						Go Back
					</button>
				)}
				{type === "footer" ?
					(
						<div className="flex items-center justify-between gap-4 w-full">
							<p className="flex justify-center items-center text-sm w-1/4">
								&copy; {new Date().getFullYear()} Co-Owners
							</p>
							<div className="flex gap-4 justify-center w-full">
								<a href="/privacy" className="text-sm text-blue-500 hover:underline">
									Privacy Policy
								</a>
								<a href="/tos" className="text-sm text-blue-500 hover:underline">
									Terms of Service
								</a>
								<a href="/about" className="text-sm text-blue-500 hover:underline">
									Contact Us
								</a>
							</div>
							<div className="flex items-center gap-4 ml-auto">
								<div className="flex gap-2">
									<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
										<path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.324 1.325 1.324h11.495v-9.294h-3.125v-3.622h3.125v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.312h3.587l-.467 3.622h-3.12v9.294h6.116c.733 0 1.325-.591 1.325-1.324v-21.35c0-.733-.592-1.325-1.325-1.325z"/>
										</svg>
									</a>
									<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
										<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.723-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.92 2.203-4.92 4.917 0 .385.043.76.127 1.122-4.087-.205-7.713-2.164-10.141-5.144-.423.725-.666 1.562-.666 2.457 0 1.694.863 3.188 2.175 4.065-.802-.026-1.555-.246-2.213-.614v.062c0 2.366 1.684 4.342 3.918 4.788-.41.111-.843.171-1.287.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.6 3.417-1.68 1.318-3.809 2.104-6.115 2.104-.398 0-.79-.023-1.175-.068 2.179 1.397 4.768 2.212 7.548 2.212 9.057 0 14.01-7.506 14.01-14.01 0-.213-.005-.426-.014-.637.961-.694 1.797-1.562 2.457-2.549z"/>
										</svg>
									</a>
									<a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
										<path d="M22.23 0h-20.46c-.974 0-1.77.796-1.77 1.77v20.459c0 .974.796 1.771 1.77 1.771h20.459c.974 0 1.771-.797 1.771-1.771v-20.459c0-.974-.797-1.77-1.771-1.77zm-15.539 20.452h-3.077v-11.999h3.077v11.999zm-1.538-13.635c-.987 0-1.787-.8-1.787-1.787s.8-1.787 1.787-1.787 1.787.8 1.787 1.787-.8 1.787-1.787 1.787zm13.539 13.635h-3.077v-5.999c0-1.428-.027-3.267-1.992-3.267-1.993 0-2.298 1.558-2.298 3.167v6.099h-3.077v-11.999h2.954v1.637h.042c.411-.776 1.416-1.592 2.916-1.592 3.118 0 3.693 2.053 3.693 4.724v7.23z"/>
										</svg>
									</a>
								</div>
							</div>
						</div>
					) 
					: null				
				}
		</div>
	)
}

function AppWithProviders() {
	const data = useLoaderData<typeof loader>()
	return (
		<HoneypotProvider {...data.honeyProps}>
			<App />
		</HoneypotProvider>
	)
}

export default withSentry(AppWithProviders)

function UserDropdown() {
	const user = useUser()
	const submit = useSubmit()
	const formRef = useRef<HTMLFormElement>(null)
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button asChild variant="secondary">
					<Link
						to={`/user`}
						// this is for progressive enhancement
						onClick={(e) => e.preventDefault()}
						className="flex items-center gap-2"
					>
						<img
							className="h-8 w-8 rounded-full object-cover"
							alt={user.name ?? user.username}
							src={getUserImgSrc(user.imageUrl)}
						/>
						<span className="text-body-sm font-bold">
							{user.name ?? user.username}
						</span>
					</Link>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuPortal>
				<DropdownMenuContent sideOffset={8} align="start">
					<DropdownMenuItem asChild>
						<Link prefetch="intent" to={`/user`}>
							<Icon className="text-body-md" name="avatar">
								Profile
							</Icon>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link prefetch="intent" to={`/dashboard`}>
							<Icon className="text-body-md" name="envelope-closed">
								Dashboard
							</Icon>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem
						asChild
						// this prevents the menu from closing before the form submission is completed
						onSelect={(event) => {
							event.preventDefault()
							submit(formRef.current)
						}}
					>
						<Form action="/logout" method="POST" ref={formRef}>
							<Icon className="text-body-md" name="exit">
								<button type="submit">Logout</button>
							</Icon>
						</Form>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuPortal>
		</DropdownMenu>
	)
}

export function ErrorBoundary() {
	// the nonce doesn't rely on the loader so we can access that
	const nonce = useNonce()

	// NOTE: you cannot use useLoaderData in an ErrorBoundary because the loader
	// likely failed to run so we have to do the best we can.
	// We could probably do better than this (it's possible the loader did run).
	// This would require a change in Remix.

	// Just make sure your root route never errors out and you'll always be able
	// to give the user a better UX.

	return (
		<Document nonce={nonce}>
			<GeneralErrorBoundary />
		</Document>
	)
}
