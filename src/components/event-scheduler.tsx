import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"


export default function EventScheduler() {
  const FormSchema = z.object({
    dob: z.date({
      required_error: "A date of birth is required.",
    }),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="bg-slate-950 mt-2 p-4 rounded-md w-[340px]">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }


  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Create new event</CardTitle>
        <CardDescription>Schedule a meeting or an event</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="gap-4 grid items-center w-full">
            <div className="flex flex-col items-start space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Title of the event" />
            </div>
            <div className="flex flex-col items-start space-y-1.5">
              <Label htmlFor="location">Meeting Rooms</Label>
              <Select>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Room 803</SelectItem>
                  <SelectItem value="sveltekit">Room 804</SelectItem>
                  <SelectItem value="astro">Coffee Bar</SelectItem>
                  <SelectItem value="nuxt">Main Room</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col items-start space-y-1.5">
              <Label>Date of birth</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                    )}>
                    <span>Pick a date</span>
                    <CalendarIcon className="h-4 ml-auto opacity-50 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto" align="start">
                  <Calendar
                    mode="single"
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col items-start space-y-1.5">
              <Label htmlFor="guests">Guests</Label>
              <Select>
                <SelectTrigger id="guests">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Room 803</SelectItem>
                  <SelectItem value="sveltekit">Room 804</SelectItem>
                  <SelectItem value="astro">Coffee Bar</SelectItem>
                  <SelectItem value="nuxt">Main Room</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Create</Button>
      </CardFooter>
    </Card >
  );
}