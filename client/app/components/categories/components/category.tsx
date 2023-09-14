import { useEffect } from "react";
import { View, Text } from 'react-native'
import { useDispatch } from "react-redux";
import CheckBox from 'expo-checkbox'

import { updateCategoryApi } from "../../../server/api/user.api";
import { updateOptionsAction } from "../../../server/features/user.features";

import { menuStyles } from '../../../styles/menu.styles'

import { CategoryProps } from "../../../types/props.types";

const Category = ({ user, category }: CategoryProps) => {

    const dispatch = useDispatch()

    const selectCategory = async () => {

        try {
            const { data } = await updateCategoryApi(category._id, user.token)
            dispatch(updateOptionsAction(data))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
    }, [user.user])

    return (
        <View style={category.isUnlocked ? menuStyles.categoryContainer : menuStyles.categoryContainerUnlocked}>
            <Text style={category.isUnlocked ? menuStyles.textCategory : menuStyles.textCategoryUnlocked}>
                {category.category.name}
            </Text>
            {
                category.isUnlocked &&
                <CheckBox
                    value={category.isSelect}
                    onValueChange={selectCategory}
                    color={category.isSelect ? '#597EEE' : undefined}
                />
            }
        </View>
    )
}

export default Category