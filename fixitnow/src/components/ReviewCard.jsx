export default function ReviewCard({ name, rating = 5, review }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{name}</h4>
        <div className="text-yellow-500 text-sm">
          {"★".repeat(rating)}{"☆".repeat(5 - rating)}
        </div>
      </div>
      <p className="mt-2 text-gray-600 text-sm">{review}</p>
    </div>
  );
}
