import { Redirect, Slot } from 'expo-router';
import useUserStore from '../../store/userStore';
import { useLayoutEffect } from 'react';

export default function ProtectedLayout() {

    const { user } = useUserStore()
    if (!user.isAuthenticated) {
        return <Redirect href="/authen-screen" />;
    }

    if (user.isAuthenticated && !user.isSetUp) {
        return <Redirect href="/set-up-screen" />;
    }

    return <Slot />
}