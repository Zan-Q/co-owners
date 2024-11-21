import React, { useState } from 'react';

import {
	createToastHeaders,
	redirectWithToast,
} from '#app/utils/toast.server.ts'
import { sessionKey } from '#app/utils/auth.server.ts';
import { authSessionStorage } from '#app/utils/session.server.ts';
import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { redirect } from '@remix-run/node';

import Sidebar from "#app/components/Sidebar";
import AccountBalance from '#app/components/dashboard/AccountBalance';
import Valuation from '#app/components/dashboard/Valuation';
import WatchList from '#app/components/dashboard/Watchlist';

//API
import { userAPI } from '../../api/userAPI';

//IsMobile
import { isMobile } from 'react-device-detect';

//Interface
interface DashboardData {
  session: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  },
  balance: number;
  historical_gains: number;
  monthly_gains: number;
  businesses: [{
    id: string;
    name: string;
    logo: string;
    growthAmount: number;
    growthPercentage: string;
    currentPricePerShare: number;
  }],
  profit: [
    {
      month: number;
      year: number;
      profit: number;
    }
  ],
  valuation: [
    {
      month: number;
      year: number;
      maxPricePerShare: number;
    }
  ],
  watchlist: [{
    id: string;
    name: string;
    logo: string;
    price: number;
    change: string;
    chartData: number[];
  }],
  tab: string;
  leaderboard: LeaderboardData;
}

//Interface
interface LeaderboardData {
  topMonthlyReturns: {
          position: number;
          username: string;
          score: number;
  }[],
  topTotalReturns: {
      position: number;
      username: string;
      score: number;
  }[],
  topMonthlyTrades: {
      position: number;
      username: string;
      score: number;
  }[],
  topTotalTrades: {
      position: number;
      username: string;
      score: number;
  }[],
}

export const loader: LoaderFunction = async ({ params, request }) => {

  const url = new URL(request.url);

  //See if we are logged in by checking the session
  const authSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)
  const session = authSession.get(sessionKey);

  //Set Session if we are logged in
  if (session) {

    //Get User
    const user = await userAPI.checklogintoken(session);

    if (user) {
        // Fetch user balance from API
        const { balance, historical_gains, monthly_gains, businesses } = await userAPI.getUserBalanceStocks(session);

        // Fetch valuation and profit from API
        const { monthlyProfits, monthlyValuation } = await userAPI.getUserProfitValuation(session);

        // Fetch Watchlist data from API
        const { watchlist} = await userAPI.getUserWatchList(session);

        return json({ session, user, balance, historical_gains, monthly_gains, businesses, profit: monthlyProfits, valuation: monthlyValuation, watchlist });
    }
    //Redirect to login if not logged in
    else {
      return redirect('/');
    }
  }
  //Redirect to login if not logged in
  else {
    return redirectWithToast('/login', { type: 'error', title: 'Not Logged In!', description: 'You must be logged in to view this page' });
  }
}

function Dashboard() {
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  //Load the data from the loader
  const { session, user, balance, historical_gains, monthly_gains, businesses, profit, valuation, watchlist, tab, leaderboard }  = useLoaderData< DashboardData>();

  if (isMobile) {
    return (
      <div className='bg-gray-200'>
        <div className="flex flex-col">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} userRole={user.role} />
        </div>
        <div className="items-center justify-between pl-[1vw] pr-[1vw] pt-[2vw] pb-[2vw]">
          <AccountBalance token={session} balance={balance} gains={historical_gains} investments={businesses} />
        </div>
        <div className="items-center justify-between pl-[1vw] pr-[1vw]">
          <Valuation profit={profit} valuation={valuation} />
        </div>
        <div className="items-center justify-between pl-[5vw] pr-[5vw]">
          <WatchList watchlist={watchlist} />
        </div>
      </div>
      
    );
  }
  else {
    return (
      <div className="flex overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} userRole={user.role} />
        <div className="flex-1 bg-gray-200">
          <div className="items-center justify-between pl-[5vw] pr-[5vw] pt-[2vw] pb-[2vw]">
            <AccountBalance token={session} balance={balance} gains={historical_gains} investments={businesses} />
          </div>
          <div className="items-center justify-between pl-[5vw] pr-[5vw]">
            <Valuation profit={profit} valuation={valuation} />
          </div>
          <div className="items-center justify-between pl-[5vw] pr-[5vw]">
            <WatchList watchlist={watchlist} />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
