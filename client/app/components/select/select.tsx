import { View, FlatList, Text } from 'react-native'

const renderItem = ({ item }: { item: string }) => {
    return (
        <Text>{item}</Text>
    )
}

const Select = ({ data }: { data: string[] }) => {
    return (
        <FlatList
            data={data}
            renderItem={renderItem}
        />
    )
}

export default Select