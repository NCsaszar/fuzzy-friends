import React, { useState } from 'react';
import { CalendarView } from './CalendarView';

const monthsIdx = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const Calendar: React.FC<{ user: object }> = ({ user }) => {
  const [date, setDate] = useState(new Date());
  const { userId } = user;
  let numOfDays = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  let startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handleClick = (e: React.MouseEvent) => {
    if (e.currentTarget.id === 'previousMonth') {
      date.setMonth(date.getMonth() - 1);
    } else {
      date.setMonth(date.getMonth() + 1);
    }
    const newDate = new Date();
    newDate.setMonth(date.getMonth());
    newDate.setFullYear(date.getFullYear());
    numOfDays = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      0
    ).getDate();
    startDay = new Date(newDate.getFullYear(), newDate.getMonth(), 1).getDay();

    setDate(newDate);
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="wrapper bg-white rounded shadow w-full ">
        <div
          className="header flex justify-between border-b p-2"
          style={{ backgroundColor: '#e3dcd9', color: '#9d6129' }}
        >
          <span className="text-lg font-bold">
            {date.getFullYear()} {monthsIdx[date.getMonth()]}
          </span>
          <div className="buttons ml-8">
            <button id="previousMonth" className="p-1" onClick={handleClick}>
              <svg
                style={{ backgroundColor: '#494036', borderRadius: '2em' }}
                width="2em"
                fill="white"
                height="2em"
                viewBox="0 0 16 16"
                className="bi bi-arrow-left-circle"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  fillRule="evenodd"
                  d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"
                />
              </svg>
            </button>
            <button id="nextMonth" className="p-1" onClick={handleClick}>
              <svg
                style={{ backgroundColor: '#494036', borderRadius: '2em' }}
                width="2em"
                fill="white"
                height="2em"
                viewBox="0 0 16 16"
                className="bi bi-arrow-right-circle"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                />
                <path
                  fillRule="evenodd"
                  d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z"
                />
              </svg>
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs bg-[#494036] text-white">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Sunday
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Sun
                </span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs bg-[#494036] text-white">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Monday
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Mon
                </span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs bg-[#494036] text-white">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Tuesday
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Tue
                </span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs bg-[#494036] text-white">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Wednesday
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Wed
                </span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs bg-[#494036] text-white">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Thursday
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Thu
                </span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs bg-[#494036] text-white">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Friday
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Fri
                </span>
              </th>
              <th className="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs bg-[#494036] text-white">
                <span className="xl:block lg:block md:block sm:block hidden">
                  Saturday
                </span>
                <span className="xl:hidden lg:hidden md:hidden sm:hidden block">
                  Sat
                </span>
              </th>
            </tr>
          </thead>
          <CalendarView
            month={date.getMonth()}
            year={date.getFullYear()}
            startDay={startDay}
            numOfDays={numOfDays}
            userId={userId}
          />
        </table>
      </div>
    </div>
  );
};
