import React, { useState } from 'react';

const INITIAL_FOOD_POSTS = [
  {
    id: 1,
    title: "Surplus Biryani from Wedding Event",
    donor: "Sultans Dine (Dhanmondi)",
    quantity: "50 Packets",
    expiry: "Within 4 Hours",
    location: "Dhanmondi, Dhaka",
    status: "Available",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Fresh Bread & Pastries",
    donor: "Cooper's Bakery",
    quantity: "20 Parcels",
    expiry: "Within 8 Hours",
    location: "Uttara Sector 11, Dhaka",
    status: "Requested",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Family Dinner Excess Food",
    donor: "Private Household",
    quantity: "8-10 Servings",
    expiry: "Within 3 Hours",
    location: "Banani, Dhaka",
    status: "Available",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80"
  }
];

const RESCUE_CATEGORIES = [
  { id: 'restaurants', name: 'Restaurants', icon: '🍔', badge: 'Active' },
  { id: 'events', name: 'Events & Catering', icon: '🍲', badge: 'Huge Qty' },
  { id: 'groceries', name: 'Raw Groceries', icon: '🥦', badge: 'Fresh' },
  { id: 'households', name: 'Households', icon: '🏡', badge: '' },
  { id: 'ngos', name: 'NGOs & Shelters', icon: '🤝', badge: 'Urgent' },
  { id: 'volunteer-action', name: 'Express Delivery', icon: '⚡', badge: 'Fast' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('food');
  const [filter, setFilter] = useState('All'); 
  const [posts, setPosts] = useState(INITIAL_FOOD_POSTS);

  const filteredPosts = posts.filter(post => {
    if (filter === 'All') return true;
    if (filter === 'Available') return post.status === 'Available';
    if (filter === 'Urgent') return post.expiry.includes('3') || post.expiry.includes('4');
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
    // bg-[#F4F7F5] - একদম ক্লিন মিন্ট-হোয়াইট ব্যাকগ্রাউন্ড, text-[#0D4436] - ডিপ এমারেল্ড টেক্সট
    <div className="min-h-screen bg-[#F4F7F5] text-[#0D4436] font-sans flex flex-col selection:bg-[#0F9F76] selection:text-white pb-24 md:pb-0">
      
      {/* গ্লোবাল গ্রেডিয়েন্ট ব্লাউ (Eggify ভাইব দিতে) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-r from-[#E6F5F0] via-[#FAF9F6] to-[#E6F5F0] blur-3xl pointer-events-none -z-10" />

      {/* ডেস্কটপ নেভিগেশন বার */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-[#E6ECE8] sticky top-0 z-50 shadow-[0_2px_15px_-5px_rgba(15,159,118,0.02)] hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => setActiveTab('food')}>
            <span className="text-3xl group-hover:rotate-6 transition-transform duration-300">🍕</span>
            <span className="font-extrabold text-2xl tracking-tight text-[#0F9F76]">
              RescueBite
            </span>
          </div>
          
          {/* মেনু বাটনসমূহ */}
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
              // ভাইব্রেন্ট মিন্ট গ্রিন বাটন (Eggify স্টাইল)
              className="bg-[#0F9F76] text-white text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-[1.25rem] hover:bg-[#0C8562] transition-all duration-300 shadow-[0_4px_15px_rgba(15,159,118,0.2)] active:scale-95"
            >
              Donate Surplus Food
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className="text-xs font-black uppercase tracking-wider text-stone-500 hover:text-[#0F9F76] border-2 border-stone-200 px-5 py-3 rounded-[1.25rem] hover:border-[#CBECE2] transition-all duration-300 bg-white"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* মোবাইল হেডার */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#E6ECE8] p-4 sticky top-0 z-50 flex items-center justify-between md:hidden shadow-[0_1px_8px_rgba(0,0,0,0.01)]">
        <div className="flex items-center gap-2" onClick={() => setActiveTab('food')}>
          <span className="text-2xl">🍕</span>
          <span className="font-extrabold text-lg text-[#0F9F76]">RescueBite</span>
        </div>
        <span className="text-[9px] bg-[#E6F5F0] text-[#0F9F76] font-extrabold px-3 py-1 rounded-full border border-[#CBECE2] tracking-wider">DHAKA</span>
      </header>

      {/* মেইন কন্টেন্ট */}
      <main className="flex-grow">

        {/* ১. ফুড লিস্টিং ট্যাব */}
        {activeTab === 'food' && (
          <div className="max-w-7xl mx-auto px-6 py-8">
            
            {/* Eggify এর মতো একদম ফ্রেশ গ্রেডিয়েন্ট হিরো কার্ড */}
            <div className="relative bg-gradient-to-r from-[#0F9F76] to-[#0A805E] text-white rounded-[2.5rem] p-8 md:p-12 mb-12 overflow-hidden shadow-[0_20px_50px_-15px_rgba(15,159,118,0.25)]">
              {/* সক্ষ্ম ডট প্যাটার্ন ও অরগানিক গ্লো */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#FFF_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
              <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-8">
                <div className="max-w-xl">
                  <span className="inline-flex items-center gap-1.5 bg-white/20 text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-white/15">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3DFFAA] animate-pulse" /> Live Rescue Operations
                  </span>
                  <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight md:leading-none mb-4">
                    Every Meal Saved <br />is a Smile Added
                  </h1>
                  <p className="text-white/85 text-sm md:text-base font-medium leading-relaxed max-w-lg">
                    Real-time surplus edible food waiting to be collected across Dhaka. Join the movement.
                  </p>
                </div>
                
                {/* স্ট্যাটস */}
                <div className="flex flex-row flex-wrap lg:flex-nowrap gap-6 md:gap-10 border-t lg:border-t-0 lg:border-l border-white/20 pt-6 lg:pt-0 lg:pl-10">
                  <div className="min-w-[100px]">
                    <div className="text-2xl md:text-3xl font-black text-white">12,450+</div>
                    <div className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-white/70 mt-1">Meals Saved</div>
                  </div>
                  <div className="min-w-[100px]">
                    <div className="text-2xl md:text-3xl font-black text-white">850+</div>
                    <div className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-white/70 mt-1">Volunteers</div>
                  </div>
                  <div className="min-w-[100px]">
                    <div className="text-2xl md:text-3xl font-black text-white">150+</div>
                    <div className="text-[10px] md:text-xs font-bold tracking-wider uppercase text-white/70 mt-1">Partners</div>
                  </div>
                </div>
              </div>
            </div>

            {/* হেডার এবং ফিল্টার বার */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-extrabold text-[#0D4436] tracking-tight">Active Rescues</h2>
                <p className="text-stone-400 font-medium text-sm mt-1">Real-time surplus edible food waiting to be collected.</p>
              </div>
              
              {/* ভাইব্রেন্ট মিন্ট ফিল্টার বার */}
              <div className="flex items-center justify-center gap-2 self-center md:self-auto text-xs font-bold bg-[#E6F5F0] p-1.5 rounded-2xl border border-[#CBECE2]">
                <span className="text-[10px] font-black uppercase text-stone-400 px-2 tracking-wider">Filter:</span>
                {['All', 'Available', 'Urgent'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 font-black tracking-wide uppercase text-[10px] ${
                      filter === item 
                        ? 'bg-[#0F9F76] text-white shadow-md' 
                        : 'text-stone-500 hover:text-[#0F9F76]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* ফুড কার্ড গ্রিড */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-[2rem] overflow-hidden border border-[#E6ECE8] shadow-[0_8px_30px_-10px_rgba(15,159,118,0.03)] hover:shadow-[0_15px_35px_-8px_rgba(15,159,118,0.07)] hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
                  <div className="h-52 overflow-hidden relative">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700" />
                    <span className={`absolute top-4 right-4 text-[10px] font-black px-3.5 py-1.5 rounded-full shadow-md tracking-wider uppercase ${
                      post.status === 'Available' ? 'bg-[#0F9F76] text-white' : 'bg-stone-100 text-stone-400'
                    }`}>
                      {post.status}
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
          </div>
        )}

        {/* ২. অল সার্ভিসেস ট্যাব */}
        {activeTab === 'services' && (
          <div className="max-w-5xl mx-auto px-6 py-12">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-1.5 bg-[#E6F5F0] text-[#0F9F76] text-xs font-bold px-3 py-1.5 rounded-full border border-[#CBECE2] uppercase tracking-wider mb-3">
                🎒 Choose Your Segment
              </span>
              <h2 className="text-3xl font-extrabold text-[#0D4436] tracking-tight">Our Rescue Categories</h2>
              <p className="text-sm text-stone-400 mt-2 max-w-md mx-auto">Explore surplus options tailored by source. Pick what fits your scope best.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {RESCUE_CATEGORIES.map((cat) => (
                <div 
                  key={cat.id} 
                  onClick={() => { alert(`Filtering by: ${cat.name}`); setActiveTab('food'); }}
                  className="bg-white rounded-[2rem] p-6 border border-[#E6ECE8] shadow-[0_8px_25px_-10px_rgba(15,159,118,0.02)] hover:shadow-[0_12px_25px_-8px_rgba(15,159,118,0.08)] hover:border-[#CBECE2] hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer group"
                >
                  <div className="relative w-16 h-16 bg-[#E6F5F0] rounded-2xl flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-110">
                    {cat.badge && (
                      <span className={`absolute -top-2 px-1.5 py-0.5 text-[8px] font-black rounded-full tracking-wider uppercase ${
                        cat.badge === 'Urgent' || cat.badge === 'Huge Qty' 
                        ? 'bg-rose-500 text-white' 
                        : 'bg-[#0F9F76] text-white'
                      }`}>
                        {cat.badge}
                      </span>
                    )}
                    <span className="text-3xl select-none">{cat.icon}</span>
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-[#0D4436] group-hover:text-[#0F9F76] transition-colors duration-200">
                    {cat.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ৩. ডোনেশন পোস্ট ট্যাব */}
        {activeTab === 'donate' && (
          <div className="max-w-xl mx-auto py-12 px-6">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-[#E6ECE8] shadow-[0_15px_45px_-12px_rgba(15,159,118,0.02)]">
              <h2 className="text-3xl font-extrabold text-[#0D4436] tracking-tight">Post Surplus Food</h2>
              <p className="text-stone-400 font-medium text-sm mt-1">Let's prevent food wastage. Register your surplus meal below.</p>

              <form className="mt-8 space-y-5" onSubmit={handleDonateSubmit}>
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Food Description</label>
                  <input type="text" placeholder="e.g. 30 Boxes of Catering Chicken Pulao" className="w-full mt-2 p-3.5 rounded-[1.15rem] border border-[#E6ECE8] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 text-sm font-medium bg-[#F4F7F5]/80" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Quantity</label>
                    <input type="text" placeholder="e.g. 30 Servings" className="w-full mt-2 p-3.5 rounded-[1.15rem] border border-[#E6ECE8] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 text-sm font-medium bg-[#F4F7F5]/80" required />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Best Before</label>
                    <input type="text" placeholder="e.g. 5 Hours" className="w-full mt-2 p-3.5 rounded-[1.15rem] border border-[#E6ECE8] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 text-sm font-medium bg-[#F4F7F5]/80" required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Pickup Area Address</label>
                  <input type="text" placeholder="e.g. Sultans Dine, Dhanmondi 2" className="w-full mt-2 p-3.5 rounded-[1.15rem] border border-[#E6ECE8] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 text-sm font-medium bg-[#F4F7F5]/80" required />
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

        {/* ৪. ভলান্টিয়ার ট্যাব */}
        {activeTab === 'volunteer' && (
          <div className="max-w-xl mx-auto py-12 px-6">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-[#E6ECE8] shadow-[0_15px_45px_-12px_rgba(15,159,118,0.02)]">
              <div className="text-center">
                <span className="text-4xl">🚴</span>
                <h2 className="text-3xl font-extrabold text-[#0D4436] tracking-tight mt-3">Become a Rescue Hero</h2>
                <p className="text-stone-400 font-medium text-sm mt-2">Become the bridge between surplus food and the local families who need it.</p>
              </div>

              <form className="mt-8 space-y-5" onSubmit={handleVolunteerSubmit}>
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Your Full Name</label>
                  <input type="text" placeholder="Enter your name" className="w-full mt-2 p-3.5 rounded-[1.15rem] border border-[#E6ECE8] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 text-sm font-medium bg-[#F4F7F5]/80" required />
                </div>
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Transport Mode</label>
                  <select className="w-full mt-2 p-3.5 rounded-[1.15rem] border border-[#E6ECE8] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 text-sm bg-white font-medium bg-[#F4F7F5]/80">
                    <option>Bicycle (সাইকেল)</option>
                    <option>Motorbike (মোটরসাইকেল)</option>
                    <option>On Foot (হেঁটে)</option>
                    <option>Rikshaw / Other (অন্যান্য)</option>
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

        {/* ৫. প্রোফাইল ট্যাব */}
        {activeTab === 'profile' && (
          <div className="max-w-md mx-auto py-12 px-6">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-[#E6ECE8] shadow-[0_15px_45px_-12px_rgba(15,159,118,0.02)]">
              <h2 className="text-3xl font-extrabold text-[#0D4436] text-center tracking-tight">Welcome Back</h2>
              <p className="text-stone-400 font-medium text-sm text-center mt-2">Sign in to manage your active donations and volunteer runs.</p>

              <form className="mt-8 space-y-5" onSubmit={(e) => { e.preventDefault(); setActiveTab('food'); }}>
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Email Address</label>
                  <input type="email" placeholder="you@example.com" className="w-full mt-2 p-3.5 rounded-[1.15rem] border border-[#E6ECE8] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 text-sm font-medium bg-[#F4F7F5]/80" required />
                </div>
                <div>
                  <label className="block text-xs font-black text-stone-400 uppercase tracking-wider">Password</label>
                  <input type="password" placeholder="••••••••" className="w-full mt-2 p-3.5 rounded-[1.15rem] border border-[#E6ECE8] focus:border-[#0F9F76] focus:outline-none focus:ring-4 focus:ring-[#0F9F76]/5 text-sm font-medium bg-[#F4F7F5]/80" required />
                </div>

                <button type="submit" className="w-full bg-[#0F9F76] hover:bg-[#0C8562] text-white font-black uppercase tracking-wider p-4 rounded-[1.15rem] mt-4 transition-all duration-300 shadow-md active:scale-95">
                  Sign In
                </button>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* মোবাইল বটম নেভিগেশন বার (Mint Green Accent) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#E6F5F0] px-4 py-2.5 flex items-center justify-between md:hidden z-50 shadow-[0_-5px_25px_rgba(15,159,118,0.08)]">
        
        {/* Food Tab */}
        <button 
          onClick={() => setActiveTab('food')} 
          className="flex flex-col items-center justify-center flex-1 py-1"
        >
          <span className={`text-xl transition-all duration-200 ${activeTab === 'food' ? 'scale-110 opacity-100' : 'opacity-40'}`}>🍕</span>
          <span className={`text-[9px] font-black uppercase tracking-wider mt-1 ${activeTab === 'food' ? 'text-[#0F9F76]' : 'text-stone-400'}`}>Food</span>
        </button>

        {/* All Services Tab */}
        <button 
          onClick={() => setActiveTab('services')} 
          className="flex flex-col items-center justify-center flex-1 py-1"
        >
          <span className={`text-xl transition-all duration-200 ${activeTab === 'services' ? 'scale-110 opacity-100' : 'opacity-40'}`}>📦</span>
          <span className={`text-[9px] font-black uppercase tracking-wider mt-1 ${activeTab === 'services' ? 'text-[#0F9F76]' : 'text-stone-400'}`}>Services</span>
        </button>

        {/* কাস্টম অ্যাকশন প্লাস বাটন (Mint Gradient Squircle) */}
        <button 
          onClick={() => setActiveTab('donate')} 
          className="flex flex-col items-center justify-center -mt-8 bg-gradient-to-br from-[#0F9F76] to-[#0A805E] w-14 h-14 rounded-[1.25rem] shadow-[0_6px_20px_rgba(15,159,118,0.3)] border-4 border-[#F4F7F5] active:scale-95 transition-all duration-300"
        >
          <span className="text-white text-2xl font-black select-none">+</span>
        </button>

        {/* Become Volunteer Tab */}
        <button 
          onClick={() => setActiveTab('volunteer')} 
          className="flex flex-col items-center justify-center flex-1 py-1"
        >
          <span className={`text-xl transition-all duration-200 ${activeTab === 'volunteer' ? 'scale-110 opacity-100' : 'opacity-40'}`}>🚴</span>
          <span className={`text-[9px] font-black uppercase tracking-wider mt-1 ${activeTab === 'volunteer' ? 'text-[#0F9F76]' : 'text-stone-400'}`}>Hero</span>
        </button>

        {/* Profile Tab */}
        <button 
          onClick={() => setActiveTab('profile')} 
          className="flex flex-col items-center justify-center flex-1 py-1"
        >
          <span className={`text-xl transition-all duration-200 ${activeTab === 'profile' ? 'scale-110 opacity-100' : 'opacity-40'}`}>👤</span>
          <span className={`text-[9px] font-black uppercase tracking-wider mt-1 ${activeTab === 'profile' ? 'text-[#0F9F76]' : 'text-stone-400'}`}>Profile</span>
        </button>

      </div>

      {/* ডেক্সটপ ফুটার */}
      <footer className="bg-[#092B22] text-[#E6F5F0]/50 py-12 px-6 border-t border-[#061F18] hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🍕</span>
              <span className="font-extrabold text-white">RescueBite</span>
            </div>
            <p className="text-xs mt-1 text-[#E6F5F0]/30">Share excess food, support families in Dhaka.</p>
          </div>
          <div className="text-xs text-[#E6F5F0]/20">
            © 2026 RescueBite Team. All Rights Reserved.
          </div>
        </div>
      </footer>
      
    </div>
  );
}