"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icon } from "@iconify/react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react"

const computeNextNum = (n: number): { number: number; type: string; operation: string } => {
    const modFive = Math.abs(n) % 5
    switch (modFive) {
        case 0:
            return {
                number: n / 5,
                type: "5a", 
                operation: "n / 5"
            }
        case 4:
            return {
                number: (7 * n) + 2,
                type: "5a + 4", 
                operation: "7n + 2"
            }
        case 3:
            return {
                number: (7 * n) + 4,
                type: "5a + 3", 
                operation: "7n + 4"
            }
        case 2:
            return {
                number: (7 * n) + 6,
                type: "5a + 2", 
                operation: "7n + 6"
            }
        case 1:
            return {
                number: (7 * n) + 3,
                type: "5a + 1",
                operation: "7n + 3"
            }
    }
    return {
        number: -1,
        type: "ERROR",
        operation: "ERROR"
    }
}

const computeSeries = (seed: number) => {
    const usedNumbers = new Set()
    usedNumbers.add(seed)
    const series = []
    series.push({
        iteration: 0,
        number: seed,
        type: "Seed",
        operation: ""
    })

    let n = seed
    for (let i = 1 ;; i++) {
        const nextNum = computeNextNum(n)
        series.push({
            iteration: i,
            ...nextNum
        })
        n = nextNum.number
        if (usedNumbers.has(n)) {
            break
        }
        usedNumbers.add(n)
    }
    return series
}

export default function Collatz() {
    const [chartData, setChartData] = useState(computeSeries(15))
    const [seed, setSeed] = useState(15)
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
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            setChartData(computeSeries(seed))
                        }}>
                            <div className="flex w-full items-center my-4 space-x-2">
                                <Input type="number" placeholder="Seed number" onChange={(e) => {
                                    setSeed(e.target.valueAsNumber)
                                }}/>
                                <Button type="submit"><Icon icon="mdi:arrow-right" className="text-xl" /></Button>
                            </div>
                        </form>
                </CardContent>
            </Card>
            <Tabs>
                <Card className="h-80 w-full">
                    <CardHeader>
                        <div>
                            <TabsList>
                                <TabsTrigger value="chart" defaultChecked={true}>Chart</TabsTrigger>
                                <TabsTrigger value="table">Table</TabsTrigger>
                            </TabsList>
                        </div>
                    </CardHeader>
                    <TabsContent value="chart">
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
                    </TabsContent>
                    <TabsContent value="table">
                        <CardContent className="overflow-y-scroll max-h-[200px]">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">Iteration</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Operation</TableHead>
                                        <TableHead className="text-right">Number</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {chartData.map((iteration) => (
                                        <TableRow key={iteration.iteration}>
                                            <TableCell className="font-medium">{iteration.iteration}</TableCell>
                                            <TableCell>{iteration.type}</TableCell>
                                            <TableCell>{iteration.operation}</TableCell>
                                            <TableCell className="text-right">{iteration.number}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TableCell colSpan={3}>Looped Number</TableCell>
                                        <TableCell className="text-right">{chartData[chartData.length - 1].number}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan={3}>Num Iterations</TableCell>
                                        <TableCell className="text-right">{chartData.length - 1}</TableCell>
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </CardContent>
                    </TabsContent>
                </Card>
            </Tabs>
        </main>
    )
}