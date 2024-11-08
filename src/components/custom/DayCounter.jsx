import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DayCounter = () => {
    let targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 7); 
    const [daysRemaining, setDaysRemaining] = useState(calculateDaysRemaining());

    function calculateDaysRemaining() {
        const now = new Date();
        const difference = targetDate - now;
        return Math.ceil(difference / (1000 * 60 * 60 * 24));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setDaysRemaining(calculateDaysRemaining());
        }, 1000 * 60 * 60 * 24); // Actualizar cada día

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <Card className="text-center bg-gray-100 w-1/2 md:w-full">
            <CardHeader>
                <CardTitle>Days Remaining</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
                <Badge variant="outline" className="bg-black text-6xl text-white p-4">
                    {daysRemaining} 
                </Badge>
                <Progress value={(100 - (daysRemaining / 30) * 100)} className="w-full rounded-xl" />
            </CardContent>
        </Card>
    );
};

export default DayCounter;
