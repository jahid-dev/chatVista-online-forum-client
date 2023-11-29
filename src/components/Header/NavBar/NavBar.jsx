import React, { useContext } from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { FaHome, FaUserCircle, FaUserFriends, FaUserPlus } from "react-icons/fa";
import { BiBell, BiChevronDown, BiDesktop, BiPowerOff } from "react-icons/bi";
import { CiLogin, CiMenuBurger } from "react-icons/ci";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import toast from "react-hot-toast";

export const NavBar = () => {
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  // profile menu component
  const profileMenuItems = user
    ? [
        {
          id: "name",
          label: <>{user.displayName}</>,
          icon: <FaUserCircle />,
        },
        {
          id: "dashboard",
          label: <Link to="/dashboard">Dashboard</Link>,
          icon: <BiDesktop />,
        },
        {
          id: "signOut",
          label: (
            <a onClick={handleLogOut} className="btn btn-sm">
              Sign Out
            </a>
          ),
          icon: <BiPowerOff />,
        },
      ]
    : [];

  function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);


    
    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          {user && user.photoURL && (
            <Avatar
              variant="circular"
              size="sm"
              alt="User"
              className="border border-gray-900 p-0.5"
              src={user.photoURL}
            />
          )}
          <BiChevronDown
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ id, label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={id}
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded ${
                  isLastItem
                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                    : ""
                }`}
              >
                {icon}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color={isLastItem ? "red" : "inherit"}
                >
                  {label}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    );
  }

  // nav list component
  const navListItems = [
    {
      id: "home",
      label: <NavLink to="/">Home</NavLink>,
      icon: <FaHome />,
    },
    {
      id: "membership",
      label: "Membership",
      icon: <FaUserFriends />,
    },
    {
      id: "joinUs",
      label: "Join Us",
      icon: <FaUserPlus />,
    },
    {
      id: "login",
      label: (
        <>
          {user ? null : <li><Link to="/login">Login</Link></li>}
        </>
      ),
      icon:  (
        <>
          {user ? null : <CiLogin />}
        </>
      ),
    },
  ];

  function NavList() {
    return (
      <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        {navListItems.map(({ id, label, icon }) => (
          <div key={id} className="font-medium text-blue-gray-500">
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {icon} <span className="text-gray-900">{label}</span>
            </MenuItem>
          </div>
        ))}
      </ul>
    );
  }
  

  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

  return (
    <Navbar className="max-w-full p-2">
      <div className="sticky mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          <div className="flex items-center">
            <img
              className="w-14"
              src="https://i.ibb.co/NjF9Xrb/Adobe-Stock-3-Xfw-F5i-Vh-D.png"
              alt=""
            />
            chatVista
          </div>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <CiMenuBurger  className="h-6 w-6 " /> 
        </IconButton>
         <div className="flex items-center">
          {user && (
            <>
              <IconButton variant="text" color="blue-gray">
                <BiBell className="h-4 w-4" />
              </IconButton>
              <ProfileMenu />
            </>
          )}
        </div>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
