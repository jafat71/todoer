import { TodoerProvider } from "./contexts/AppContext";
import AppRouter from "./routes";
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  return (
    <TodoerProvider>
      <div className="max-w-7xl mx-auto flex items-center justify-center ">
        <AppRouter />
        <Toaster />
      </div>
    </TodoerProvider>
  );
};

export default App;
