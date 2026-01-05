export default function SubHeader({ title }) {
  return (
    <div
      className="relative w-full bg-center bg-cover py-16 flex flex-col items-center text-white col-start-1 col-end-4 mb-20"
      style={{
        backgroundImage: "url('/sub_header/footerbg.jpg')",
      }}
    >
      <div
        className="absolute inset-0 bg-black/80"
        aria-hidden="true"
      />

      <h1 className="relative z-10 text-2xl md:text-4xl font-bold uppercase tracking-wide mt-auto">
        {title}
      </h1>

      <img
        src="/sub_header/bottom_line2.png"
        alt=""
        className="relative z-10"
      />
    </div>
  );
}
