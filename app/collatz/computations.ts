import { SeriesItem, CollatzVariant } from "./types"

// Helper function to detect loops
function detectLoop(current: number, seen: Set<number>): boolean {
    if (seen.has(current)) {
        return true; // Loop detected
    }
    seen.add(current);
    return false;
}

// Collatz Blu
function computeCollatzBlu(seed: number): SeriesItem[] {
    const series: SeriesItem[] = []
    let current = seed
    let iteration = 0
    const seen = new Set<number>(); // Track seen numbers

    while (current !== 0 && current !== 4 && current !== 16) {
        if (detectLoop(current, seen)) {
            series.push({
                iteration,
                number: current,
                type: "Loop",
                operation: `Loop detected at ${current}`
            });
            break; // Exit on loop detection
        }

        const isEven = current % 2 === 0;
        const operation = isEven ? 
            `${current} × 3 + 1 = ${current * 3 + 1}` :
            `(${current} - 1) ÷ 2 = ${(current - 1) / 2}`;

        series.push({
            iteration,
            number: current,
            type: isEven ? "Even" : "Odd",
            operation
        });

        current = isEven ? current * 3 + 1 : (current - 1) / 2;
        iteration++;
    }

    series.push({
        iteration,
        number: current,
        type: "Terminal",
        operation: `Reached ${current}`
    });

    return series;
}

// Classic Collatz
function computeCollatzClassic(seed: number): SeriesItem[] {
    const series: SeriesItem[] = []
    let current = seed
    let iteration = 0
    const seen = new Set<number>(); // Track seen numbers

    while (current !== 1) {
        if (detectLoop(current, seen)) {
            series.push({
                iteration,
                number: current,
                type: "Loop",
                operation: `Loop detected at ${current}`
            });
            break; // Exit on loop detection
        }

        const isOdd = current % 2 !== 0;
        const operation = isOdd ? 
            `${current} × 3 + 1 = ${current * 3 + 1}` :
            `${current} ÷ 2 = ${current / 2}`;

        series.push({
            iteration,
            number: current,
            type: isOdd ? "Odd" : "Even",
            operation
        });

        current = isOdd ? current * 3 + 1 : current / 2;
        iteration++;
    }

    series.push({
        iteration,
        number: current,
        type: "Terminal",
        operation: "Reached 1"
    });

    return series;
}

// Collatz Negative
function computeCollatzNegative(seed: number): SeriesItem[] {
    const series: SeriesItem[] = []
    let current = seed
    let iteration = 0
    const seen = new Set<number>(); // Track seen numbers

    while (current !== -2) {
        if (detectLoop(current, seen)) {
            series.push({
                iteration,
                number: current,
                type: "Loop",
                operation: `Loop detected at ${current}`
            });
            break; // Exit on loop detection
        }

        const isEven = current % 2 === 0;
        const operation = isEven ? 
            `${current} × 3 + 1 = ${current * 3 + 1}` :
            `(${current} - 1) ÷ 2 = ${(current - 1) / 2}`;

        series.push({
            iteration,
            number: current,
            type: isEven ? "Even" : "Odd",
            operation
        });

        current = isEven ? current * 3 + 1 : (current - 1) / 2;
        iteration++;
    }

    series.push({
        iteration,
        number: current,
        type: "Terminal",
        operation: "Reached -2"
    });

    return series;
}

// Collatz Blu Negative
function computeCollatzBluNegative(seed: number): SeriesItem[] {
    const series: SeriesItem[] = []
    let current = seed
    let iteration = 0
    const seen = new Set<number>(); // Track seen numbers

    while (current !== -1 && current !== -5 && current !== -17) {
        if (detectLoop(current, seen)) {
            series.push({
                iteration,
                number: current,
                type: "Loop",
                operation: `Loop detected at ${current}`
            });
            break; // Exit on loop detection
        }

        const isOdd = current % 2 !== 0;
        const operation = isOdd ? 
            `${current} × 3 + 1 = ${current * 3 + 1}` :
            `${current} ÷ 2 = ${current / 2}`;

        series.push({
            iteration,
            number: current,
            type: isOdd ? "Odd" : "Even",
            operation
        });

        current = isOdd ? current * 3 + 1 : current / 2;
        iteration++;
    }

    series.push({
        iteration,
        number: current,
        type: "Terminal",
        operation: `Reached ${current}`
    });

    return series;
}

// Collatz Alternative
function computeCollatzAlternative(seed: number): SeriesItem[] {
    const series: SeriesItem[] = []
    let current = seed
    let iteration = 0

    // Add initial seed
    series.push({
        iteration,
        number: current,
        type: "Seed",
        operation: ""
    });
    iteration++;

    while (current !== 11) {  // Run until we reach 11
        const modFive = Math.abs(current) % 5;
        let nextNum: number;
        let type: string;
        let operation: string;

        switch (modFive) {
            case 0:
                nextNum = current / 5;
                type = "5a";
                operation = `${current} ÷ 5 = ${nextNum}`;
                break;
            case 4:
                nextNum = (7 * current) + 2;
                type = "5a + 4";
                operation = `7 × ${current} + 2 = ${nextNum}`;
                break;
            case 3:
                nextNum = (7 * current) + 4;
                type = "5a + 3";
                operation = `7 × ${current} + 4 = ${nextNum}`;
                break;
            case 2:
                nextNum = (7 * current) + 6;
                type = "5a + 2";
                operation = `7 × ${current} + 6 = ${nextNum}`;
                break;
            case 1:
                nextNum = (7 * current) + 3;
                type = "5a + 1";
                operation = `7 × ${current} + 3 = ${nextNum}`;
                break;
            default:
                nextNum = -1;
                type = "ERROR";
                operation = "ERROR";
        }

        series.push({
            iteration,
            number: nextNum,
            type,
            operation
        });

        current = nextNum;
        iteration++;
    }

    // Add final state when reaching 11
    series.push({
        iteration,
        number: current,
        type: "Terminal",
        operation: "Reached 11"
    });

    return series;
}

// Collatz Alternative A
function computeCollatzAlternativeA(seed: number): SeriesItem[] {
    const series: SeriesItem[] = []
    let current = seed
    let iteration = 0
    const seen = new Set<number>(); // Track seen numbers

    while (current !== 1 && current !== 6) {
        if (detectLoop(current, seen)) {
            series.push({
                iteration,
                number: current,
                type: "Loop",
                operation: `Loop detected at ${current}`
            });
            break; // Exit on loop detection
        }

        let nextNum: number;
        let type: string;
        let operation: string;

        if (current % 5 === 0) {
            nextNum = current / 5;
            type = "Div5";
            operation = `${current} ÷ 5 = ${nextNum}`;
        } else {
            const modFive = current % 5;
            switch (modFive) {
                case 2:
                    nextNum = 7 * current + 1;
                    type = "5a + 2";
                    operation = `7 × ${current} + 1 = ${nextNum}`;
                    break;
                case 4:
                    nextNum = 7 * current + 2;
                    type = "5a + 4";
                    operation = `7 × ${current} + 2 = ${nextNum}`;
                    break;
                case 1:
                    nextNum = 7 * current + 3;
                    type = "5a + 1";
                    operation = `7 × ${current} + 3 = ${nextNum}`;
                    break;
                case 3:
                    nextNum = 7 * current + 4;
                    type = "5a + 3";
                    operation = `7 × ${current} + 4 = ${nextNum}`;
                    break;
                default:
                    nextNum = current;
                    type = "ERROR";
                    operation = "ERROR";
            }
        }

        series.push({
            iteration,
            number: current,
            type,
            operation
        });

        current = nextNum;
        iteration++;
    }

    // Add final state
    series.push({
        iteration,
        number: current,
        type: "Terminal",
        operation: `Reached ${current}`
    });

    return series;
}

export const variants: CollatzVariant[] = [
    {
        name: "Collatz Classic",
        id: "classic",
        compute: computeCollatzClassic,
        description: "The original Collatz conjecture: odd numbers are multiplied by 3 and increased by 1, while even numbers are halved. This sequence always reaches 1, creating the famous '3n + 1' loop."
    },
    {
        name: "Collatz Blu",
        id: "blu",
        compute: computeCollatzBlu,
        description: "A variation where even numbers are multiplied by 3 and increased by 1, while odd numbers are decreased by 1 and halved. The sequence terminates at 0, 4, or 16, demonstrating different terminal points than the classic conjecture."
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
    },
    {
        name: "Collatz Alternative",
        id: "alternative",
        compute: computeCollatzAlternative,
        description: "A unique variation based on modulo 5. Numbers are transformed using different rules: if divisible by 5, divide by 5; otherwise multiply by 7 and add a constant based on the remainder. All sequences terminate at 11."
    },
    {
        name: "Collatz Alternative A",
        id: "alternative-a",
        compute: computeCollatzAlternativeA,
        description: "A modulo 5 variation where numbers divisible by 5 are divided by 5. Other numbers are transformed based on their remainder: multiply by 7 and add a specific constant. Sequences terminate at either 1 or 6."
    }
] 