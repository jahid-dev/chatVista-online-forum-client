import React, { useContext } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
  UserCircleIcon,
  UserPlusIcon,
  ChevronDownIcon,
  ComputerDesktopIcon,
  PowerIcon,
  Bars2Icon,
  BellIcon,
} from "@heroicons/react/24/solid";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";

export const NavBar = () => {

  const { user, logOut, logIn } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        // Additional actions after successful logout, if needed
        console.log("User logged out successfully");
      })
      .catch(error => console.log(error));
  }

  const handleLogin = () => {
    console.log(handleLogin)
    // Assuming you have an authentication service or context with a logIn function
    logIn()
      .then(() => {
        // Additional actions after successful login, if needed
        console.log("User logged in successfully");
      })
      .catch(error => console.log(error));
  }

  // profile menu component
  const profileMenuItems = [
    {
      label: "Name",
      icon: UserCircleIcon,
    },
    {
      label: <Link to='/dashboard'>Dashboard</Link>,
      icon: ComputerDesktopIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      onClick: handleLogOut,
    
    },
  ];

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
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <MenuItem
                key={label}
                onClick={closeMenu}
                className={`flex items-center gap-2 rounded ${isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
                  }`}
              >
                {React.createElement(icon, {
                  className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                  strokeWidth: 2,
                })}
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
      label: <NavLink to='/'>Home</NavLink>,
      icon: HomeIcon,
    },
    {
      label: "Membership",
      icon: UserGroupIcon,
    },
    {
      label: "Join Us",
      icon: UserPlusIcon,
    },
    {
      label: "Login",
      icon: ArrowRightOnRectangleIcon,
      onClick: handleLogin,
    },

  ];

  function NavList() {
    return (
      <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        {navListItems.map(({ label, icon }) => (
          <Typography
            key={label}
            as="a"
            variant="small"
            color="gray"
            className="font-medium text-blue-gray-500"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
              <span className="text-gray-900"> {label}</span>
            </MenuItem>
          </Typography>
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
            <img className="w-14" src="https://i.ibb.co/NjF9Xrb/Adobe-Stock-3-Xfw-F5i-Vh-D.png" alt="" />
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
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <div className="flex items-center">
          <IconButton variant="text" color="black">
            <BellIcon className="h-4 w-4" />
          </IconButton>
          <ProfileMenu />
        </div>
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}

export default NavBar;