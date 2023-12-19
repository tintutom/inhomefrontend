import React, { useState, useEffect } from 'react';
import { mediaUrl,baseUrl } from '../utils/Constants';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Map from '../components/Location/AddLocation';
const SlotBooking=()=>{
  const location = useLocation();
  
  const [doctor, setDoctor] = useState([]); 
  const [users, setUsers] = useState([]); 
  const [availability,setAvailability]=useState([]) 
  const [selectedDate, setSelectedDate] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();
  const user_id = Cookies.get('id');

  useEffect (()=>{
    FetchDoctorDetails()
    FetchUserDetails()
    FetchAvailability()
    
  },[]);


  const FetchDoctorDetails = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}doctors/doctor-info/${id}`,
        
      );
      setDoctor(response.data)
      console.log("doctor details",response)
    } catch (error) {
      console.error("Error fetching professional details:", error);
    }
  };

  const FetchUserDetails = async () => {
    try {
      console.log("url",`${baseUrl}get-user/${user_id}`)
      const response = await axios.get(
        `${baseUrl}get-user/${user_id}`,

        
      );
      setUsers(response.data)
      console.log("user details",response)
    } catch (error) {
      console.error("Error fetching professional details:", error);
    }
  };
  const FetchAvailability = async () => {
    try {
      console.log(`${baseUrl}available_slots/${id}`)
      const response = await axios.get(
        `${baseUrl}available_slots/${id}`,

        
      );
      setAvailability(response.data)
      console.log("slott details",response)
    } catch (error) {
      console.error("Error fetching professional details:", error);
    }
  };

  const handleDateChange = (date) => {
    if (date === null) {
      setSelectedDate(null);
      setAvailableTimeSlots([]); 
    } else {
  
       setSelectedDate(date); // Update selected date
  
  
        // Filter available time slots for the selected date
        const dateStr = date.format('YYYY-MM-DD');
        const timeSlots = availability
          .filter((item) => item.date === dateStr && item.is_available) 
          .map((item) => ({
            id:item.id,
            start_time:item.start_time,
            end_time:item.end_time,
          }));
        setAvailableTimeSlots(timeSlots);
  
    } 
    
  };

  const disabledDate = (current) => {
    if (!current || current.isBefore(moment().startOf('day'))) {
      return true; // Disable dates in the past or before today
    }
  
    const dateStr = current.format('YYYY-MM-DD');
    const isAvailable = availability.some((item) => item.date === dateStr && item.is_available);
    return !isAvailable; // Return true to disable if it's not available
  };
  const handleSlotSelection = (slotId) => {
    console.log("Selected Slot ID:", slotId);
    setSelectedSlotId(slotId);
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    console.log('Button clicked!');
    navigate('/addlocation',{ state: { users, doctor,selectedDate,selectedTimeSlot,selectedSlotId } })
    console.log(doctor.name,"name")
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 mt-10 ml-4">
        {/* First Card - Professional Details */}
        <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md">
          <div className="bg-sky-600 text-white text-center text-xl p-4 rounded-t-lg">
            Appointment With {doctor.name}
          </div>
          <div className="p-6">
            <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
              <img
                src={`${doctor.image}`}
                alt="Profile Picture"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-bold text-xl text-center mb-2">{doctor.name}</p>
            <p className="text-lg mb-2">Specialization: {doctor.specialization? doctor.specialization.specialization: 'N/A'}</p>
            <p className="mb-2">Phone: {doctor.phone}</p>
            <p className="mb-2">Email: {doctor.email}</p>
            <p className="mb-2">Fee Amount: {doctor.additional_details ? doctor.additional_details.fee : 'N/A'}</p>
          </div>
        </div>
        {/* Second Card - Additional Details (Placeholder) */}
        <div className="w-full md:w-3/4 bg-white rounded-lg shadow-lg ml-4 mr-4">
          <div className="p-6">
            {/* First Separate Heading Card */}
            <div className="bg-sky-600 text-white text-center text-xl p-3 rounded-t-2xl">
              Review Your Details
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="font-bold">Name:</p>
                  <p>{users.name}</p>
                  <p className="font-bold">Phone Number:</p>
                  <p>{users.phone}</p>
                </div>
                <div>
                  <p className="font-bold">Email:</p>
                  <p>{users.email}</p>
                  {/* <p className="font-bold">Address:</p> */}
                  {/* <p>{users.address}</p> */}
                </div>
              </div>
            </div>
          </div>
        
        {/* Second Separate Heading Card */}
        <div className="bg-sky-600 text-white text-center  text-xl mt-4 p-3 rounded-t-2xl mt-4">
          Book Your Appointment
          </div>
          {/* Date Picker */}
          <div className="p-6">
            <div className="flex">
              <div className="mr-4">
                <label className="block font-bold mb-2">Select Date :</label>
                <DatePicker
                  disabledDate={disabledDate}
                  selected={selectedDate}
                  onChange={handleDateChange}
                  minDate={moment().toDate()}
                  maxDate={moment().add(1, 'year').toDate()}
                />
              </div>
            <div className="flex flex-col ml-20">

            {selectedDate && (
              <div>
                {availableTimeSlots.length > 0 ? (
                  <div>
                  <h2 className="font-bold mb-2">Available Time Slots:</h2>
                
                {availableTimeSlots.map((slot, index) => (
                  <label key={index} className="mb-2 ml-4 ">
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot.id}
                      onChange={() => {
                        handleSlotSelection(slot.id);
                        setSelectedTimeSlot(`${slot.start_time} - ${slot.end_time}`);
                      }}
                    />
                    {`${slot.start_time} - ${slot.end_time}`}
                  </label>
                ))}

                  </div>
                ) : (
                  <p>No available time slots for the selected date.</p>
                )}
              </div>
            )}
          </div>
                  
      </div>         
    </div>
      <div className="p-6 flex justify-end">
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md mr-4 "   
        onClick={handleSubmit}
        >Add Address</button>
        {/* <Map  /> */}
      </div>            
    
    </div>
    
      </div>
    </div>
  );
  

}


export default SlotBooking