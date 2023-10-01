import { useEffect } from "react";
import { View, Text, Dimensions } from 'react-native'
import { useDispatch } from "react-redux";
import CheckBox from 'expo-checkbox'
import AntDesign from 'react-native-vector-icons/AntDesign';

import { unlockCategoryApi, updateCategoryApi } from "../../../server/api/user.api";
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

    const newUnlock = async () => {

        if (user.user.categories.filter((u) => u.isUnlocked === true).length !== user.user.level.level) {
            try {
                const { data } = await unlockCategoryApi(category._id, user.token)
                dispatch(updateOptionsAction(data))
            } catch (error) {
                console.log(error);
            }
        }

    }

    useEffect(() => {
    }, [user.user, dispatch])

    return (
        <View style={category.isUnlocked ? menuStyles.categoryContainer : menuStyles.categoryContainerUnlocked}>
            <Text adjustsFontSizeToFit style={category.isUnlocked ? menuStyles.textCategory : menuStyles.textCategoryUnlocked}>
                {category.category.name}
            </Text>
            {
                category.isUnlocked ? (
                    <CheckBox
                        value={category.isSelect}
                        onValueChange={selectCategory}
                        color={category.isSelect ? '#597EEE' : undefined}
                        style={menuStyles.iconCategory}
                    />
                ) : (
                    <>
                        {
                            user.user.categories.filter((u) => u.isUnlocked === true).length === user.user.level.level ? (
                                <AntDesign name="lock" color={"#fff"} size={Dimensions.get('window').height / 37} />
                            ) : (
                                <AntDesign name="unlock" color={"#fff"} size={Dimensions.get('window').height / 37} onPress={newUnlock} />
                            )
                        }
                    </>
                )
            }
        </View>
    )
}

export default Category