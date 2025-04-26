import React from 'react'
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import { HiOutlineDotsVertical } from "react-icons/hi";
import './globals.css';
import { useState } from 'react';

const card = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    
      const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
      };

  return (
    <div className="flex flex-row w-full mt-5 relative">
            <div
              className="transition-all duration-500 ease-in-out flex"
              style={{
                width: isCollapsed ? "40px" : "33.333%",
                transform: isCollapsed ? "translateX(-100%)" : "translateX(0)",
                marginLeft: isCollapsed ? "40px" : "",
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
                <div className ="flex flex-row items-center justify-center">
                    <div
                    className="p-3 rounded-4xl hover:shadow-lg transition-shadow duration-300 ease-in-out flex items-center justify-center"
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
          </div>
  )
}

export default card