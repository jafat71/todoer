import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Terminal, UserIcon, Loader2 } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createUserBoard } from "@/services/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/contexts/UserContext/UserContext";

const FormSchema = z.object({
  name: z.string().min(2, "Kanban Board Name must be at least 2 characters").max(50, "Kanban Board Name must be at most 50 characters"),
  fromDate: z.date({
    required_error: "A starting date is required.",
  }),
  toDate: z.date({
    required_error: "An ending date is required.",
  }),
});

const CalendarForm = () => {
  const form = useForm({ resolver: zodResolver(FormSchema), mode: "onChange" });
  const fromDate = useWatch({ control: form.control, name: "fromDate" });
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {token} = useUserContext()

  useEffect(() => {
    if (fromDate) {
      form.setValue("toDate", null);
    }
  }, [fromDate, form]);

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const boardData = {
        title: data.name,
        from_date: data.fromDate ? new Date(data.fromDate).toISOString() : null,
        to_date: data.toDate ? new Date(data.toDate).toISOString() : null
      };
      const board = await createUserBoard(token,boardData);
      navigate(`/kanban/${board.board.id}`);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "An unexpected error occurred while creating the board.";
      setErrorMessage(message);
      setIsOpenAlert(true);
      console.error("Error creating board:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
    setErrorMessage("");
  };

  return (
    <div className="w-full max-w-lg mx-auto relative">
      <Card className="rounded-2xl shadow-lg p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Board Data</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kanban Board Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                        <Input {...field} placeholder="Enter your name" className="pl-10" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fromDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className="w-full flex justify-between">
                            {field.value ? format(field.value, "PPP") : <span>Select a start date</span>}
                            <CalendarIcon className="h-5 w-5 text-gray-500" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="toDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className="w-full flex justify-between">
                            {field.value ? format(field.value, "PPP") : <span>Select an end date</span>}
                            <CalendarIcon className="h-5 w-5 text-gray-500" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => (fromDate ? date <= fromDate : false)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-f2green hover:bg-fgreen text-black font-medium py-2 rounded-lg flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isOpenAlert && (
        <div className="fixed bottom-4 right-4 z-50">
          <Alert
            variant="destructive"
            open={isOpenAlert}
            onOpenChange={setIsOpenAlert}
          >
            <Terminal className="h-4 w-4" />
            <div className="flex flex-col">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {errorMessage}
              </AlertDescription>
            </div>
            <Button variant="ghost" onClick={handleCloseAlert} className="ml-auto">
              Dismiss
            </Button>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default CalendarForm;
