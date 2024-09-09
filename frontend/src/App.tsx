import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import Menu from "./components/menu";
import Sidebar from "./components/sidebar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="flex flex-row h-screen w-full">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="flex flex-col w-4/5">
          <Menu />
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;