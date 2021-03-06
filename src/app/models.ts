export interface Product {
    id: number,
    name: string,
    price: number,
    creationDate: Date,
    description?: string,
    url?: string,
    thumbnailUrl?: string
}