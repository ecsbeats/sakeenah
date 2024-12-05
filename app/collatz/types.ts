export type SeriesItem = {
    iteration: number
    number: number
    type: string
    operation: string
}

export type CollatzVariant = {
    name: string
    id: string
    compute: (seed: number) => SeriesItem[]
    description: string
} 