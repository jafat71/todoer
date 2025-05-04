import { TodoerProvider } from "./contexts/TodoerContext/TodoerContext";
import { UserProvider } from "./contexts/UserContext/UserContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext/ThemeContext";
import AppRouter from "./routes";
import { Toaster } from "@/components/ui/toaster"

const AppContent = () => {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen transition-colors duration-300 bg-${theme}`}>
      <AppRouter />
      <Toaster />
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <TodoerProvider>
          <AppContent />
        </TodoerProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
