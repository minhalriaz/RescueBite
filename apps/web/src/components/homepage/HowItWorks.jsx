import { Package, Handshake, Truck, Heart } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Post Surplus Food",
    description: "Donors list surplus meals, raw groceries, or animal feed with quantity, pickup address, and deadline.",
    icon: <Package size={26} />,
  },
  {
    step: "02",
    title: "NGOs Get Notified",
    description: "Matching NGOs receive instant in-app alerts for nearby donations that fit their beneficiary preference.",
    icon: <Handshake size={26} />,
  },
  {
    step: "03",
    title: "Request & Collect",
    description: "NGOs request pickup and coordinate collection with volunteers before the food expires.",
    icon: <Truck size={26} />,
  },
  {
    step: "04",
    title: "Families Are Nourished",
    description: "Surplus food reaches families and shelters across Dhaka, cutting waste and feeding the community.",
    icon: <Heart size={26} />,
  },
];

export default function HowItWorks() {
  return (
    <section className="mt-20">
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 bg-[color:var(--color-rescue-accent-soft)] text-[color:var(--color-rescue-green)] text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider">
          Simple Process
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[color:var(--color-rescue-text)] tracking-tight mt-4">
          How RescueBite Works
        </h2>
        <p className="text-[color:var(--color-rescue-text-muted)] font-medium text-sm mt-2 max-w-2xl mx-auto">
          Four simple steps connect surplus food with the people who need it most.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((item) => (
          <div
            key={item.step}
            className="relative rounded-3xl border border-[color:var(--color-rescue-border)] bg-[color:var(--color-rescue-surface)] p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-4xl font-extrabold text-[color:var(--color-rescue-accent-soft)] leading-none">
                {item.step}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--color-rescue-accent-soft)] text-[color:var(--color-rescue-green)]">
                {item.icon}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-bold text-[color:var(--color-rescue-text)]">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-rescue-text-muted)]">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}