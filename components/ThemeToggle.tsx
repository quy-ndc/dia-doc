import { setAndroidNavigationBar } from '../lib/android-navigation-bar';
import { MoonStar } from '../lib/icons/MoonStar';
import { Sun } from '../lib/icons/Sun';
import { useColorScheme } from '../lib/useColorScheme';
import IconButton from './common/icon-button';

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  function toggleColorScheme() {
    const newTheme = isDarkColorScheme ? 'light' : 'dark';
    setColorScheme(newTheme);
    setAndroidNavigationBar(newTheme);
  }

  return (
    <IconButton
      icon={isDarkColorScheme ?
        <MoonStar className='text-foreground' size={21} strokeWidth={1.25} /> :
        <Sun className='text-foreground' size={21} strokeWidth={1.25} />
      }
      buttonSize={3}
      possition='other'
      onPress={toggleColorScheme}
    />
  );
}
