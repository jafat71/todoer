import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useTodoerContext } from "@/contexts/TodoerContext/TodoerContext";
import { useEffect, useState } from "react";
import { KANBAN_COLUMNS } from "@/constants";

const Stats = (columns = KANBAN_COLUMNS) => {
    const { kanbanObject } = useTodoerContext();
    const [column1, setColumn1] = useState(0);
    const [column2, setColumn2] = useState(0);
    const [column3, setColumn3] = useState(0);
    const [total, setTotal] = useState(0);
    const [progressPercentage, setProgressPercentage] = useState(0);

    useEffect(() => {
        const calculateStats = () => {
            if (!kanbanObject) return;

            let column1Count = 0;
            let column2Count = 0;
            let column3Count = 0;

            Object.keys(kanbanObject).forEach((key, index) => {
                const column = kanbanObject[key];
                const taskCount = column.tasks?.length || 0;

                if (index === 0) column1Count = taskCount;
                if (index === 1) column2Count = taskCount;
                if (index === 2) column3Count = taskCount;
            });

            const totalCount = column1Count + column2Count + column3Count;
            const progress =
                totalCount > 0 ? Math.round((column3Count / totalCount) * 100) : 0;

            setColumn1(column1Count);
            setColumn2(column2Count);
            setColumn3(column3Count);
            setTotal(totalCount);
            setProgressPercentage(progress);
        };

        calculateStats();
    }, [kanbanObject]);

    const data = [
        { name: "Achieved", value: column3 },
        { name: "Remaining", value: column1 + column2 },
    ];

    const COLORS = ["#89f336", "#fff"];

    return (
        <Card className="text-center w-full rounded-xl h-full">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-fgreen ">Stats</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row lg:flex-col items-start lg:items-center">
                <div className="w-1/2 items-center justify-center ">

                    <div className="text-2xl font-bold text-center mt-2 sm:mt-4 text-f2green">Resume</div>
                    <div className="w-full flex flex-row lg:flex-col items-center justify-around">
                        <div className="flex flex-col items-center justify-around">
                            <div>
                                <div className="text-3xl md:text-4xl lg:text-5xl text-white">
                                    {column1}
                                </div>
                                <div className="text-white">TO DO</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl lg:text-5xl text-white">
                                    {column2}
                                </div>
                                <div className="text-white">Doing</div>
                            </div>
                            <div>
                                <div className="text-3xl md:text-4xl lg:text-5xl text-white">
                                    {column3}
                                </div>
                                <div className="text-white">Done</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <div className="text-5xl md:text-6xl lg:text-8xl text-fgreen">
                                {total}
                            </div>
                            <div className="text-f2green">In total</div>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 lg:w-full flex flex-col-reverse ">
                    <ResponsiveContainer
                        width="100%"
                        height={window.innerWidth < 640 ? 150 : 250}
                    >
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={window.innerWidth < 640 ? "35%" : "40%"}
                                outerRadius={window.innerWidth < 640 ? "60%" : "70%"}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="text-center mt-2 sm:mt-4">
                        <div className="text-2xl font-bold text-f2green">Achieved</div>

                        <div className="flex flex-col items-center justify-center">
                            <div className="text-3xl md:text-4xl lg:text-5xl">
                                {progressPercentage}%
                            </div>
                            <div className="text-white">In total</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Stats;
