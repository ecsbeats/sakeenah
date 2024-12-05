"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icon } from "@iconify/react"
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState, useCallback, useRef, useEffect } from "react"
import { variants } from "./computations"
import type { CollatzVariant } from "./types"
import { ScrollIndicator } from "@/components/ui/scroll-indicator"

// Input validation rules for each variant
const variantValidation: Record<string, { min: number; max: number; message: string }> = {
    'blu': {
        min: 1,
        max: 1000,
        message: 'Please enter a positive number between 1 and 1000'
    },
    'classic': {
        min: 1,
        max: 1000,
        message: 'Please enter a positive number between 1 and 1000'
    },
    'negative': {
        min: -1000,
        max: -1,
        message: 'Please enter a negative number between -1000 and -1'
    },
    'blu-negative': {
        min: -1000,
        max: -1,
        message: 'Please enter a negative number between -1000 and -1'
    }
}

export default function Collatz() {
    const [selectedVariant, setSelectedVariant] = useState<CollatzVariant>(variants[0])
    const [inputValue, setInputValue] = useState<string>('') // Separate input state
    const [error, setError] = useState<string>('')
    const [chartData, setChartData] = useState([])
    const tableContainerRef = useRef<HTMLDivElement>(null)

    const validateAndCompute = useCallback((variant: CollatzVariant, value: number) => {
        const rules = variantValidation[variant.id]
        if (isNaN(value)) {
            setError('Please enter a valid number')
            return false
        }
        if (value < rules.min || value > rules.max) {
            setError(rules.message)
            return false
        }
        setError('')
        return true
    }, [])

    const handleInputChange = (value: string) => {
        setInputValue(value); // Update input value
    }

    const handleVariantChange = (variantId: string) => {
        const variant = variants.find(v => v.id === variantId)!
        setSelectedVariant(variant)
        setInputValue(''); // Clear input when variant changes
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const seed = inputValue === '' ? NaN : parseFloat(inputValue); // Handle empty input
        if (validateAndCompute(selectedVariant, seed)) {
            setChartData(selectedVariant.compute(seed)); // Compute only on submit
        }
    }

    // Run calculation when the seed is loaded into the input
    useEffect(() => {
        const seed = inputValue === '' ? NaN : parseFloat(inputValue);
        if (!isNaN(seed)) {
            setChartData(selectedVariant.compute(seed));
        }
    }, [selectedVariant.id, inputValue]);

    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "#2563eb",
        }
    }
    
    return (
        <main className="flex flex-col p-10 min-h-[calc(100vh-5rem)] max-w-screen md:min-h-0 md:max-h-screen md:flex-row gap-4">
            <Card className="w-full h-fit md:max-w-96">
                <CardHeader>
                    <CardTitle>Alternative Collatz Demo</CardTitle>
                    <CardDescription>Mathematical sequence variations</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Select 
                            defaultValue={selectedVariant.id}
                            onValueChange={handleVariantChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select variant" />
                            </SelectTrigger>
                            <SelectContent>
                                {variants.map(variant => (
                                    <SelectItem key={variant.id} value={variant.id}>
                                        {variant.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="text-sm space-y-2">
                            <p className="text-zinc-500">{selectedVariant.description}</p>
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="flex w-full items-center space-x-2">
                                <Input 
                                    type="text" // Changed to text input
                                    placeholder="Seed number" 
                                    value={inputValue} // Use separate input state
                                    onChange={(e) => handleInputChange(e.target.value)}
                                    className={error ? 'border-red-500' : ''}
                                />
                                <Button type="submit">
                                    <Icon icon="mdi:arrow-right" className="text-xl" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </CardContent>
            </Card>
            <Tabs defaultValue="chart" className="flex-1">
                <Card className="h-[calc(100vh-12rem)] md:h-80">
                    <CardHeader>
                        <div>
                            <TabsList>
                                <TabsTrigger value="chart">Chart</TabsTrigger>
                                <TabsTrigger value="table">Table</TabsTrigger>
                            </TabsList>
                        </div>
                    </CardHeader>
                    <TabsContent value="chart" className="h-[calc(100%-5rem)]">
                        <CardContent className="h-full">
                            <ChartContainer config={chartConfig} className="h-full w-full">
                                <LineChart accessibilityLayer data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="iteration" />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Line dataKey="number" fill="var(--color-desktop)" radius={4} />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                    </TabsContent>
                    <TabsContent value="table" className="h-[calc(100%-5rem)]">
                        <CardContent className="h-full">
                            <div className="relative h-full">
                                <div ref={tableContainerRef} className="h-full overflow-auto">
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
                                                <TableCell colSpan={3}>Number of Iterations Before Loop</TableCell>
                                                <TableCell className="text-right">{chartData.length - 1}</TableCell>
                                            </TableRow>
                                        </TableFooter>
                                    </Table>
                                </div>
                                <ScrollIndicator containerRef={tableContainerRef} />
                            </div>
                        </CardContent>
                    </TabsContent>
                </Card>
            </Tabs>
        </main>
    )
}