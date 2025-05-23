import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#271530] text-white pt-12 pb-6 px-4 border-t border-[#4eb1ba]/30 shadow-inner mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-10">
        {/* Logo & Mission */}
        <div className="flex-1 mb-8 md:mb-0 flex flex-col items-center md:items-start">
          <div className="flex items-center mb-3">
            <Image src="/logo.svg" alt="Women in Tech Logo" width={40} height={40} className="mr-2" />
            <span className="font-extrabold text-2xl tracking-tight text-[#4eb1ba]">Women in Tech</span>
          </div>
          <p className="text-sm text-[#b2e0e6] max-w-xs text-center md:text-left">
            Empowering women and allies in technology through community, events, and professional growth worldwide.
          </p>
        </div>
        {/* Navigation */}
        <div className="flex-1 mb-8 md:mb-0 flex flex-col items-center">
          <span className="font-semibold text-lg mb-3 text-[#4eb1ba]">Quick Links</span>
          <nav className="flex flex-col space-y-2 text-base">
            <Link href="/" className="hover:text-[#4eb1ba] transition">Home</Link>
            <Link href="/about" className="hover:text-[#4eb1ba] transition">About</Link>
            <Link href="/events" className="hover:text-[#4eb1ba] transition">Events</Link>
            <Link href="/contact" className="hover:text-[#4eb1ba] transition">Contact</Link>
          </nav>
        </div>
        {/* Social & Newsletter */}
        <div className="flex-1 flex flex-col items-center md:items-end">
          <span className="font-semibold text-lg mb-3 text-[#4eb1ba]">Connect</span>
          <div className="flex space-x-4 mb-4">
            <a href="#" aria-label="Twitter" className="hover:scale-110 transition-transform">
              <svg width="28" height="28" fill="currentColor" className="text-[#b2e0e6] hover:text-[#4eb1ba]" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.762.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:scale-110 transition-transform">
              <svg width="28" height="28" fill="currentColor" className="text-[#b2e0e6] hover:text-[#4eb1ba]" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
            </a>
            <a href="#" aria-label="Facebook" className="hover:scale-110 transition-transform">
              <svg width="28" height="28" fill="currentColor" className="text-[#b2e0e6] hover:text-[#4eb1ba]" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.326v-21.349c0-.733-.593-1.325-1.326-1.325z"/></svg>
            </a>
          </div>
          <form className="w-full max-w-xs">
            <label htmlFor="newsletter" className="block text-sm mb-2 text-[#b2e0e6]">Subscribe to our newsletter</label>
            <div className="flex">
              <input
                type="email"
                id="newsletter"
                placeholder="Your email address"
                className="rounded-l px-3 py-2 w-full text-black focus:outline-none"
              />
              <button type="submit" className="bg-[#4eb1ba] hover:bg-[#3a8a96] text-white px-4 py-2 rounded-r font-semibold transition">Subscribe</button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-10 text-center text-xs text-[#b2e0e6]">
        &copy; {new Date().getFullYear()} Women in Tech Network. All rights reserved.
      </div>
    </footer>
  );
} 