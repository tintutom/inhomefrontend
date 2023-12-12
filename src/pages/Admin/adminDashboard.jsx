// import React, { useState, useEffect } from 'react';
// import { Bar } from 'react-chartjs-2';
// import axios from 'axios';

// import './admin.css';

// const AdminDashboard = () => {
//   const [appointmentsData, setAppointmentsData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: 'Appointments',
//         data: [],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//         ],
//         borderWidth: 1,
//       },
//     ],
//   });

//   const [topFeedback, setTopFeedback] = useState([]);
//   const [counts, setCounts] = useState({
//     users: 0,
//     departments: 0,
//     doctors: 0,
//   });

//   useEffect(() => {
//     // Fetch counts
//     axios.get('http://localhost:8001/cadmin/')
//       .then(response => {
//         setCounts(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching counts:', error);
//       });

//     // Fetch top feedback
//     axios.get('http://localhost:8001/cadmin/top-feedback/')
//       .then(response => {
//         setTopFeedback(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching top feedback:', error);
//       });

//     // Fetch appointments
//     axios.get('http://localhost:8001/cadmin/appointments/')
//       .then(response => {
//         const appointments = response.data.appointments;
//         const doctors = response.data.doctors;

//         const labels = doctors.map(doctor => doctor.name);
//         const data = doctors.map(doctor =>
//           appointments.filter(appointment => appointment.doctor === doctor.id).length
//         );

//         setAppointmentsData({
//           labels: labels,
//           datasets: [
//             {
//               ...appointmentsData.datasets[0],
//               data: data,
//             },
//           ],
//         });
//       })
//       .catch(error => {
//         console.error('Error fetching appointments:', error);
//       });
//   }, [appointmentsData.datasets]); // Added appointmentsData.datasets as dependency

//   return (
//     <div className="admin-dashboard-container">
//       <div className="counts-container">
//         <h3>Counts</h3>
//         <p>Users: {counts.users}</p>
//         <p>Departments: {counts.departments}</p>
//         <p>Doctors: {counts.doctors}</p>
//       </div>
//       <div className="graph-container">
//         <h2>Doctor Appointments</h2>
//         {/* <Bar
//           data={appointmentsData}
//           options={{
//             scales: {
//               x: {
//                 type: 'category', // Specify x-axis as categorical
//                 labels: appointmentsData.labels,
//               },
//               y: {
//                 beginAtZero: true,
//               },
//             },
//           }}
//         /> */}
//       </div>
//       <div className="feedback-container">
//         <h2>Top 5 Feedback</h2>
//         <ul>
//           {topFeedback.map(feedback => (
//             <li key={feedback.id}>
//               {`${feedback.review_text} to Dr. ${feedback.doctor.name}: ${feedback.rating}`}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';

function AdminDashboard() {

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
     

      return (
        <main className="main-container">
          <div className="main-title">
            <h3>DASHBOARD</h3>
          </div>
    
          <div className="main-cards-container">
        <div className="card">
          <div className="card-inner">
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>300</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>CATEGORIES</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>12</h1>
        </div>
        {/* Place CUSTOMERS card before ALERTS card */}
        <div className="card">
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>33</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>ALERTS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>42</h1>
        </div>
      </div>

      <div className="charts">
        {/* Adjust chart sizes */}
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
            </div>

            <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

            </div>

        </div>
    </main>
  )
}

export default AdminDashboard
