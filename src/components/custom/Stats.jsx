import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const Stats = () => {
    const achieved = 4;
    const totalGoals = 5;
    const progressPercentage = Math.round((achieved / totalGoals) * 100); // Centralize progress calculation

    const data = [
        { name: 'Achieved', value: achieved },
        { name: 'Remaining', value: totalGoals - achieved },
    ];

    const COLORS = ['#1c1c1c', '#E0E0E0']; // Colors for achieved and remaining

    return (
        <Card className="max-w-md mx-auto bg-gray-100 w-full">
            <CardHeader>
                <CardTitle>Goals Progress</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius="40%"
                                outerRadius="70%"
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
                    <div className="text-center mt-4">
                        <h2 className="text-2xl font-semibold">{progressPercentage}%</h2>
                        <p>of goals achieved</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default Stats;
