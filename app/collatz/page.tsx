"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MathJax, MathJaxContext } from "better-react-mathjax"

export default function Collatz() {
    return (
        <main className="flex flex-col gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Collatz Demo</CardTitle>
                    <CardDescription>September 3rd, 2024</CardDescription>
                </CardHeader>
                <CardContent>
                        <p>This demo showcases a modified version of the collatz conjecture with new rules.</p>
                        <p>Will put in a longer description later.</p>
                </CardContent>
            </Card>
        </main>
    )
}