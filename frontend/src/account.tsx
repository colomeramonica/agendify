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
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Avatar, AvatarImage } from "./components/ui/avatar";

export default function Account() {
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
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://github.com/colomeramonica.png" className="rounded-full" />
              </Avatar>
              <FormItem className="font-normal pl-3 text-left w-full">
                <FormLabel>Display name</FormLabel>
                <FormControl>
                  <Input placeholder="Display name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem className="font-normal pl-3 text-left w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email of the colaborator" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem className="font-normal pl-3 text-left w-full">
                <FormLabel>Work hours</FormLabel>
                <FormControl>
                  <Input placeholder="9AM to 5PM" {...field} />
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