import { Link } from "react-router-dom";
import logo from "../assets/Image.png";
import { getUserLogin, removeCredential } from "../helpers/CredentialToken";

const menuList = [
  { href: "/", name: "Home" },
  { href: "/add-products", name: "Add Memories" },
];

const Navbar = () => {
  const renderMainMenuList = () => {
    return (
      <div className="flex justify-center h-full py-1">
        <div className="flex items-center gap-4 box-dark-brown p-1 rounded-2xl">
          {menuList.map((menu, menuIndex) => {
            return (
              <Link
                to={menu.href}
                key={menuIndex}
                className="box-dark-brown rounded-2xl bg-light-peach px-4 h-full flex items-center justify-center font-semibold"
              >
                {menu.name}
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  const handleLogOut = () => {
    removeCredential();
    window.location.reload();
  };

  const renderAuthMenuList = () => {
    const userData = getUserLogin();
    if (userData) {
      return (
        <div className="flex item-center gap-2 h-full">
          <p className="text-sm font-semibold text-dark-brown">
            {userData.userName}
          </p>
          <button
            onClick={handleLogOut}
            className="active:translate-y-px box-dark-brown px-4 rounded-full bg-red-800 h-full flex items-center"
          >
            <span className="text-white font-semibold">Sign Out</span>
          </button>
        </div>
      );
    }

    return (
      <Link
        to={"/login"}
        className="active:translate-y-px box-dark-brown px-4 rounded-full bg-soft-coral h-full flex items-center"
      >
        <span className="text-black-primary font-semibold">Sign In</span>
      </Link>
    );
  };

  return (
    <header className="inset-x-0 top-0 pt-4 z-[60] fixed">
      <nav className="w-full max-w-7xl mx-auto" aria-label="Global">
        <div className="inline-block w-full box-dark-brown rounded-full">
          <div className="bg-brown rounded-[100px] h-[60px] flex max-lg:justify-between lg:grid lg:grid-cols-3 items-center w-full px-4">
            <div className="flex py-2">
              <div className="box-dark-brown px-4 rounded-full bg-muted-teal">
                <Link
                  to="/"
                  className="inline-flex gap-2 items-center justify-center h-full"
                >
                  <img alt="" src={logo} className="h-8 w-auto" />
                  <span className="text-black-primary font-semibold">
                    collEXtion
                  </span>
                </Link>
              </div>
            </div>

            {renderMainMenuList()}

            <div className="flex justify-end py-2 h-full">
              {renderAuthMenuList()}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
