import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Stats = () => {
    const achieved = 4;
    const totalGoals = 5;
    const progressPercentage = Math.round((achieved / totalGoals) * 100);

    const data = [
        { name: 'Achieved', value: achieved },
        { name: 'Remaining', value: totalGoals - achieved },
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
                            <div className="text-3xl md:text-4xl lg:text-5xl text-black">2</div>
                            <div className="text-black">TO DO</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl lg:text-5xl text-black">2</div>
                            <div className="text-black">Doing</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl lg:text-5xl text-black">2</div>
                            <div className="text-black">Done</div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-5xl md:text-6xl lg:text-8xl text-black">6</div>
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
