import React from "react";
import { Link } from "react-router-dom";
import useStore from "@/store/zustandStore";
import useAuth from "@/hooks/useAuth";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const isAdmin = useStore((state) => state.isAdmin);
  const { logout } = useAuth();

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        {/* Left Side: Logo and Admin Link */}
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img
              src="/red-cross.ico"
              alt="Home"
              className="h-8 w-8 transition-transform transform hover:scale-95"
            />
          </Link>
          {isAdmin && (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "uppercase text-xs sm:text-sm hover:text-slate-600 transition duration-300 ease-in-out"
                    )}
                  >
                    <Link to="/admin">admin felület</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>

        {/* Right Side: Auth Links */}
        <NavigationMenu>
          <NavigationMenuList>
            {!isLoggedIn ? (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "uppercase text-xs sm:text-sm hover:text-slate-600 transition duration-300 ease-in-out"
                    )}
                  >
                    <Link to="/register">regisztráció</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "uppercase text-xs sm:text-sm hover:text-slate-600 transition duration-300 ease-in-out"
                    )}
                  >
                    <Link to="/login">bejelentkezés</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            ) : (
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "uppercase text-xs sm:text-sm hover:text-slate-600 transition duration-300 ease-in-out"
                  )}
                  onClick={logout}
                >
                  <Link to="/">kijelentkezés</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default Navbar;
