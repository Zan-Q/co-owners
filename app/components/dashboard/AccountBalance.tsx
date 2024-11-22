import React, { useState, useEffect } from 'react';
import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Link } from '@remix-run/react'


//Navigation
import { useNavigate } from 'react-router-dom';

//isMobile
import { isMobile } from 'react-device-detect';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface AccountBalanceProps {
  token: string;
  balance: number;
  gains: number;
  investments: [
    {
      id: string;
      name: string;
      logo: string;
      growthAmount: number;
      growthPercentage: string;
      currentPricePerShare: number;
    } 
  ]
}

function generateRandomColor() {
  const randomValue = () => Math.floor(Math.random() * 256);
  const r = randomValue();
  const g = randomValue();
  const b = randomValue();

  // Convert RGB to hex format
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function AccountBalance({ token, balance, gains, investments }: AccountBalanceProps) {
  const [isClient, setIsClient] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Set isClient to true when the component is mounted on the client side
    setIsClient(true);

    // Fetch portfolio data from API or database
    // ...
  }, []);

  //Generate Random colors for each businessData value and set it to the backgroundColor property
  const investments_assigned = investments.map((business) => ({
    ...business,
    backgroundColor: generateRandomColor(),
  }));

  const data = {
    labels: investments_assigned.map((business) => business.name),
    datasets: [
      {
        label: 'Portfolio Distribution',
        data: investments_assigned.map((business) => business.currentPricePerShare),
        backgroundColor: investments_assigned.map((business) => business.backgroundColor),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        formatter: (value: any, context: any) => {
          const dataset = context.chart.data.datasets[0];
          const total = dataset?.data.reduce((acc: number, value: number) => acc + value, 0) || 0;
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`;
        },
        color: 'white',
        font: {
          weight: 'bold' as 'bold',
          size: 15,
        },
      },
    },
  };

  /**
   * List of Investments
   * @returns 
   */
  function BusinessList() {
    return (
      <div className="flex-1 flex flex-col max-h-96 overflow-y-auto">
        {investments_assigned.slice(0, 4).map((business) => (
          <div key={business.id} className="flex items-center p-4 border-b border-gray-200">
            <Link to={`/stocks/${business.id}`} className="flex items-center w-full">
              <img src={business.logo} alt={business.name} className="w-10 h-10 mr-4" />
              <div className="flex-1 text-left">
                <p className="text-lg font-bold" style={{ color: business.backgroundColor }}>{business.name}</p>
              </div>
              <div className="flex-2 text-left">
                <p className="text-sm text-gray-500">${business.currentPricePerShare.toFixed(2)}</p>
                <div className={`text-lg font-bold ${business.growthAmount.toString().startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                  {business.growthAmount.toString().startsWith('-') ? '' : '+'} {business.growthAmount.toFixed(2)}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  }

  /**
   * Handle Deposit request
   */
  function handleDeposit() {

      const redirectUrlParams = new URLSearchParams({
        amount: '0.00',
        balance: balance.toFixed(2),
        token: token,
        redirect: `/dashboard`,
        type: 'deposit',
      }).toString();

      //Deposit Page
      const redirectUrl = '/stripe?' + redirectUrlParams;

      // Redirect to Stripe Payment
      navigate(redirectUrl);
  }


  /**
   * Handle Withdraw request
   */
  function handleWithdraw() {
    
    const redirectUrlParams = new URLSearchParams({
      amount: '0.00',
      balance: balance.toFixed(2),
      token: token,
      redirect: `/dashboard`,
      type: 'withdraw',
    }).toString();
  
    //Deposit Page
    const redirectUrl = '/stripe?' + redirectUrlParams;

    // Redirect to Stripe Payment
    navigate(redirectUrl);
  }

  return (
    <div className="flex flex-col lg:flex-row bg-white p-4 rounded-lg shadow-md">
      <div className="flex-1 flex flex-col justify-between">
        <h2 className="text-lg font-bold">Account Balance</h2>
        <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
        <div className="flex items-center mt-2">
          {gains > 0 ? (
            <div className="flex items-center">
              <div className="bg-green-500 p-2 rounded-xl shadow-xl" style={{ boxShadow: '0 4px 15px rgba(34, 197, 94, 0.5)' }}>
                <FaArrowTrendUp className="text-white text-5xl" />
              </div>
              <div className="ml-5">
                <p className="text-lg text-green-500">+{gains.toFixed(2)} lifetime</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <div className="bg-red-500 p-2 rounded-xl shadow-xl" style={{ boxShadow: '0 4px 15px rgba(239, 68, 68, 0.5)' }}>
                <FaArrowTrendDown className="text-white text-5xl" />
              </div>
              <div className="ml-5">
                <p className="text-lg text-red-500">{gains.toFixed(2)} lifetime</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-between mt-4 w-full">
          <button className="text-blue-600 hover:bg-green-600 hover:text-white border-2 border-blue-600 font-bold py-3 px-4 m-1 lg:m-3 rounded-xl w-full" onClick={handleDeposit}>
            Deposit
          </button>
          <button className="bg-blue-600 hover:bg-red-500 text-white font-bold py-3 px-4 m-1 lg:m-3 rounded-xl w-full" onClick={handleWithdraw}>
            Withdraw
          </button>
        </div>
      </div>
  
      {/* Vertical Divider */}
      <div className="hidden lg:block border-l-2 border-gray-300 mx-4"></div>
  
      {/* Chart */}
      <div className="flex flex-col lg:flex-row w-full lg:w-1/2 mt-4 lg:mt-0">
        <div className="flex-1" style={{ height: '30vh' }}>
          {isClient && (
            <Doughnut data={data} options={options} />
          )}
        </div>
        <div className="flex-1 flex">
          <BusinessList />
        </div>
      </div>
    </div>
  );
}

export default AccountBalance;