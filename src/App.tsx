import "./App.css";
import { ThemeProvider } from "@/components/theme-provider"
import Menu from "./components/menu";
import ListView from "./components/list-view";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen w-full">
        <Menu />
        <ListView />
      </div>
    </ThemeProvider>
  );
}

export default App;
