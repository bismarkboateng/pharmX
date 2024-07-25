"use client"

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
  GoogleMap, Marker, DirectionsRenderer,
  Circle, MarkerClusterer,
} from "@react-google-maps/api";
import { FaMapMarkerAlt } from "react-icons/fa";
import Places from "./Places";
import { closeOptions, farOptions, generateMultipleCoordinates, middleOptions } from "@/lib/utils";
import cluster from "cluster";
import { Coordinate } from "recharts/types/util/types";
// import Distance from "./distance";

interface Coordinates {
    lat: number;
    lng: number;
}

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const radii = [5, 10, 15]; // Radii in kilometers
const countPerRadius = 4; // 12 coordinates, 4 for each radius

export default function RenderMap() {
    const [coords, setCoords] = useState({} as Coordinates)
    const mapRef = useRef<GoogleMap>()
    const center = useMemo(() => (coords), [coords])
    const options = useMemo<MapOptions>(() => ({
        mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
        disableDefaultUI: true,
        clickableIcons: false,
    }), [])

    useEffect(() => {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoords({ lat: position.coords.latitude, lng: position.coords.longitude })
          },
          (error) => alert("could not get your location"),
          { enableHighAccuracy: true }
        )
      } else {
        alert("Browser does not support location service")
      }
    }, [])

    const onLoad = useCallback((map: any) => (mapRef.current = map), [])
    const pharmacies = useMemo(() => generateMultipleCoordinates(center, radii, countPerRadius), [center])

    return (
     <div className="flex min-h-screen">
      <div className="w-full min-h-screen">
       <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
       >
        <Marker position={center} icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" />

        <MarkerClusterer>
        {(clusterer) =>
         <>
          {pharmacies.map((pharmacy) => (
           <Marker
            key={`${pharmacy.lat}-${pharmacy.lng}`} // Ensuring a unique key
            position={{ lat: pharmacy.lat, lng: pharmacy.lng }}
            clusterer={clusterer}
           />
         ))}
        </>
        }
        </MarkerClusterer>  
        {/* radius */}
        <Circle center={center} radius={5000} options={closeOptions} />
        <Circle center={center} radius={10000} options={middleOptions} />
        <Circle center={center} radius={15000} options={farOptions} />
        {/* end radius */}
       </GoogleMap>
      </div>
     </div>
    )    
}