"use client"
import Image from "next/image";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();
  // Countdown timer values
  const days = 9;
  const hours = 6;
  const minutes = 5;
  const seconds = 45;

  // Founding members state
  const [foundingMembers, setFoundingMembers] = useState<any[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoadingMembers(true);
      const { data, error } = await supabase
        .from("user_profile")
        .select("id, first_name, last_name, country, title, profile_image, linkedin")
        .eq("status", "approved");

      console.log("data",data);
      if (!error && data) {
        setFoundingMembers(data);
      }
      setLoadingMembers(false);
      console.log("error",error);
    };
    fetchMembers();
  
  }, []);

  return (
    <>
      <main className="flex flex-col min-h-screen">
        <Header activePage="home" />

        {/* Early bird ticket banner */}
        <div className="flex justify-center items-center bg-[#4eb1ba] text-white p-4">
          <div className="flex flex-col items-center bg-[#4e2a5a] p-4 rounded mr-4">
            <div className="text-sm">DON&apos;T</div>
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

        {/* Stunning Mission Section */}
        <section className="relative flex flex-col items-center justify-center py-20 overflow-hidden bg-gradient-to-br from-[#4eb1ba]/30 via-[#fff] to-[#4e2a5a]/10">
          {/* Decorative Blobs */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#4eb1ba]/30 rounded-full blur-3xl z-0 animate-pulse"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#4e2a5a]/20 rounded-full blur-3xl z-0 animate-pulse"></div>

          <div className="relative flex flex-col items-center w-full max-w-3xl px-4 z-10">
            {/* Animated Headline */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-[#4e2a5a] via-[#4eb1ba] to-[#4e2a5a] bg-clip-text text-transparent drop-shadow-lg animate-pulse">
                REACH <span className="underline decoration-[#4eb1ba] decoration-8 underline-offset-8">5 000 000</span> WOMEN IN TECHNOLOGY
              </span>
            </h2>

            <div className="flex flex-col md:flex-row items-center bg-white/60 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-full border border-[#4eb1ba]/20">
              {/* Image with colored ring and shadow */}
              <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-10 flex justify-center">
                <div className="relative">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#4eb1ba] to-[#4e2a5a] blur-sm opacity-60"></span>
                  <Image
                    src="/picofme.png"
                    alt="Anna Radulovski"
                    width={150}
                    height={150}
                    className="relative rounded-full border-4 border-white shadow-2xl z-10"
                  />
                </div>
              </div>
              {/* Glassmorphism Quote Card */}
              <div className="flex-1 text-center md:text-left">
                <p className="italic text-xl text-gray-800 mb-6 font-medium">
                  “Join us on a mission to inspire <span className="text-[#4eb1ba] font-bold">5 000 000</span> women, minorities and their allies in science and engineering by 2025.”
                </p>
                <p className="text-base font-semibold">
                  <span className="inline-block bg-gradient-to-r from-[#4eb1ba] to-[#4e2a5a] text-white px-3 py-1 rounded-full animate-bounce">
                    Anna Radulovski
                  </span>
                  <span className="text-[#4e2a5a] ml-2">, CEO & Founder at Coding Girls & WomenTech Network</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join the Network Section */}
        <section
          className="relative flex flex-col items-center justify-center py-24 px-4"
          style={{
            background: "url('/network-bg.jpg'), linear-gradient(120deg, #4e2a5a 60%, #4eb1ba 100%)",
            
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#1a1333]/80 backdrop-blur-sm z-0"></div>

          <div className="relative z-10 flex flex-col items-center max-w-4xl w-full text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 drop-shadow-lg">
              JOIN THE WOMEN IN TECH GLOBAL NETWORK
            </h2>
            <p className="text-lg md:text-xl text-white font-medium mb-6 leading-relaxed">
              Join us at our unique events created to empower women across the technology sector, catering to those working in positions such as software engineers, product managers, user experience designers, digital marketing experts, data analysts, cybersecurity specialists, IT project managers, technical writers, quality assurance engineers, network administrators, cloud architects, machine learning researchers, DevOps engineers, IT support specialists and more.
            </p>
            <p className="text-lg md:text-xl text-white font-medium mb-10">
              Our events aim to foster a sense of community, facilitate networking, and promote professional growth among women in the industry.
            </p>
            <button onClick={() => router.push('/login')} className="bg-[#4eb1ba] hover:bg-[#3a8a96] text-white text-lg font-bold px-8 py-3 rounded-lg shadow-lg transition duration-200">
              Join Now
            </button>
          </div>
        </section>

        {/* Founding Members Section */}
        <section className="py-16 bg-[#f7f7f7]">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-[#222]">MEET WOMEN IN TECH FOUNDING MEMBERS</h2>
            {loadingMembers ? (
              <div className="text-center py-10 text-lg text-[#4e2a5a]">Loading members...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {foundingMembers.map((member, idx) => (
                  <div key={member.id || idx} className="bg-white rounded-xl shadow-md flex flex-col items-center pt-8 pb-6 px-4 transition hover:shadow-xl">
                    <div className="w-24 h-24 rounded-full bg-[#5ba7b0] flex items-center justify-center mb-4 overflow-hidden border-4 border-white shadow-lg">
                      <Image src={member.profile_image || "/default-profile.png"} alt={member.first_name + ' ' + member.last_name} width={96} height={96} className="object-cover w-24 h-24 rounded-full" />
                    </div>
                    <div className="text-lg font-bold text-[#222] text-center">{member.first_name} {member.last_name}</div>
                    <div className="text-sm text-gray-600 font-semibold mb-1 text-center">{member.country}</div>
                    <div className="text-sm text-gray-700 mb-4 text-center">{member.title}</div>
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="mt-auto">
                        <svg width="24" height="24" fill="#5ba7b0" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
