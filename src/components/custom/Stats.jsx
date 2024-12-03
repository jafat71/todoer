import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useTodoerContext } from '@/contexts/TodoerContext/TodoerContext';
import { useEffect, useState } from 'react';

const Stats = () => {
    const {kanbanObject} = useTodoerContext()

    const [todo, setTodo] = useState(0);
    const [doing, setDoing] = useState(0);
    const [done, setDone] = useState(0);
    const [total, setTotal] = useState(0);
    const [progressPercentage, setProgressPercentage] = useState(0);
    
    useEffect(() => {
        const calculateStats = () => {
            const todoCount = kanbanObject?.TODO?.tasks?.length || 0;
            const doingCount = kanbanObject?.DOING?.tasks?.length || 0;
            const doneCount = kanbanObject?.DONE?.tasks?.length || 0;
            const totalCount = todoCount + doingCount + doneCount;
            const progress = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

            setTodo(todoCount);
            setDoing(doingCount);
            setDone(doneCount);
            setTotal(totalCount);
            setProgressPercentage(progress);
        };

        calculateStats();
        console.log(kanbanObject)
    }, [kanbanObject]);

    const data = [
        { name: 'Achieved', value: done },
        { name: 'Remaining', value: doing + todo },
    ];

    const COLORS = ['#1c1c1c', '#E0E0E0'];

    return (
        <Card className="text-center w-full rounded-xl h-[350px] lg:h-full">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-black">Stats</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-row lg:flex-col items-center">
                <div className="text-2xl font-bold text-black">Resume</div>

                <div className="w-full lg:w-1/2 flex flex-row gap-x-4 lg:flex-col items-center lg:items-start">

                    <div className="flex flex-col">
                        <div>
                            <div className="text-3xl md:text-4xl lg:text-5xl text-black">{todo}</div>
                            <div className="text-black">TO DO</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl lg:text-5xl text-black">{doing}</div>
                            <div className="text-black">Doing</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl lg:text-5xl text-black">{done}</div>
                            <div className="text-black">Done</div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-5xl md:text-6xl lg:text-8xl text-black">{total}</div>
                        <div className="text-black">In total</div>
                    </div>
                </div>

                <div className="w-full flex flex-col-reverse">
                    <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 150 : 250}>
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
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="text-center mt-2 sm:mt-4">
                        <div className="text-2xl font-bold text-black">Achieved</div>

                        <div className="flex flex-col items-center justify-center">
                            <div className="text-3xl md:text-4xl lg:text-5xl">{progressPercentage}%</div>
                            <div className="text-black">In total</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Stats;
