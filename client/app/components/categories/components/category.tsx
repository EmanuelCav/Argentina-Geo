import { Dimensions, Pressable, Text, View } from 'react-native'
import Checkbox from 'expo-checkbox'

import { CategoryPropsType } from '../../../types/categories.types'

import { categoriesStyles } from '../../../styles/categories.styles'

const Category = ({ category, changeCategory }: CategoryPropsType) => {

    return (
        <Pressable style={({ pressed }) => [
            {
                backgroundColor: pressed ? '#6b8cf2' : '#597EEE'
            },
            categoriesStyles.containCategory
        ]} onPress={() => changeCategory(category.category._id)}>
            <View style={{ width: '94%' }}>
                <Text style={categoriesStyles.categoryText}>{category.category.name}</Text>
            </View>
            <Checkbox
                value={category.isSelect}
                style={{ padding: Dimensions.get("window").height / 92.5 }}
                onValueChange={() => changeCategory(category.category._id)}
                color={"#7aadf0"}
            />
        </Pressable>
    )
}

export default Category