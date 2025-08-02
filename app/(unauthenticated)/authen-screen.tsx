import * as React from 'react'
import { Pressable, View } from 'react-native'
import { Text } from '../../components/ui/text'
import { Image } from 'expo-image'
import { useEffect, useState } from 'react'
import { useLoginUserMutation } from '../../service/query/auth-query'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '../../components/ui/input'
import { Eye } from '../../lib/icons/Eye'
import { EyeOff } from '../../lib/icons/EyeOff'
import SpinningIcon from '../../components/common/icons/spinning-icon'
import { Loader } from '../../lib/icons/Loader'
import { LogIn } from '../../lib/icons/Login'
import { Link, useRouter } from 'expo-router'
import { ArrowLeft } from '../../lib/icons/ArrowLeft'
import useUserStore from '../../store/userStore'
import { User } from '../../assets/types/zustand/user-z'
import { UserRole } from '../../assets/enum/user-role'

export default function LoginScreen() {

    const router = useRouter()
    const { setUser } = useUserStore()
    const { mutateAsync, isLoading, isError, data } = useLoginUserMutation()
    const [show, setShow] = useState(false)

    const schema = yup.object({
        phone: yup
            .string()
            .required('Không được trống')
            .matches(/^0\d{9}$/, 'Phải bắt đầu bằng 0 và gồm 10 chữ số'),
        password: yup.string().required('Không được trống')
    }).required()

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            phone: '',
            password: ''
        }
    })

    const onLogin = async (data: any) => {
        await mutateAsync({
            phoneNumber: data.phone,
            password: data.password
        })
    }

    useEffect(() => {
        if (!data?.data || isError || data.status !== 200) return
        const result = data?.data?.data
        const userData: User = {
            isAuthenticated: true,
            isSetUp: result.authUser.isFirstUpdated,
            accessToken: result.authToken.accessToken || '',
            refreshToken: result.authToken.refreshToken || '',
            expiresAt: result.authToken.expiresAt || '',
            id: result.authUser.id || '',
            role: result.authUser.roles[0],
            fullname: result.authUser.fullName || '',
            avatar: result.authUser.avatarUrl || '',
        }
        setUser(userData)
        if (result.authUser.isFirstUpdated) {
            router.replace('/')
        } else {
            if (result.authUser.roles[0] === UserRole.PATIENT) {
                router.replace('/set-up-screen')
            } else {
                router.replace('/change-password-screen')
            }
        }
    }, [data, isLoading])

    return (
        <View className='flex-1 w-full flex-col gap-10 justify-center items-center'>
            <View className='flex-col gap-2 items-center'>
                <View className="flex-col gap-2 justify-center items-center">
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={require('../../assets/images/logo.png')}
                        contentFit="contain"
                    />
                    <Text className="text-3xl font-bold text-[#248fca] tracking-wider uppercase">Đăng nhập</Text>
                </View>
                <Text className='text-base font-semibold tracking-wider'>Nhập thông tin để tiếp tục</Text>
            </View>
            <View className='flex-col w-full gap-6 justify-center items-center px-5'>
                <View className='flex-col gap-2 w-full'>
                    <Text className='text-base font-bold tracking-widest capitalize'>Số điện thoại</Text>
                    <Controller
                        control={control}
                        name="phone"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <Input
                                    style={{ letterSpacing: 2, borderRadius: 100 }}
                                    placeholder={'0123456789'}
                                    value={value}
                                    maxLength={10}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    keyboardType='numeric'
                                />
                                {errors.phone && <Text className='text-red-500'>{errors.phone.message}</Text>}
                            </>
                        )}
                    />
                </View>
                <View className='flex-col gap-2 w-full'>
                    <Text className='text-base font-bold tracking-widest capitalize'>Mật khẩu</Text>
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <>
                                <View className='relative'>
                                    <Input
                                        style={{ letterSpacing: 3, borderRadius: 100 }}
                                        placeholder={show ? '123456789' : '********'}
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        secureTextEntry={!show}
                                    />
                                    <Pressable
                                        className='absolute right-1 -translate-y-1/2 top-[50%] p-2 rounded-full active:bg-[var(--click-bg)]'
                                        onPress={() => setShow(!show)}
                                    >
                                        {show ? (
                                            <Eye className='text-foreground' size={18} />
                                        ) : (
                                            <EyeOff className='text-foreground' size={18} />
                                        )}
                                    </Pressable>
                                </View>
                                {errors.password && <Text className='text-red-500'>{errors.password.message}</Text>}
                            </>
                        )}
                    />
                </View>
                <View className='flex-row items-center w-full justify-between px-2'>
                    <View />
                    <Link
                        className='font-semibold underline'
                        href={'/forgot-password-screen'}
                    >
                        Quên mật khẩu
                    </Link>
                </View>
                <View className='flex-col gap-3 w-full items-center'>
                    <Pressable
                        style={{ opacity: isLoading ? 0.5 : 1 }}
                        className="flex-row w-full gap-2 px-5 py-3 justify-center items-center bg-[var(--oppo-theme-col)] border border-[var(--same-theme-col)] rounded-full active:bg-[var(--oppo-click-bg)]"
                        disabled={isLoading}
                        onPress={handleSubmit(onLogin)}
                    >
                        <Text className="text-base text-[var(--same-theme-col)] font-semibold tracking-wider capitalize">Đăng nhập</Text>
                        {isLoading ? (
                            <SpinningIcon icon={<Loader className='text-[var(--same-theme-col)]' size={17} />} />
                        ) : (
                            <LogIn className="text-[var(--same-theme-col)]" size={17} />
                        )}
                    </Pressable>

                    <Pressable
                        style={{ opacity: isLoading ? 0.5 : 1 }}
                        className="flex-row w-full gap-2 px-5 py-3 justify-center items-center border border-[var(--oppo-theme-col)] rounded-full active:bg-[var(--click-bg)]"
                        disabled={isLoading}
                        onPress={() => router.back()}
                    >
                        {isLoading ? (
                            <SpinningIcon icon={<Loader className='text-[var(--oppo-theme-col)]' size={17} />} />
                        ) : (
                            <ArrowLeft className="text-[var(--oppo-theme-col)]" size={17} />
                        )}
                        <Text className="text-base text-[var(--oppo-theme-col)] font-semibold tracking-wider capitalize">Quay lại</Text>
                    </Pressable>
                </View>
                <View className='flex-row gap-2 items-center'>
                    <Text className='tracking-wider'>Chưa có tài khoản?</Text>
                    <Link
                        className='text-blue-400 font-semibold underline'
                        href={'/register-screen'}
                    >
                        Đăng ký
                    </Link>
                </View>
            </View >
        </View>
    )
}