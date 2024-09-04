import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MathJax, MathJaxContext } from "better-react-mathjax"
import { Icon } from "@iconify/react";

export default function Collatz() {
    return (
        <main className="flex flex-col gap-4">
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
        </main>
    )
}