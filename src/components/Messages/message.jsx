
import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import Cookies from 'js-cookie';
import {baseUrl,mediaUrl} from '../../utils/Constants';
import './ChatComponent.css';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [client, setClient] = useState(null);
  console.log("ccccccccccccccccccc",chatMessages)

  const userId = Cookies.get('id');
  console.log(userId)
  useEffect(() => {
    const fetchUpcomingAppointments = async () => {
      try {
        const response = await fetch(`${baseUrl}upcoming-appointments/${userId}/`);
        const data = await response.json();
        console.log("Fetched Upcoming Appointments:", data);
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching upcoming appointments:', error);
      }
    };

    fetchUpcomingAppointments();
  }, [userId]);

  const connectToWebSocket = (appointmentId) => {
    if (!appointmentId) return;

    // const newClient = new W3CWebSocket(`ws://127.0.0.1:8001/ws/chat/${appointmentId}/`);

    const newClient = new W3CWebSocket(`wss://tintutom.online/ws/chat/${appointmentId}/`);
    setClient(newClient);

    newClient.onopen = () => {
      console.log('WebSocket Client Connected');
      console.log(newClient)
      // fetchExistingMessages();
      // fetchExistingMessages(appointmentId);
    };
    // Inside the onmessage event handler in the frontend
    newClient.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log('Received message:', data);

      if (data.type === 'existing_messages') {
        console.log('Existing messages:', data.data);
        // Handle existing messages here...
        setChatMessages(data.data); // Assuming you have a state variable to store chat messages
      } 
    };

    

    // newClient.onmessage = (message) => {
    //   const data = JSON.parse(message.data);
    //   console.log('Received message:', data);
    //   setChatMessages((prevMessages) => [...prevMessages, data.data]);
    // };
   
    // Fetch existing messages when the WebSocket connection is established
    // const fetchExistingMessages = async () => {
    //   try {
    //       const response = await fetch(`${baseUrl}chat/${appointmentId}/`);
    //       const data = await response.json();
    //       console.log("dataaaaaaaaa",data)
    //       const messagesTextArray = data.map(item => ({
    //         message : item.message,
    //         sendername : item.sendername,
    //       }));
    //       setChatMessages(messagesTextArray);
          
    //   } catch (error) {
    //       console.error('Error fetching existing messages:', error);
    //   }
    //   console.log('Chat messages:', chatMessages);
    // };
    // fetchExistingMessages();

    //   return () => {
    //     newClient.close();
    //   };
// <<<<<<< HEAD
  //   } catch (error) {
  //     console.error('Error fetching or connecting:', error);
  //   }
  // };

  // const handleAppointmentClick = (appointment) => {
  //   setSelectedAppointment(appointment);
  //   setChatMessages([]);
  //   connectToWebSocket(appointment.id);
  // };

  // const sendMessage = () => {
  //   if (message.trim() === '' || !client || !selectedAppointment) return;

  //   const sendername = "John Doe";

  //   client.send(JSON.stringify({ message, sendername }));
  //   console.log({ message });
  //   setMessage('');
  // };
// =======
    };

 

    const sendMessage = () => {
      if (message.trim() === '' || !client || !selectedAppointment) return;
  
      // const sendername = "John Doe";
      const sendername = localStorage.getItem('user_username');

  
      client.send(JSON.stringify({ message, sendername }));
      // console.log({message})
      setMessage('');
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { message, sendername },
      ]);
    };

    const handleAppointmentClick = (appointment) => {
      setSelectedAppointment(appointment);
      setChatMessages([]);
      connectToWebSocket(appointment.id);
    };
    // const isCurrentUser = selectedAppointment && selectedAppointment.user.id === userId;
  

    
// >>>>>>> 3d271e17940e2f36b1c6a0350ff3aeca561f4970

  

  return (
    <div>
    <main className="content" style={{ marginTop: "15px" , marginBottom: "0"}}>
      <div className="container p-0"></div>
      <div className="card">
                <div className="row g-0">
                  {/* <div className="col-12 col-lg-5 col-xl-3 border-right">
                      <div className="px-4 ">
                          <div className="d-flfex align-itemfs-center">
                            <div className="flex-grow-1 d-flex align-items-center mt-2">
                              <input
                                type="text"
                                className="form-control my-3"
                                placeholder="Search..."
                                onChange=''
                                name='username'
        
                              />
                              <button className='ml-2' onClick=''style={{border:"none", borderRadius:"50%"}}><i className='fas fa-search'></i></button>
                            </div>
                          </div>
                      </div>
                    </div> */}
                    
      <div className="chat-container">
        <div className="appointments-list">
          <h2>Connect With Doctors</h2>
          <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id} onClick={() => handleAppointmentClick(appointment)}>
                <div className="doctor-list-item d-flex align-items-start">
                  <img src={`${appointment.doctor.image}`} alt="Doctor" className="rounded-circle mr-1" width={40} height={40} />
                  <div className="flex-grow-1 ml-3">
                    <div className="small">
                      <small>{appointment.doctor.name}</small>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="chat-window">
          {selectedAppointment && (
            <div>
              <div className="selected-doctor-info d-flex align-items-center">
                <img
                  src={`${selectedAppointment.doctor.image}`}
                  alt={selectedAppointment.doctor.name}
                  className="rounded-circle mr-1"
                  width={40}
                  height={40}
                />
                <div className="flex-grow-1">
                  <strong>{selectedAppointment.doctor.name}</strong>
                
                </div>
              </div>
              <div className="chat-messages mt-4">
                {chatMessages.map((msg, index) => (
                  <div key={index} className="message">
                        <strong>{msg.sendername}:</strong> {msg.message}
                  </div>
                ))}
              </div>
              <div className="message-input">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
      </div>
    </main>
    </div>
  );
};

export default ChatComponent;
