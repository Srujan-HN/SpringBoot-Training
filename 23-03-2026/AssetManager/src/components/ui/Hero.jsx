function Hero() {
  return (
    <section className="py-50 border rounded-4xl bg-olive-950 text-white">
      <div className="flex justify-between">
        <div className="px-10">💠Cortex</div>
        <div>Unlock your Asset Spark</div>
        <div className="px-10">Quard💠</div>
      </div>
      <div className="flex flex-col items-center justify-center ">
        <div className=" p-5 text-6xl">
          <strong>
            <span className="text-white">One-click </span>
            <span className="text-gray-600">for Asset Defense</span>
          </strong>
        </div>
        <div className="text-white">
          Dive into the art assets, where innovative blockchain technology meets
          financial expertise
        </div>
      </div>
      <div className="flex justify-center gap-5 p-5 ">
        <div className="border rounded-3xl px-3 py-1  hover:bg-white-text-gray-950">Open App</div>
        <div className="border rounded-3xl px-3 py-1  hover:bg-white-text-gray-950">Discover More</div>
      </div>
    </section>
  );
}
export default Hero;
