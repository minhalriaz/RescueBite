import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroCarousel from './components/HeroCarousel';
import { Pizza, Soup, Carrot, Home, Handshake, Bike, Backpack, Package, User } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import beefImage from './assets/food/beef.jpg';
import bonesImage from './assets/food/bones.jpg';
import breadImage from './assets/food/bread2.jpg';
import riceImage from './assets/food/rice.jpg';
import soupBonesImage from './assets/food/soupbones.jpg';
import tehariImage from './assets/food/tehari.webp';
import biryaniImage from './assets/food/buffet.jpg';

const INITIAL_FOOD_POSTS = [
  {
    id: 1,
    title: "Surplus Foods from Wedding Event",
    donor: "Radisson Blu Dhaka (Buffet Leftovers)",
    quantity: "50 Packets",
    expiry: "Within 4 Hours",
    location: "Dhanmondi, Dhaka",
    status: "Available",
    category: "human",
    image: biryaniImage
  },
  {
    id: 2,
    title: "Fresh Surplus Bread & Pastries",
    donor: "Cooper's Bakery",
    quantity: "20 Parcels",
    expiry: "Within 8 Hours",
    location: "Uttara Sector 11, Dhaka",
    status: "Requested",
    category: "human",
    image: breadImage
  },
  {
    id: 3,
    title: "Prepared Beef Soup Bones & Broth (For Animal Shelter)",
    donor: "Local Restaurant - The Soup Kitchen",
    quantity: "15 Servings",
    expiry: "Within 5 Hours",
    location: "Banani, Dhaka",
    status: "Available",
    category: "animal",
    image: soupBonesImage
  },
  {
    id: 4,
    title: "Family Dinner Excess Tehari",
    donor: "Private Household",
    quantity: "10 Servings",
    expiry: "Within 3 Hours",
    location: "Gulshan, Dhaka",
    status: "Available",
    category: "human",
    image: tehariImage
  },
  {
    id: 5,
    title: "Surplus Rice & Vegetable Leftovers for Shelter Dogs",
    donor: "Local NGO - Paws & Claws",
    quantity: "25 kg",
    expiry: "Within 5 Hours",
    location: "Airport Road, Dhaka",
    status: "Available",
    category: "animal",
    image: riceImage
  },
  {
    id: 6,
    title: "Unsold Fresh Raw Beef Trimmings (For Animal Shelter)",
    donor: "Shapla Butchery",
    quantity: "12 kg",
    expiry: "Within 2 Hours",
    location: "Mohakhali, Dhaka",
    status: "Available",
    category: "animal",
    image: beefImage
  },
  {
    id: 7,
    title: "Fresh Bones & Marrow (For Stray Animals)",
    donor: "Agora Superstore",
    quantity: "18 kg",
    expiry: "Within 3 Hours",
    location: "Panthapath, Dhaka",
    status: "Available",
    category: "animal",
    image: bonesImage
  }
];

const RESCUE_CATEGORIES = [
  { id: 'restaurants', name: 'Restaurants', icon: Pizza, badge: 'Active' },
  { id: 'events', name: 'Events & Catering', icon: Soup, badge: 'Huge Qty' },
  { id: 'groceries', name: 'Raw Groceries', icon: Carrot, badge: 'Fresh' },
  { id: 'households', name: 'Households', icon: Home, badge: '' },
  { id: 'ngos', name: 'NGOs & Shelters', icon: Handshake, badge: 'Urgent' },
  { id: 'volunteer-action', name: 'Express Delivery', icon: Bike, badge: 'Fast' }
];

const CHART_DATA = [
  { name: 'Delivered', value: 55, color: '#0F9F76' },
  { name: 'Received by NGOs', value: 30, color: '#3B82F6' },
  { name: 'Pending / Available', value: 15, color: '#F59E0B' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('food');
  const [filter, setFilter] = useState('All');
  const [segmentFilter, setSegmentFilter] = useState('all'); // 'all' | 'human' | 'animal'
  const posts = INITIAL_FOOD_POSTS;

  const filteredPosts = posts.filter(post => {
    // Segment Filtering (Human vs Animal)
    if (segmentFilter === 'human' && post.category !== 'human') return false;
    if (segmentFilter === 'animal' && post.category !== 'animal') return false;

    // Status/Urgency Filtering
    if (filter === 'Available') return post.status === 'Available';
    if (filter === 'Urgent') return post.expiry.includes('3') || post.expiry.includes('2');
    return true;
  });

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    alert("Food post submitted successfully!");
    setActiveTab('food');
  };

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    alert("Registration as Volunteer successful! Thank you.");
    setActiveTab('food');
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5] text-[#0D4436] font-sans flex flex-col selection:bg-[#0F9F76] selection:text-white pb-24 md:pb-0">

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-r from-[#E6F5F0] via-[#FAF9F6] to-[#E6F5F0] blur-3xl pointer-events-none -z-10" />

      <nav className="bg-white/70 backdrop-blur-md border-b border-white/40 sticky top-0 z-50 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('food')}>
            <img src="/rescuebite-icon.svg" alt="RescueBite" className="h-9 w-auto group-hover:rotate-6 transition-transform duration-300" />
            <span className="font-extrabold text-2xl tracking-tight text-[#0F9F76]">
              RescueBite
            </span>
          </div>

          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab('food')}
              className={`text-sm font-bold tracking-wide transition-all duration-200 ${activeTab === 'food' ? 'text-[#0F9F76] border-[#0F9F76] border-2 bg-[#F4F7F5] px-4 py-2 rounded-xl' : 'text-stone-400 hover:text-[#0F9F76]'}`}
            >
              Explore Food
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`text-sm font-bold tracking-wide transition-all duration-200 ${activeTab === 'services' ? 'text-[#0F9F76] border-b-2 border-[#0F9F76] pb-1' : 'text-stone-400 hover:text-[#0F9F76]'}`}
            >
              All Services
            </button>
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`text-sm font-bold tracking-wide transition-all duration-200 ${activeTab === 'volunteer' ? 'text-[#0F9F76] border-b-2 border-[#0F9F76] pb-1' : 'text-stone-400 hover:text-[#0F9F76]'}`}
            >
              Become Volunteer
            </button>
            <button
              onClick={() => setActiveTab('donate')}
              className="bg-[#0F9F76] text-white text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-[1.25rem] hover:bg-[#0C8562] transition-all duration-300 shadow-[0_4px_15px_rgba(15,159,118,0.2)] active:scale-95"
            >
              Donate Surplus Food
            </button>
            <Link
              to="/login"
              className="text-xs font-black uppercase tracking-wider text-stone-500 hover:text-[#0F9F76] border-2 border-stone-200 px-5 py-3 rounded-[1.25rem] hover:border-[#CBECE2] transition-all duration-300 bg-white"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      <header className="bg-white/70 backdrop-blur-md border-b border-white/40 p-4 sticky top-0 z-50 flex items-center justify-between md:hidden">
        <div className="flex items-center gap-2" onClick={() => setActiveTab('food')}>
          <img src="/rescuebite-icon.svg" alt="RescueBite" className="h-7 w-auto" />
          <span className="font-extrabold text-lg text-[#0F9F76]">RescueBite</span>
        </div>
        <span className="text-[9px] bg-white/80 text-[#0F9F76] font-extrabold px-3 py-1 rounded-full border border-white/60 tracking-wider">DHAKA</span>
      </header>

      <main className="flex-grow">
        {activeTab === 'food' && (
          <div className="max-w-7xl mx-auto px-6 py-8">

            <div className="mb-8">
              <HeroCarousel />
            </div>

            {/* Segment Selector Buttons (All / Human Food / Animal Food) */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-white p-1.5 rounded-2xl border border-[#E6ECE8] shadow-sm gap-2">
                <button
                  onClick={() => setSegmentFilter('all')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                    segmentFilter === 'all'
                      ? 'bg-[#0D4436] text-white shadow-md'
                      : 'text-stone-500 hover:text-[#0F9F76]'
                  }`}
                >
                  🌐 All Rescues
                </button>
                <button
                  onClick={() => setSegmentFilter('human')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                    segmentFilter === 'human'
                      ? 'bg-[#0F9F76] text-white shadow-md'
                      : 'text-stone-500 hover:text-[#0F9F76]'
                  }`}
                >
                  🍲 Human Food
                </button>
                <button
                  onClick={() => setSegmentFilter('animal')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                    segmentFilter === 'animal'
                      ? 'bg-[#0F9F76] text-white shadow-md'
                      : 'text-stone-500 hover:text-[#0F9F76]'
                  }`}
                >
                  🐾 Animal Shelters
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-extrabold text-[#0D4436] tracking-tight">Active Rescues</h2>
                <p className="text-stone-400 font-medium text-sm mt-1">Real-time surplus edible food & animal nourishment waiting to be collected.</p>
              </div>

              <div className="flex items-center justify-center gap-2 self-center md:self-auto text-xs font-bold bg-[#E6F5F0] p-1.5 rounded-2xl border border-[#CBECE2]">
                <span className="text-[10px] font-black uppercase text-stone-400 px-2 tracking-wider">Status:</span>
                {['All', 'Available', 'Urgent'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 font-black tracking-wide uppercase text-[10px] ${
                      (item === 'All' && filter === 'All') || filter === item
                        ? 'bg-[#0F9F76] text-white shadow-md'
                        : 'text-stone-500 hover:text-[#0F9F76]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Food card grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-[2rem] overflow-hidden border border-[#E6ECE8] shadow-[0_8px_30px_-10px_rgba(15,159,118,0.03)] hover:shadow-[0_15px_35px_-8px_rgba(15,159,118,0.07)] hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
                  <div className="h-52 overflow-hidden relative">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" />
                    <span className={`absolute top-4 right-4 text-[10px] font-black px-3.5 py-1.5 rounded-full shadow-md tracking-wider uppercase ${post.status === 'Available' ? 'bg-[#0F9F76] text-white' : 'bg-stone-100 text-stone-400'}`}>
                      {post.status}
                    </span>
                    <span className={`absolute top-4 left-4 text-[9px] font-black px-2.5 py-1 rounded-lg tracking-wider uppercase ${post.category === 'animal' ? 'bg-amber-500 text-white' : 'bg-blue-600 text-white'}`}>
                      {post.category === 'animal' ? '🐾 Animal Feed' : '🍲 Human Food'}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-xs font-bold text-[#0F9F76] tracking-wider uppercase">{post.donor}</span>
                    <h3 className="font-bold text-[#0D4436] text-lg mt-1 line-clamp-2 leading-snug min-h-[50px]">{post.title}</h3>

                    <div className="mt-4 space-y-2 border-t border-[#E6ECE8] pt-4 text-sm text-[#1B5749] flex-grow">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-stone-400">Quantity:</span>
                        <span className="font-bold text-[#0D4436] bg-[#E6F5F0] px-2.5 py-0.5 rounded-lg border border-[#CBECE2]/50">{post.quantity}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-stone-400">Expires in:</span>
                        <span className="font-bold text-rose-600 bg-rose-50/50 px-2.5 py-0.5 rounded-lg border border-rose-100/50">{post.expiry}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-stone-400">Location:</span>
                        <span className="font-semibold text-[#0D4436] text-xs">{post.location}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(`Request sent to: ${post.donor}`)}
                      className={`w-full mt-6 py-3.5 rounded-[1.25rem] text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                        post.status === 'Available'
                          ? 'bg-[#0D4436] text-white hover:bg-[#0F9F76] shadow-md active:scale-95'
                          : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                      }`}
                      disabled={post.status !== 'Available'}
                    >
                      {post.status === 'Available' ? 'Request Pickup' : 'Claimed / Requested'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* pieChart */}
            <div className="mt-16 bg-white p-6 md:p-8 rounded-[2rem] border border-[#E6ECE8] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-md">
                <span className="text-xs font-black uppercase text-[#0F9F76] tracking-wider">Live Analytics</span>
                <h3 className="text-2xl font-extrabold text-[#0D4436] mt-1">Today's Food Rescue Status</h3>
                <p className="text-stone-400 text-sm mt-1">Here is the real-time breakdown of distributed human and animal surplus food across Dhaka today.</p>
              </div>
              <div className="h-56 w-full md:w-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CHART_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {CHART_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'services' && (
          <div className="max-w-5xl mx-auto px-6 py-12 bg-gradient-to-br from-[#E6F5F0] via-[#D4EDE4] to-[#C8E6DC]">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 bg-white text-[#0D4436] text-xs font-bold px-3 py-1.5 rounded-full border border-[#CBECE2] uppercase tracking-wider mb-3">
                <Backpack size={14} />
                Choose Your Segment
              </span>
              <h2 className="text-3xl font-extrabold text-[#0D4436] tracking-tight">Our Rescue Categories</h2>
              <p className="text-stone-500 text-sm mt-2 max-w-md mx-auto">Explore surplus options tailored by source. Pick what fits your scope best.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {RESCUE_CATEGORIES.map((cat) => {
                const CategoryIcon = cat.icon;
                return (
                <div
                  key={cat.id}
                  onClick={() => { alert(`Filtering by: ${cat.name}`); setActiveTab('food'); }}
                  className="bg-white rounded-[2rem] p-6 border border-[#E6ECE8] shadow-[0_8px_25px_-10px_rgba(15,159,118,0.06)] hover:shadow-[0_12px_25px_-8px_rgba(15,159,118,0.12)] hover:border-[#CBECE2] hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer group"
                >
                  <div className="relative w-16 h-16 bg-[#E6F5F0] rounded-2xl flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-110">
                    {cat.badge && (
                      <span className={`absolute -top-2 px-1.5 py-0.5 text-[8px] font-black rounded-full tracking-wider uppercase ${cat.badge === 'Urgent' || cat.badge === 'Huge Qty' ? 'bg-rose-500 text-white' : 'bg-[#0F9F76] text-white'}`}>
                        {cat.badge}
                      </span>
                    )}
                    <CategoryIcon size={28} className="text-[#0F9F76]" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-[#0D4436] group-hover:text-[#0F9F76] transition-colors duration-200">
                    {cat.name}
                  </h3>
                </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'donate' && (
          <div className="max-w-xl mx-auto py-12 px-6">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-[#E6ECE8] shadow-[0_15px_45px_-12px_rgba(15,159,118,0.02)]">
              <h2 className="text-3xl font-extrabold text-[#0D4436] tracking-tight">Post Surplus Food</h2>
              <p className="text-stone-400 font-medium text-sm mt-1">Let's prevent food wastage. Register your surplus meal below.</p>

              <form className="mt-8 space-y-5" onSubmit={handleDonateSubmit}>
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Food Description</label>
                  <input type="text" placeholder="e.g. 30 Boxes of Catering Chicken Pulao or Animal Trimmings" className="w-full mt-2 p-3.5 rounded-[1.15rem] border border-[#E6ECE8] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 text-sm font-medium bg-[#F4F7F5]/80" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Quantity</label>
                    <input type="text" placeholder="e.g. 30 Servings / 15 kg" className="w-full mt-2 p-3.5 rounded-[1.15rem] border border-[#E6ECE8] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 text-sm font-medium bg-[#F4F7F5]/80" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Best Before</label>
                    <input type="text" placeholder="e.g. 5 Hours" className="w-full mt-2 p-3.5 rounded-[1.15rem] border border-[#E6ECE8] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 text-sm font-medium bg-[#F4F7F5]/80" required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Pickup Area Address</label>
                  <input type="text" placeholder="e.g. Meena Bazar, Gulshan 2" className="w-full mt-2 p-3.5 rounded-[1.15rem] border border-[#E6ECE8] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 text-sm font-medium bg-[#F4F7F5]/80" required />
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setActiveTab('food')} className="flex-1 bg-stone-50 hover:bg-stone-100 text-stone-700 font-bold p-3.5 rounded-[1.15rem] border border-stone-200 transition-all duration-300">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 bg-[#0F9F76] hover:bg-[#0C8562] text-white font-black uppercase tracking-wider p-3.5 rounded-[1.15rem] transition-all duration-300 shadow-md active:scale-95">
                    Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'volunteer' && (
          <div className="max-w-xl mx-auto py-12 px-6 bg-gradient-to-br from-[#E6F5F0] via-[#D4EDE4] to-[#C8E6DC]">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-[#E6ECE8] shadow-[0_15px_45px_-12px_rgba(15,159,118,0.06)]">
              <div className="text-center">
                <Bike size={48} className="mx-auto text-[#0F9F76]" strokeWidth={1.5} />
                <h2 className="text-3xl font-extrabold text-[#0D4436] tracking-tight mt-3">Become a Rescue Hero</h2>
                <p className="text-stone-500 font-medium text-sm mt-2">Become the bridge between surplus food and the local families who need it.</p>
              </div>

              <form className="mt-8 space-y-5" onSubmit={handleVolunteerSubmit}>
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Your Full Name</label>
                  <input type="text" placeholder="Enter your name" className="w-full mt-2 p-3.5 rounded-[1.15rem] border border-[#E6ECE8] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 text-sm font-medium bg-[#F4F7F5]/80" required />
                </div>
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Transport Mode</label>
                  <select className="w-full mt-2 p-3.5 rounded-[1.15rem] border border-[#E6ECE8] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 text-sm bg-white font-medium bg-[#F4F7F5]/80">
                    <option>Bicycle</option>
                    <option>Motorbike</option>
                    <option>On Foot</option>
                    <option>Rickshaw / Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Preferred Area (Dhaka)</label>
                  <input type="text" placeholder="e.g. Dhanmondi, Banani, Mirpur" className="w-full mt-2 p-3.5 rounded-[1.15rem] border border-[#E6ECE8] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 text-sm font-medium bg-[#F4F7F5]/80" required />
                </div>

                <button type="submit" className="w-full bg-[#0F9F76] hover:bg-[#0C8562] text-white font-black uppercase tracking-wider p-4 rounded-[1.15rem] mt-4 transition-all duration-300 shadow-md active:scale-95">
                  Sign Up as Volunteer
                </button>
              </form>
            </div>
          </div>
        )}

      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#E6F5F0] px-4 py-2.5 flex items-center justify-between md:hidden z-50 shadow-[0_-5px_25px_rgba(15,159,118,0.08)]">

        <button
          onClick={() => setActiveTab('food')}
          className="flex flex-col items-center justify-center flex-1 py-1"
        >
          <Pizza size={22} className={`transition-all duration-200 ${activeTab === 'food' ? 'scale-110 opacity-100 text-[#0F9F76]' : 'opacity-40 text-stone-400'}`} />
          <span className={`text-[9px] font-black uppercase tracking-wider mt-1 ${activeTab === 'food' ? 'text-[#0F9F76]' : 'text-stone-400'}`}>Food</span>
        </button>

        <button
          onClick={() => setActiveTab('services')}
          className="flex flex-col items-center justify-center flex-1 py-1"
        >
          <Package size={22} className={`transition-all duration-200 ${activeTab === 'services' ? 'scale-110 opacity-100 text-[#0F9F76]' : 'opacity-40 text-stone-400'}`} />
          <span className={`text-[9px] font-black uppercase tracking-wider mt-1 ${activeTab === 'services' ? 'text-[#0F9F76]' : 'text-stone-400'}`}>Services</span>
        </button>

        <button
          onClick={() => setActiveTab('donate')}
          className="flex flex-col items-center justify-center -mt-8 bg-gradient-to-br from-[#0F9F76] to-[#0A805E] w-14 h-14 rounded-[1.25rem] shadow-[0_6px_20px_rgba(15,159,118,0.3)] border-4 border-[#F4F7F5] active:scale-95 transition-all duration-300"
        >
          <span className="text-white text-2xl font-black select-none">+</span>
        </button>

        <button
          onClick={() => setActiveTab('volunteer')}
          className="flex flex-col items-center justify-center flex-1 py-1"
        >
          <Bike size={22} className={`transition-all duration-200 ${activeTab === 'volunteer' ? 'scale-110 opacity-100 text-[#0F9F76]' : 'opacity-40 text-stone-400'}`} />
          <span className={`text-[9px] font-black uppercase tracking-wider mt-1 ${activeTab === 'volunteer' ? 'text-[#0F9F76]' : 'text-stone-400'}`}>Hero</span>
        </button>

        <Link
          to="/login"
          className="flex flex-col items-center justify-center flex-1 py-1"
        >
          <User size={22} className={`transition-all duration-200 ${activeTab === 'profile' ? 'scale-110 opacity-100 text-[#0F9F76]' : 'opacity-40 text-stone-400'}`} />
          <span className={`text-[9px] font-black uppercase tracking-wider mt-1 ${activeTab === 'profile' ? 'text-[#0F9F76]' : 'text-stone-400'}`}>Profile</span>
        </Link>

      </div>

      <footer className="bg-[#092B22] text-[#E6F5F0]/50 py-12 px-6 border-t border-[#061F18] hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="flex items-center gap-2">
              <img src="/rescuebite-logo-dark.svg" alt="RescueBite" className="h-6 w-auto" />
              <span className="font-extrabold text-white">RescueBite</span>
            </div>
            <p className="text-xs mt-1 text-[#E6F5F0]/30">Share excess food, support families & shelters in Dhaka.</p>
          </div>
          <div className="text-xs text-[#E6F5F0]/20">
            © 2026 RescueBite Team. All Rights Reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}