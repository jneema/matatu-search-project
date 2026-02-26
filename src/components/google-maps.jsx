export const GoogleMap = ({ stage, landmark }) => {
  const query = encodeURIComponent(`${stage} ${landmark} Nairobi Kenya`);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-gray-100 bg-slate-100"
      style={{ height: 220 }}
    >
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}`}
        allowFullScreen
        title="Stage Map"
      />
    </div>
  );
};