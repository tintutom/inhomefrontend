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

import './admin.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { baseUrl } from '../../utils/Constants';

function AdminDashboard() {
  const [doctorAppointmentsData, setDoctorAppointmentsData] = useState([]);
  const [doctorReviews, setDoctorReviews] = useState([]);
  const [counts, setCounts] = useState({
    users: 0,
    departments: 0,
    doctors: 0,
    upappoinments:0,
  });

  useEffect(() => {
    // Fetch doctor appointments data
    axios.get(`${baseUrl}cadmin/appointments/`)
      .then(response => {
        const appointments = response.data.appointments;
        const doctors = response.data.doctors;

        // Count appointments per doctor
        const doctorAppointmentsCount = doctors.map(doctor => {
          const appointmentsCount = appointments.filter(appointment => appointment.doctor === doctor.id).length;
          return { doctorName: doctor.name, appointmentCount: appointmentsCount };
        });

        setDoctorAppointmentsData(doctorAppointmentsCount);
      })
      .catch(error => {
        console.error('Error fetching doctor appointments:', error);
      });
      axios.get(`${baseUrl}cadmin/top-feedback/`)
      .then(response => {
        setDoctorReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctor reviews:', error);
      });
      axios.get(`${baseUrl}cadmin/`)
      .then(response => {
        setCounts(response.data);
      })
      .catch(error => {
        console.error('Error fetching counts:', error);
      });
  }, []);


  return (
    <main className="amain-container">
      
      
      <div className="acard-container">
        <div className="acard ausers-card">
          <h2>Users</h2>
          <p>{counts.users}</p>
        </div>

        <div className="acard adoctors-card">
          <h2>Doctors</h2>
          <p>{counts.doctors}</p>
        </div>
        <div className="acard aappointments-card">
          <h2>Departments</h2>
          <p>{counts.departments}</p>
        </div>

        <div className="acard aappointments-card">
          <h2>Appointments</h2>
          <p>{counts.upappoinments}</p>
        </div>

        {/* <div className="acard aappointments-card">
          <h2>Previous Appointments</h2>
          <p>0</p>
        </div> */}
      </div>

      <div className="acharts">
        <div className="achart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={doctorAppointmentsData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="doctorName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="appointmentCount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="achart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={doctorAppointmentsData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="doctorName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="appointmentCount" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="areviews-container">
        <h2>Doctor Reviews</h2>
        <ul className="areviews-list">
          {doctorReviews.map((review, index) => (
            <li key={index} className="adoctor-review">
              <div className="adoctor-info">
                <strong>{review.doctor.name}</strong>
                <p>Rating: {review.rating}</p>
                <p>Feedback: {review.review_text}</p>
              </div>
              <p>{review.review}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default AdminDashboard;
