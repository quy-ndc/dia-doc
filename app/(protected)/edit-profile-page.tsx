import * as React from 'react' 
import { useState } from 'react' 
import SetUpPatient from '../../components/set-up-screen/set-up-patient' 
import SetUpDoctor from '../../components/set-up-screen/set-up-doctor' 


export default function EditProfileScreen() {

    const [role, setRole] = useState('patient')

    return (
        <>
            {role == 'patient' ? (
                <SetUpPatient setRole={setRole} mode='edit' />
            ) : (
                <SetUpDoctor setRole={setRole} mode='edit' />
            )}
        </>
    ) 
}