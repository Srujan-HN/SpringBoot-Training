function Hero() {
  return (
    <>
      <section className="flex flex-col w-full justify-center items-center">
        <div className="text-center">
          <div className="text-6xl pt-20 ">Find the best ✈️ flights faster</div>
          <div className="text-6xl pt-5 text-gray-400 ">Travel Smarter</div>
        </div>
      </section>
      <section className="flex gap-5 pt-10 pl-80">
        <div>Round trip⌄</div>
        <div>Passengers⌄</div>
      </section>
      <section className="flex gap-5 pl-80">
        <div className="w-64 bg-gray-100 p-2 rounded">
          <div>From</div>
          <div>Warsaw, Poland</div>
        </div>
        <div className="w-64 bg-gray-100 p-2 rounded">
          <div>To</div>
          <div>Bangkok,Thailand</div>
        </div>
        <div className="flex items-center justify-center text-center bg-black text-white w-[100px] rounded">
          <div>Search</div>
        </div>
      </section>
    </>
  );
}
export default Hero;
