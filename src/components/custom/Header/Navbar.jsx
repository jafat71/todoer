import {
  LucideUser2,
  LucideSettings,
  LucideLogOut,
} from "lucide-react";
import LogoSvg from "../../../assets/logo.svg";
import { useUserContext } from "@/contexts/UserContext/UserContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const { isLogged, user, logout } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="w-full text-white p-2 flex flex-row justify-between items-center bg-voidBlack">
      <ul className="flex flex-row items-center gap-x-4">
        <Link to={isLogged ? "/home" : "/"}>
          <img
            src={LogoSvg}
            alt="logo"
            className="h-10 w-10 
                hover:scale-110 hover:rotate-90 
                transition-all duration-300"
          />
        </Link>
      </ul>

      <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 text-2xl font-extrabold">
        KNBNN
      </div>

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
        <Link to="/auth">Login</Link>
      )}
    </div>
  );
};

export default Navbar;
