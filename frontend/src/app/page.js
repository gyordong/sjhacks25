"use client"; // this makes it a Client Component

import dynamic from "next/dynamic";
import Image from "next/image";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import './globals.css';
import Script from 'next/script';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";


// source code:
// https://github.com/Leaflet/Leaflet.heat

export default function Home() {

    /* javascript for collapsing card*/
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

  /* THIS PART IS STRAIGHT FROM COPILOT */
  useEffect(() => {
    // Initialize the map
    const map = L.map("map", {
      zoomControl: false, // remove the default zoom in/ zoom out buttons
    }).setView([37.3352, -121.8811], 16);

    // Add zoom control in a custom position (from copilot)
    L.control.zoom({
      position: "topright", // Options: 'topleft', 'topright', 'bottomleft', 'bottomright'
    }).addTo(map);

    // Add MapTiler Streets v2 tile layer
    L.tileLayer('https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=19f3H5XGe8Eqr6lEje2H', {
      attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> contributors'
    }).addTo(map);

    // Define the custom taxi icon (PLACE HOLDER!!!!!)
    var mikuMarker = L.icon({
      iconUrl: '/images/mikuMarker.PNG', // Path to your taxi icon image
      iconSize: [70, 70], // Size of the icon
    });

    // global variable to store routing control (maybe to fix errors)
    let routingControl = null;

    // tutorial for routing
    // https://www.youtube.com/watch?v=6mAdRdwZihc&ab_channel=GeoDev

    // marker
    //const marker = L.marker([37.33083, -121.88499]).addTo(map);

    var tofuMarker = L.marker([37.33083, -121.88499], { icon: mikuMarker }).addTo(map).bindPopup("Tofu's Trading");
    var sjsuMarker = L.marker([37.3352, -121.8811], { icon: mikuMarker }).addTo(map).bindPopup("San Jose State University");

    // Define a global marker for animation
    var marker = L.marker([37.33083, -121.88499], { icon: mikuMarker }).addTo(map);

    /* STRAIGHT FROM TUTORIAL!!!!!!!!!!! */
    map.on('click', function (e) {
      console.log(e)
      
      //var newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

      // Get coordinates from tofuMarker and sjsuMarker
      var tofuCoords = tofuMarker.getLatLng(); // {lat: 37.33083, lng: -121.88499}
      var sjsuCoords = sjsuMarker.getLatLng(); // {lat: 37.3352, lng: -121.8811}

      // Add a marker for animating along the route
      //var marker = L.marker([tofuCoords.lat, tofuCoords.lng]).addTo(map);

      routingControl = L.Routing.control({
        waypoints: [
          L.latLng(tofuCoords.lat, tofuCoords.lng), // Tofu's Trading
          L.latLng(sjsuCoords.lat, sjsuCoords.lng)   // SJSU
        ]
      }).on('routesfound', function (e) {
        var routes = e.routes;
        console.log(routes);

        e.routes[0].coordinates.forEach(function (coord, index) {
          setTimeout(function () {
            marker.setLatLng([coord.lat, coord.lng]);
          }, 100 * index)
        })

      }).addTo(map);
    });

    // Set bounds so that only San Jose is visible
    const bounds = [
      [37.2, -122.0], // Southwest corner
      [37.4, -121.8], // Northeast corner
    ];
    map.setMaxBounds(bounds);

    // Prevent zooming out too far
    map.setMinZoom(13);

    // Example: Add a marker
    L.marker([37.3352, -121.8811]).addTo(map).bindPopup("Buzzballz in stock").openPopup();
}, []); // Empty dependency array ensures this runs only once

  // <div id="map" style={{ height: "500px", width: "50%"}}></div>
  return (
    <div className="flex min-h-screen flex-col items-center justify-start" 
        style={{ 
          backgroundColor: "rgb(218, 227, 229)",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 2000, 
        }}
    >        
      <nav className="bg-white border-b-1 border-gray-300 w-full h-15 flex items-center justify-left pl-10">
        <h1 className="text-gray-700 text-2xl font-mono font-semibold">OnePeace</h1>
      </nav>

      <div id="map" style={{ 
                      height: "calc(100vh - 60px)", 
                      width: "100%",
                      position: "absolute",
                      top: "60px",
                      zIndex: 0,
                    }}
      ></div>

{/* Sidebar (card) */}
<div className="fixed top-[140px] left-0 z-10">
        <div
          className={"transition-all duration-500 ease-in-out bg-white shadow-lg rounded-r-3xl p-5 flex flex-col items-center"}
          style={{
            width: isCollapsed ? "60px" : "450px",
            height: isCollapsed ? "55px" : "auto",
            transform: isCollapsed ? "translateX(-100%) translateX(60px)" : "translateX(0)",
            boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.2)",
            overflow: "visible",
          }}
        >
          {/* Collapse Button */}
          <div
            className="p-1 rounded-4xl hover-shadow cursor-pointer transition-all duration-500 ease-in-out absolute top-2 right-2"
            style={{
              backgroundColor: "rgb(80, 125, 188)",
              zIndex: 20,
              translate: isCollapsed ? "0px" : "25px",
            }}
            onClick={toggleCollapse}
          >
            {isCollapsed ? (
              <RiArrowRightLine className="text-3xl" style={{ color: "rgb(218, 227, 229)" }} />
            ) : (
              <RiArrowLeftLine className="text-3xl" style={{ color: "rgb(218, 227, 229)" }} />
            )}
          </div>

          {/* Inputs and content */}
          <div
            className={`w-full space-y-1 mt-2 px-4 ${isCollapsed ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
          >
            <input
              type="text"
              placeholder="Enter Starting Location"
              className="placeholder:text-placeholder text-black w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <HiOutlineDotsVertical className="size-5 mx-auto ml-0" style={{ color: "rgb(80, 125, 188)" }} />
            <input
              type="text"
              placeholder="Enter your Destination"
              className="placeholder:text-placeholder text-black w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Footer buttons */}
          <div
            className={`flex flex-row items-center justify-center mt-5 space-x-3 ${isCollapsed ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-1 rounded-4xl hover-shadow transition-shadow duration-300 ease-in-out flex items-center justify-center"
                style={{ backgroundColor: "rgb(80, 125, 188)" }}
              >
                <RiArrowLeftLine className="text-3xl" style={{ color: "rgb(218, 227, 229)" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}