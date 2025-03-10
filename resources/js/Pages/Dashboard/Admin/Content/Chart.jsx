"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    { date: "2024-04-01", Senior_High_School: 222, College: 150 },
    { date: "2024-04-02", Senior_High_School: 97, College: 180 },
    { date: "2024-04-03", Senior_High_School: 167, College: 120 },
    { date: "2024-04-04", Senior_High_School: 242, College: 260 },
    { date: "2024-04-05", Senior_High_School: 373, College: 290 },
    { date: "2024-04-06", Senior_High_School: 301, College: 340 },
    { date: "2024-04-07", Senior_High_School: 245, College: 180 },
    { date: "2024-04-08", Senior_High_School: 409, College: 320 },
    { date: "2024-04-09", Senior_High_School: 59, College: 110 },
    { date: "2024-04-10", Senior_High_School: 261, College: 190 },
    { date: "2024-04-11", Senior_High_School: 327, College: 350 },
    { date: "2024-04-12", Senior_High_School: 292, College: 210 },
    { date: "2024-04-13", Senior_High_School: 342, College: 380 },
    { date: "2024-04-14", Senior_High_School: 137, College: 220 },
    { date: "2024-04-15", Senior_High_School: 120, College: 170 },
    { date: "2024-04-16", Senior_High_School: 138, College: 190 },
    { date: "2024-04-17", Senior_High_School: 446, College: 360 },
    { date: "2024-04-18", Senior_High_School: 364, College: 410 },
    { date: "2024-04-19", Senior_High_School: 243, College: 180 },
    { date: "2024-04-20", Senior_High_School: 89, College: 150 },
    { date: "2024-04-21", Senior_High_School: 137, College: 200 },
    { date: "2024-04-22", Senior_High_School: 224, College: 170 },
    { date: "2024-04-23", Senior_High_School: 138, College: 230 },
    { date: "2024-04-24", Senior_High_School: 387, College: 290 },
    { date: "2024-04-25", Senior_High_School: 215, College: 250 },
    { date: "2024-04-26", Senior_High_School: 75, College: 130 },
    { date: "2024-04-27", Senior_High_School: 383, College: 420 },
    { date: "2024-04-28", Senior_High_School: 122, College: 180 },
    { date: "2024-04-29", Senior_High_School: 315, College: 240 },
    { date: "2024-04-30", Senior_High_School: 454, College: 380 },
    { date: "2024-05-01", Senior_High_School: 165, College: 220 },
    { date: "2024-05-02", Senior_High_School: 293, College: 310 },
    { date: "2024-05-03", Senior_High_School: 247, College: 190 },
    { date: "2024-05-04", Senior_High_School: 385, College: 420 },
    { date: "2024-05-05", Senior_High_School: 481, College: 390 },
    { date: "2024-05-06", Senior_High_School: 498, College: 520 },
    { date: "2024-05-07", Senior_High_School: 388, College: 300 },
    { date: "2024-05-08", Senior_High_School: 149, College: 210 },
    { date: "2024-05-09", Senior_High_School: 227, College: 180 },
    { date: "2024-05-10", Senior_High_School: 293, College: 330 },
    { date: "2024-05-11", Senior_High_School: 335, College: 270 },
    { date: "2024-05-12", Senior_High_School: 197, College: 240 },
    { date: "2024-05-13", Senior_High_School: 197, College: 160 },
    { date: "2024-05-14", Senior_High_School: 448, College: 490 },
    { date: "2024-05-15", Senior_High_School: 473, College: 380 },
    { date: "2024-05-16", Senior_High_School: 338, College: 400 },
    { date: "2024-05-17", Senior_High_School: 499, College: 420 },
    { date: "2024-05-18", Senior_High_School: 315, College: 350 },
    { date: "2024-05-19", Senior_High_School: 235, College: 180 },
    { date: "2024-05-20", Senior_High_School: 177, College: 230 },
    { date: "2024-05-21", Senior_High_School: 82, College: 140 },
    { date: "2024-05-22", Senior_High_School: 81, College: 120 },
    { date: "2024-05-23", Senior_High_School: 252, College: 290 },
    { date: "2024-05-24", Senior_High_School: 294, College: 220 },
    { date: "2024-05-25", Senior_High_School: 201, College: 250 },
    { date: "2024-05-26", Senior_High_School: 213, College: 170 },
    { date: "2024-05-27", Senior_High_School: 420, College: 460 },
    { date: "2024-05-28", Senior_High_School: 233, College: 190 },
    { date: "2024-05-29", Senior_High_School: 78, College: 130 },
    { date: "2024-05-30", Senior_High_School: 340, College: 280 },
    { date: "2024-05-31", Senior_High_School: 178, College: 230 },
    { date: "2024-06-01", Senior_High_School: 178, College: 200 },
    { date: "2024-06-02", Senior_High_School: 470, College: 410 },
    { date: "2024-06-03", Senior_High_School: 103, College: 160 },
    { date: "2024-06-04", Senior_High_School: 439, College: 380 },
    { date: "2024-06-05", Senior_High_School: 88, College: 140 },
    { date: "2024-06-06", Senior_High_School: 294, College: 250 },
    { date: "2024-06-07", Senior_High_School: 323, College: 370 },
    { date: "2024-06-08", Senior_High_School: 385, College: 320 },
    { date: "2024-06-09", Senior_High_School: 438, College: 480 },
    { date: "2024-06-10", Senior_High_School: 155, College: 200 },
    { date: "2024-06-11", Senior_High_School: 92, College: 150 },
    { date: "2024-06-12", Senior_High_School: 492, College: 420 },
    { date: "2024-06-13", Senior_High_School: 81, College: 130 },
    { date: "2024-06-14", Senior_High_School: 426, College: 380 },
    { date: "2024-06-15", Senior_High_School: 307, College: 350 },
    { date: "2024-06-16", Senior_High_School: 371, College: 310 },
    { date: "2024-06-17", Senior_High_School: 475, College: 520 },
    { date: "2024-06-18", Senior_High_School: 107, College: 170 },
    { date: "2024-06-19", Senior_High_School: 341, College: 290 },
    { date: "2024-06-20", Senior_High_School: 408, College: 450 },
    { date: "2024-06-21", Senior_High_School: 169, College: 210 },
    { date: "2024-06-22", Senior_High_School: 317, College: 270 },
    { date: "2024-06-23", Senior_High_School: 480, College: 530 },
    { date: "2024-06-24", Senior_High_School: 132, College: 180 },
    { date: "2024-06-25", Senior_High_School: 141, College: 190 },
    { date: "2024-06-26", Senior_High_School: 434, College: 380 },
    { date: "2024-06-27", Senior_High_School: 448, College: 490 },
    { date: "2024-06-28", Senior_High_School: 149, College: 200 },
    { date: "2024-06-29", Senior_High_School: 103, College: 160 },
    { date: "2024-06-30", Senior_High_School: 446, College: 400 },
];

const chartConfig = {
    views: {
        label: "Page Views",
    },
    Senior_High_School: {
        label: "Senior_High_School",
        color: "hsl(var(--chart-1))",
    },
    College: {
        label: "College",
        color: "hsl(var(--chart-2))",
    },
};

export default function Component() {
    const [activeChart, setActiveChart] = React.useState("Senior_High_School");

    const total = React.useMemo(
        () => ({
            Senior_High_School: chartData.reduce(
                (acc, curr) => acc + curr.Senior_High_School,
                0
            ),
            College: chartData.reduce((acc, curr) => acc + curr.College, 0),
        }),
        []
    );

    return (
        <Card className="bg-gray-50">
            <CardHeader className="flex flex-col  items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Line Chart - Interactive</CardTitle>
                    <CardDescription>
                        Showing total students registered
                    </CardDescription>
                </div>
                <div className="flex">
                    {["Senior_High_School", "College"].map((key) => {
                        return (
                            <button
                                key={key}
                                data-active={activeChart === key}
                                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                onClick={() => setActiveChart(key)}
                            >
                                <span className="text-xs text-muted-foreground">
                                    {chartConfig[key].label}
                                </span>
                                <span className="text-lg font-bold leading-none sm:text-3xl">
                                    {total[key].toLocaleString()}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6 bg-[#EEEEEE]">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                });
                            }}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    className="w-[150px]"
                                    nameKey="views"
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        });
                                    }}
                                />
                            }
                        />
                        <Line
                            dataKey={activeChart}
                            type="monotone"
                            stroke={`var(--color-${activeChart})`}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
