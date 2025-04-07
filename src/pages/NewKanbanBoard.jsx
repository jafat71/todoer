import CalendarForm from '@/components/custom/CalendarForm';
import { Info, Calendar, CalendarClock, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NewKanbanBoard = () => {
        return(
            <div className="min-h-screen flex flex-col items-center justify-center px-4 text-white">
                <div className="w-full max-w-4xl mx-auto mb-8">
                    <h1 className="text-3xl font-bold text-center mb-2">Create a New Kanban Board</h1>
                    <p className="text-neutral-400 text-center">Fill in the details below to create your new board</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <CalendarForm />
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <Card className="w-full bg-voidBlack/50 border border-fgreen/20 rounded-lg">
                            <CardHeader className="border-b border-fgreen/20">
                                <CardTitle className="flex items-center gap-2 text-fgreen">
                                    <Info className="h-5 w-5" />
                                    <span>Board Creation Guide</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-fgreen">
                                        <FileText className="h-5 w-5" />
                                        <h3 className="font-semibold">Kanban Board Name</h3>
                                    </div>
                                    <p className="text-neutral-300 text-sm pl-7">
                                        Choose a descriptive name for your board that reflects its purpose. 
                                        This name will help you identify your board at a glance. 
                                        The name must be between 2 and 50 characters.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-fgreen">
                                        <Calendar className="h-5 w-5" />
                                        <h3 className="font-semibold">From Date</h3>
                                    </div>
                                    <p className="text-neutral-300 text-sm pl-7">
                                        Select the start date for your project or task timeline. 
                                        This date marks the beginning of your board&apos;s timeline and helps 
                                        you track progress from a specific point in time.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-fgreen">
                                        <CalendarClock className="h-5 w-5" />
                                        <h3 className="font-semibold">To Date</h3>
                                    </div>
                                    <p className="text-neutral-300 text-sm pl-7">
                                        Select the target completion date for your project or tasks. 
                                        This date must be after the From Date and helps you set a deadline 
                                        for completing the work on this board.
                                    </p>
                                </div>

                                <div className="mt-4 p-3 bg-fgreen/10 border border-fgreen/20 rounded-md">
                                    <p className="text-sm text-neutral-300">
                                        <span className="text-fgreen font-semibold">Tip:</span> You can always edit these details later, 
                                        but providing accurate dates helps you better organize and track your tasks.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        );
};

export default NewKanbanBoard;