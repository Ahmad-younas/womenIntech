import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  // Countdown timer values
  const days = 9;
  const hours = 6;
  const minutes = 5;
  const seconds = 45;

  return (
    <main className="flex flex-col min-h-screen">
      <Header activePage="home" />
      
      {/* Early bird ticket banner */}
      <div className="flex justify-center items-center bg-[#4eb1ba] text-white p-4">
        <div className="flex flex-col items-center bg-[#4e2a5a] p-4 rounded mr-4">
          <div className="text-sm">DON'T</div>
          <div className="text-sm">MISS!</div>
        </div>
        
        <div className="flex items-center">
          <div className="mr-4">
            <div className="flex items-center">
              <span className="text-yellow-400 text-xl mr-2">🔥</span>
              <span className="text-xl font-bold">Get Your Global Conference</span>
            </div>
            <div className="text-xl font-bold">Regular Bird Ticket! Save up 35%!</div>
          </div>
          
          {/* Countdown timer */}
          <div className="flex space-x-2 mx-4">
            <div className="bg-teal-500 text-white p-2 rounded text-center w-12">
              <div className="text-xl">{days}</div>
              <div className="text-xs">Days</div>
            </div>
            <div className="bg-teal-500 text-white p-2 rounded text-center w-12">
              <div className="text-xl">{hours}</div>
              <div className="text-xs">Hours</div>
            </div>
            <div className="bg-teal-500 text-white p-2 rounded text-center w-12">
              <div className="text-xl">{minutes}</div>
              <div className="text-xs">Minutes</div>
            </div>
            <div className="bg-teal-500 text-white p-2 rounded text-center w-12">
              <div className="text-xl">{seconds}</div>
              <div className="text-xs">Seconds</div>
            </div>
          </div>
          
          <button className="bg-teal-500 text-white px-4 py-2 rounded mr-2">Buy Now</button>
          <button className="bg-white text-[#4e2a5a] px-2 py-2 rounded">✕</button>
        </div>
      </div>
      
      {/* Hero section */}
      <div className="flex flex-col items-center justify-center text-center py-16 bg-gradient-to-br from-[#4e2a5a] to-[#271530] text-white min-h-[500px] relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'linear-gradient(45deg, #4eb1ba 25%, transparent 25%), linear-gradient(-45deg, #4eb1ba 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #4eb1ba 75%), linear-gradient(-45deg, transparent 75%, #4eb1ba 75%)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }}></div>
        
        <div className="bg-[#4e2a5a]/80 p-4 rounded mb-8 z-10">
          <h2 className="text-xl mb-1">Women in Tech</h2>
          <div className="text-sm bg-[#4eb1ba] inline-block px-2 py-1 rounded">GLOBAL CONFERENCE 2025</div>
        </div>
        
        <h1 className="text-5xl font-bold mb-4 z-10">
          WOMEN IN TECH<br />
          <span className="text-4xl">GLOBAL CONFERENCE<sup>®</sup> 2025</span>
        </h1>
        
        <div className="text-2xl font-light mb-4 z-10">
          MAY 20-22
        </div>
        
        <p className="text-xl mb-8 z-10">
          Unite 100,000 Women in Tech to Foster Innovation with Purpose and Impact
        </p>
        
        <div className="flex space-x-6 mb-10 z-10">
          <Image src="/chief-in-tech.svg" alt="Chief in Tech Summit" width={150} height={60} className="h-12 w-auto" />
          <Image src="/key-tech.svg" alt="Key Tech Summit" width={150} height={60} className="h-12 w-auto" />
          <Image src="/career-growth.svg" alt="Career Growth Summit" width={150} height={60} className="h-12 w-auto" />
          <Image src="/global-esg.svg" alt="Global ESG Impact Summit" width={150} height={60} className="h-12 w-auto" />
        </div>
        
        <button className="bg-[#4eb1ba] text-white px-6 py-3 rounded z-10">
          Conference Overview
        </button>
      </div>
    </main>
  );
}
