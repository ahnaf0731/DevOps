import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <div className="card hover:shadow-lg transition overflow-hidden">
      <div className="h-40 w-full overflow-hidden">
        <img
          src={service.imageUrl}
          alt={service.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{service.title}</h3>
        <p className="text-gray-500 text-sm line-clamp-2">{service.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-primary">LKR {Number(service.price).toLocaleString()}</span>
          <Link
            to={`/services/${service.id}`}
            className="btn btn-primary text-white"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
