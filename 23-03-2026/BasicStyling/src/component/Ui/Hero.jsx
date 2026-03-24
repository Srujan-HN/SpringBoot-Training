function Hero() {
  const access = () => {
    window.location.href = "https://jcbmc.org/";
  };
  return (
    <section className="flex w-full justify-center items-center h-75 bg-blue-300">
      <div className="text-center flex flex-col items-center">
        <div className="text-6xl pb-5">Prosperity Of Knowledge</div>
        <div className="text-2xl pb-5">Sri JCBM College , Sringeri</div>
        <div>
          <button
            className="text-2.5xl border-2 border-amber-500 bg-green-600 text-white w-18"
            onClick={access}
          >
            Explore
          </button>
        </div>
      </div>
    </section>
  );
}
export default Hero;
