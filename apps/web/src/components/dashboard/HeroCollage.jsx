import {
    ArrowRight,
    HeartHandshake,
    Plus,
} from "lucide-react";

import hero1 from "../../assets/charity/hero4.webp";
import hero2 from "../../assets/charity/hero2.webp";
import hero3 from "../../assets/charity/hero3.webp";
import hero4 from "../../assets/charity/hero1.webp";

export default function HeroCollage() {
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