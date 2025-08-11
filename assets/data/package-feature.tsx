import { PackageFeatureType } from "../enum/package-feature"
import { PackageFeature } from "../types/consult/consultation"

export function getPackageFeatureDisplay(item: PackageFeature): string {
    switch (item.type) {
        case PackageFeatureType.MAX_CONSULTATION:
            return `${item.featureValue.value} lượt tư vấn`
        case PackageFeatureType.ADDITIONAL_NOTE:
            return item.featureValue.value.toString()
        default:
            return 'Unknown'
    }
}
