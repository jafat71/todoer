/* eslint-disable react/prop-types */
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Pencil, Save, X } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { updateUserBoardData } from "@/services/actions";
import { useTodoerContext } from "@/contexts/TodoerContext/TodoerContext";
import { useUserContext } from "@/contexts/UserContext/UserContext";

const FormSchema = z.object({
  fromDate: z.date({
    required_error: "A starting date is required.",
  }),
  toDate: z.date({
    required_error: "An ending date is required.",
  }),
});

const CalendarInfo = ({ board, isLoading }) => {
  const {setDates} = useTodoerContext()
  const [boardName, setBoardName] = useState(board?.title);
  const [enableEdit, setEnableEdit] = useState(false);

  const {token} = useUserContext()

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fromDate: board?.from_date ? new Date(board.from_date) : null,
      toDate: board?.to_date ? new Date(board.to_date) : null,
    },
  });

  const fromDate = useWatch({ control: form.control, name: "fromDate" });

  useEffect(() => {
    if (board?.from_date) {
      form.setValue("fromDate", new Date(board.from_date));
    }
    if (board?.to_date) {
      form.setValue("toDate", new Date(board.to_date));
    }
    if (board?.title) {
      setBoardName(board.title);
    }
  }, [board, form]);

  const handleSubmit = (e) => { 
    e.preventDefault();
    setEnableEdit(false);
    handleUpdateBoard(form.getValues());
  }

  const handleEdit = (e) => {
    e.preventDefault();
    setEnableEdit(true);
  }

  const handleUpdateBoard = async (data) => {
    try {
      const boardData = {
        title: boardName,
        from_date: data.fromDate ? new Date(data.fromDate).toISOString() : null,
        to_date: data.toDate ? new Date(data.toDate).toISOString() : null
      };  
      const response = await updateUserBoardData(token,boardData, board.id);
      const newDates = {
        fromDate: response.board.from_date,
        toDate: response.board.to_date
      }
      setDates(newDates);
    } catch (error) {
      console.error("Error updating user board:", error);
      throw error;
    } 
  }

  const handleCancel = () => {
    setEnableEdit(false);
    setBoardName(board?.title);
    form.reset();
    form.setValue("fromDate", new Date(board.from_date));
    form.setValue("toDate", new Date(board.to_date));
  }

  if (isLoading) {
    return (
      <div className="w-full">
        <Card className="rounded-xl h-[350px] p-4">
          <CardHeader>
            <div className="h-12 w-full bg-voidBlack opacity-20" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="h-10 w-full bg-voidBlack " />
              <div className="h-10 w-full bg-voidBlack" />
              <div className="h-12 w-full bg-voidBlack" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Card className="rounded-xl h-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            <input 
              type="text"
              disabled={!enableEdit}
              className="text-2xl font-bold text-start bg-transparent border-none  "
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-8 flex flex-col items-start">
              <FormField
                control={form.control}
                name="fromDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>From Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={!enableEdit}
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Select a start date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
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
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>To Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            disabled={!enableEdit}
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Select an end date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
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

                {
                  enableEdit ? (
                    <div className="flex flex-row gap-2 w-full">
                      <Button type="submit" className="w-full  bg-f2green  text-black px-4 py-2 rounded hover:bg-fgreen hover:scale-105 transition-all duration-300" onClick={handleSubmit}>
                        <Save className="w-6 h-6 text-black" />
                      </Button>
                      <Button className="w-full bg-red-500" onClick={handleCancel}>
                        <X className="w-6 h-6 text-black" />
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full bg-f2green  text-black px-4 py-2 rounded hover:bg-fgreen hover:scale-105 transition-all duration-300" onClick={handleEdit}>
                      <Pencil className="w-6 h-6  text-black" /> 
                    </Button> 
                  )
                }
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarInfo;
