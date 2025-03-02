// import React from 'react';
// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { Range } from 'react-range'; // Using react-range for the slider
// import { FaCheckCircle, FaClock, FaTrophy, FaTimesCircle } from 'react-icons/fa'; // Icons from react-icons

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// function ReportModal({ isOpen, onClose, report }) {
//   if (!isOpen) return null;

//   // Prepare data for the chart
//   const chartData = {
//     labels: Object.keys(report.completedByCategory).concat(report.unfinishedGoals.length > 0 ? ['Unfinished'] : []),
//     datasets: [
//       {
//         label: 'Goals',
//         data: [
//           ...Object.values(report.completedByCategory).map((goals) => goals.length),
//           report.unfinishedGoals.length
//         ],
//         backgroundColor: [
//           ...Object.keys(report.completedByCategory).map(() => 'rgba(54, 162, 235, 0.6)'), // Blue for completed
//           'rgba(255, 99, 132, 0.6)' // Red for unfinished
//         ],
//         borderColor: [
//           ...Object.keys(report.completedByCategory).map(() => 'rgba(54, 162, 235, 1)'),
//           'rgba(255, 99, 132, 1)'
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: 'top' },
//       title: { display: true, text: 'Goals by Category and Status' },
//     },
//     scales: {
//       y: { beginAtZero: true, title: { display: true, text: 'Number of Goals' } },
//       x: { title: { display: true, text: 'Categories/Status' } },
//     },
//   };

//   // Slider state for score visualization (read-only for display)
//   const [scoreValue, setScoreValue] = React.useState([report.score]);

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div
//         className="bg-gradient-to-br from-blue-100 via-blue-50 to-white p-6 rounded-xl shadow-2xl w-full max-w-2xl transform animate-slideDown"
//         style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' }}
//       >
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold text-blue-700 flex items-center">
//             <FaTrophy className="mr-2 text-yellow-500" /> Weekly Report
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 transition p-2 rounded-full hover:bg-gray-100"
//             aria-label="Close"
//           >
//             <FaTimesCircle className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="grid gap-6 animate-fadeIn">
//           {/* Unfinished Goals */}
//           <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
//               <FaTimesCircle className="mr-2 text-red-500" /> Unfinished Goals
//             </h3>
//             {report.unfinishedGoals.length > 0 ? (
//               <ul className="list-disc pl-5 space-y-1 text-gray-700">
//                 {report.unfinishedGoals.map((goal, index) => (
//                   <li key={index} className="text-sm flex items-center">
//                     <span>{goal}</span>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-sm text-gray-500 flex items-center">
//                 <FaCheckCircle className="mr-2 text-green-500" /> None!
//               </p>
//             )}
//           </div>

//           {/* Completed Goals by Category */}
//           <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
//               <FaCheckCircle className="mr-2 text-green-500" /> Completed Goals by Category
//             </h3>
//             {Object.entries(report.completedByCategory).length > 0 ? (
//               <ul className="list-disc pl-5 space-y-1 text-gray-700">
//                 {Object.entries(report.completedByCategory).map(([category, goals]) => (
//                   <li key={category} className="text-sm">
//                     <span className="font-medium text-blue-600">{category}:</span> {goals.map((g) => g.text).join(', ')}
//                     {goals.some((g) => g.timeElapsed > 0) && (
//                       <span className="ml-2 text-xs text-gray-500 flex items-center">
//                         <FaClock className="mr-1 text-blue-500" />
//                         Time: {goals.reduce((sum, g) => sum + g.timeElapsed, 0)} sec total
//                       </span>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-sm text-gray-500 flex items-center">
//                 <FaTimesCircle className="mr-2 text-red-500" /> None!
//               </p>
//             )}
//           </div>

//           {/* Total Time Taken */}
//           <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
//               <FaClock className="mr-2 text-blue-500" /> Total Time Taken for Completed Goals
//             </h3>
//             <p className="text-sm text-gray-700">{report.totalTimeElapsed}</p>
//           </div>

//           {/* Score Slider */}
//           <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
//               <FaTrophy className="mr-2 text-yellow-500" /> Performance Score
//             </h3>
//             <div className="w-full">
//               <Range
//                 step={1}
//                 min={0}
//                 max={100}
//                 values={scoreValue}
//                 onChange={(values) => setScoreValue(values)}
//                 renderTrack={({ props, children }) => (
//                   <div
//                     {...props}
//                     className="h-2 bg-gray-300 rounded-full"
//                     style={{ ...props.style }}
//                   >
//                     {children}
//                   </div>
//                 )}
//                 renderThumb={({ props }) => (
//                   <div
//                     {...props}
//                     className="w-4 h-4 bg-blue-600 rounded-full shadow-md focus:outline-none"
//                     style={{ ...props.style }}
//                   />
//                 )}
//               />
//               <p className="text-sm text-gray-700 mt-2">Score: {report.score}%</p>
//             </div>
//           </div>

//           {/* Reward */}
//           <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
//               <FaTrophy className="mr-2 text-green-500" /> Reward
//             </h3>
//             <p className="text-sm text-green-600 font-semibold">{report.reward}</p>
//           </div>

//           {/* Graph */}
//           <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-md h-64">
//             <Bar data={chartData} options={chartOptions} />
//           </div>
//         </div>

//         <button
//           onClick={onClose}
//           className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-lg hover:from-blue-700 hover:to-blue-800 w-full transition"
//         >
//           Close Report
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ReportModal;

















//coorect report 


// import React, { useState } from 'react';
// import { Bar, Pie } from 'react-chartjs-2'; // Added Pie for completion percentage
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import { Range } from 'react-range'; // Using react-range for the slider
// import { FaCheckCircle, FaClock, FaTrophy, FaTimesCircle, FaCalendarAlt, FaChartBar } from 'react-icons/fa'; // Added FaCalendarAlt, FaChartBar for more icons

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// function ReportModal({ isOpen, onClose, report, days }) {
//   if (!isOpen) return null;

//   // Prepare data for charts
//   const chartData = {
//     labels: Object.keys(report.completedByCategory || {}).concat(report.unfinishedGoals?.length > 0 ? ['Unfinished'] : []),
//     datasets: [
//       {
//         label: 'Goals',
//         data: [
//           ...Object.values(report.completedByCategory || {}).map((goals) => goals?.length || 0),
//           report.unfinishedGoals?.length || 0
//         ],
//         backgroundColor: [
//           ...Object.keys(report.completedByCategory || {}).map(() => 'rgba(54, 162, 235, 0.6)'), // Blue for completed
//           'rgba(255, 99, 132, 0.6)' // Red for unfinished
//         ],
//         borderColor: [
//           ...Object.keys(report.completedByCategory || {}).map(() => 'rgba(54, 162, 235, 1)'),
//           'rgba(255, 99, 132, 1)'
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const dailyData = {
//     labels: days, // Use the passed days prop
//     datasets: [
//       {
//         label: 'Completed Goals',
//         data: days.map((day) => (report.goalsByDay?.[day]?.completed || []).length),
//         backgroundColor: 'rgba(75, 192, 192, 0.6)', // Teal for completed
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//       {
//         label: 'Unfinished Goals',
//         data: days.map((day) => (report.goalsByDay?.[day]?.unfinished || []).length),
//         backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red for unfinished
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const completionPieData = {
//     labels: ['Completed', 'Unfinished'],
//     datasets: [
//       {
//         data: [report.score || 0, 100 - (report.score || 0)],
//         backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
//         borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: 'top' },
//       title: { display: true, text: 'Goals by Category and Status' },
//     },
//     scales: {
//       y: { beginAtZero: true, title: { display: true, text: 'Number of Goals' } },
//       x: { title: { display: true, text: 'Categories/Status' } },
//     },
//   };

//   const dailyChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: 'top' },
//       title: { display: true, text: 'Daily Goal Progress' },
//     },
//     scales: {
//       y: { beginAtZero: true, title: { display: true, text: 'Number of Goals' } },
//       x: { title: { display: true, text: 'Days' } },
//     },
//   };

//   const pieOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: 'top' },
//       title: { display: true, text: 'Overall Completion Percentage' },
//     },
//   };

//   // Slider state for score visualization (read-only for display)
//   const [scoreValue, setScoreValue] = useState([report.score || 0]);

//   // Use report data directly, removing dependency on undefined 'goals'
//   const reportWithExtras = {
//     ...report,
//     goalsByDay: report.goalsByDay || days.reduce((acc, day) => {
//       acc[day] = {
//         completed: (report.goalsByDay?.[day]?.completed || []).filter((g) => g.completed),
//         unfinished: (report.goalsByDay?.[day]?.unfinished || []).filter((g) => !g.completed),
//       };
//       return acc;
//     }, {}),
//     averageTimePerGoal: report.completedByCategory && Object.values(report.completedByCategory || {}).length > 0
//       ? Object.values(report.completedByCategory || {}).reduce((sum, goals) => sum + (goals.reduce((tSum, g) => tSum + (g.timeElapsed || 0), 0) / (goals.length || 1)), 0).toFixed(2)
//       : 0,
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-white p-6 rounded-xl shadow-2xl w-full max-w-3xl transform animate-slideDown">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold text-blue-700 flex items-center">
//             <FaTrophy className="mr-2 text-yellow-500" /> Weekly Progress Report
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 transition p-2 rounded-full hover:bg-gray-100"
//             aria-label="Close"
//           >
//             <FaTimesCircle className="w-6 h-6" />
//           </button>
//         </div>

//         {/* Scrollable content container with maximum height */}
//         <div className="grid gap-6 animate-fadeIn max-h-[70vh] overflow-y-auto custom-scrollbar">
//           {/* Summary Section (without Total Goals Added) */}
//           <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
//               <FaChartBar className="mr-2 text-blue-500" /> Summary
//             </h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
//               <p><strong>Total Completed:</strong> {Object.values(report.completedByCategory || {}).flat().length || 0}</p>
//               <p><strong>Total Unfinished:</strong> {report.unfinishedGoals?.length || 0}</p>
//               <p><strong>Completion Score:</strong> {report.score || 0}%</p>
//               <p><strong>Average Time per Completed Goal:</strong> {reportWithExtras.averageTimePerGoal} sec</p>
//             </div>
//           </div>

//           {/* Daily Breakdown */}
//           <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
//               <FaCalendarAlt className="mr-2 text-blue-500" /> Daily Breakdown
//             </h3>
//             <ul className="list-disc pl-5 space-y-1 text-gray-700">
//               {days.map((day) => (
//                 <li key={day} className="text-sm">
//                   {day}: 
//                   <span className="ml-1">
//                     {reportWithExtras.goalsByDay[day].completed.length} completed, 
//                     {reportWithExtras.goalsByDay[day].unfinished.length} unfinished
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Unfinished Goals */}
//           <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
//               <FaTimesCircle className="mr-2 text-red-500" /> Unfinished Goals
//             </h3>
//             {report.unfinishedGoals?.length > 0 ? (
//               <ul className="list-disc pl-5 space-y-1 text-gray-700">
//                 {report.unfinishedGoals.map((goal, index) => (
//                   <li key={index} className="text-sm flex items-center">
//                     <span>{goal}</span>
//                     <span className="ml-2 text-xs text-gray-500">Recommendation: Focus on completing this tomorrow.</span>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-sm text-gray-500 flex items-center">
//                 <FaCheckCircle className="mr-2 text-green-500" /> None!
//               </p>
//             )}
//           </div>

//           {/* Completed Goals by Category */}
//           <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
//               <FaCheckCircle className="mr-2 text-green-500" /> Completed Goals by Category
//             </h3>
//             {Object.entries(report.completedByCategory || {}).length > 0 ? (
//               <ul className="list-disc pl-5 space-y-1 text-gray-700">
//                 {Object.entries(report.completedByCategory || {}).map(([category, goals]) => (
//                   <li key={category} className="text-sm">
//                     <span className="font-medium text-blue-600">{category}:</span> {goals.map((g) => g.text).join(', ')}
//                     {goals.some((g) => g.timeElapsed > 0) && (
//                       <span className="ml-2 text-xs text-gray-500 flex items-center">
//                         <FaClock className="mr-1 text-blue-500" />
//                         Time: {goals.reduce((sum, g) => sum + g.timeElapsed, 0)} sec total
//                       </span>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-sm text-gray-500 flex items-center">
//                 <FaTimesCircle className="mr-2 text-red-500" /> None!
//               </p>
//             )}
//           </div>

//           {/* Total Time Taken */}
//           <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
//               <FaClock className="mr-2 text-blue-500" /> Total Time Taken for Completed Goals
//             </h3>
//             <p className="text-sm text-gray-700">{report.totalTimeElapsed || '0:00 min'}</p>
//           </div>

//           {/* Performance Score */}
//           <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
//               <FaTrophy className="mr-2 text-yellow-500" /> Performance Score
//             </h3>
//             <div className="w-full">
//               <Range
//                 step={1}
//                 min={0}
//                 max={100}
//                 values={scoreValue}
//                 onChange={(values) => setScoreValue(values)}
//                 renderTrack={({ props, children }) => (
//                   <div
//                     {...props}
//                     className="h-2 bg-gray-300 rounded-full"
//                     style={{ ...props.style }}
//                   >
//                     {children}
//                   </div>
//                 )}
//                 renderThumb={({ props }) => (
//                   <div
//                     {...props}
//                     className="w-4 h-4 bg-blue-600 rounded-full shadow-md focus:outline-none"
//                     style={{ ...props.style }}
//                   />
//                 )}
//               />
//               <p className="text-sm text-gray-700 mt-2">Score: {report.score || 0}%</p>
//             </div>
//           </div>

//           {/* Reward */}
//           <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
//               <FaTrophy className="mr-2 text-green-500" /> Reward
//             </h3>
//             <p className="text-sm text-green-600 font-semibold">{report.reward || 'No goals to report.'}</p>
//           </div>

//           {/* Charts Section */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-md h-64">
//               <Bar data={chartData} options={chartOptions} />
//             </div>
//             <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-md h-64">
//               <Bar data={dailyData} options={dailyChartOptions} />
//             </div>
//             <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-md h-48 col-span-1 md:col-span-2">
//               <Pie data={completionPieData} options={pieOptions} />
//             </div>
//           </div>
//         </div>

//         <button
//           onClick={onClose}
//           className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-lg hover:from-blue-700 hover:to-blue-800 w-full transition"
//         >
//           Close Report
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ReportModal;


import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Range } from 'react-range';
import { FaCheckCircle, FaClock, FaTrophy, FaTimesCircle, FaCalendarAlt, FaChartBar } from 'react-icons/fa';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function ReportModal({ isOpen, onClose, report, days }) {
  if (!isOpen) return null;

  // Prepare data for charts, handling empty report
  const chartData = {
    labels: Object.keys(report.completedByCategory || {}).concat(report.unfinishedGoals?.length > 0 ? ['Unfinished'] : []),
    datasets: [
      {
        label: 'Goals',
        data: [
          ...Object.values(report.completedByCategory || {}).map((goals) => goals?.length || 0),
          report.unfinishedGoals?.length || 0
        ],
        backgroundColor: [
          ...Object.keys(report.completedByCategory || {}).map(() => 'rgba(54, 162, 235, 0.6)'), // Blue for completed
          'rgba(255, 99, 132, 0.6)' // Red for unfinished
        ],
        borderColor: [
          ...Object.keys(report.completedByCategory || {}).map(() => 'rgba(54, 162, 235, 1)'),
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const dailyData = {
    labels: days, // Use the passed days prop
    datasets: [
      {
        label: 'Completed Goals',
        data: days.map((day) => (report.goalsByDay?.[day]?.completed || []).length),
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Teal for completed
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Unfinished Goals',
        data: days.map((day) => (report.goalsByDay?.[day]?.unfinished || []).length),
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red for unfinished
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const completionPieData = {
    labels: ['Completed', 'Unfinished'],
    datasets: [
      {
        data: [report.score || 0, 100 - (report.score || 0)],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: 'white' } },
      title: { display: true, text: 'Goals by Category and Status', color: 'white' },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Number of Goals', color: 'white' }, ticks: { color: 'white' } },
      x: { title: { display: true, text: 'Categories/Status', color: 'white' }, ticks: { color: 'white' } },
    },
  };

  const dailyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: 'white' } },
      title: { display: true, text: 'Daily Goal Progress', color: 'white' },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Number of Goals', color: 'white' }, ticks: { color: 'white' } },
      x: { title: { display: true, text: 'Days', color: 'white' }, ticks: { color: 'white' } },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: 'white' } },
      title: { display: true, text: 'Overall Completion Percentage', color: 'white' },
    },
  };

  // Slider state for score visualization (read-only for display)
  const [scoreValue, setScoreValue] = useState([report.score || 0]);

  // Handle empty report case
  if (!report || Object.keys(report).length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-blue-400 flex items-center">
            <FaTrophy className="mr-2 text-yellow-400" /> Weekly Progress Report
          </h2>
          <p className="text-gray-300 mt-4 text-center">No goals to report. Add some goals to generate a report!</p>
          <button
            onClick={onClose}
            className="mt-6 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 w-full transition"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-3xl transform animate-slideDown">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white flex items-center">
            <FaTrophy className="mr-2 text-yellow-400" /> Weekly Progress Report
          </h2>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-gray-100 transition p-2 rounded-full hover:bg-gray-700"
            aria-label="Close"
          >
            <FaTimesCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable content container with maximum height */}
        <div className="grid gap-6 animate-fadeIn max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Summary Section */}
          <div className="bg-gray-800/80 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
              <FaChartBar className="mr-2 text-blue-400" /> Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-200">
              <p><strong>Total Completed:</strong> {Object.values(report.completedByCategory || {}).flat().length || 0}</p>
              <p><strong>Total Unfinished:</strong> {report.unfinishedGoals?.length || 0}</p>
              <p><strong>Completion Score:</strong> {report.score || 0}%</p>
              <p><strong>Average Time per Completed Goal:</strong> {report.averageTimePerGoal || 0} sec</p>
            </div>
          </div>

          {/* Daily Breakdown */}
          <div className="bg-gray-800/80 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
              <FaCalendarAlt className="mr-2 text-blue-400" /> Daily Breakdown
            </h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-200">
              {days.map((day) => (
                <li key={day} className="text-sm">
                  {day}: 
                  <span className="ml-1">
                    {report.goalsByDay[day].completed.length} completed, 
                    {report.goalsByDay[day].unfinished.length} unfinished
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Unfinished Goals */}
          <div className="bg-gray-800/80 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
              <FaTimesCircle className="mr-2 text-red-400" /> Unfinished Goals
            </h3>
            {report.unfinishedGoals?.length > 0 ? (
              <ul className="list-disc pl-5 space-y-1 text-gray-200">
                {report.unfinishedGoals.map((goal, index) => (
                  <li key={index} className="text-sm flex items-center">
                    <span>{goal}</span>
                    <span className="ml-2 text-xs text-gray-400">Recommendation: Focus on completing this tomorrow.</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 flex items-center">
                <FaCheckCircle className="mr-2 text-green-400" /> None!
              </p>
            )}
          </div>

          {/* Completed Goals by Category */}
          <div className="bg-gray-800/80 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
              <FaCheckCircle className="mr-2 text-green-400" /> Completed Goals by Category
            </h3>
            {Object.entries(report.completedByCategory || {}).length > 0 ? (
              <ul className="list-disc pl-5 space-y-1 text-gray-200">
                {Object.entries(report.completedByCategory || {}).map(([category, goals]) => (
                  <li key={category} className="text-sm">
                    <span className="font-medium text-blue-400">{category}:</span> {goals.map((g) => g.text).join(', ')}
                    {goals.some((g) => g.timeElapsed > 0) && (
                      <span className="ml-2 text-xs text-gray-400 flex items-center">
                        <FaClock className="mr-1 text-blue-400" />
                        Time: {goals.reduce((sum, g) => sum + g.timeElapsed, 0)} sec total
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 flex items-center">
                <FaTimesCircle className="mr-2 text-red-400" /> None!
              </p>
            )}
          </div>

          {/* Total Time Taken */}
          <div className="bg-gray-800/80 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
              <FaClock className="mr-2 text-blue-400" /> Total Time Taken for Completed Goals
            </h3>
            <p className="text-sm text-gray-200">{report.totalTimeElapsed || '0:00 min'}</p>
          </div>

          {/* Performance Score */}
          <div className="bg-gray-800/80 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
              <FaTrophy className="mr-2 text-yellow-400" /> Performance Score
            </h3>
            <div className="w-full">
              <Range
                step={1}
                min={0}
                max={100}
                values={scoreValue}
                onChange={(values) => setScoreValue(values)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="h-2 bg-gray-600 rounded-full"
                    style={{ ...props.style }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="w-4 h-4 bg-blue-400 rounded-full shadow-md focus:outline-none"
                    style={{ ...props.style }}
                  />
                )}
              />
              <p className="text-sm text-gray-200 mt-2">Score: {report.score || 0}%</p>
            </div>
          </div>

          {/* Reward */}
          <div className="bg-gray-800/80 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
              <FaTrophy className="mr-2 text-green-400" /> Reward
            </h3>
            <p className="text-sm text-green-400 font-semibold">{report.reward || 'No goals to report.'}</p>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/80 p-4 rounded-lg shadow-md h-64">
              <Bar data={chartData} options={chartOptions} />
            </div>
            <div className="bg-gray-800/80 p-4 rounded-lg shadow-md h-64">
              <Bar data={dailyData} options={dailyChartOptions} />
            </div>
            <div className="bg-gray-800/80 p-4 rounded-lg shadow-md h-48 col-span-1 md:col-span-2">
              <Pie data={completionPieData} options={pieOptions} />
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 w-full transition"
        >
          Close Report
        </button>
      </div>
    </div>
  );
}

export default ReportModal;