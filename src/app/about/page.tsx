"use client"
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <main className="flex flex-col min-h-screen bg-white text-gray-800">
        <Header activePage="about" />

        {/* Hero Section */}
        <div className="relative h-[400px] w-full flex items-center justify-center text-white">
          <Image
            src="https://images.unsplash.com/photo-1749741322727-3c51c6b41903?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Team working together"
            layout="fill"
            objectFit="cover"
            className="absolute z-0"
          />
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              OUR PURPOSE IS TO MAKE AN IMPACT GLOBALLY
            </h1>
            <p className="text-lg md:text-xl">
              To drive gender equity in tech by creating a global platform that provides women with visibility, mentorship, leadership development, and access to meaningful opportunities—at scale.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-16">
          {/* Leading Women in Tech Network */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Leading Women in Tech Network
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We are a global platform built with one powerful purpose: to amplify 15 million women in tech. Technology is transforming the world, and women deserve equal opportunity to lead that transformation. Our community is designed to uplift, connect, and accelerate women across all areas of tech—whether you're an engineer, founder, data scientist, product manager, or just beginning your journey.
            </p>
          </div>

          {/* Who, Where, and What? / Our Vision */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Vision
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                To build the largest and most impactful ecosystem for women in tech, where 15 million voices rise, connect, and lead the future of innovation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our events are focusing on diversity talks, networking, interviews and exploration, while connecting female tech talent like engineers, data scientists, designers, product managers and other tech-roles with opportunities at companies that share the same values and put diversity as their top priority.
              </p>
            </div>
            <div className="text-center">
              <Image
                src="/images/anumButt.jpg"
                alt="Anum Butt"
                width={400}
                height={400}
                className="rounded-lg shadow-lg mx-auto object-cover"
              />
              <h3 className="text-xl font-bold mt-4">Anum Butt</h3>
              <p className="text-gray-600">Partner at Tech Family Ventures, Lead at WTN</p>
            </div>
          </div>
          
          {/* Photo Collage Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="grid grid-cols-3 grid-rows-2 gap-2">
                <div className="col-span-1 row-span-1">
                    <Image src="https://images.unsplash.com/photo-1749741322727-3c51c6b41903?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Diverse woman 1" width={200} height={200} className="rounded-lg object-cover w-full h-full filter grayscale" />
                </div>
                <div className="col-span-1 row-span-1">
                    <Image src="https://images.unsplash.com/photo-1749741322727-3c51c6b41903?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Diverse woman 2" width={200} height={200} className="rounded-lg object-cover w-full h-full filter grayscale" />
                </div>
                <div className="col-span-1 row-span-1">
                    <Image src="https://images.unsplash.com/photo-1749741322727-3c51c6b41903?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Diverse man" width={200} height={200} className="rounded-lg object-cover w-full h-full filter grayscale" />
                </div>
                <div className="col-span-1 row-span-1">
                     <Image src="https://images.unsplash.com/photo-1749741322727-3c51c6b41903?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Diverse woman 3" width={200} height={200} className="rounded-lg object-cover w-full h-full filter grayscale" />
                </div>
                 <div className="col-span-1 row-span-1">
                    <Image src="https://images.unsplash.com/photo-1749741322727-3c51c6b41903?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Diverse woman 4" width={200} height={200} className="rounded-lg object-cover w-full h-full filter grayscale" />
                </div>
                 <div className="col-span-1 row-span-1">
                    <Image src="https://images.unsplash.com/photo-1749741322727-3c51c6b41903?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Diverse man 2" width={200} height={200} className="rounded-lg object-cover w-full h-full filter grayscale" />
                </div>
            </div>
             <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our people are as diverse as our communities
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                With a goal of amplifying 15 million members worldwide, we celebrate diversity in all its forms. We are a mosaic of different cultures, backgrounds, and experiences, united by a common passion for technology and gender equity.
              </p>
            </div>
          </div>


          {/* What We Offer Section */}
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">What We Offer</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-xl mb-2">Community & Networking</h3>
                <p>Join a powerful network of women across countries and industries to connect, share, and grow.</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-xl mb-2">Mentorship & Support</h3>
                <p>Be mentored by industry leaders or give back by supporting the next generation of talent.</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-xl mb-2">Exclusive Events</h3>
                <p>Access speaker sessions, leadership talks, and skill-building workshops.</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-xl mb-2">Career Growth</h3>
                <p>Discover resources, job opportunities, and real pathways to progress in your career.</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-xl mb-2">Visibility & Influence</h3>
                <p>Share your story, speak at events, and become a key voice in the tech community.</p>
              </div>
            </div>
          </div>
          
          {/* Why It Matters */}
          <div className="text-center bg-gray-100 p-12 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why It Matters</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed mb-6">
              While women make up nearly half the global workforce, they are still underrepresented in tech roles—especially in leadership. We're here to change that, not with small steps, but with a movement.
            </p>
            <div className="text-center">
              <p className="text-2xl font-bold mb-2">Together, we amplify.</p>
              <p className="text-2xl font-bold mb-6">Together, we rise.</p>
              <Link href="/register">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                  Join Us
                </button>
              </Link>
            </div>
          </div>

        </div>
        <Footer />
      </main>
    </>
  );
} 