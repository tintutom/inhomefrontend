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

  const doctorRatingsData = doctorReviews.reduce((accumulator, review) => {
    const doctorName = review.doctor.name;

    // Check if the doctorName exists in the accumulator
    if (accumulator[doctorName]) {
      // If yes, update the totalRating and count
      accumulator[doctorName].totalRating += review.rating;
      accumulator[doctorName].count += 1;
    } else {
      // If no, initialize the entry with the current rating
      accumulator[doctorName] = {
        totalRating: review.rating,
        count: 1,
      };
    }

    return accumulator;
  }, {});

  // Calculate the average rating for each doctor
  const doctorAverages = Object.entries(doctorRatingsData).map(([doctorName, data]) => ({
    doctorName,
    averageRating: data.totalRating / data.count,
  }));


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
      <h2>Doctor Appoinment & Review Graph</h2>
      <h3>  </h3>
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
              data={doctorAverages}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="doctorName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="averageRating" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="areviews-container">
        <h2 >Doctor Reviews</h2>
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
