import CalendarForm from '@/components/custom/CalendarForm';
import { Info, Calendar, CalendarClock, FileText, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import blurBackground from "@/assets/blurs.webp";
import { useNavigate } from 'react-router-dom';

const NewKanbanBoard = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-8 relative">
            {/* Background Blur */}
            <div
                className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${blurBackground})` }}
            />

            <div className="relative z-10">
                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-3">
                        <button
                            onClick={() => navigate("/home")}
                            className="bg-f2green text-black px-2 py-1 rounded hover:bg-fgreen hover:scale-105 transition-all duration-300"
                        >
                            <ArrowLeft className="w-6 h-6 text-black" />
                        </button>
                        <h1 className="text-4xl font-light text-white">Create New Board</h1>
                    </div>
                    <p className="text-slate-400 font-light">Fill in the details below to create your new Kanban board</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="flex flex-col">
                        <Card className="bg-black/30 backdrop-blur-sm border border-f2green rounded-2xl">
                            <CardHeader>
                                <CardTitle className="text-2xl font-light text-white flex items-center gap-2">
                                    <FileText className="h-6 w-6 text-f2green" />
                                    Board Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CalendarForm />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Guide Section */}
                    <div className="flex flex-col">
                        <Card className="bg-black/30 backdrop-blur-sm border border-f2green rounded-2xl">
                            <CardHeader>
                                <CardTitle className="text-2xl font-light text-white flex items-center gap-2">
                                    <Info className="h-6 w-6 text-f2green" />
                                    Creation Guide
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-white">
                                        <FileText className="h-5 w-5 text-f2green" />
                                        <span className="font-light">Board Name</span>
                                    </div>
                                    <p className="text-slate-400 font-light pl-7">
                                        Choose a descriptive name that reflects your board's purpose.
                                        This will help you identify it quickly.
                                        The name must be between 2 and 50 characters.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-white">
                                        <Calendar className="h-5 w-5 text-f2green" />
                                        <span className="font-light">Start Date</span>
                                    </div>
                                    <p className="text-slate-400 font-light pl-7">
                                        Select when your project or tasks begin.
                                        This marks the start of your board's timeline and helps
                                        track progress from a specific point.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-white">
                                        <CalendarClock className="h-5 w-5 text-f2green" />
                                        <span className="font-light">End Date</span>
                                    </div>
                                    <p className="text-slate-400 font-light pl-7">
                                        Choose your target completion date.
                                        This must be after the start date and helps set
                                        a clear deadline for your work.
                                    </p>
                                </div>

                                <div className="mt-6 p-4 bg-f2green/5 border border-f2green/20 rounded-xl">
                                    <p className="text-slate-400 font-light">
                                        <span className="text-f2green font-medium">Tip:</span> You can edit these details later,
                                        but setting accurate dates now helps with better task organization and tracking.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewKanbanBoard;