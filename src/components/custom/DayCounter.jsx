import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTodoerContext } from "@/contexts/TodoerContext/TodoerContext";
import { useEffect } from "react";
import { useState } from "react";

const DayCounter = () => {
    const { daysRemaining, period: totalDays, dates } = useTodoerContext();

    const progressValue = daysRemaining ?  (100 - (daysRemaining / totalDays) * 100).toFixed(2) : 0;
    
    const [startDateIsBeforeToday, setStartDateIsBeforeToday] = useState(false);
    useEffect(() => {
        if (!dates) return; 

        const startDate = new Date(dates.fromDate);
        const today = new Date();
        let startDateIsBeforeToday = false;
        if (startDate > today) {
            startDateIsBeforeToday = true;
        }
        setStartDateIsBeforeToday(startDateIsBeforeToday);
    }, [dates]);
    

    return (
        <Card className="text-center rounded-md">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Time Left</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
                <div className="flex flex-col gap-x-4">
                    <div>
                        <div className="text-5xl md:text-6xl lg:text-8xl text-white rounded-full shadow-md">
                            {totalDays}
                        </div>
                        <div className="text-white">
                            {startDateIsBeforeToday ? "Days to begin" : "Days to begin"}
                        </div>

                    </div>
                    <div>
                    <div className="text-5xl md:text-6xl lg:text-8xl text-white rounded-full shadow-md">
                            {daysRemaining}
                        </div>
                        <div className="text-white">
                            to reach finish date
                        </div>
                    </div>
                </div>

                <div className="w-full space-y-4">
                    <Progress
                        value={progressValue}
                        className="w-full h-4 rounded-xl"
                    />
                    <div className="font-semibold text-white">
                        {Math.max(0,progressValue)}% has passed 
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default DayCounter;
