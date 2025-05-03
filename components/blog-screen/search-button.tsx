import * as React from 'react';
import { Dimensions, Modal, Pressable, View } from 'react-native';
import { Text } from '../../components/ui/text'
import { Search } from '../../lib/icons/Search';
import { useState } from 'react';
import IconButton from '../common/icon-button';




export default function SearchButton() {


    return (
        <>
            <IconButton
                icon={<Search className='text-foreground' size={17} />}
                buttonSize={3}
                possition={'other'}
                onPress={() => console.log('aa')}
            />
        </>
    )
}