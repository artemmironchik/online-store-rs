import React, { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";
const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-black underline underline-offset-4" : "text-gray-500";
const Layout: FC = () => {
  return (
    <div className="min-h-screen">
      <header className="border-b-2 mb-2 z-10 sticky w-full top-0 bg-white">
        <div className="mx-3 sm:mx-5 md:mx-8 lg:mx-14 xl:mx-20 2xl:mx-32 text-xl flex py-2">
          <nav className="ml-auto flex space-x-4">
            <NavLink end to={"/"} className={getNavLinkClass}>
              Main
            </NavLink>
            <NavLink to={"/basket"} className={getNavLinkClass}>
              Basket
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-3 sm:mx-5 md:mx-8 lg:mx-14 xl:mx-20 2xl:mx-32 text-xl flex flex-col">
        <Outlet />
      </main>
      <footer className="sticky top-full border-t-2 bg-white">
        <div className="mx-3 sm:mx-5 md:mx-8 lg:mx-14 xl:mx-20 2xl:mx-32 text-xl flex py-2 justify-between">
          <p>
            Created by{" "}
            <a
              href="https://github.com/artemmironchik"
              className="hover:text-blue-600"
            >
              artemmironchik
            </a>
            {" "}and{" "}
            <a
              href="https://github.com/artemmironchik"
              className="hover:text-blue-600"
            >
              TanushaVeraksa
            </a>
          </p>
          <p>2022</p>
        </div>
      </footer>
    </div>
  );
};

export default React.memo(Layout);