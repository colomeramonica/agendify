import { CalendarIcon, ListBulletIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { ModeToggle } from "./toggle-mode";

export default function Menu() {
  return (
    <>
      <div className="align-top flex flex-row gap-2 items-start justify-between">
        <Button className="align-middle items-center">
          <PlusIcon className="h-6 mr-2 w-6" />Create new event
        </Button>
        <div className="flex gap-2">
          <Button variant="secondary" className="align-middle items-center">
            <ListBulletIcon className="h-6 mr-2 w-6" />List
          </Button>
          <Button variant="secondary" className="align-middle items-center">
            <CalendarIcon className="h-6 mr-2 w-6" />Calendar
          </Button>
          <ModeToggle />
        </div>
      </div>
    </>
  );
}