import * as React from 'react';
import { Dimensions, View } from 'react-native';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import IconButton from '../common/icon-button';
import { Search } from '../../lib/icons/Search';
import { X } from '../../lib/icons/X';
import { useDebounce } from '../../util/hook/useDebounce';


const { width } = Dimensions.get('window');

type Prop = {
    search: string;
    setSearch: (search: string) => void;
};

export default function SearchButton({ search, setSearch }: Prop) {

    const [show, setShow] = useState(false)
    const [localSearch, setLocalSearch] = useState(search)
    const debouncedSearch = useDebounce(localSearch, 700)

    useEffect(() => {
        setSearch(debouncedSearch)
    }, [debouncedSearch])

    return (
        <View className='flex-row items-center gap-1'>
            {show ? (
                <IconButton
                    icon={<X className='text-foreground' size={17} />}
                    buttonSize={3}
                    possition={'other'}
                    onPress={() => setShow(false)}
                />
            ) : (
                <IconButton
                    icon={<Search className='text-foreground' size={17} />}
                    buttonSize={3}
                    possition={'other'}
                    onPress={() => setShow(true)}
                />
            )}
            <Input
                style={{ height: 22, fontSize: 14, width: width * 0.4 }}
                className={`py-1 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 ${!show && 'hidden'}`}
                placeholder='Aa'
                value={localSearch}
                onChangeText={setLocalSearch}
            />
        </View>
    )
}
