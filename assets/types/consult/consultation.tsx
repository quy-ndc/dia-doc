export type ServicePackage = {
    id: string
    name: string
    description: string
    price: number
    sessions: number
    durationInMonths: number
    isActive: boolean
    createdDate: string
}

export type PurchasedServicePackage = {
    id: string
    packageName: string
    priceAtPurchased: number
    totalSessions: number
    remainingSessions: number
    expireDate: string
    isExpired: boolean
    purchasedDate: string
}