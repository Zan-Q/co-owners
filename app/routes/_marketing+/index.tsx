import { type MetaFunction, LoaderFunction, json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '#app/components/ui/tooltip.tsx'
import { cn } from '#app/utils/misc.tsx'
import { logos } from './logos/logos.ts'

import { useNavigate } from 'react-router-dom';

import { sessionKey } from '#app/utils/auth.server.ts'
import { authSessionStorage } from '#app/utils/session.server.ts'
import { redirect } from '@remix-run/node';

//API Calls
// @ts-ignore
import { generalAPI } from "../../api/generalAPI.js"; // Adjust the path as necessary
// @ts-ignore
import { userAPI } from '../../api/userAPI';

// Tailwind Grid cell classes lookup
const columnClasses: Record<(typeof logos)[number]['column'], string> = {
	1: 'xl:col-start-1',
	2: 'xl:col-start-2',
	3: 'xl:col-start-3',
	4: 'xl:col-start-4',
	5: 'xl:col-start-5',
}
const rowClasses: Record<(typeof logos)[number]['row'], string> = {
	1: 'xl:row-start-1',
	2: 'xl:row-start-2',
	3: 'xl:row-start-3',
	4: 'xl:row-start-4',
	5: 'xl:row-start-5',
	6: 'xl:row-start-6',
}

// Declare Announcement object
interface Announcement {
    id: string;
    name: string;
    logo: string;
    description: string;
	website: string;
    location: {
		address: string,
		city: string,
		state: string,
		country: string
	}
    coordinates: {
		type: string,
		coordinates: [number, number]
	}
}

// Declare Trending Business object
interface TrendingBusiness {
	logo: string;
	name: string;
	businessId: string;
	growthAmount: number;
	growthPercentage: number;
	currentPricePerShare: number;
}

// Declare Down Trending Business object {
interface DownTrendingBusiness {
	logo: string;
	name: string;
	businessId: string;
	difference: number;
	lastValuation: number;
	secondLastValuation: number;
	changePercentage: number;
}
// Define the loader function to fetch data
export const loader: LoaderFunction = async ({request}) => {

	//Confirmed we are logged in as admin
	const authSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)

    const session = authSession.get(sessionKey);

    if (session) {

        //Get User
        const user = await userAPI.checklogintoken(session);

        if (user) {

			// Fetch data here
			const announcements = await generalAPI.getAnnoucements();

			// Fetch trending businesses
			const trendingBusinesses = await generalAPI.getTrendingBusinesses();

			// Fetch downtrending businesses
			const downtrendingBusinesses = await generalAPI.getDownTrendingBusinesses();

			return json({
				announcements,
				trendingBusinesses,
				downtrendingBusinesses,
				userId: user._id
			});
		}
		else {

			// Fetch data here
			const announcements = await generalAPI.getAnnoucements();

			// Fetch trending businesses
			const trendingBusinesses = await generalAPI.getTrendingBusinesses();

			// Fetch downtrending businesses
			const downtrendingBusinesses = await generalAPI.getDownTrendingBusinesses();

			return json({
				announcements,
				trendingBusinesses,
				downtrendingBusinesses
			});
		}
	}
	else {	
		// Fetch data here
		const announcements = await generalAPI.getAnnoucements();

		// Fetch trending businesses
		const trendingBusinesses = await generalAPI.getTrendingBusinesses();

		// Fetch downtrending businesses
		const downtrendingBusinesses = await generalAPI.getDownTrendingBusinesses();

		return json({
			announcements,
			trendingBusinesses,
			downtrendingBusinesses
		});
	}
};


// Meta function to add social media headers
export const meta: MetaFunction = () => {
	
	return [
	  { title: `Co Owners` },
	  { property: "og:title", content: `Co-Owners` },
	  { property: "og:description", content: `The CommUnity Owners Monopoly Game` },
	  { property: "og:image", content: `https://co-owners.ca/logo.png` },
	  { property: "og:url", content: `https://co-owners.ca/` },
	  { property: "og:type", content: "website" },
	  { name: "twitter:card", content: "summary_large_image" },
	  { name: "twitter:title", content: `Co-Owners` },
	  { name: "twitter:description", content: `The CommUnity Owners Monopoly Game` },
	  { name: "twitter:image", content: `https://co-owners.ca/logo.png` },
	  { name: "twitter:url", content: `https://co-owners.ca/` },
	];
};

export default function Index() {

	const navigate = useNavigate();

	// Use the useLoaderData hook to access the data
	const { announcements, trendingBusinesses, downtrendingBusinesses, userId } = useLoaderData<{ announcements: Announcement[], trendingBusinesses: TrendingBusiness[], downtrendingBusinesses: DownTrendingBusiness[], userId: string }>();

	const handleClick = (businessId: string) => {
		navigate(`/stocks/${businessId}`);
	};

	return (
		<main className="font-poppins grid h-full place-items-center">
			<div className="grid place-items-center gap-4 xl:grid-cols-2 xl:gap-4">
				{announcements.map((announcement) => (
				<div
					key={announcement.id}
					className="flex w-full max-w-xs flex-col items-center text-center xl:max-w-2xl xl:order-2 xl:items-start xl:text-left bg-white shadow-2xl rounded-lg p-4 sm:p-6 md:p-8 xl:p-[10vh]"
				>
					<a href={announcement.website}
						className="animate-slide-top [animation-fill-mode:backwards] xl:animate-slide-left xl:[animation-delay:0.5s] xl:[animation-fill-mode:backwards]"
						>
					<img
						src={announcement.logo}
						alt="Business Logo"
						className="w-20 h-20 text-foreground xl:w-24 xl:h-24 xl:-mt-4"
					/>
					</a>
					<h1
					data-heading
					className="mt-4 text-lg font-medium text-foreground animate-slide-top [animation-delay:0.3s] [animation-fill-mode:backwards] md:text-xl xl:mt-4 xl:animate-slide-left xl:text-4xl xl:[animation-delay:0.8s] xl:[animation-fill-mode:backwards]"
					>
					{announcement.name}
					</h1>
					<p
					data-paragraph
					className="mt-4 text-base text-muted-foreground animate-slide-top [animation-delay:0.8s] [animation-fill-mode:backwards] md:text-lg xl:mt-8 xl:animate-slide-left xl:text-xl xl:leading-10 xl:[animation-delay:1s] xl:[animation-fill-mode:backwards]"
					>
					{announcement.description}
					</p>
				</div>
				))}
				<ul className="mt-16 flex w-full s:max-w-xs flex-wrap justify-center gap-2 sm:gap-4 xl:mt-0 xl:grid xl:grid-flow-col xl:grid-cols-5 xl:grid-rows-6">
				<TooltipProvider>
					{logos.map((logo, i) => (
					<li
						key={logo.href}
						className={cn(
						columnClasses[logo.column],
						rowClasses[logo.row],
						'animate-roll-reveal [animation-fill-mode:backwards]',
						)}
						style={{ animationDelay: `${i * 0.07}s` }}
					>
						<Tooltip>
							<TooltipTrigger asChild>
								{/* Without logos */}
								<span className="grid size-20 place-items-center rounded-2xl bg-violet-600/10 p-4 transition hover:-rotate-6 hover:bg-violet-600/15 dark:bg-violet-200 dark:hover:bg-violet-100 sm:size-24" />
							</TooltipTrigger>
						</Tooltip>
						{/*<Tooltip>
							<TooltipTrigger asChild>
								<a
								href={logo.href}
								className="grid w-20 h-20 place-items-center rounded-2xl bg-violet-600/10 p-4 transition hover:-rotate-6 hover:bg-violet-600/15 dark:bg-violet-200 dark:hover:bg-violet-100 sm:w-24 sm:h-24"
								>
								<img src={logo.src} alt="" />
								</a>
							</TooltipTrigger>
							<TooltipContent>{logo.alt}</TooltipContent>
						</Tooltip>*/}
					</li>
					))}
				</TooltipProvider>
				</ul>
			</div>
			<div className="mt-8 w-full">
				<h2 className="text-4xl lg:text-2xl font-bold text-center text-green-500">Trending Stocks</h2>
				<div className="flex flex-col sm:flex-row flex-wrap justify-center items-center overflow-x-auto p-4 space-y-4 sm:space-y-0 sm:space-x-4">
					{trendingBusinesses.map((business: TrendingBusiness) => (
						<div key={business.businessId} className="flex-shrink-0 w-full max-w-xs p-4 bg-white shadow-md rounded-lg cursor-pointer" onClick={() => handleClick(business.businessId)}>
							<img src={business.logo} alt="Business Logo" className="w-full h-32 object-contain" />
							<h3 className="text-lg mt-2 mb-5 font-semibold">{business.name}</h3>
							<p>Current Price: </p>
							<p>
							${business.currentPricePerShare.toFixed(2)}{' '}
							<span className="text-green-500">
								({business.growthPercentage.toFixed(2)}%)
							</span>
							</p>
						</div>
					))}
				</div>
			</div>
			<div className="mt-8 w-full">
				<h2 className="text-4xl lg:text-2xl font-bold text-center text-red-500">Declining Stocks</h2>
				<div className="flex flex-col sm:flex-row flex-wrap justify-center items-center overflow-x-auto p-4 space-y-4 sm:space-y-0 sm:space-x-4">
					{downtrendingBusinesses.map((business: DownTrendingBusiness) => (
						<div key={business.businessId} className="flex-shrink-0 w-full max-w-xs p-4 bg-white shadow-md rounded-lg cursor-pointer sm:w-64" onClick={() => handleClick(business.businessId)}>
							<img src={business.logo} alt="Business Logo" className="w-full h-32 object-contain" />
							<h3 className="text-lg mt-2 mb-5 font-semibold">{business.name}</h3>
							<p>Current Price: </p>
							<p>
								${business.lastValuation.toFixed(2)}{' '}
								<span className="text-red-500">
								({business.changePercentage.toFixed(2)}%)
								</span>
							</p>
						</div>
					))}
				</div>
			</div>
		<div className="mt-8 w-full flex justify-center gap-5">
			<Link to="/stocks">
			<button className="bg-blue-500 text-white font-bold py-5 px-8 rounded-xl hover:bg-blue-700 text-xl">
				Browse Stocks
			</button>
			</Link>
			{ userId ? (
			<Link to="/dashboard">
				<button className="bg-purple-500 text-white font-bold py-5 px-8 rounded-xl hover:bg-purple-700 text-xl">
				Dashboard
				</button>
			</Link>  
			) : "" }
		</div>
		</main>
	)
}
