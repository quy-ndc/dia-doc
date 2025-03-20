import Ably from 'ably';
import { AblyProvider } from 'ably/react';

export default function AblyWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const client = new Ably.Realtime({ key: 'WhRbFA.7P4C7w:lV-MRhuTs5xGaYE6L0nFNsgx4bzTGNuOuspXpqxHjw0' });

    // const registerDevice = async () => {
    //     await client.push.activate()
    // }

    // useEffect(() => {
    //     registerDevice();
    // }, [])

    return (
        <AblyProvider client={client}>
            {children}
        </AblyProvider>
    );
}