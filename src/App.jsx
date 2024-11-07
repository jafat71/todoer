import AppRouter from "./routes";
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  return (
      <>
        <AppRouter />
        <Toaster />

      </>
  );
};

export default App;
