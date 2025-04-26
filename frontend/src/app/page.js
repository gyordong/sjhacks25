import Image from "next/image";
import { FaArrowLeftLong } from "react-icons/fa6";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start " style={{ backgroundColor: "rgb(218, 227, 229)" }}>

      <nav className="bg-white border-b-1 border-gray-300 w-full h-15 flex items-center justify-left pl-10">
        <h1 className="text-gray-700 text-2xl font-mono font-semibold">OnePeace</h1>
      </nav>

      <div className="flex flex-row w-full justify-left mt-5 gap-5">
        <card className="bg-white shadow-lg rounded-lg p-5 w-1/2 flex flex-col items-center">
          <FaArrowLeftLong className="size-8" style={{ color: "rgb(187, 209, 234)" }}></FaArrowLeftLong>
          <input
            type="text"
            placeholder="Starting location"
            className="border border-gray-300 rounded-lg p-2 w-full mb-4 placeholder-gray-500"
          />
          <input
            type="text"
            placeholder="Ending location"
            className="border border-gray-300 rounded-lg p-2 w-full placeholder-gray-500"
          />
        </card>
      </div>

    </div>
  );
}
