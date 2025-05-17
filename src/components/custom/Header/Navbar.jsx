import {
  LucideUser2,
  LucideSettings,
  LucideLogOut,
} from "lucide-react";
import LogoSvg from "../../../assets/Relogo.svg";
import { useUserContext } from "@/contexts/UserContext/UserContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useNavigate, Link, useLocation } from "react-router-dom";
import PrimaryButton from "../CTA/PrimaryButton";

const Navbar = () => {
  const { isLogged, user, logout } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthRoute = location.pathname === "/auth";

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate('/');
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full text-white p-4 z-50">
      {/* Mobile Navbar */}
      <div className="md:hidden flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Link to={isLogged ? "/home" : "/"}>
            <img
              src={LogoSvg}
              alt="logo"
              className="h-8 w-8 hover:scale-110 transition-all duration-300"
            />
          </Link>
          {isLogged && user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-voidBlack hover:text-f2green">
                  <span className="text-xs">{user.username}</span>
                  <LucideUser2 className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 bg-voidBlack border-neutral-800 text-white">
                <div className="flex flex-col space-y-2">
                  <div className="px-2 py-1.5 text-sm font-medium border-b border-neutral-800">
                    {user.email}
                  </div>
                  <Link 
                    to="/settings"
                    className="flex items-center px-2 py-1.5 text-sm hover:bg-neutral-800 hover:text-f2green cursor-pointer"
                  >
                    <LucideSettings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="justify-start text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300"
                    onClick={handleLogout}
                  >
                    <LucideLogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <PrimaryButton icon={null} text="Login" link="/auth" />
          )}
        </div>
        {!isAuthRoute && (
          <nav className="w-full">
            <ul className="flex flex-row items-center justify-between px-4 py-2
             bg-voidBlack/90 rounded-full border-2 border-f2green 
             bg-gradient-to-r from-f2green/35 to-voidBlack"> 
              <li>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-white text-xs font-thin hover:text-f2green"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('demo')} 
                  className="text-white text-xs font-thin hover:text-f2green"
                >
                  Demo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-white text-xs font-thin hover:text-f2green"
                >
                  About
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex flex-row justify-between items-center">
        <Link to={isLogged ? "/home" : "/"}>
          <img
            src={LogoSvg}
            alt="logo"
            className="h-10 w-10 hover:scale-110 transition-all duration-300"
          />
        </Link>

        {!isAuthRoute && (
          <nav className="absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex flex-row items-center justify-center gap-x-8 px-6 py-2 
            bg-voidBlack/70 rounded-full border-2 border-f2green bg-gradient-to-r from-f2green/35 to-voidBlack"> 
              <li>
                <button 
                  onClick={() => scrollToSection('features')} 
                  className="text-white text-sm font-thin hover:text-f2green"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('demo')} 
                  className="text-white text-sm font-thin hover:text-f2green"
                >
                  Demo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-white text-sm font-thin hover:text-f2green"
                >
                  About
                </button>
              </li>
            </ul>
          </nav>
        )}

        {isLogged && user ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-voidBlack hover:text-f2green">
                <span className="text-sm">{user.username}</span>
                <LucideUser2 className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 bg-voidBlack border-neutral-800 text-white">
              <div className="flex flex-col space-y-2">
                <div className="px-2 py-1.5 text-sm font-medium border-b border-neutral-800">
                  {user.email}
                </div>
                <Link 
                  to="/settings"
                  className="flex items-center px-2 py-1.5 text-sm hover:bg-neutral-800 hover:text-f2green cursor-pointer"
                >
                  <LucideSettings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
                <Button 
                  variant="ghost" 
                  className="justify-start text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300"
                  onClick={handleLogout}
                >
                  <LucideLogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <PrimaryButton icon={null} text="Login" link="/auth" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
