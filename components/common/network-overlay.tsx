import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import useNetworkStore from "../../store/networkStore";

export default function NetworkOverlay() {
    const [loading, setLoading] = useState(false);
    const isConnected = useNetworkStore((state) => state.isConnected);
    const [visible, setVisible] = useState(!isConnected);
    const [statusText, setStatusText] = useState("Không có tín hiệu");

    useEffect(() => {
        if (isConnected) {
            setLoading(true);
            setStatusText("Đã kết nối!");

            const timer = setTimeout(() => {
                setLoading(false);
                setVisible(false);
            }, 1500);

            return () => clearTimeout(timer);
        } else {
            setVisible(true);
            setStatusText("Không có tín hiệu");
        }
    }, [isConnected]);

    if (!visible) return null;

    return (
        <View className={`absolute bottom-0 left-0 w-full h-7 flex items-center justify-center z-50 ${loading ? 'bg-green-500' : 'bg-[var(--same-theme-col)]'}`}>
            <View className="pointer-events-auto flex items-center gap-4">
                <Text className="text-sm text-[var(--oppo-theme-col)] tracking-widest">
                    {statusText}
                </Text>
            </View>
        </View>
    );
}
