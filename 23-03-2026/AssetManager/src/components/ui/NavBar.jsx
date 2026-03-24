function NavBar() {
  return (
    <div className="flex justify-between text-2xl px-5 py-2.5">
      <div>LOGO</div>
      <div className=" flex justify-center gap-5 border rounded-full px-4 py-1 bg-gray-600 text-white">
        <div>Home</div>
        <div>DeFi App</div>
        <div>Assets</div>
        <div>Fratures</div>
        <div>Pricing</div>
        <div>FAQ</div>
        <div className="bg-gray-950 fill-gray-950">Protection</div>
      </div>
      <div>Create Account</div>
    </div>
  );
}
export default NavBar;
