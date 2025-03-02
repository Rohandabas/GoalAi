// // import React, { useState, useEffect } from 'react';
// // import DayGoals from './components/DayGoals';
// // import ReportModal from './components/ReportModal';

// // function App() {
// //   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // Removed Sunday from the grid
// //   const [goals, setGoals] = useState(() => {
// //     const savedGoals = localStorage.getItem('weeklyGoals');
// //     return savedGoals ? JSON.parse(savedGoals) : {
// //       Monday: [
// //         { text: 'Complete project', category: 'Work', completed: false, timerStarted: false, timeElapsed: 300 }, // 5 min
// //         { text: 'Exercise', category: 'Personal', completed: false, timerStarted: false, timeElapsed: 0 }
// //       ],
// //       Tuesday: [
// //         { text: 'Read book', category: 'Learning', completed: false, timerStarted: false, timeElapsed: 600 } // 10 min
// //       ]
// //     }; // Default sample goals for testing with timers
// //   });
// //   const [showReport, setShowReport] = useState(false);
// //   const [error, setError] = useState(null); // New state for errors

// //   useEffect(() => {
// //     localStorage.setItem('weeklyGoals', JSON.stringify(goals));
// //     console.log('Goals updated in localStorage:', goals);
// //   }, [goals]);

// //   const addGoal = (day, goalData) => {
// //     setGoals((prev) => ({
// //       ...prev,
// //       [day]: [
// //         ...(prev[day] || []),
// //         { text: goalData.text, category: goalData.category, completed: false, timerStarted: false, timeElapsed: 0 },
// //       ],
// //     }));
// //   };

// //   const deleteGoal = (day, index) => {
// //     setGoals((prev) => {
// //       const updatedDay = prev[day].filter((_, i) => i !== index);
// //       return { ...prev, [day]: updatedDay };
// //     });
// //   };

// //   const toggleGoal = (day, index) => {
// //     setGoals((prev) => {
// //       const updatedDay = prev[day].map((g, i) => {
// //         if (i === index) {
// //           const updatedGoal = { ...g, completed: !g.completed };
// //           if (updatedGoal.completed && g.timerStarted) {
// //             updatedGoal.timerStarted = false; // Stop timer when goal is completed
// //           }
// //           return updatedGoal;
// //         }
// //         return g;
// //       });
// //       return { ...prev, [day]: updatedDay };
// //     });
// //   };

// //   const startTimer = (day, index) => {
// //     setGoals((prev) => {
// //       const updatedDay = prev[day].map((g, i) => {
// //         if (i === index) {
// //           return { ...g, timerStarted: true };
// //         }
// //         return g;
// //       });
// //       return { ...prev, [day]: updatedDay };
// //     });
// //   };

// //   const updateTimeElapsed = (day, index, time) => {
// //     setGoals((prev) => {
// //       const updatedDay = prev[day].map((g, i) => {
// //         if (i === index && g.timerStarted) {
// //           return { ...g, timeElapsed: time };
// //         }
// //         return g;
// //       });
// //       return { ...prev, [day]: updatedDay };
// //     });
// //   };

// //   const generateReport = () => {
// //     try {
// //       console.log('Generating report with goals:', goals);
// //       const allGoals = Object.values(goals).flat().filter((g) => g !== undefined);
// //       const totalGoals = allGoals.length;

// //       if (totalGoals === 0) {
// //         throw new Error('No goals found for the week.');
// //       }

// //       const completedGoals = allGoals.filter((g) => g.completed);
// //       const unfinishedGoals = allGoals.filter((g) => !g.completed).map((g) => g.text);

// //       // Group completed goals by category
// //       const completedByCategory = completedGoals.reduce((acc, goal) => {
// //         acc[goal.category] = acc[goal.category] || [];
// //         acc[goal.category].push({ text: goal.text, timeElapsed: goal.timeElapsed });
// //         return acc;
// //       }, {});

// //       // Calculate total time for completed goals with timers
// //       const totalTimeElapsed = completedGoals.reduce((sum, goal) => sum + (goal.timeElapsed || 0), 0);
// //       const formattedTime = formatTime(totalTimeElapsed);

// //       const score = Math.round((completedGoals.length / totalGoals) * 100);
// //       let reward = '';

// //       if (score >= 90) {
// //         reward = 'Treat yourself to a movie night!';
// //       } else if (score >= 70) {
// //         reward = 'Enjoy a relaxing coffee break.';
// //       } else if (score >= 50) {
// //         reward = 'Keep it up—try a short walk.';
// //       } else {
// //         reward = 'Don’t worry, set new goals for next week!';
// //       }

// //       console.log('Report data:', { totalGoals, completedGoals, unfinishedGoals, completedByCategory, totalTimeElapsed, score, reward });
// //       return { unfinishedGoals, completedByCategory, totalTimeElapsed: formattedTime, score, reward };
// //     } catch (err) {
// //       console.error('Error generating report:', err);
// //       setError(err.message || 'Failed to generate report.');
// //       return { unfinishedGoals: [], completedByCategory: {}, totalTimeElapsed: '0:00 min', score: 0, reward: 'No goals to report.' };
// //     }
// //   };

// //   const formatTime = (seconds) => {
// //     const minutes = Math.floor(seconds / 60);
// //     const remainingSeconds = seconds % 60;
// //     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} min`;
// //   };

// //   const handleGenerateReport = () => {
// //     console.log('Report button clicked, day:', new Date().getDay());
// //     setShowReport(true);
// //     setError(null); // Reset error state
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 p-4">
// //       <header className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
// //         <div>
// //           <h1 className="text-2xl font-bold text-blue-600 flex items-center">
// //             <span className="mr-2">📋</span> Weekly Goal Tracker
// //           </h1>
// //         </div>
// //         {/* Show report button for testing on any day (remove or adjust for production) */}
// //         <button
// //           onClick={handleGenerateReport}
// //           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
// //         >
// //           Generate Report
// //         </button>
// //       </header>
// //       <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
// //         {days.map((day, index) => (
// //           <DayGoals
// //             key={day}
// //             day={day}
// //             goals={goals[day] || []}
// //             onAddGoal={addGoal}
// //             onDeleteGoal={(index) => deleteGoal(day, index)}
// //             onToggleGoal={(index) => toggleGoal(day, index)}
// //             onStartTimer={(index) => startTimer(day, index)}
// //             updateTimeElapsed={(index, time) => updateTimeElapsed(day, index, time)}
// //           />
// //         ))}
// //       </main>
// //       {error && <p className="text-red-500 text-center mt-4">{error}</p>}
// //       <ReportModal
// //         isOpen={showReport}
// //         onClose={() => setShowReport(false)}
// //         report={generateReport()}
// //       />
// //       <footer className="bg-gray-800 text-white text-center p-4 mt-6 rounded-lg">
// //         <p>© 2025 Daily Goals. All rights reserved.</p>
// //       </footer>
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState, useEffect, useMemo } from 'react';
// import DayGoals from './components/DayGoals';
// import ReportModal from './components/ReportModal';

// function App() {
//   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // Removed Sunday from the grid
//   const [goals, setGoals] = useState(() => {
//     const savedGoals = localStorage.getItem('weeklyGoals');
//     console.log('Loaded goals from localStorage:', savedGoals ? JSON.parse(savedGoals) : 'No saved goals');
//     return savedGoals ? JSON.parse(savedGoals) : {}; // Start with an empty object (no sample data)
//   });
//   const [showReport, setShowReport] = useState(false);
//   const [error, setError] = useState(null); // State for errors

//   useEffect(() => {
//     try {
//       localStorage.setItem('weeklyGoals', JSON.stringify(goals));
//       console.log('Goals updated in localStorage:', goals);
//     } catch (err) {
//       console.error('Error saving to localStorage:', err);
//       setError('Failed to save goals. Please check your browser settings.');
//     }
//   }, [goals]);

//   const addGoal = (day, goalData) => {
//     setGoals((prev) => ({
//       ...prev,
//       [day]: [
//         ...(prev[day] || []),
//         { text: goalData.text, category: goalData.category, completed: false, timerStarted: false, timeElapsed: 0 },
//       ],
//     }));
//   };

//   const deleteGoal = (day, index) => {
//     setGoals((prev) => {
//       const updatedDay = prev[day]?.filter((_, i) => i !== index) || [];
//       return { ...prev, [day]: updatedDay };
//     });
//   };

//   const deleteAllGoals = (day) => {
//     setGoals((prev) => {
//       const newGoals = { ...prev };
//       delete newGoals[day]; // Remove the entire day from goals
//       return newGoals;
//     });
//   };

//   const toggleGoal = (day, index) => {
//     setGoals((prev) => {
//       const updatedDay = prev[day]?.map((g, i) => {
//         if (i === index) {
//           const updatedGoal = { ...g, completed: !g.completed };
//           if (updatedGoal.completed && g.timerStarted) {
//             updatedGoal.timerStarted = false; // Stop timer when goal is completed
//           }
//           return updatedGoal;
//         }
//         return g;
//       }) || [];
//       return { ...prev, [day]: updatedDay };
//     });
//   };

//   const startTimer = (day, index) => {
//     setGoals((prev) => {
//       const updatedDay = prev[day]?.map((g, i) => {
//         if (i === index) {
//           return { ...g, timerStarted: true };
//         }
//         return g;
//       }) || [];
//       return { ...prev, [day]: updatedDay };
//     });
//   };

//   const updateTimeElapsed = (day, index, time) => {
//     setGoals((prev) => {
//       const updatedDay = prev[day]?.map((g, i) => {
//         if (i === index && g.timerStarted) {
//           return { ...g, timeElapsed: time };
//         }
//         return g;
//       }) || [];
//       return { ...prev, [day]: updatedDay };
//     });
//   };

//   const generateReport = () => {
//     try {
//       console.log('Generating report with goals:', goals);
//       const allGoals = Object.values(goals).flat().filter((g) => g !== undefined);
//       const totalGoals = allGoals.length;

//       if (totalGoals === 0) {
//         throw new Error('No goals found for the week.');
//       }

//       const completedGoals = allGoals.filter((g) => g.completed);
//       const unfinishedGoals = allGoals.filter((g) => !g.completed).map((g) => g.text);

//       // Group completed goals by category
//       const completedByCategory = completedGoals.reduce((acc, goal) => {
//         acc[goal.category] = acc[goal.category] || [];
//         acc[goal.category].push({ text: goal.text, timeElapsed: goal.timeElapsed });
//         return acc;
//       }, {});

//       // Calculate total time for completed goals with timers
//       const totalTimeElapsed = completedGoals.reduce((sum, goal) => sum + (goal.timeElapsed || 0), 0);
//       const formattedTime = formatTime(totalTimeElapsed);

//       const score = Math.round((completedGoals.length / totalGoals) * 100);
//       let reward = '';

//       if (score >= 90) {
//         reward = 'Treat yourself to a movie night!';
//       } else if (score >= 70) {
//         reward = 'Enjoy a relaxing coffee break.';
//       } else if (score >= 50) {
//         reward = 'Keep it up—try a short walk.';
//       } else {
//         reward = 'Don’t worry, set new goals for next week!';
//       }

//       console.log('Report data:', { totalGoals, completedGoals, unfinishedGoals, completedByCategory, totalTimeElapsed, score, reward });
//       return { unfinishedGoals, completedByCategory, totalTimeElapsed: formattedTime, score, reward, goalsByDay: days.reduce((acc, day) => {
//         acc[day] = {
//           completed: (goals[day] || []).filter((g) => g.completed),
//           unfinished: (goals[day] || []).filter((g) => !g.completed),
//         };
//         return acc;
//       }, {}) };
//     } catch (err) {
//       console.error('Error generating report:', err);
//       setError(err.message || 'Failed to generate report.');
//       return { unfinishedGoals: [], completedByCategory: {}, totalTimeElapsed: '0:00 min', score: 0, reward: 'No goals to report.', goalsByDay: {} };
//     }
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} min`;
//   };

//   const handleGenerateReport = () => {
//     console.log('Report button clicked, day:', new Date().getDay());
//     setShowReport(true);
//     setError(null); // Reset error state
//   };

//   // Memoize the report to prevent infinite re-renders
//   const report = useMemo(() => generateReport(), [goals, showReport]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <header className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-blue-600 flex items-center">
//             <span className="mr-2">📋</span> Weekly Goal Tracker
//           </h1>
//         </div>
//         <button
//           onClick={handleGenerateReport}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//         >
//           Generate Report
//         </button>
//       </header>
//       <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
//         {days.map((day, index) => (
//           <DayGoals
//             key={day}
//             day={day}
//             goals={goals[day] || []}
//             onAddGoal={addGoal}
//             onDeleteGoal={(index) => deleteGoal(day, index)}
//             onDeleteAllGoals={() => deleteAllGoals(day)} // Pass the new function
//             onToggleGoal={(index) => toggleGoal(day, index)}
//             onStartTimer={(index) => startTimer(day, index)}
//             updateTimeElapsed={(index, time) => updateTimeElapsed(day, index, time)}
//           />
//         ))}
//       </main>
//       {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//       <ReportModal
//         isOpen={showReport}
//         onClose={() => setShowReport(false)}
//         report={report} // Use memoized report to prevent re-renders
//         days={days} // Pass days as a prop to ReportModal
//       />
//       <footer className="bg-gray-800 text-white text-center p-4 mt-6 rounded-lg">
//         <p>© 2025 Daily Goals. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default App;












// import React, { useState, useEffect, useMemo } from 'react';
// import DayGoals from './components/DayGoals';
// import ReportModal from './components/ReportModal';

// function App() {
//   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // Removed Sunday from the grid
//   const [goals, setGoals] = useState(() => {
//     const savedGoals = localStorage.getItem('weeklyGoals');
//     console.log('Loaded goals from localStorage (raw):', savedGoals);
//     if (savedGoals) {
//       const parsedGoals = JSON.parse(savedGoals);
//       console.log('Parsed goals from localStorage:', parsedGoals);
//       // Clear all existing localStorage data to ensure no sample or stale data persists
//       console.log('Clearing ALL data from localStorage to start fresh');
//       localStorage.removeItem('weeklyGoals');
//       return {}; // Start fresh with no data
//     }
//     return {}; // Start with an empty object if no localStorage data
//   });
//   const [showReport, setShowReport] = useState(false);
//   const [error, setError] = useState(null); // State for errors

//   useEffect(() => {
//     try {
//       localStorage.setItem('weeklyGoals', JSON.stringify(goals));
//       console.log('Goals updated in localStorage:', goals);
//     } catch (err) {
//       console.error('Error saving to localStorage:', err);
//       setError('Failed to save goals. Please check your browser settings.');
//     }
//   }, [goals]);

//   const addGoal = (day, goalData) => {
//     setGoals((prev) => ({
//       ...prev,
//       [day]: [
//         ...(prev[day] || []),
//         { text: goalData.text, category: goalData.category, completed: false, timerStarted: false, timeElapsed: 0 },
//       ],
//     }));
//   };

//   const deleteGoal = (day, index) => {
//     setGoals((prev) => {
//       const updatedDay = prev[day]?.filter((_, i) => i !== index) || [];
//       return { ...prev, [day]: updatedDay };
//     });
//   };

//   const deleteAllGoals = (day) => {
//     setGoals((prev) => {
//       const newGoals = { ...prev };
//       delete newGoals[day]; // Remove the entire day from goals
//       return newGoals;
//     });
//   };

//   const toggleGoal = (day, index) => {
//     setGoals((prev) => {
//       const updatedDay = prev[day]?.map((g, i) => {
//         if (i === index) {
//           const updatedGoal = { ...g, completed: !g.completed };
//           if (updatedGoal.completed && g.timerStarted) {
//             updatedGoal.timerStarted = false; // Stop timer when goal is completed
//           }
//           return updatedGoal;
//         }
//         return g;
//       }) || [];
//       return { ...prev, [day]: updatedDay };
//     });
//   };

//   const startTimer = (day, index) => {
//     setGoals((prev) => {
//       const updatedDay = prev[day]?.map((g, i) => {
//         if (i === index) {
//           return { ...g, timerStarted: true };
//         }
//         return g;
//       }) || [];
//       return { ...prev, [day]: updatedDay };
//     });
//   };

//   const updateTimeElapsed = (day, index, time) => {
//     setGoals((prev) => {
//       const updatedDay = prev[day]?.map((g, i) => {
//         if (i === index && g.timerStarted) {
//           return { ...g, timeElapsed: time };
//         }
//         return g;
//       }) || [];
//       return { ...prev, [day]: updatedDay };
//     });
//   };

//   const generateReport = () => {
//     try {
//       console.log('Generating report with goals (detailed):', {
//         goals,
//         days,
//         allGoals: Object.values(goals).flat().filter((g) => g !== undefined)
//       });
//       const allGoals = Object.values(goals).flat().filter((g) => g !== undefined);
//       const totalGoals = allGoals.length;

//       if (totalGoals === 0) {
//         throw new Error('No goals found for the week.');
//       }

//       const completedGoals = allGoals.filter((g) => g.completed);
//       const unfinishedGoals = allGoals.filter((g) => !g.completed).map((g) => g.text);

//       // Group completed goals by category
//       const completedByCategory = completedGoals.reduce((acc, goal) => {
//         acc[goal.category] = acc[goal.category] || [];
//         acc[goal.category].push({ text: goal.text, timeElapsed: goal.timeElapsed });
//         return acc;
//       }, {});

//       // Calculate total time for completed goals with timers
//       const totalTimeElapsed = completedGoals.reduce((sum, goal) => sum + (goal.timeElapsed || 0), 0);
//       const formattedTime = formatTime(totalTimeElapsed);

//       const score = Math.round((completedGoals.length / totalGoals) * 100);
//       let reward = '';

//       if (score >= 90) {
//         reward = 'Treat yourself to a movie night!';
//       } else if (score >= 70) {
//         reward = 'Enjoy a relaxing coffee break.';
//       } else if (score >= 50) {
//         reward = 'Keep it up—try a short walk.';
//       } else {
//         reward = 'Don’t worry, set new goals for next week!';
//       }

//       console.log('Report data:', { totalGoals, completedGoals, unfinishedGoals, completedByCategory, totalTimeElapsed, score, reward });
//       return { 
//         unfinishedGoals, 
//         completedByCategory, 
//         totalTimeElapsed: formattedTime, 
//         score, 
//         reward, 
//         goalsByDay: days.reduce((acc, day) => {
//           acc[day] = {
//             completed: (goals[day] || []).filter((g) => g.completed),
//             unfinished: (goals[day] || []).filter((g) => !g.completed),
//           };
//           return acc;
//         }, {}) 
//       };
//     } catch (err) {
//       console.error('Error generating report:', err);
//       setError(err.message || 'Failed to generate report.');
//       return { 
//         unfinishedGoals: [], 
//         completedByCategory: {}, 
//         totalTimeElapsed: '0:00 min', 
//         score: 0, 
//         reward: 'No goals to report.', 
//         goalsByDay: {} 
//       };
//     }
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} min`;
//   };

//   const handleGenerateReport = () => {
//     console.log('Report button clicked, day:', new Date().getDay());
//     setShowReport(true);
//     setError(null); // Reset error state
//   };

//   // Memoize the report to prevent infinite re-renders
//   const report = useMemo(() => generateReport(), [goals, showReport]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#E0EAFC] to-[#CFDEF3]
//  p-3">
//       <header className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-blue-600 flex items-center">
//             <span className="mr-2">📋</span> Weekly Goal Tracker
//           </h1>
//         </div>
//         <button
//           onClick={handleGenerateReport}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//         >
//           Generate Report
//         </button>
//       </header>
//       <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-19">
//         {days.map((day, index) => (
//           <DayGoals
//             key={day}
//             day={day}
//             goals={goals[day] || []}
//             onAddGoal={addGoal}
//             onDeleteGoal={(index) => deleteGoal(day, index)}
//             onDeleteAllGoals={() => deleteAllGoals(day)} // Pass the new function
//             onToggleGoal={(index) => toggleGoal(day, index)}
//             onStartTimer={(index) => startTimer(day, index)}
//             updateTimeElapsed={(index, time) => updateTimeElapsed(day, index, time)}
//           />
//         ))}
//       </main>
//       {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//       <ReportModal
//         isOpen={showReport}
//         onClose={() => setShowReport(false)}
//         report={report} // Use memoized report to prevent re-renders
//         days={days} // Pass days as a prop to ReportModal
//       />
//       <footer className="bg-gray-800 text-white text-center p-4 mt-6 rounded-lg">
//         <p>© 2025 Daily Goals. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default App;








/// fully corrected with local stoareg but some little issue of not generating report when goal is not added






// import React, { useState, useEffect, useMemo } from 'react';
// import DayGoals from './components/DayGoals';
// import ReportModal from './components/ReportModal';

// function App() {
//   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // Removed Sunday from the grid
//   const [goals, setGoals] = useState(() => {
//     const savedGoals = localStorage.getItem('weeklyGoals');
//     console.log('Loaded goals from localStorage:', savedGoals ? JSON.parse(savedGoals) : 'No saved goals');
//     if (savedGoals) {
//       const parsedGoals = JSON.parse(savedGoals);
//       return parsedGoals; // Use parsed goals directly
//     }
//     return {}; // Start with an empty object if no localStorage data
//   });
//   const [showReport, setShowReport] = useState(false);
//   const [error, setError] = useState(null); // State for errors

//   useEffect(() => {
//     try {
//       localStorage.setItem('weeklyGoals', JSON.stringify(goals));
//       console.log('Goals updated in localStorage:', goals);
//     } catch (err) {
//       console.error('Error saving to localStorage:', err);
//       setError('Failed to save goals. Please check your browser settings.');
//     }
//   }, [goals]);

//   const addGoal = (day, goalData) => {
//     setGoals((prev) => ({
//       ...prev,
//       [day]: [
//         ...(prev[day] || []),
//         { text: goalData.text, category: goalData.category, completed: false, timerStarted: false, timeElapsed: 0 },
//       ],
//     }));
//   };

//   const deleteGoal = (day, index) => {
//     setGoals((prev) => {
//       const updatedDay = prev[day]?.filter((_, i) => i !== index) || [];
//       return { ...prev, [day]: updatedDay };
//     });
//   };

//   const deleteAllGoals = (day) => {
//     setGoals((prev) => {
//       const newGoals = { ...prev };
//       delete newGoals[day]; // Remove the entire day from goals
//       return newGoals;
//     });
//   };

//   const toggleGoal = (day, index) => {
//     setGoals((prev) => {
//       const updatedDay = prev[day]?.map((g, i) => {
//         if (i === index) {
//           const updatedGoal = { ...g, completed: !g.completed };
//           if (updatedGoal.completed && g.timerStarted) {
//             updatedGoal.timerStarted = false; // Stop timer when goal is completed
//           }
//           return updatedGoal;
//         }
//         return g;
//       }) || [];
//       return { ...prev, [day]: updatedDay };
//     });
//   };

//   const startTimer = (day, index) => {
//     setGoals((prev) => {
//       const updatedDay = prev[day]?.map((g, i) => {
//         if (i === index) {
//           return { ...g, timerStarted: true };
//         }
//         return g;
//       }) || [];
//       return { ...prev, [day]: updatedDay };
//     });
//   };

//   const updateTimeElapsed = (day, index, time) => {
//     setGoals((prev) => {
//       const updatedDay = prev[day]?.map((g, i) => {
//         if (i === index && g.timerStarted) {
//           return { ...g, timeElapsed: time };
//         }
//         return g;
//       }) || [];
//       return { ...prev, [day]: updatedDay };
//     });
//   };

//   const generateReport = () => {
//     try {
//       console.log('Generating report with goals (detailed):', {
//         goals,
//         days,
//         allGoals: Object.values(goals).flat().filter((g) => g !== undefined)
//       });
//       const allGoals = Object.values(goals).flat().filter((g) => g !== undefined);
//       const totalGoals = allGoals.length;

//       if (totalGoals === 0) {
//         throw new Error('No goals found for the week.');
//       }

//       const completedGoals = allGoals.filter((g) => g.completed);
//       const unfinishedGoals = allGoals.filter((g) => !g.completed).map((g) => g.text);

//       // Group completed goals by category
//       const completedByCategory = completedGoals.reduce((acc, goal) => {
//         acc[goal.category] = acc[goal.category] || [];
//         acc[goal.category].push({ text: goal.text, timeElapsed: goal.timeElapsed });
//         return acc;
//       }, {});

//       // Calculate total time for completed goals with timers
//       const totalTimeElapsed = completedGoals.reduce((sum, goal) => sum + (goal.timeElapsed || 0), 0);
//       const formattedTime = formatTime(totalTimeElapsed);

//       const score = Math.round((completedGoals.length / totalGoals) * 100);
//       let reward = '';

//       if (score >= 90) {
//         reward = 'Treat yourself to a movie night!';
//       } else if (score >= 70) {
//         reward = 'Enjoy a relaxing coffee break.';
//       } else if (score >= 50) {
//         reward = 'Keep it up—try a short walk.';
//       } else {
//         reward = 'Don’t worry, set new goals for next week!';
//       }

//       console.log('Report data:', { totalGoals, completedGoals, unfinishedGoals, completedByCategory, totalTimeElapsed, score, reward });
//       return { 
//         unfinishedGoals, 
//         completedByCategory, 
//         totalTimeElapsed: formattedTime, 
//         score, 
//         reward, 
//         goalsByDay: days.reduce((acc, day) => {
//           acc[day] = {
//             completed: (goals[day] || []).filter((g) => g.completed),
//             unfinished: (goals[day] || []).filter((g) => !g.completed),
//           };
//           return acc;
//         }, {}) 
//       };
//     } catch (err) {
//       console.error('Error generating report:', err);
//       setError(err.message || 'Failed to generate report.');
//       return { 
//         unfinishedGoals: [], 
//         completedByCategory: {}, 
//         totalTimeElapsed: '0:00 min', 
//         score: 0, 
//         reward: 'No goals to report.', 
//         goalsByDay: {} 
//       };
//     }
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} min`;
//   };

//   const handleGenerateReport = () => {
//     console.log('Report button clicked, day:', new Date().getDay());
//     setShowReport(true);
//     setError(null); // Reset error state
//   };

//   // Memoize the report to prevent infinite re-renders
//   const report = useMemo(() => generateReport(), [goals, showReport]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#E0EAFC] to-[#CFDEF3]
//  p-3">
//       <header className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-blue-600 flex items-center">
//             <span className="mr-2">📋</span> Weekly Goal Tracker
//           </h1>
//         </div>
//         <button
//           onClick={handleGenerateReport}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//         >
//           Generate Report
//         </button>
//       </header>
//       <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-19">
//         {days.map((day, index) => (
//           <DayGoals
//             key={day}
//             day={day}
//             goals={goals[day] || []}
//             onAddGoal={addGoal}
//             onDeleteGoal={(index) => deleteGoal(day, index)}
//             onDeleteAllGoals={() => deleteAllGoals(day)} // Pass the new function
//             onToggleGoal={(index) => toggleGoal(day, index)}
//             onStartTimer={(index) => startTimer(day, index)}
//             updateTimeElapsed={(index, time) => updateTimeElapsed(day, index, time)}
//           />
//         ))}
//       </main>
//       {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//       <ReportModal
//         isOpen={showReport}
//         onClose={() => setShowReport(false)}
//         report={report} // Use memoized report to prevent re-renders
//         days={days} // Pass days as a prop to ReportModal
//       />
//       <footer className="bg-gray-800 text-white text-center p-4 mt-6 rounded-lg">
//         <p>© 2025 Daily Goals. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default App;

























// import React, { useState, useEffect, useMemo } from 'react';
// import DayGoals from './components/DayGoals';
// import ReportModal from './components/ReportModal';
// import WeeklyPlanModal from './components/WeeklyPlanModal'; // Import new component

// function App() {
//   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // Removed Sunday from the grid
//   const [goals, setGoals] = useState(() => {
//     const savedGoals = localStorage.getItem('weeklyGoals');
//     console.log('Loaded goals from localStorage:', savedGoals ? JSON.parse(savedGoals) : 'No saved goals');
//     if (savedGoals) {
//       const parsedGoals = JSON.parse(savedGoals);
//       return parsedGoals;
//     }
//     return {}; // Start with an empty object if no localStorage data
//   });
//   const [showReport, setShowReport] = useState(false);
//   const [showWeeklyPlan, setShowWeeklyPlan] = useState(false); // State for weekly plan modal
//   const [error, setError] = useState(null); // State for errors

//   useEffect(() => {
//     try {
//       localStorage.setItem('weeklyGoals', JSON.stringify(goals));
//       console.log('Goals updated in localStorage:', goals);
//     } catch (err) {
//       console.error('Error saving to localStorage:', err);
//       setError('Failed to save goals. Please check your browser settings.');
//     }
//   }, [goals]);

//   const addGoal = (day, goalData) => {
//     setGoals((prev) => ({
//       ...prev,
//       [day]: [
//         ...(prev[day] || []),
//         { text: goalData.text, category: goalData.category || 'Personal', startTimer: goalData.startTimer || false, completed: false, timeElapsed: 0 },
//       ],
//     }));
//   };

//   const deleteGoal = (day, index) => {
//     setGoals((prev) => {
//       const updatedDay = prev[day]?.filter((_, i) => i !== index) || [];
//       return { ...prev, [day]: updatedDay };
//     });
//   };

//   const deleteAllGoals = (day) => {
//     setGoals((prev) => {
//       const newGoals = { ...prev };
//       delete newGoals[day]; // Remove the entire day from goals
//       return newGoals;
//     });
//   };

//   const toggleGoal = (day, index) => {
//     setGoals((prev) => {
//       const updatedDay = prev[day]?.map((g, i) => {
//         if (i === index) {
//           const updatedGoal = { ...g, completed: !g.completed };
//           if (updatedGoal.completed && g.timerStarted) {
//             updatedGoal.timerStarted = false; // Stop timer when goal is completed
//           }
//           return updatedGoal;
//         }
//         return g;
//       }) || [];
//       return { ...prev, [day]: updatedDay };
//     });
//   };

//   const startTimer = (day, index) => {
//     setGoals((prev) => {
//       const updatedDay = prev[day]?.map((g, i) => {
//         if (i === index) {
//           return { ...g, timerStarted: true };
//         }
//         return g;
//       }) || [];
//       return { ...prev, [day]: updatedDay };
//     });
//   };

//   const updateTimeElapsed = (day, index, time) => {
//     setGoals((prev) => {
//       const updatedDay = prev[day]?.map((g, i) => {
//         if (i === index && g.timerStarted) {
//           return { ...g, timeElapsed: time };
//         }
//         return g;
//       }) || [];
//       return { ...prev, [day]: updatedDay };
//     });
//   };

//   const generateReport = () => {
//     try {
//       console.log('Generating report with goals (detailed):', {
//         goals,
//         days,
//         allGoals: Object.values(goals).flat().filter((g) => g !== undefined)
//       });
//       const allGoals = Object.values(goals).flat().filter((g) => g !== undefined);
//       const totalGoals = allGoals.length;

//       const completedGoals = allGoals.filter((g) => g.completed);
//       const unfinishedGoals = allGoals.filter((g) => !g.completed).map((g) => g.text);

//       // Group completed goals by category
//       const completedByCategory = completedGoals.reduce((acc, goal) => {
//         acc[goal.category] = acc[goal.category] || [];
//         acc[goal.category].push({ text: goal.text, timeElapsed: goal.timeElapsed });
//         return acc;
//       }, {});

//       // Calculate total time for completed goals with timers
//       const totalTimeElapsed = completedGoals.reduce((sum, goal) => sum + (goal.timeElapsed || 0), 0);
//       const formattedTime = formatTime(totalTimeElapsed);

//       const score = totalGoals > 0 ? Math.round((completedGoals.length / totalGoals) * 100) : 0;
//       let reward = '';

//       if (totalGoals === 0) {
//         reward = 'No goals to report.';
//       } else if (score >= 90) {
//         reward = 'Treat yourself to a movie night!';
//       } else if (score >= 70) {
//         reward = 'Enjoy a relaxing coffee break.';
//       } else if (score >= 50) {
//         reward = 'Keep it up—try a short walk.';
//       } else {
//         reward = 'Don’t worry, set new goals for next week!';
//       }

//       console.log('Report data:', { totalGoals, completedGoals, unfinishedGoals, completedByCategory, totalTimeElapsed, score, reward });
//       return { 
//         unfinishedGoals, 
//         completedByCategory, 
//         totalTimeElapsed: formattedTime, 
//         score, 
//         reward, 
//         goalsByDay: days.reduce((acc, day) => {
//           acc[day] = {
//             completed: (goals[day] || []).filter((g) => g.completed),
//             unfinished: (goals[day] || []).filter((g) => !g.completed),
//           };
//           return acc;
//         }, {}) 
//       };
//     } catch (err) {
//       console.error('Error generating report:', err);
//       setError(err.message || 'Failed to generate report.');
//       return { 
//         unfinishedGoals: [], 
//         completedByCategory: {}, 
//         totalTimeElapsed: '0:00 min', 
//         score: 0, 
//         reward: 'No goals to report.', 
//         goalsByDay: {} 
//       };
//     }
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds} min`;
//   };

//   const handleGenerateReport = () => {
//     console.log('Report button clicked, day:', new Date().getDay());
//     setShowReport(true);
//     setError(null); // Reset error state
//   };

//   const handlePlanSchedule = () => {
//     setShowWeeklyPlan(true);
//   };

//   // Memoize the report to prevent infinite re-renders
//   const report = useMemo(() => generateReport(), [goals, showReport]);

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <header className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-blue-600 flex items-center">
//             <span className="mr-2">📋</span> Weekly Goal Tracker
//           </h1>
//         </div>
//         <div className="flex space-x-4">
//           <button
//             onClick={handleGenerateReport}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Generate Report
//           </button>
//           <button
//             onClick={handlePlanSchedule}
//             className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
//           >
//             Plan Schedule
//           </button>
//         </div>
//       </header>
//       <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
//         {days.map((day, index) => (
//           <DayGoals
//             key={day}
//             day={day}
//             goals={goals[day] || []}
//             onAddGoal={addGoal}
//             onDeleteGoal={(index) => deleteGoal(day, index)}
//             onDeleteAllGoals={() => deleteAllGoals(day)} // Pass the new function
//             onToggleGoal={(index) => toggleGoal(day, index)}
//             onStartTimer={(index) => startTimer(day, index)}
//             updateTimeElapsed={(index, time) => updateTimeElapsed(day, index, time)}
//           />
//         ))}
//       </main>
//       {error && <p className="text-red-500 text-center mt-4">{error}</p>}
//       <ReportModal
//         isOpen={showReport}
//         onClose={() => setShowReport(false)}
//         report={report}
//         days={days}
//       />
//       <WeeklyPlanModal
//         isOpen={showWeeklyPlan}
//         onClose={() => setShowWeeklyPlan(false)}
//         onAddGoal={addGoal}
//       />
//       <footer className="bg-gray-800 text-white text-center p-4 mt-6 rounded-lg">
//         <p>© 2025 Daily Goals. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default App;













import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import Home from './components/Home';
import GoalTracker from './components/GoalTracker';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/goals" 
          element={
            <SignedIn>
              <GoalTracker />
            </SignedIn>
          }
        />
        <Route 
          path="/goals" 
          element={
            <SignedOut>
              <Navigate to="/" replace />
            </SignedOut>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;