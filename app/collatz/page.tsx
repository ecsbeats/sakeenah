"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { Icon } from "@iconify/react";

export default function Collatz() {
    const chartData = Array(100).fill(1).map((x, y) => x + y).map((n) => {
        return {iteration: n, number: Math.floor(Math.random() * n)}
    })
    console.log(chartData)
    
    const chartConfig = {
        desktop: {
          label: "Desktop",
          color: "#2563eb",
        },
        mobile: {
          label: "Mobile",
          color: "#60a5fa",
        },
    } satisfies ChartConfig
    
    return (
        <main className="flex flex-row gap-4">
            <Card className="max-w-96">
                <CardHeader>
                    <CardTitle>Collatz Demo</CardTitle>
                    <CardDescription>September 3rd, 2024</CardDescription>
                </CardHeader>
                <CardContent>
                        <p>This demo showcases a modified version of the collatz conjecture from Sakeenah Blumenfeld with new rules.</p>
                        <div className="flex w-full items-center my-4 space-x-2">
                            <Input type="number" placeholder="Seed number" />
                            <Button type="submit"><Icon icon="mdi:arrow-right" className="text-xl" /></Button>
                        </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                        <LineChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="iteration" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line dataKey="number" fill="var(--color-desktop)" radius={4} />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </main>
    )
}