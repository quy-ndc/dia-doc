import { Pressable } from 'react-native';

type Prop = {
    icon: React.ReactNode;
    buttonSize: number;
    onClick: () => void;
}

export default function CameraButton({ icon, buttonSize, onClick }: Prop) {

    return (
        <Pressable
            className={`p-${buttonSize} items-center justify-center rounded-full active:bg-[var(--camera-click-bg)]`}
            onPress={onClick}
        >
            {icon}
        </Pressable>
    )
}
