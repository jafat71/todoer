import Navbar from "./components/custom/Header/Navbar";
import { TodoerProvider } from "./contexts/TodoerContext/TodoerContext";
import { UserProvider } from "./contexts/UserContext/UserContext";
import AppRouter from "./routes";
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  console.log("App rendering, Toaster component:", !!Toaster);

  //TODO:FOOTER + CUSTOMIZE SHAD}CN STYLES + CONNECT TASKS WITH GO
  return (
    <UserProvider>
      <TodoerProvider>
        <div className=" bg-voidBlack">
          <Navbar/>
          <AppRouter />
        </div>
          <Toaster />
          {console.log("Toaster rendered")}
      </TodoerProvider>
    </UserProvider>
  );
};

export default App;
