import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js';
import { useNavigate } from 'react-router-dom';

//Icon
import { Icon  } from '#app/components/ui/icon.tsx'

//isMobile
import { isMobile } from 'react-device-detect';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

interface WatchlistProps {
  watchlist: {
    id: string;
    name: string;
    logo: string;
    price: number;
    change: string;
    chartData: number[];
  }[];
}

const WatchList = ({ watchlist }: WatchlistProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile && watchlist.length > 1 && scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      let scrollAmount = 0;
      const scrollStep = 2;
      const scrollInterval = setInterval(() => {
        scrollAmount += scrollStep;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }, 20);

      return () => clearInterval(scrollInterval);

    }
    else if (watchlist.length > 5 && scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      let scrollAmount = 0;
      const scrollStep = 2;
      const scrollInterval = setInterval(() => {
        scrollAmount += scrollStep;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
        scrollContainer.scrollLeft = scrollAmount;
      }, 20);

      return () => clearInterval(scrollInterval);
    }
  }, [watchlist]);

  //Naviate to Stock page
  const handleItemClick = (id: string) => {
    navigate(`/stocks/${id}`);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 mt-4 text-center sm:text-left">Watch List</h2>
      <div ref={scrollContainerRef} className="flex overflow-x-auto space-x-4 pb-10">
        {watchlist.map((business, index) => (
          <div key={index} className="flex-shrink-0 w-64 bg-white p-4 rounded-lg shadow-md cursor-pointer" onClick={() => handleItemClick(business.id)}>
            {/* First Row: Logo and Business Name */}
            <div className="flex items-center mb-4">
              <img src={business.logo} alt={business.name} className="w-12 h-12 mr-4"/>
              <div className="text-lg font-bold">{business.name}</div>
            </div>
            {/* Second Row: Price and Change */}
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-semibold">${business.price.toFixed(2)}</div>
              <div className="text-right">
                <div className={`text-lg font-bold ${business.change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
                  {business.change}
                </div>
                <div className="text-xs text-gray-500">this month</div>
              </div>
            </div>
            {/* Third Row: Line Chart */}
            <div className="h-24">
              <Line
                data={{
                  labels: Array.from({ length: business.chartData.length }, (_, i) => i),
                  datasets: [
                    {
                      data: business.chartData,
                      borderColor: 'rgba(75, 192, 192, 1)',
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      fill: true,
                      tension: 0.4,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    x: {
                      display: false,
                    },
                    y: {
                      display: false,
                    },
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WatchList;