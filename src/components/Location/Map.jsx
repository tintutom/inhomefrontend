import React from 'react'
import {MapContainer,TileLayer} from 'react-leaflet';
import GeoCoderMarker from '../Location/GeoCoderMarker';
import { useState } from 'react';

const Map = ({address,city,onUserCoordinate}) => {

  // const onUserCoordinate= ({coordinates})=>{
  //   setCoordinates({coordinates})
  //   console.log("we are in map componet",{coordinates})
    
  // }
  return (
  <MapContainer
  center={[53.35,18.8]}
  zoom={1}
  scrollWheelZoom={false}
  style={{
    height:"60vh",
    width:"60%",
    marginTop:"20px",
    marginLeft:"20rem",
    zIndex:0,
    
  }}
  >
  <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
  <GeoCoderMarker address={`${address} ${city}`}  onUserCoordinate = {onUserCoordinate}/>
  </MapContainer>
  )
}

export default Map
