import assets from "../assets/assets";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative mt-20 h-[calc(100vh-5rem)] w-full overflow-hidden"
    >
      {/* Background Image */}
      <img
        src={assets.hero_1}
        alt="Okatsu hero background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-12 lg:px-24 xl:px-40 text-white items-center">
      </div>
    </section>
  );
};

export default Hero;
