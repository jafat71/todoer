import React from 'react';
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
        <Card className="bg-gray-100 w-full  mx-auto">
            <CardHeader>
                <CardTitle>Goals Progress</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <div className="w-full h-full">
                            <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 180 : 250}>
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
                        </div>
                    </ResponsiveContainer>
                    <div className="text-center mt-2 sm:mt-4">
                        <h2 className={`font-semibold ${window.innerWidth < 640 ? 'text-xl' : 'text-2xl'}`}>
                            {progressPercentage}%
                        </h2>
                        <p className={`${window.innerWidth < 640 ? 'text-sm' : 'text-base'}`}>of goals achieved</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Stats;
