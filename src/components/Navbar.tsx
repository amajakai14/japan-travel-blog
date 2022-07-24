import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const handleNavbar = () => {
    setActive(!active);
  };
  const linkCSS =
    "lg:inline-flex lg:w-auto w-full px-3 py-3 rounded text-white font-bold items-center hover:bg-green-600 hover:text-white";
  const navBarContainerCSS = "w-full lg:inline lg:flex-grow lg:w-auto";
  return (
    <nav className="flex items-center bg-blue-300 flex-wrap p-3">
      <button
        className=" inline-flex p-3 hover:bg-green-600 rounded lg:hidden text-white mr-auto hover:text-white outline-none"
        onClick={handleNavbar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div
        className={`${
          active ? "" : "hidden"
        } ${navBarContainerCSS} transition-all duration-100 ease-in-out`}
      >
        <div className="lg:inline-flex lg:flex-row lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto">
          <Link href="/">
            <a className={linkCSS}>Home</a>
          </Link>
          <Link href="/blog">
            <a className={linkCSS}>Blog</a>
          </Link>
          <Link href="/aboutus">
            <a className={linkCSS}>About Us</a>
          </Link>
          <Link href="/contactus">
            <a className={linkCSS}>Contact Us</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
