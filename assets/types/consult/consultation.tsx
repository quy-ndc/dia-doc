import { PackageFeatureType } from "../../enum/package-feature"

export type ServicePackage = {
    id: string
    name: string
    price: number
    createdDate: string
    type: {
        id: string
        name: string
        createdDate: string
    }
    features: PackageFeature[]
}

export type PackageFeature = {
    id: string
    type: PackageFeatureType
    name: string
    featureValue: {
        value: number
        type: string
    }
    createdDate: string
}

export type PurchasedServicePackage = {
    id: string
    information: string
    priceAtPurchased: number
    purchasedDate: string
    servicePackage: ServicePackage
}