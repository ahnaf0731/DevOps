import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <header className="bg-gradient-to-r from-secondary via-accent to-primary text-white">
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Fix home problems <span className="underline decoration-white/40">fast</span>
        </h1>
        <p className="mt-3 text-white/90">
          Book trusted professionals for plumbing, electrical, cleaning, painting & more.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link to="/services" className="btn bg-white text-secondary hover:opacity-90">
            Browse Services
          </Link>
          <a href="#reviews" className="btn btn-outline text-white border-white/50 hover:bg-white/10">
            See Reviews
          </a>
        </div>
      </div>
    </header>
  );
}
