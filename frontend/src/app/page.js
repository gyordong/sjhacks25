"use client"; // this makes it a Client Component

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

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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

      <div className="flex flex-row w-full mt-5 relative">
        <div 
          className="transition-all duration-500 ease-in-out flex"
          style={{ 
            width: isCollapsed ? '40px' : '33.333%',
            transform: isCollapsed ? 'translateX(-100%)' : 'translateX(0)',
            marginLeft: isCollapsed ? '40px' : '',
            position: "absolute",
            top: 0,
            zIndex: 1000, // Ensure the sidebar is above the map
            height: "100vh", // Full height of the viewport
          }}
        >
          <div
              className={`relative bg-white border-b-1 border-gray-300 shadow-lg rounded-r-3xl p-5 w-full flex flex-col items-center bg-transparent-50 transition-all duration-500 ease-in-out ${
                isCollapsed ? "" : "min-w-[240px]"
              }`}
              style={{ boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.2)" }}
            >
            <div
              className="p-1 ml-auto rounded-4xl hover-shadow cursor-pointer transition-all duration-500 ease-in-out"
              style={{
                backgroundColor: "rgb(80, 125, 188)",
                transform: isCollapsed ? "translateX(0px)" : "translateX(40px)",
              }}
              onClick={toggleCollapse}
            >
              {isCollapsed ? (
                <RiArrowRightLine
                  className="text-3xl transition-all duration-500"
                  style={{ color: "rgb(218, 227, 229)" }}
                />
              ) : (
                <RiArrowLeftLine
                  className="text-3xl transition-all duration-500"
                  style={{ color: "rgb(218, 227, 229)" }}
                />
              )}
            </div>

            {/* Only show inputs if NOT collapsed */}
            {!isCollapsed && (
              <div className="w-full space-y-2">
                <input
                  type="text"
                  placeholder="Enter Starting Location"
                  className="placeholder:text-placeholder text-black w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <HiOutlineDotsVertical className="size-5" style={{ color: "rgb(80, 125, 188)" }}/>
                <input
                  type="text"
                  placeholder="Enter your Destination"
                  className="placeholder:text-placeholder text-black w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
            <div className="flex flex-row items-center justify-center mt-5">
            <div
              className="p-1 rounded-4xl hover-shadow transition-shadow duration-300 ease-in-out flex items-center justify-center"
              style={{ backgroundColor: "rgb(80, 125, 188)" }}
            >
              <RiArrowLeftLine
                className="text-3xl"
                style={{ color: "rgb(218, 227, 229)" }}
              />
            </div>

            <div
              className="p-1 rounded-4xl hover-shadow transition-shadow duration-300 ease-in-out flex items-center justify-center"
              style={{ backgroundColor: "rgb(80, 125, 188)" }}
            >
              <RiArrowLeftLine
                className="text-3xl"
                style={{ color: "rgb(218, 227, 229)" }}
              />
            </div>

            <div
              className="p-1 rounded-4xl hover-shadow transition-shadow duration-300 ease-in-out flex items-center justify-center"
              style={{ backgroundColor: "rgb(80, 125, 188)" }}
            >
              <RiArrowLeftLine
                className="text-3xl"
                style={{ color: "rgb(218, 227, 229)" }}
              />
            </div>
            </div>
          </div>
        </div>
        
        <div 
          className={`absolute left-0 transition-all duration-500 ease-in-out ${isCollapsed ? 'opacity-100' : 'opacity-0'}`}
        >
          </div>
        </div>
    </div>
  );
}
