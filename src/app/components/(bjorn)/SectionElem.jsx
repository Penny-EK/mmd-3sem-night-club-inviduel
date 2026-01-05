export default function SectionElem({
  title,
  children,
  variant = "default",
  className = "",
  backgroundImage,
}) {
  const variants = {
    default: "grid place-items-center px-6",
    breakout:
      "col-span-full grid grid-cols-subgrid place-items-center"
    };

  return (
    <section
      className={`${variants[variant]} ${className}`}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      {title ? (
        <div className="relative mb-16 max-md:text-center">
          <h1 className="tracking-7pct pb-4 text-4xl font-medium uppercase max-md:text-3xl">
            {title}
          </h1>
          <span
            className="bottomLine-l absolute -bottom-3 left-1/2 -translate-x-1/2"
            aria-hidden="true"
          />
        </div>
      ) : null}
      {children}
    </section>
  );
}
