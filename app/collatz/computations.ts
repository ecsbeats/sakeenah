import { SeriesItem, CollatzVariant } from "./types"

// Collatz Blu
function computeCollatzBlu(seed: number): SeriesItem[] {
    const series: SeriesItem[] = []
    let current = seed
    let iteration = 0

    while (current !== 0 && current !== 4 && current !== 16) {
        const isEven = current % 2 === 0
        const operation = isEven ? 
            `${current} × 3 + 1 = ${current * 3 + 1}` :
            `(${current} - 1) ÷ 2 = ${(current - 1) / 2}`

        series.push({
            iteration,
            number: current,
            type: isEven ? "Even" : "Odd",
            operation
        })

        current = isEven ? current * 3 + 1 : (current - 1) / 2
        iteration++
    }

    series.push({
        iteration,
        number: current,
        type: "Terminal",
        operation: `Reached ${current}`
    })

    return series
}

// Classic Collatz
function computeCollatzClassic(seed: number): SeriesItem[] {
    const series: SeriesItem[] = []
    let current = seed
    let iteration = 0

    while (current !== 1) {
        const isOdd = current % 2 !== 0
        const operation = isOdd ? 
            `${current} × 3 + 1 = ${current * 3 + 1}` :
            `${current} ÷ 2 = ${current / 2}`

        series.push({
            iteration,
            number: current,
            type: isOdd ? "Odd" : "Even",
            operation
        })

        current = isOdd ? current * 3 + 1 : current / 2
        iteration++
    }

    series.push({
        iteration,
        number: current,
        type: "Terminal",
        operation: "Reached 1"
    })

    return series
}

// Collatz Negative
function computeCollatzNegative(seed: number): SeriesItem[] {
    const series: SeriesItem[] = []
    let current = seed
    let iteration = 0

    while (current !== -2) {
        const isEven = current % 2 === 0
        const operation = isEven ? 
            `${current} × 3 + 1 = ${current * 3 + 1}` :
            `(${current} - 1) ÷ 2 = ${(current - 1) / 2}`

        series.push({
            iteration,
            number: current,
            type: isEven ? "Even" : "Odd",
            operation
        })

        current = isEven ? current * 3 + 1 : (current - 1) / 2
        iteration++
    }

    series.push({
        iteration,
        number: current,
        type: "Terminal",
        operation: "Reached -2"
    })

    return series
}

// Collatz Blu Negative
function computeCollatzBluNegative(seed: number): SeriesItem[] {
    const series: SeriesItem[] = []
    let current = seed
    let iteration = 0

    while (current !== -1 && current !== -5 && current !== -17) {
        const isOdd = current % 2 !== 0
        const operation = isOdd ? 
            `${current} × 3 + 1 = ${current * 3 + 1}` :
            `${current} ÷ 2 = ${current / 2}`

        series.push({
            iteration,
            number: current,
            type: isOdd ? "Odd" : "Even",
            operation
        })

        current = isOdd ? current * 3 + 1 : current / 2
        iteration++
    }

    series.push({
        iteration,
        number: current,
        type: "Terminal",
        operation: `Reached ${current}`
    })

    return series
}

export const variants: CollatzVariant[] = [
    {
        name: "Collatz Blu",
        id: "blu",
        compute: computeCollatzBlu,
        description: "A variation where even numbers are multiplied by 3 and increased by 1, while odd numbers are decreased by 1 and halved. The sequence terminates at 0, 4, or 16, demonstrating different terminal points than the classic conjecture."
    },
    {
        name: "Collatz Classic",
        id: "classic",
        compute: computeCollatzClassic,
        description: "The original Collatz conjecture: odd numbers are multiplied by 3 and increased by 1, while even numbers are halved. This sequence always reaches 1, creating the famous '3n + 1' loop."
    },
    {
        name: "Collatz Negative",
        id: "negative",
        compute: computeCollatzNegative,
        description: "Explores negative number space: negative even numbers follow '3n + 1', while negative odd numbers follow '(n-1)/2'. All sequences converge to -2, showing symmetry with positive number behavior."
    },
    {
        name: "Collatz Blu Negative",
        id: "blu-negative",
        compute: computeCollatzBluNegative,
        description: "A negative-space variation where odd numbers follow '3n + 1' and even numbers are halved. Sequences terminate at -1, -5, or -17, mirroring the multiple terminal points of Collatz Blu."
    }
] 