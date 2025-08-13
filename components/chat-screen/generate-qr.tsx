import * as React from 'react'
import { Modal, View, StyleSheet, Pressable } from 'react-native'
import IconButton from '../common/icon-button'
import useUserStore from '../../store/userStore'
import { QrCode } from '../../lib/icons/QrCode'
import QRCode from 'react-native-qrcode-svg'

type Prop = {
    id: string
}

export default function GenerateQRButton({ id }: Prop) {
    const { user } = useUserStore()
    const [showQR, setShowQR] = React.useState(false)
    const [deepLink, setDeepLink] = React.useState('')

    const handleGenerate = () => {
        const link = `myapp://join-group-screen?group=${id}&user=${user.id}`
        setDeepLink(link)
        setShowQR(true)
    }

    return (
        <>
            <IconButton
                icon={<QrCode className='text-foreground' size={17} />}
                buttonSize={3}
                possition={'other'}
                onPress={handleGenerate}
            />

            <Modal
                visible={showQR}
                transparent
                animationType="fade"
                onRequestClose={() => setShowQR(false)}
            >
                <Pressable
                    style={styles.modalBackground}
                    onPress={() => setShowQR(false)}
                >
                    <View style={styles.qrContainer}>
                        {deepLink !== '' && <QRCode value={deepLink} size={200} />}
                    </View>
                </Pressable>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    qrContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
})
