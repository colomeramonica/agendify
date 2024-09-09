import { CalendarIcon, ListBulletIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { ModeToggle } from "./toggle-mode";
import { Link, useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

  const renderListView = () => {
    return <Link to="/list" />;
  };

  const renderCalendarView = () => {
    return navigate("/calendar");
  }

  const renderCreateNew = () => {
    return navigate("/create");
  }

  return (
    <>
      <div className="align-top flex flex-row gap-2 items-start justify-between p-3">
        <Button className="align-middle items-center">
          <PlusIcon className="h-6 mr-2 w-6" onClick={renderCreateNew} />Create new event
        </Button>
        <div className="flex gap-2">
          <Button variant="secondary" className="align-middle items-center">
            <ListBulletIcon className="h-6 mr-2 w-6" onClick={renderListView} />List
          </Button>
          <Button variant="secondary" className="align-middle items-center">
            <CalendarIcon className="h-6 mr-2 w-6" onClick={renderCalendarView} />Calendar
          </Button>
          <ModeToggle />
        </div>
      </div>
    </>
  );
}