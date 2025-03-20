import * as React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '../components/ui/text';
import SetUpPaitient from '../components/set-up-screen/set-up-paitient';
import { useState } from 'react';
import SetUpDoctor from '../components/set-up-screen/set-up-doctor';


export default function SetUpScreen() {

    // useEffect(() => {
    //     const getDeviceID = async () => {
    //         const uniqueId = await DeviceInfo.getUniqueId();
    //         console.log("Device Unique ID:", uniqueId);
    //     };

    //     getDeviceID();
    // }, []);

    const [preview, setPreview] = useState<'paitient' | 'doctor'>('paitient')
    const [role, setRole] = useState('')

    return (
        <>
            {role == 'paitient' ? (
                <SetUpPaitient setRole={setRole} />
            ) : role == 'doctor' ? (
                <SetUpDoctor setRole={setRole} />
            ) : (
                <View className='flex-1 justify-center items-center gap-8'>
                    <Text className='text-2xl pb-2 font-bold tracking-widest uppercase'>Bạn là Ai?</Text>
                    <View className='flex-row gap-5 items-center'>
                        <Pressable
                            className={`px-6 py-3 border-[0.5px] border-[var(--oppo-theme-col)] rounded-full ${preview == 'paitient' && 'bg-[--oppo-theme-col]'}`}
                            onPress={() => setPreview('paitient')}
                        >
                            <Text className={`text-lg tracking-wider capitalize ${preview == 'paitient' && 'text-[var(--same-theme-col)] font-bold'}`}>
                                Bệnh Nhân
                            </Text>
                        </Pressable>
                        <Pressable
                            className={`px-6 py-3 border-[0.5px] border-[var(--oppo-theme-col)] rounded-full ${preview == 'doctor' && 'bg-[--oppo-theme-col]'}`}
                            onPress={() => setPreview('doctor')}
                        >
                            <Text className={`text-lg tracking-wider capitalize ${preview == 'doctor' && 'text-[var(--same-theme-col)] font-bold'}`}>Bác sĩ</Text>
                        </Pressable>
                    </View>
                    <Pressable
                        className='px-5 py-3 rounded-md active:bg-[var(--click-bg)]'
                        onPress={() => setRole(preview)}
                    >
                        <Text className='text-lg font-bold tracking-widest'>Xác nhận</Text>
                    </Pressable>
                </View>
            )}
        </>
    );
}