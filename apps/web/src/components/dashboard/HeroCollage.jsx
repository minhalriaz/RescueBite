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
            <section className="relative h-[360px] overflow-hidden rounded-3xl shadow-2xl shadow-black/40 lg:h-[390px]">
                <img src={hero4} alt="Community food donation" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/35 to-transparent" />
                <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                <div className="relative z-20 flex h-full items-center px-8 lg:px-14">
                    <div className="max-w-xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0F9F76]/30 bg-[#0F9F76]/15 px-4 py-2 text-white backdrop-blur-md">
                            <HeartHandshake size={16} />
                            <span className="text-sm font-semibold">NGO Dashboard</span>
                        </div>
                        <h1 className="text-4xl font-extrabold leading-tight lg:text-5xl">
                            <span className="text-white">Welcome Back,</span><br />
                            <span className="text-[#34D399]">Green Hope NGO!</span>
                        </h1>
                        <p className="mt-4 max-w-lg text-base leading-7 text-white/75 lg:text-lg">
                            Browse available food donations near your organization and request pickups for families who need it most.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-4">
                            <Link to="/ngo/browse-food" className="flex items-center gap-2 rounded-xl bg-[#0F9F76] px-6 py-3 font-semibold text-white shadow-lg shadow-[#0F9F76]/25 transition hover:bg-[#0C8562]">
                                Browse Food Donations <ArrowRight size={18} />
                            </Link>
                            <Link to="/ngo/requests" className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-white backdrop-blur-sm transition hover:bg-white/10">
                                View My Requests
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative h-[360px] lg:h-[390px] overflow-hidden rounded-3xl shadow-2xl shadow-black/40">

            {/* Image Collage */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[2px] bg-[color:var(--color-rescue-surface)]">

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

            {/* Global Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent" />

            {/* Left Overlay */}
            <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

            {/* Content */}
            <div className="relative z-20 flex items-center h-full px-8 lg:px-14">

                <div className="max-w-xl">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#0F9F76]/30 bg-[#0F9F76]/15 backdrop-blur-md px-4 py-2 text-white mb-4">

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

                        <span className="text-[#34D399]">
                            Creates Hope.
                        </span>

                    </h1>

                    {/* Description */}
                    <p className="mt-4 max-w-lg text-base lg:text-lg leading-7 text-white/75">

                        Help NGOs and volunteers rescue surplus food and deliver
                        it to families who need it most.

                    </p>

                    {/* Buttons */}
                    <div className="mt-6 flex flex-wrap gap-4">

                        <button className="flex items-center gap-2 rounded-xl bg-[#0F9F76] hover:bg-[#0C8562] px-6 py-3 font-semibold text-white shadow-lg shadow-[#0F9F76]/30 transition">

                            <Plus size={18} />

                            Donate Food

                        </button>

                        <button className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm px-6 py-3 text-white transition">

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
