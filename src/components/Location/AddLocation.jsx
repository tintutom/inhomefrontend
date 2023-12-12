import React, { useState } from 'react';
import Map from './Map';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../utils/Constants';

const AddLocation = ({ propertyDetails }) => {

  const [coordinates,setCoordinates] = useState()
  const [propertyDetailsState, setPropertyDetailsState] = useState({
    ...propertyDetails,
    latitude: null,
    longitude: null,
  });

  const updatePropertyDetails = (updatedDetails) => {
    setPropertyDetailsState((prev) => ({ ...prev, ...updatedDetails }));
  };
  console.log({propertyDetailsState})

  const user_id = Cookies.get('id');
  const location = useLocation();
  const navigate = useNavigate();
  const { users, doctor, selectedDate, selectedTimeSlot, selectedSlotId } = location.state;

  
  const onUserCoordinate = ({ coordinates }) => {
    setCoordinates(coordinates);
    updatePropertyDetails(coordinates); 
  };

  const handleLocationSelect = async (latLng) => {
    updatePropertyDetails({ latitude: latLng.latitude, longitude: latLng.longitude });

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&lat=${latLng.latitude}&lon=${latLng.longitude}`
      );

      const address = response.data[0]?.display_name || '';
      updatePropertyDetails({ address });
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };
  

  const handleSubmit = async () => {
    try {
      const axiosResponse = await axios.post(`${baseUrl}useraddresses/${user_id}/`, {
        user: user_id,
        city: propertyDetailsState.city,
        address: propertyDetailsState.address,
        latitude: propertyDetailsState.latitude,
        longitude: propertyDetailsState.longitude,
      });

      console.log('Address added successfully:', axiosResponse.data);

      navigate('/payment', {
        state: {
          users,
          doctor,
          selectedDate,
          selectedTimeSlot,
          selectedSlotId,
          propertyDetails: {
            address: propertyDetailsState?.address,
            city: propertyDetailsState?.city,
            latitude: propertyDetailsState?.latitude,
            longitude: propertyDetailsState?.longitude,
          },
        },
      });
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div className="flexCenter" style={{ gap: "3rem", marginTop: "3rem", justifyContent: "space-between" }}>
        {/* left side */}
        {/* inputs */}
        <div className="flexColStart" style={{ marginLeft: "20rem" }}>
          <label>City </label>
          <input
            style={{ borderRadius: "10px", border: "1px solid black", marginLeft: "1rem" }}
            type="text"
            value={propertyDetailsState?.city}
            onChange={(e) => updatePropertyDetails({ city: e.target.value })}
          />
          <label style={{ marginLeft: "1rem" }}>Address </label>
          <input
            style={{ borderRadius: "10px", border: "1px solid black", marginLeft: "1rem" }}
            type="text"
            value={propertyDetailsState?.address}
            onChange={(e) => updatePropertyDetails({ address: e.target.value })}
          />

          <button
              style={{ marginLeft: "1rem", borderRadius: "10px", border: "1px solid black",marginLeft: "1rem" }}
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Continue
          </button>
          </div>


          {/* <label style={{ marginLeft: "1rem" }}>Latitude</label>
          <input
            style={{ borderRadius: "10px", border: "1px solid black", marginLeft: "1rem" }}
            type="text"
            value={coordinates?.coordinates?.latitude}
            onChange={(e) => updatePropertyDetails({ latitude: e.target.value })}
          />
          <label style={{ marginLeft: "1rem" }}>Longitude</label>
          <input
            style={{ borderRadius: "10px", border: "1px solid black", marginLeft: "1rem" }}
            type="text"
            value={coordinates?.coordinates?.longitude}
            onChange={(e) => updatePropertyDetails({ longitude: e.target.value })}
          /> */}
          <div style={{ width: '100%', height: '480px' }}>
          <Map
            address={propertyDetailsState.address}
            city={propertyDetailsState.city}
            onSelect={(latLng) => handleLocationSelect(latLng)}
            onUserCoordinate = {onUserCoordinate}

          />
          </div>

          
        
      </div>
    </form>
  );
};

export default AddLocation;
