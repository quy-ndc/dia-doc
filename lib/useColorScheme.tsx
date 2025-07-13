import { useColorScheme as useNativewindColorScheme } from 'nativewind'
import useConfigStore from '../store/appConfigStore'

export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useNativewindColorScheme()
  const { theme } = useConfigStore()
  setColorScheme(theme)

  return {
    colorScheme: colorScheme ?? 'light',
    isDarkColorScheme: colorScheme === 'dark',
    setColorScheme,
    toggleColorScheme,
  }
}
