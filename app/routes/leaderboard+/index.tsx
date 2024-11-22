import { useState, ChangeEvent } from 'react';
import { LoaderFunction, MetaFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { authSessionStorage } from '#app/utils/session.server.ts';
import { sessionKey } from '#app/utils/auth.server.ts';

import Sidebar from "#app/components/Sidebar";

//API
// @ts-ignore
import { leaderboardAPI } from '../../api/leaderboardAPI';
// @ts-ignore
import { userAPI } from '../../api/userAPI';

import { Pagination, Box, Typography, IconButton } from '@mui/material';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

//IsMobile
import { isMobile } from 'react-device-detect';

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

interface UserPlacement {
    id: number;
    username: string;
    amount: number;
    date: string;
}

export const loader: LoaderFunction = async ({ request }) => {

    //See if we are logged in by checking the session
    const authSession = await authSessionStorage.getSession(
          request.headers.get('cookie'),
      )
    const session = authSession.get(sessionKey);
     
    if (session) {
        //Get User
        const user = await userAPI.checklogintoken(session);

        //Leaderboard
        const leaderboard = await leaderboardAPI.getLeaderboard(session);

        if (user) {
            return json({ leaderboard: leaderboard.data, session, role: user.role, username: user.username });    
        }
        else {
            return json({ leaderboard: leaderboard.data, session: null, role: null });
        }
    }
    else {

        //Leaderboard
        const leaderboard = await leaderboardAPI.getLeaderboard(null);

        return json({ leaderboard: leaderboard.data, session: null, role: null });
    }
}

// Meta function to add social media headers
export const meta: MetaFunction = () => {
	
	return [
	  { title: `Co-Owners Leaderboard` },
	  { property: "og:title", content: `Co-Owners Leaderboard` },
	  { property: "og:description", content: `The CommUnity Owners Monopoly Leaderboard` },
	  { property: "og:image", content: `https://co-owners.ca/logo.png` },
	  { property: "og:url", content: `https://co-owners.ca/leaderboard` },
	  { property: "og:type", content: "website" },
	  { name: "twitter:card", content: "summary_large_image" },
	  { name: "twitter:title", content: `Co-Owners Leaderboard` },
	  { name: "twitter:description", content: `The CommUnity Owners Monopoly Leaderboard` },
	  { name: "twitter:image", content: `https://co-owners.ca/logo.png` },
	  { name: "twitter:url", content: `https://co-owners.ca/leaderboard` },
	];
};

const Leaderboard = () => {
    const { leaderboard, session, role, username } = useLoaderData<{ leaderboard: LeaderboardData, session: string, role: string, username: string }>();
    const [activeTab, setActiveTab] = useState('tab1');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    let totalProfitsBoard = leaderboard.topTotalReturns;
    let monthlyProfitsBoard = leaderboard.topMonthlyReturns;
    let totalTransactionsBoard = leaderboard.topTotalTrades;
    let monthlyTransactionsBoard = leaderboard.topMonthlyTrades;

    if (session) {
        return (
            <div className="flex flex-col sm:flex-row bg-gray-200">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} userRole={role}/>
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-4 text-center">Leaderboard</h1>
                    <div className="flex justify-center mb-4 lg:space-x-4">
                        <button
                            className={`px-4 py-2 rounded ${activeTab === 'tab1' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => handleTabClick('tab1')}
                        >
                            Monthly Profits
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${activeTab === 'tab2' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => handleTabClick('tab2')}
                        >
                            Total Profits
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${activeTab === 'tab3' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => handleTabClick('tab3')}
                        >
                            Monthly Transactions
                        </button>
                        <button
                            className={`px-4 py-2 rounded ${activeTab === 'tab4' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            onClick={() => handleTabClick('tab4')}
                        >
                            Total Transactions
                        </button>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        {activeTab === 'tab1' && <TabContent title="Monthly Profits Leaderboard" data={monthlyProfitsBoard} username={username}/>}
                        {activeTab === 'tab2' && <TabContent title="Total Profits Leaderboard" data={totalProfitsBoard} username={username}/>}
                        {activeTab === 'tab3' && <TabContent title="Monthly Transactions Leaderboard" data={monthlyTransactionsBoard} username={username}/>}
                        {activeTab === 'tab4' && <TabContent title="Total Transactions Leaderboard" data={totalTransactionsBoard} username={username}/>}
                    </div>
                </div>
            </div>
        );
    }

    else {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4 text-center">Leaderboard</h1>
                <div className="flex justify-center mb-4 lg:space-x-4">
                    <button
                        className={`px-4 py-2 rounded ${activeTab === 'tab1' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleTabClick('tab1')}
                    >
                        Weekly Profits
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${activeTab === 'tab2' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleTabClick('tab2')}
                    >
                        Total Profits
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${activeTab === 'tab3' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleTabClick('tab3')}
                    >
                        Weekly Transactions
                    </button>
                    <button
                        className={`px-4 py-2 rounded ${activeTab === 'tab4' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => handleTabClick('tab4')}
                    >
                        Total Transactions
                    </button>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    {activeTab === 'tab1' && <TabContent title="Monthly Profits Leaderboard" data={monthlyProfitsBoard} username={username} />}
                    {activeTab === 'tab2' && <TabContent title="Total Profits Leaderboard" data={totalProfitsBoard} username={username} />}
                    {activeTab === 'tab3' && <TabContent title="Monthly Transactions Leaderboard" data={monthlyTransactionsBoard} username={username} />}
                    {activeTab === 'tab4' && <TabContent title="Total Transactions Leaderboard" data={totalTransactionsBoard} username={username} />}
                </div>
            </div>
        );
    }
};

const applyPagination = (
    data: { position: number; username: string; score: number }[],
    page: number,
    limit: number
) => {
    return data.slice(page * limit, page * limit + limit);
};

const TabContent = ({ title, data, username }: { title: string; data: { position: number; username: string; score: number }[]; username: string; }) => {

    const [page, setPage] = useState(1);
    const limit = 10;
    const totalPages = Math.ceil(data.length / limit);

    const handlePreviousPage = () => {
        if (page > 1) {
          setPage(page - 1);
        }
      };
    
    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const paginatedData = applyPagination(data, page - 1, limit);

    return (
        <div>
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <div className="overflow-y-auto">
            <ul className="space-y-2">
              {paginatedData.map((user, index) => (
                <li
                    key={user.position}
                    className={`flex items-center justify-between p-4 rounded-lg shadow-md ${user.username === username ? 'bg-red-500 text-white' : index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-md font-bold">{user.position}</span>
                    <span className="text-md">{user.username}</span>
                  </div>
                  <span className="text-md font-semibold">{title.includes("Profits") ? '$' : ''}{user.score}</span>
                </li>
              ))}
            </ul>
          </div>
          <Box display="flex" alignItems="center" justifyContent="center" mt={4}>
            <div className="flex mt-5 flex-row gap-2 justify-center">
                <IconButton onClick={handlePreviousPage} disabled={page === 1}>
                    <FaArrowLeft />
                </IconButton>
                <Typography variant="body1" mx={2}>
                    Page {page} of {totalPages}
                </Typography>
                <IconButton onClick={handleNextPage} disabled={page === totalPages}>
                    <FaArrowRight />
                </IconButton>
            </div>
          </Box>
        </div>
    );
};

export default Leaderboard;