import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import logo from "../images/logo.png";

import { headers } from "./NavbarHeaders";
import MenuItems from "./MenuItems";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleClick = () => {
    logout();
  };
  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-white">
      <nav
        className="flex items-center justify-between p-2 lg:px-6"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="">
            <span className="sr-only">SmartSpend</span>
            {/* <img className="w-auto h-16 lg:h-[4rem]" src={logo} alt="" /> */}
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 "
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-7 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden h-auto lg:flex lg:gap-x-12">
          {headers.map((menu, index) => {
            return <MenuItems items={menu} key={index} />;
          })}
          {!user && (
            <>
            <a className="ml-3 px-3 py-2 text-sm font-semibold text-gray-900 cursor-pointer"
              href="/login">Login</a>
            <a className="ml-3  px-3 py-2 text-sm font-semibold text-gray-900 cursor-pointer"
              href="/signup">Sign Up</a>
            </>
          )}
          {user && (
            <div>
              <span className="ml-3">{user.email}</span>
              <button
                className="ml-3 border-2 p-1 rounded cursor-pointer border-red-500 "
                onClick={handleClick}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-5 py-5 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-3">
              <span className="sr-only">Smartspend</span>
              {/* <img className="h-16  w-auto" src={logo} alt="" /> */}
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-14 py-8 text-center flex flex-col">
                {headers.map((menu, index) => {
                  return <MenuItems items={menu} key={index} />;
                })}
                          {!user && (
            <>
            <a className="ml-3 px-3 py-2 text-sm font-semibold text-gray-900 cursor-pointer"
              href="/login">Login</a>
            <a className="ml-3  px-3 py-2 text-sm font-semibold text-gray-900 cursor-pointer"
              href="/signup">Sign Up</a>
            </>
          )}
                {user && (
                  <div>
                    <span className="ml-3">{user.email}</span>
                    <button
                      className="ml-3 border-2 p-1 rounded cursor-pointer border-red-500 "
                      onClick={handleClick}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Navbar;
