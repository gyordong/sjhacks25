"use client";

import Image from "next/image";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useEffect, useState } from "react";
import Script from 'next/script';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import './globals.css';

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const map = L.map("map", {
      zoomControl: false,
    }).setView([37.3352, -121.8811], 16);
    L.control.zoom({
      position: "topright",
    }).addTo(map);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    var mikuMarker = L.icon({
      iconUrl: '/images/mikuMarker.PNG',
      iconSize: [70, 70],
    });

    var tofuMarker = L.marker([37.33083, -121.88499], { icon: mikuMarker }).addTo(map).bindPopup("Tofu's Trading");
    var sjsuMarker = L.marker([37.3352, -121.8811], { icon: mikuMarker }).addTo(map).bindPopup("San Jose State University");

    var marker = L.marker([37.33083, -121.88499], { icon: mikuMarker }).addTo(map);

    map.on('click', function (e) {
      var tofuCoords = tofuMarker.getLatLng();
      var sjsuCoords = sjsuMarker.getLatLng();

      L.Routing.control({
        waypoints: [
          L.latLng(tofuCoords.lat, tofuCoords.lng),
          L.latLng(sjsuCoords.lat, sjsuCoords.lng)
        ]
      }).on('routesfound', function (e) {
        e.routes[0].coordinates.forEach(function (coord, index) {
          setTimeout(function () {
            marker.setLatLng([coord.lat, coord.lng]);
          }, 100 * index)
        })
      }).addTo(map);
    });

    const bounds = [
      [37.2, -122.0],
      [37.4, -121.8],
    ];
    map.setMaxBounds(bounds);
    map.setMinZoom(13);

    L.marker([37.3352, -121.8811]).addTo(map).bindPopup("Buzzballz in stock").openPopup();
  }, []);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-start"
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

      {/* Map Background */}
      <div id="map" style={{
        height: "calc(100vh - 60px)",
        width: "100%",
        position: "absolute",
        top: "60px",
        zIndex: 0,
      }}></div>

      {/* Sidebar Frontend */}
      <div className="flex flex-row w-full mt-5 relative">
        <div
          className="transition-all duration-500 ease-in-out flex"
          style={{
            width: isCollapsed ? "40px" : "33.333%",
            transform: isCollapsed ? "translateX(-100%)" : "translateX(0)",
            marginLeft: isCollapsed ? "40px" : "",
            position: "absolute",
            top: 0,
            zIndex: 1000,
            height: "100vh",
          }}
        >
          <div
            className={`relative bg-white border-b-1 border-gray-300 shadow-lg rounded-r-3xl p-5 w-full flex flex-col items-center bg-transparent-50 transition-all duration-500 ease-in-out ${
              isCollapsed ? "" : "min-w-[240px]"
            }`}
            style={{ boxShadow: "5px 0px 10px rgba(0, 0, 0, 0.2)" }}
          >
            {/* Collapse Button */}
            <div
              className="p-1 ml-auto rounded-4xl hover-shadow cursor-pointer transition-all duration-500 ease-in-out"
              style={{
                backgroundColor: "rgb(80, 125, 188)",
                transform: isCollapsed ? "translateX(0px)" : "translateX(40px)",
              }}
              onClick={toggleCollapse}
            >
              {isCollapsed ? (
                <RiArrowRightLine className="text-3xl transition-all duration-500" style={{ color: "rgb(218, 227, 229)" }} />
              ) : (
                <RiArrowLeftLine className="text-3xl transition-all duration-500" style={{ color: "rgb(218, 227, 229)" }} />
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
                <HiOutlineDotsVertical className="size-5" style={{ color: "rgb(80, 125, 188)" }} />
                <input
                  type="text"
                  placeholder="Enter your Destination"
                  className="placeholder:text-placeholder text-black w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Extra Buttons Section */}
            <div className="flex flex-row items-center justify-center mt-5 space-x-3">
              <div className="p-1 rounded-4xl hover-shadow transition-shadow duration-300 ease-in-out flex items-center justify-center" style={{ backgroundColor: "rgb(80, 125, 188)" }}>
                <RiArrowLeftLine className="text-3xl" style={{ color: "rgb(218, 227, 229)" }} />
              </div>
              <div className="p-1 rounded-4xl hover-shadow transition-shadow duration-300 ease-in-out flex items-center justify-center" style={{ backgroundColor: "rgb(80, 125, 188)" }}>
                <RiArrowLeftLine className="text-3xl" style={{ color: "rgb(218, 227, 229)" }} />
              </div>
              <div className="p-1 rounded-4xl hover-shadow transition-shadow duration-300 ease-in-out flex items-center justify-center" style={{ backgroundColor: "rgb(80, 125, 188)" }}>
                <RiArrowLeftLine className="text-3xl" style={{ color: "rgb(218, 227, 229)" }} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
