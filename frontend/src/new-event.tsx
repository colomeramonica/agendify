import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
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

export default function NewEvent() {
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
                <FormLabel>Event title</FormLabel>
                <FormControl>
                  <Input placeholder="Title of the event" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem className="font-normal pl-3 text-left w-full">
                <FormLabel>Meeting room</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a meeting location" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="next">Room 803</SelectItem>
                    <SelectItem value="sveltekit">Room 804</SelectItem>
                    <SelectItem value="astro">Coffee Bar</SelectItem>
                    <SelectItem value="nuxt">Main Room</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
              <FormItem className="font-normal pl-3 text-left w-full">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                      )}>
                      <span>Pick a date or range of dates</span>
                      <CalendarIcon className="h-4 ml-auto opacity-50 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-auto" align="start">
                    <Calendar
                      mode="range"
                      disabled={(date) =>
                        date < new Date()
                      }
                      selected={date}
                      onSelect={handleSelectRange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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