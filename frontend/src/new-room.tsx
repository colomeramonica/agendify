import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Popover, PopoverContent, PopoverTrigger } from "./components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./components/ui/calendar";
import { cn } from "@/lib/utils"
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function NewRoom() {
  const [date, setDate] = useState<DateRange | undefined>({ from: new Date() });

  const handleSelectRange = (range: DateRange | undefined) => {
    setDate(range);
  };

  const formSchema = z.object({
    username: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1 items-center justify-center p-2">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <>
              <FormItem className="font-normal pl-3 text-left w-full">
                <FormLabel>Meeting Room Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name of the meeting room" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem className="font-normal pl-3 text-left w-full">
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input placeholder="Capacity of the room" {...field} />
                </FormControl>
                <FormDescription>How many people can fit in this room?</FormDescription>
                <FormMessage />
              </FormItem>
              <FormItem className="font-normal pl-3 text-left w-full">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Where the is meeting room located" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <div className="flex flex-row justify-between p-3 w-full">
          <Button variant="outline">Cancel</Button>
          <Button>Create</Button>
        </div>
      </form>
    </Form>
  );
}