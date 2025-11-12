import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import ReviewCard from "../components/ReviewCard";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../App";

const demoServices = [
  {
    id: 1,
    title: "Plumbing",
    description: "Leak repairs, faucet installation, pipe fixes.",
    price: 1500,
    imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Electrical",
    description: "Wiring, switchboards, appliance setup & fixes.",
    price: 2000,
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Cleaning",
    description: "Deep home & office cleaning, sanitization.",
    price: 1000,
    imageUrl: "https://images.unsplash.com/photo-1686178827149-6d55c72d81df?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNsZWFuaW5nfGVufDB8fDB8fHww",
  },
];

export default function Home() {
  const [services, setServices] = useState(demoServices);

  useEffect(() => {
    fetch(`${API_BASE_URL}/services`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          const mapped = data.map((s) => ({
            id: s.serId ?? s.id ?? s.ser_id,
            title: s.title,
            description: s.description,
            price: s.price,
            imageUrl: demoServices[(s.serId ?? s.id ?? 1) % demoServices.length].imageUrl,
          }));
          setServices(mapped);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Hero />
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">Popular Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      <section id="reviews" className="max-w-6xl mx-auto px-4 pb-16">
        <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ReviewCard name="Ishara" review="Quick fix, professional plumber. Highly recommend!" />
          <ReviewCard name="Nimal" review="Electrician was on time and solved the issue fast." />
          <ReviewCard name="Sahan" review="Great cleaning service. Worth the price!" />
        </div>
      </section>
    </>
  );
}
