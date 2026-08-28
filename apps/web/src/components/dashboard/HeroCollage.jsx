import {
    ArrowRight,
    HeartHandshake,
    Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

import hero1 from "../../assets/charity/hero4.webp";
import hero2 from "../../assets/charity/hero2.webp";
import hero3 from "../../assets/charity/hero3.webp";
import hero4 from "../../assets/charity/hero1.webp";

export default function HeroCollage({ role = "donor" }) {
    const isNgo = role === "ngo";

    if (isNgo) {
        return (
            <section className="relative h-[360px] overflow-hidden rounded-3xl shadow-2xl shadow-emerald-900/25 lg:h-[390px]">
                <img src={hero4} alt="Community food donation" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/70 via-emerald-900/35 to-emerald-700/10" />
                <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-emerald-950/65 via-emerald-900/30 to-transparent" />
                <div className="relative z-20 flex h-full items-center px-8 lg:px-14">
                    <div className="max-w-xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-500/20 px-4 py-2 text-white backdrop-blur-md">
                            <HeartHandshake size={16} />
                            <span className="text-sm font-semibold">NGO Dashboard</span>
                        </div>
                        <h1 className="text-4xl font-extrabold leading-tight lg:text-5xl">
                            <span className="text-white">Welcome Back,</span><br />
                            <span className="text-emerald-300">Green Hope NGO!</span>
                        </h1>
                        <p className="mt-4 max-w-lg text-base leading-7 text-emerald-50 lg:text-lg">
                            Browse available food donations near your organization and request pickups for families who need it most.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <Link to="/ngo/browse-food" className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400">
                                Browse Food Donations <ArrowRight size={18} />
                            </Link>
                            <Link to="/ngo/requests" className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-3 text-white backdrop-blur-sm transition hover:bg-white/10">
                                View My Requests
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative h-[360px] lg:h-[390px] overflow-hidden rounded-3xl shadow-2xl shadow-emerald-900/25">

            {/* Image Collage */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[2px] bg-emerald-500">

                {[hero1, hero2, hero3, hero4].map((image, index) => (
                    <div key={index} className="overflow-hidden">
                        <img
                            src={image}
                            alt={`Charity ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                    </div>
                ))}

            </div>

            {/* Global Green Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-emerald-900/30 to-emerald-700/10" />

            {/* Left Overlay */}
            <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-emerald-950/55 via-emerald-900/20 to-transparent" />

            {/* Content */}
            <div className="relative z-20 flex items-center h-full px-8 lg:px-14">

                <div className="max-w-xl">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-500/20 backdrop-blur-md px-4 py-2 text-white mb-4">

                        <HeartHandshake size={16} />

                        <span className="text-sm font-semibold">
                            RescueBite Donor Dashboard
                        </span>

                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">

                        <span className="text-white">
                            Every Donation
                        </span>

                        <br />

                        <span className="text-emerald-300">
                            Creates Hope.
                        </span>

                    </h1>

                    {/* Description */}
                    <p className="mt-4 max-w-lg text-base lg:text-lg leading-7 text-emerald-50">

                        Help NGOs and volunteers rescue surplus food and deliver
                        it to families who need it most.

                    </p>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-wrap gap-4">

                        <button className="flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-500/30 transition">

                            <Plus size={18} />

                            Donate Food

                        </button>

                        <button className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 hover:bg-white/10 backdrop-blur-sm px-6 py-3 text-white transition">

                            View Donations

                            <ArrowRight size={18} />

                        </button>

                    </div>

                    {/* Mini Stats */}


                </div>

            </div>

        </section>
    );
}