import React, { useEffect, useState } from "react";
import { View, Text, Platform, Dimensions } from "react-native";
import useNetworkStore from "../../store/networkStore";

const { height } = Dimensions.get("window");

export default function NetworkOverlay() {
    const isConnected = useNetworkStore((state) => state.isConnected);
    const [visible, setVisible] = useState(!isConnected);
    const [statusText, setStatusText] = useState("Không có tín hiệu");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isConnected) {
            setLoading(true);
            setStatusText("Đã kết nối!");

            setTimeout(() => {
                setLoading(false);
                setVisible(false);
            }, 1500);
        } else {
            setVisible(true);
            setStatusText("Không có tín hiệu");
        }
    }, [isConnected])

    if (!visible) return null

    return (
        <View
            style={{ height: Platform.OS == "ios" ? height * 0.104 + 20 : height * 0.07 + 20 }}
            className={`absolute bottom-0 left-0 w-full flex-col z-50 ${loading ? 'opacity-100' : 'opacity-90'}`}
        >
            <View
                style={{ height: 22 }}
                className={`w-full flex items-center justify-center ${loading ? "bg-green-500" : "bg-red-600"}`}
            >
                <Text className="text-sm text-white font-bold tracking-widest">
                    {statusText}
                </Text>
            </View>
        </View>
    );
}
