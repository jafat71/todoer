import {
  LucideColumns3,
  LucideFolderPlus,
  LucideSettings,
  LucideTimer,
  LucideUser2,
} from "lucide-react";
import LogoSvg from "../../../assets/logo.svg";
import { useUserContext } from "@/contexts/UserContext/UserContext";

const Navbar = () => {
  const { isLogged, setisLogged } = useUserContext();
  const iconClassname = "hover:scale-110 transition-all duration-300 ";
  return (
    <div className="w-full text-white p-2 flex flex-row justify-between items-center bg-voidBlack  ">
      <ul className="flex flex-row items-center gap-x-4">
        <a href="/">
          <img
            src={LogoSvg}
            alt="logo"
            className="h-10 w-10 
                hover:scale-110 hover:rotate-90 
                transition-all duration-300"
          />
        </a>
        {isLogged && (
          <>
            <a href="/create">
              <LucideFolderPlus
                size={34}
                color="white"
                className={`${iconClassname}`}
              />
            </a>

            <a href="/kanban">
              <LucideColumns3
                size={34}
                color="white"
                className={`${iconClassname}`}
              />
            </a>

            <a href="/">
              <LucideTimer
                size={34}
                color="white"
                className={`${iconClassname}`}
              />
            </a>

            <a href="/">
              <LucideSettings
                size={34}
                color="white"
                className={`${iconClassname}`}
              />
            </a>
          </>
        )}
      </ul>

      <div className="hidden lg:flex absolute  left-1/2 transform -translate-x-1/2 text-2xl font-extrabold">
        KNBNN
      </div>

      {isLogged ? 
      (
        <a href="/">
          <LucideUser2 color="white" className={`${iconClassname}`} />
        </a>
      )
      :
      (
        <button onClick={() => setisLogged(!isLogged)}>Login</button>

      )}
    </div>
  );
};

export default Navbar;
