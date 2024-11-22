import { useState, ChangeEvent } from 'react';
import { LoaderFunction, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { authSessionStorage } from '#app/utils/session.server.ts';
import { sessionKey } from '#app/utils/auth.server.ts';
import { redirect } from '@remix-run/node';

import Sidebar from "#app/components/Sidebar";

//Redirect with Toast
import { redirectWithToast } from '#app/utils/toast.server.ts'

//API
// @ts-ignore
import { userAPI } from '../../api/userAPI';

import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, IconButton } from '@mui/material';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

//isMobile
import { isMobile } from 'react-device-detect';

//Interface
interface HistoryData {
    _id: string;
    type: string;
    businessName: string;
    price: number;
    orderDate: string;
}

export const loader: LoaderFunction = async ({ request }) => {

    //See if we are logged in by checking the session
    const authSession = await authSessionStorage.getSession(
          request.headers.get('cookie'),
      )
    const session = authSession.get(sessionKey);
      
    //Get User
    if (session) {
        const user = await userAPI.checklogintoken(session);

        if (user) {
            //Get History
            const history = user.history.reverse();

            return json({ history, session, role: user.role });  
        }
        else {
            return redirect('/');
        }
    } else {
        return redirectWithToast('/login', {
            title: 'Login Required',
            description: 'You need to be logged in to view this page',
            type: 'error'
        });
    }

}

const History = () => {
    const { history, session, role } = useLoaderData<{ history: HistoryData[], session: string, role: string }>();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (session) {
        return (
            <div className="flex flex-col sm:flex-row bg-gray-200">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} userRole={role}/>
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-4 text-center">Transaction History</h1>
                    <TabContent title="Transaction History" data={history} />
                </div>
            </div>
        );
    }
};

const applyPagination = (
    data: HistoryData[],
    page: number,
    limit: number
  ): HistoryData[] => {
    return data.slice(page * limit, page * limit + limit);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  const TabContent = ({ title, data }: { title: string; data: HistoryData[] }) => {
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
        <TableContainer component={Paper} className="overflow-y-auto w-full rounded-sm">
          <Table stickyHeader className="w-full">
            <TableHead>
              <TableRow>
                <TableCell className="text-left h-16">Transaction Type</TableCell>
                <TableCell className="text-left h-16">Business Name</TableCell>
                <TableCell className="text-left h-16">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((history, index) => (
                <TableRow key={history._id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <TableCell className="h-10 pl-2">
                    <div>{capitalizeFirstLetter(history.type)}</div>
                    <div className="text-xs text-gray-500">{new Date(history.orderDate).toLocaleDateString()}</div>
                  </TableCell>
                  <TableCell className="h-10">{history.type === 'buy' || history.type === 'sell' ? history.businessName : ''}</TableCell>
                  <TableCell className={`h-10 ${['deposit', 'sell'].includes(history.type) ? 'text-green-500' : ['withdraw', 'buy', 'fee'].includes(history.type) ? 'text-red-500' : ''}`}>
                    ${history.price.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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

export default History;