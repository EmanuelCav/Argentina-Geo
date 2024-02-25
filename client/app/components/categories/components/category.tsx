import { Text, Dimensions, Pressable } from 'react-native'
import { useDispatch } from "react-redux";
import CheckBox from 'expo-checkbox'

import { menuStyles } from '../../../styles/menu.styles'

import { CategoryProps } from "../../../types/props.types";

import { updateCategory } from '../../../server/actions/user.actions';

const Category = ({ user, category }: CategoryProps) => {

    const dispatch = useDispatch()

    const selectCategory = async () => {
        dispatch(updateCategory({
            id: category._id,
            token: user.token
        }) as any)
    }

    const isSelect = () => {
        const categoryFound = user.user.categories.find(c => c.category._id === category._id)

        if (!categoryFound) return true

        if (!categoryFound.isSelect) {
            return false
        }

        return true

    }

    return (
        <Pressable style={({ pressed }) => [
            {
                backgroundColor: pressed ? '#DDDDDD' : '#FFFFFF',
            },
            menuStyles.categoryContainer
        ]}
            onPress={selectCategory}>
            <Text adjustsFontSizeToFit style={menuStyles.textCategory}>
                {category.name}
            </Text>
            {
                <CheckBox
                    value={isSelect()}
                    color={isSelect() ? '#597EEE' : undefined}
                    style={{ padding: Dimensions.get("window").height / 92.5 }}
                    onValueChange={selectCategory}
                />
            }
        </Pressable>
    )
}

export default Category