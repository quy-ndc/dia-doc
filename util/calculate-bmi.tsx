export function calculateBMI(weightKg: number, heightCm: number): number {
    const heightM = heightCm / 100;
    return parseFloat((weightKg / (heightM * heightM)).toFixed(1))
}