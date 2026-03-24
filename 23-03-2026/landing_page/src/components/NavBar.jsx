function NavBar() {
  return (
    <>
      <div className="flex justify-between pt-5 pb-2 pl-45 pr-45">
        <div className="">
          <div>SkyExplorer</div>
        </div>

        <div className="flex gap-5">
          <div>Features</div>
          <div>Method</div>
          <div>Pricing</div>
          <div>ChangeLog</div>
        </div>

        <div>
          <button className="w-20 bg-gray-300 text-black items-center border-gray-500 rounded">
            Login
          </button>
        </div>
      </div>
    </>
  );
}
export default NavBar;
