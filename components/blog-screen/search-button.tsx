import * as React from 'react';
import { Dimensions, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import IcoaaanButton from '../common/icon-button';
import { Search } from '../../lib/icons/Search';
import { X } from '../../lib/icons/X';
import { useDebounce } from '../../util/hook/useDebounce';

const { width } = Dimensions.get('window')

type Prop = {
    search: string
    setSearch: (search: string) => void
};

export default function SearchButton({ search, setSearch }: Prop) {
    const [localSearch, setLocalSearch] = useState(search)
    const debouncedSearch = useDebounce(localSearch, 700)
    const inputRef = useRef<any>(null)

    useEffect(() => {
        setSearch(debouncedSearch)
    }, [debouncedSearch])

    return (
        <View className='flex-row items-center gap-1'>
            {/* <IconButton
                icon={<X className='text-foreground' size={17} />}
                buttonSize={3}
                possition={'other'}
                onPress={() => setSearch('')}
            /> */}
            <Input
                ref={inputRef}
                style={{ height: 23, fontSize: 14, width: width * 0.4 }}
                className={`py-1 border-0 border-b border-gray-300 focus:outline-none focus:ring-0`}
                placeholder='Tìm kiếm bài viết'
                value={localSearch}
                onChangeText={setLocalSearch}
            />
        </View>
    );
}
