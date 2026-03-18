function Display() {
  const users = ["Thejas", "Karthikeya", "Swroopa"];
  return (
    <>
      {users.map((user) => (
        <div>{user}</div>
      ))}
      ;
    </>
  );
}
export default Display;
