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

  // Testimonials carousel state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      initial: "S",
      quote: "This community has been instrumental in my career growth. The networking opportunities and mentorship programs are exceptional."
    },
    {
      name: "Maria Rodriguez",
      role: "Product Manager at Microsoft",
      initial: "M",
      quote: "The global conference was life-changing. I made connections that led to my dream job and lifelong friendships."
    },
    {
      name: "Aisha Patel",
      role: "Data Scientist at Amazon",
      initial: "A",
      quote: "Being part of this network gave me the confidence to pursue leadership roles. The support system is incredible."
    },
    {
      name: "Lisa Chen",
      role: "UX Designer at Apple",
      initial: "L",
      quote: "The mentorship I received through this network helped me transition into a senior role. Forever grateful for this community."
    }
  ];

  // Events carousel state
  const [currentEvent, setCurrentEvent] = useState(0);
  const upcomingEvents = [
    {
      title: "Breaking Barriers: Building Global Tech Careers",
      speaker: "Anum Butt",
      date: "Augest 9, 2025",
      time: "10:00 AM PST",
      image: "/event1.jpg"
    },
    {
      title: "Future of AI: Shaping the Industry",
      speaker: "Anum Butt",
      date: "Augest 16, 2025", 
      time: "2:00 PM PST",
      image: "/event2.jpg"
    },
    { 
      title: "LeaderShip Journey: Navigating the Tech Industry",
      speaker: "Anum Butt",
      date: "Augest 23, 2025",
      time: "11:00 AM PST", 
      image: "/event3.jpg"
    },
    {
      title: "Product Management Masterclass",
      speaker: "Anum Butt",
      date: "Augest 30, 2025",
      time: "1:00 PM PST",
      image: "/event4.jpg"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextEvent = () => {
    const maxSlides = Math.ceil(upcomingEvents.length / 3) - 1;
    setCurrentEvent((prev) => (prev + 1) > maxSlides ? 0 : prev + 1);
  };

  const prevEvent = () => {
    const maxSlides = Math.ceil(upcomingEvents.length / 3) - 1;
    setCurrentEvent((prev) => (prev - 1) < 0 ? maxSlides : prev - 1);
  };

  // Auto-scroll testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll events
  useEffect(() => {
    const interval = setInterval(() => {
      const maxSlides = Math.ceil(upcomingEvents.length / 3) - 1;
      setCurrentEvent((prev) => (prev + 1) > maxSlides ? 0 : prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [upcomingEvents.length]);

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
        <div className="flex justify-center items-center bg-[#6b3d6b] text-white p-4">
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
              <div className="bg-[#4e2a5a] text-white p-2 rounded text-center w-12">
                <div className="text-xl">{days}</div>
                <div className="text-xs">Days</div>
              </div>
              <div className="bg-[#4e2a5a] text-white p-2 rounded text-center w-12">
                <div className="text-xl">{hours}</div>
                <div className="text-xs">Hours</div>
              </div>
              <div className="bg-[#4e2a5a] text-white p-2 rounded text-center w-12">
                <div className="text-xl">{minutes}</div>
                <div className="text-xs">Minutes</div>
              </div>
              <div className="bg-[#4e2a5a] text-white p-2 rounded text-center w-12">
                <div className="text-xl">{seconds}</div>
                <div className="text-xs">Seconds</div>
              </div>
            </div>

            <button className="bg-[#4e2a5a] text-white px-4 py-2 rounded mr-2 hover:bg-[#3a1d42] transition">Buy Now</button>
            <button className="bg-white text-[#4e2a5a] px-2 py-2 rounded">✕</button>
          </div>
        </div>

        {/* Hero section */}
        <div className="flex flex-col items-center justify-center text-center py-16 bg-[#241037] text-white min-h-[500px] relative overflow-hidden">
          {/* Background pattern */}
          {/* <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(45deg, #4eb1ba 25%, transparent 25%), linear-gradient(-45deg, #4eb1ba 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #4eb1ba 75%), linear-gradient(-45deg, transparent 75%, #4eb1ba 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}></div> */}

          <div className="bg-[#4e2a5a]/80 p-4 rounded mb-8 z-10">
            <h2 className="text-xl mb-1">Women in Tech</h2>
            <div className="text-sm bg-[#6b3d6b] inline-block px-2 py-1 rounded">GLOBAL CONFERENCE 2025</div>
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

          <button className="bg-[#6b3d6b] text-white px-6 py-3 rounded z-10 hover:bg-[#5a2f5a] transition">
            Conference Overview
          </button>
        </div>

        {/* Stunning Mission Section */}
        <section className="relative flex flex-col items-center justify-center py-20 overflow-hidden bg-gradient-to-br from-[#6b3d6b]/30 via-[#fff] to-[#4e2a5a]/10">
          {/* Decorative Blobs */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#6b3d6b]/30 rounded-full blur-3xl z-0 animate-pulse"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#4e2a5a]/20 rounded-full blur-3xl z-0 animate-pulse"></div>

          <div className="relative flex flex-col items-center w-full max-w-3xl px-4 z-10">
            {/* Animated Headline */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-[#4e2a5a] via-[#6b3d6b] to-[#4e2a5a] bg-clip-text text-transparent drop-shadow-lg animate-pulse">
                REACH <span className="underline decoration-[#6b3d6b] decoration-8 underline-offset-8">5 000 000</span> WOMEN IN TECHNOLOGY
              </span>
            </h2>

            <div className="flex flex-col md:flex-row items-center bg-white/60 backdrop-blur-lg shadow-2xl rounded-2xl p-10 w-full border border-[#6b3d6b]/20">
              {/* Image with colored ring and shadow */}
              <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-10 flex justify-center">
                <div className="relative">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#6b3d6b] to-[#4e2a5a] blur-sm opacity-60"></span>
                  <Image
                    src="/images/anumButt.jpg"
                    alt="Anum Butt Tariq"
                    width={150}
                    height={150}
                    className="relative rounded-full border-4 border-white shadow-2xl z-10"
                  />
                </div>
              </div>
              {/* Glassmorphism Quote Card */}
              <div className="flex-1 text-center md:text-left">
                <p className="italic text-xl text-gray-800 mb-6 font-medium">
                  "TechSHEroes is on a bold mission to empower <span className="text-[#6b3d6b] font-bold">15 million</span> women, non-binary talent, and allies worldwide, unlocking pathways in tech leadership, innovation, and impact by 2030."
                </p>
                <p className="text-base font-semibold">
                  <span className="inline-block bg-gradient-to-r from-[#6b3d6b] to-[#4e2a5a] text-white px-3 py-1 rounded-full animate-bounce">
                    Anum Butt Tariq
                  </span>
                  <span className="text-[#4e2a5a] ml-2">– Anum Tariq Butt, Founder & Visionary, TechSHEroes</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Join the Network Section */}
        <section
          className="relative flex flex-col items-center justify-center py-24 px-4"
          style={{
            background: "url('/network-bg.jpg'), linear-gradient(120deg, #4e2a5a 60%, #6b3d6b 100%)",
            
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
            <button onClick={() => router.push('/login')} className="bg-[#6b3d6b] hover:bg-[#5a2f5a] text-white text-lg font-bold px-8 py-3 rounded-lg shadow-lg transition duration-200">
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
                    <div className="w-24 h-24 rounded-full bg-[#6b3d6b] flex items-center justify-center mb-4 overflow-hidden border-4 border-white shadow-lg">
                      <Image src={member.profile_image || "/default-profile.png"} alt={member.first_name + ' ' + member.last_name} width={96} height={96} className="object-cover w-24 h-24 rounded-full" />
                    </div>
                    <div className="text-lg font-bold text-[#222] text-center">{member.first_name} {member.last_name}</div>
                    <div className="text-sm text-gray-600 font-semibold mb-1 text-center">{member.country}</div>
                    <div className="text-sm text-gray-700 mb-4 text-center">{member.title}</div>
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="mt-auto">
                        <svg width="24" height="24" fill="#6b3d6b" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-[#4e2a5a]/10 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#4e2a5a]/10 rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6b3d6b]/10 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-[#4e2a5a]">Upcoming Events</h2>
            <div className="relative">
              {/* Navigation arrows */}
              <button 
                onClick={prevEvent}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#4e2a5a] text-white p-2 rounded-full hover:bg-[#3a1d42] transition shadow-lg"
              >
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>
              <button 
                onClick={nextEvent}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#4e2a5a] text-white p-2 rounded-full hover:bg-[#3a1d42] transition shadow-lg"
              >
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                </svg>
              </button>
              
              {/* Events carousel */}
              <div className="overflow-hidden px-12">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentEvent * (100/3)}%)` }}
                >
                  {upcomingEvents.map((event, idx) => (
                    <div key={idx} className="flex-shrink-0 w-1/3 px-3">
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-[#4e2a5a]/20 hover:shadow-2xl transition-all duration-300">
                        <div className="h-40 bg-gradient-to-br from-[#4e2a5a]/20 to-[#6b3d6b]/20 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#4e2a5a]/30 to-[#6b3d6b]/30"></div>
                          <span className="text-[#4e2a5a] font-semibold text-sm relative z-10">Event Image</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#4e2a5a] mb-2">{event.title}</h3>
                        <p className="text-gray-700 mb-2 font-medium">{event.speaker}</p>
                        <p className="text-gray-600 mb-4">{event.date} • {event.time}</p>
                        <button className="bg-gradient-to-r from-[#4e2a5a] to-[#6b3d6b] text-white px-4 py-2 rounded-lg hover:from-[#3a1d42] hover:to-[#5a2f5a] transition-all duration-300 w-full font-semibold shadow-md">
                          Register
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Pagination dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: Math.ceil(upcomingEvents.length / 3) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentEvent(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentEvent ? 'bg-[#4e2a5a] shadow-md' : 'bg-gray-300 hover:bg-[#4e2a5a]/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Join Us & Testimonials Section */}
        <section className="py-16 bg-gradient-to-r from-[#4e2a5a] to-[#6b3d6b]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Why Join Us */}
              <div className="text-white">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Why Join Us?</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#6b3d6b] rounded-full flex items-center justify-center mt-1">
                      <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Global Network of Women in Tech</h3>
                      <p className="text-gray-200">Connect with thousands of women professionals worldwide</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#6b3d6b] rounded-full flex items-center justify-center mt-1">
                      <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Mentorship & Growth Opportunities</h3>
                      <p className="text-gray-200">Access mentorship programs and career development resources</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#6b3d6b] rounded-full flex items-center justify-center mt-1">
                      <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Access to Events & Resources</h3>
                      <p className="text-gray-200">Exclusive access to conferences, workshops, and learning materials</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-[#6b3d6b] rounded-full flex items-center justify-center mt-1">
                      <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Celebrate Your Journey & Visibility</h3>
                      <p className="text-gray-200">Showcase your achievements and gain recognition in the community</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials */}
              <div className="text-white">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Testimonials</h2>
                <div className="relative">
                  {/* Navigation arrows */}
                  <button 
                    onClick={prevTestimonial}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition"
                  >
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                  </button>
                  <button 
                    onClick={nextTestimonial}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition"
                  >
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                    </svg>
                  </button>
                  
                  {/* Testimonials carousel */}
                  <div className="overflow-hidden px-12">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                    >
                      {testimonials.map((testimonial, index) => (
                        <div key={index} className="flex-shrink-0 w-full">
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mx-auto max-w-md">
                            <div className="flex items-center mb-4">
                              <div className="w-12 h-12 bg-[#6b3d6b] rounded-full flex items-center justify-center mr-4">
                                <span className="text-white font-bold text-lg">{testimonial.initial}</span>
                              </div>
                              <div>
                                <h4 className="font-semibold">{testimonial.name}</h4>
                                <p className="text-sm text-gray-300">{testimonial.role}</p>
                              </div>
                            </div>
                            <p className="text-gray-200 italic">"{testimonial.quote}"</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Pagination dots */}
                  <div className="flex justify-center mt-6 space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentTestimonial ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stay in Loop Section */}
        <section className="py-16 bg-gradient-to-br from-[#6b3d6b] to-[#4e2a5a]">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Stay in loop with</h2>
            <p className="text-xl text-white mb-8">tech events, leadership tips, and community updates.</p>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800"
                />
                <button className="bg-[#4e2a5a] hover:bg-[#3a1d42] text-white px-6 py-3 rounded-lg font-semibold transition duration-200">
                  Subscribe
                </button>
              </div>
            </div>
            
            <p className="text-white/80 text-sm mt-4">
              Join thousands of women in tech who stay updated with our newsletter
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
