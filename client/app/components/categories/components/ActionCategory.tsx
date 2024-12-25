import { Text, Pressable } from 'react-native'

import { categoriesStyles } from '../../../styles/categories.styles'

import { ActionCategoryPropsType } from '../../../types/categories.types'

const ActionCategory = ({ text, handleAction, action }: ActionCategoryPropsType) => {
    return (
        <Pressable style={({ pressed }) => [
            {
                backgroundColor: pressed ? '#6b8cf2' : '#597EEE'
            },
            categoriesStyles.buttonActionCategory
        ]} onPress={() => handleAction(action)}>
            <Text style={categoriesStyles.textButtonActionCategory}>{text}</Text>
        </Pressable>
    )
}

export default ActionCategory