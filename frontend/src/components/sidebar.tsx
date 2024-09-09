import { CalendarCheck, LogOut, MapPin, MenuIcon, UserCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button"; // Assuming you have a Button component

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button
        className="fixed left-4 md:hidden top-4 z-50" variant="ghost"
        onClick={toggleSidebar}
      >
        <MenuIcon />
      </Button>
      <div
        className={`bg-opacity-25 bg-slate-800 fixed flex flex-col h-full items-stretch justify-start text-gray-800 dark:text-gray-300 w-4/5 md:w-1/5 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <div className="flex flex-col gap-2 p-4">
          <h1 className="font-bold text-2xl">Agendify</h1>
          <p className="text-sm">Welcome to your calendar</p>
        </div>
        <div className="flex flex-col gap-2 p-4">
          <ul className="flex flex-col gap-2">
            <li className="flex flex-row gap-1">
              <UserCircle2 className="h-6 w-6" />
              <a href="/account" className="font-bold text-sm">Account</a>
            </li>
            <li className="flex flex-row gap-1 items-center">
              <MapPin className="h-6 w-6" />
              <a href="/new/meeting-room" className="font-bold text-sm">Rooms</a>
            </li>
            <li className="flex flex-row gap-1 items-center">
              <CalendarCheck className="h-6 w-6" />
              <a href="/rooms" className="font-bold text-sm">Users Agenda</a>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2 justify-end mt-auto p-4">
          <ul className="flex flex-col gap-2">
            <li className="flex flex-row gap-1 items-center">
              <LogOut className="h-6 w-6" />
              <a href="/account" className="font-bold text-sm">Log out</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}