import {  useState } from "react";


const Header = () => {
  const [btnname, setbtname] = useState("login");
  return (
    <div className="bg-pink-300 shadow-lg rounded-lg mb-2  ">
      <nav className="flex justify-between items-center ">
        <h1>NoitaVonne</h1>
        <ul className="flex items-center  m-5">
          <li className="px-3"><Link to={"/home"}>Home</Link></li>
          <button onClick={() => {
            btnname === "login" ? setbtname("logout") : setbtname("login");
          }}>{btnname}</button>

        </ul>
      </nav>
    </div>
  );
};

export default Header;
