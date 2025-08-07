import * as React from 'react'
import { Dimensions, Modal, Pressable, View } from 'react-native'
import { Text } from '../../ui/text'
import { useEffect, useState } from 'react'
import { useChangePasswordMutation, useResendOtpChangePasswordMutation } from '../../../service/query/auth-query'
import { LockKeyholeOpen } from '../../../lib/icons/LockKeyholeOpen'
import SpinningIcon from '../../common/icons/spinning-icon'
import { Loader } from '../../../lib/icons/Loader'
import { Input } from '../../ui/input'
import { Eye } from '../../../lib/icons/Eye'
import { EyeOff } from '../../../lib/icons/EyeOff'
import { Check } from '../../../lib/icons/Check'
import { X } from '../../../lib/icons/X'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { GlobalColor } from '../../../global-color'
import { Info } from '../../../lib/icons/Info'

const { width } = Dimensions.get('window')

const schema = yup.object({
    otp: yup
        .string()
        .required('Không được trống')
        .matches(/^\d{6}$/, 'Mã OTP phải gồm 6 chữ số'),
    oldPassword: yup
        .string()
        .required('Không được trống')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    newPassword: yup
        .string()
        .required('Không được trống')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: yup
        .string()
        .required('Không được trống')
        .oneOf([yup.ref('newPassword')], 'Mật khẩu không khớp')
}).required()

export default function ChangePasswordModal() {

    const [visible, setVisible] = useState(false)
    const { mutateAsync: changePassword, isLoading: isLoadingChangePassword, data: changePasswordData } = useChangePasswordMutation()
    const { mutateAsync: sendOtp, isLoading: isLoadingSendOtp, data: resendOtpData } = useResendOtpChangePasswordMutation()
    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            otp: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    })

    const onSubmit = async (data: any) => {
        await changePassword({
            otp: data.otp,
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        })
    }

    const onSendOtp = async () => {
        await sendOtp()
    }

    useEffect(() => {
        if (!resendOtpData || resendOtpData.status !== 200) return
        setVisible(true)
    }, [isLoadingSendOtp, resendOtpData])

    useEffect(() => {
        if (!changePasswordData || changePasswordData.status !== 200) return
        setVisible(false)
    }, [isLoadingChangePassword, changePasswordData])

    return (
        <>
            <Pressable
                style={{ width: width * 0.93 }}
                className={`flex-row items-center justify-center px-4 py-3 gap-2 rounded-xl active:bg-[var(--click-bg)] w-full`}
                disabled={isLoadingSendOtp}
                onPress={onSendOtp}
            >
                {isLoadingSendOtp ? (
                    <SpinningIcon icon={<Loader className='text-foreground' size={17} />} />
                ) : (
                    <LockKeyholeOpen className='text-foreground' size={17} />
                )}
                <Text className='text-base font-semibold tracking-wider capitalize'>
                    Đổi mật khẩu
                </Text>
            </Pressable>
            <Modal
                visible={visible}
                animationType='slide'
                onRequestClose={() => setVisible(false)}
            >
                <View className='flex-1 bg-background p-5'>
                    <View className='flex-col w-full gap-6 justify-center items-center'>
                        <View
                            style={{
                                backgroundColor: GlobalColor.BLUE_NEON_BG,
                                width: width * 0.95,
                            }}
                            className='flex-row gap-2 p-3 rounded-xl'
                        >
                            <Info
                                className='mt-1'
                                color={GlobalColor.BLUE_NEON_BORDER}
                                size={17}
                            />
                            <View className='flex-1'>
                                <Text className='text-base font-medium tracking-wider flex-wrap'>
                                    1 mã OTP đã được gửi đến số điện thoại của bạn vui lòng kiểm tra tin nhắn
                                </Text>
                            </View>
                        </View>
                        <View className='flex-col gap-2 w-full'>
                            <Text className='text-base font-bold tracking-widest'>Mã OTP</Text>
                            <Controller
                                control={control}
                                name="otp"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <>
                                        <Input
                                            style={{ letterSpacing: 2, borderRadius: 100 }}
                                            placeholder={'123456'}
                                            value={value}
                                            maxLength={6}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            keyboardType='numeric'
                                        />
                                        {errors.otp && <Text className='text-red-500'>{errors.otp.message}</Text>}
                                    </>
                                )}
                            />
                        </View>
                        <View className='flex-col gap-2 w-full'>
                            <Text className='text-base font-bold tracking-widest capitalize'>Mật khẩu cũ</Text>
                            <Controller
                                control={control}
                                name="oldPassword"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <>
                                        <View className='relative'>
                                            <Input
                                                style={{ letterSpacing: 3, borderRadius: 100 }}
                                                placeholder={showOldPassword ? '123456789' : '********'}
                                                value={value}
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                secureTextEntry={!showOldPassword}
                                            />
                                            <Pressable
                                                className='absolute right-1 -translate-y-1/2 top-[50%] p-2 rounded-full active:bg-[var(--click-bg)]'
                                                onPress={() => setShowOldPassword(!showOldPassword)}
                                            >
                                                {showOldPassword ? (
                                                    <Eye className='text-foreground' size={18} />
                                                ) : (
                                                    <EyeOff className='text-foreground' size={18} />
                                                )}
                                            </Pressable>
                                        </View>
                                        {errors.oldPassword && <Text className='text-red-500'>{errors.oldPassword.message}</Text>}
                                    </>
                                )}
                            />
                        </View>
                        <View className='flex-col gap-2 w-full'>
                            <Text className='text-base font-bold tracking-widest capitalize'>Mật khẩu mới</Text>
                            <Controller
                                control={control}
                                name="newPassword"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <>
                                        <View className='relative'>
                                            <Input
                                                style={{ letterSpacing: 3, borderRadius: 100 }}
                                                placeholder={showNewPassword ? '123456789' : '********'}
                                                value={value}
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                secureTextEntry={!showNewPassword}
                                            />
                                            <Pressable
                                                className='absolute right-1 -translate-y-1/2 top-[50%] p-2 rounded-full active:bg-[var(--click-bg)]'
                                                onPress={() => setShowNewPassword(!showNewPassword)}
                                            >
                                                {showNewPassword ? (
                                                    <Eye className='text-foreground' size={18} />
                                                ) : (
                                                    <EyeOff className='text-foreground' size={18} />
                                                )}
                                            </Pressable>
                                        </View>
                                        {errors.newPassword && <Text className='text-red-500'>{errors.newPassword.message}</Text>}
                                    </>
                                )}
                            />
                        </View>
                        <View className='flex-col gap-2 w-full'>
                            <Text className='text-base font-bold tracking-widest capitalize'>Nhập lại mật khẩu</Text>
                            <Controller
                                control={control}
                                name="confirmPassword"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <>
                                        <View className='relative'>
                                            <Input
                                                style={{ letterSpacing: 3, borderRadius: 100 }}
                                                placeholder={showConfirmPassword ? '123456789' : '********'}
                                                value={value}
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                secureTextEntry={!showConfirmPassword}
                                            />
                                            <Pressable
                                                className='absolute right-1 -translate-y-1/2 top-[50%] p-2 rounded-full active:bg-[var(--click-bg)]'
                                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? (
                                                    <Eye className='text-foreground' size={18} />
                                                ) : (
                                                    <EyeOff className='text-foreground' size={18} />
                                                )}
                                            </Pressable>
                                        </View>
                                        {errors.confirmPassword && <Text className='text-red-500'>{errors.confirmPassword.message}</Text>}
                                    </>
                                )}
                            />
                        </View>

                        <View className='flex-col gap-3 w-full items-center'>
                            <Pressable
                                style={{ opacity: isLoadingChangePassword ? 0.5 : 1 }}
                                className="flex-row w-full gap-2 px-5 py-3 justify-center items-center bg-[var(--oppo-theme-col)] border border-[var(--same-theme-col)] rounded-full active:bg-[var(--oppo-click-bg)]"
                                disabled={isLoadingChangePassword}
                                onPress={handleSubmit(onSubmit)}
                            >
                                <Text className="text-base text-[var(--same-theme-col)] font-semibold tracking-wider capitalize">Đồng ý</Text>
                                {isLoadingChangePassword ? (
                                    <SpinningIcon icon={<Loader className='text-[var(--same-theme-col)]' size={18} />} />
                                ) : (
                                    <Check className="text-[var(--same-theme-col)]" size={18} />
                                )}
                            </Pressable>

                            <Pressable
                                style={{ opacity: isLoadingChangePassword ? 0.5 : 1 }}
                                className="flex-row w-full gap-2 px-5 py-3 justify-center items-center border border-[var(--oppo-theme-col)] rounded-full active:bg-[var(--click-bg)]"
                                disabled={isLoadingChangePassword}
                                onPress={() => setVisible(false)}
                            >
                                {isLoadingChangePassword ? (
                                    <SpinningIcon icon={<Loader className='text-[var(--oppo-theme-col)]' size={18} />} />
                                ) : (
                                    <X className="text-[var(--oppo-theme-col)]" size={18} />
                                )}
                                <Text className="text-base text-[var(--oppo-theme-col)] font-semibold tracking-wider capitalize">Hủy</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}
