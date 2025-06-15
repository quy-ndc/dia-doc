import * as React from 'react';
import { Dimensions, View } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Input } from '../ui/input';
import { useDebounce } from '../../util/hook/useDebounce';
import { Search } from '../../lib/icons/Search';

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
        <View className='flex-row items-center gap-2 border-0 border-b border-gray-300'>
            <Search className='text-foreground' size={19} />
            <Input
                ref={inputRef}
                style={{ fontSize: 14, minWidth: width * 0.4 }}
                className={`border-0 focus:outline-none focus:ring-0`}
                placeholder='Tìm kiếm bài viết'
                value={localSearch}
                onChangeText={setLocalSearch}
            />
        </View>
    );
}
