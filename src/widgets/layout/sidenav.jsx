import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function Sidenav({ routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-b from-[#0e3173] to-[#06060d]",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      willOpen: () => {
        const confirmBtn = document.querySelector(".swal2-confirm");
        const cancelBtn = document.querySelector(".swal2-cancel");

        if (confirmBtn) {
          confirmBtn.style.backgroundColor = "#dc2626";
          confirmBtn.style.color = "white";
          confirmBtn.style.padding = "8px 16px";
          confirmBtn.style.margin = "8px";
          confirmBtn.style.borderRadius = "0.375rem";
        }

        if (cancelBtn) {
          cancelBtn.style.backgroundColor = "#e5e7eb";
          cancelBtn.style.color = "black";
          cancelBtn.style.padding = "8px 16px";
          cancelBtn.style.borderRadius = "0.375rem";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        Swal.fire(
          "Logged out!",
          "You have been successfully logged out.",
          "success"
        ).then(() => {
          navigate("/auth/sign-in");
        });
      }
    });
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 flex flex-col`}
    >
      {/* Logo and close icon */}
      <div className="relative">
        <Link to="/" className="py-6 px-8 text-center">
          <div className="bg-white mx-10 rounded-2xl">
            <img src="/img/PNG.png" alt="" className="p-3" />
          </div>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>

      {/* Navigation and Logout */}
      <div className="flex flex-col justify-between flex-grow px-4 pb-4">
        <div className="flex-grow flex flex-col ">
          {routes.map(({ layout, title, pages }, key) => (
            <ul key={key} className="mb-4 flex flex-col gap-1">
              {title && (
                <li className="mx-3.5 mt-4 mb-2">
                  <Typography
                    variant="small"
                    color={sidenavType === "dark" ? "white" : "blue-gray"}
                    className="font-black uppercase opacity-75"
                  >
                    {title}
                  </Typography>
                </li>
              )}
              {pages.map(({ icon, name, path }) => (
                <li key={name}>
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="flex rounded-full items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography>
                      </Button>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* Logout Button at Bottom */}
        <Button onClick={handleLogout} color="red" className="mt-4" fullWidth>
          Logout
        </Button>
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
