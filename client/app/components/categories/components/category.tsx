import { useEffect, useRef } from "react";
import { Text, Dimensions, Animated, Pressable } from 'react-native'
import { useDispatch } from "react-redux";
import CheckBox from 'expo-checkbox'
import AntDesign from 'react-native-vector-icons/AntDesign';

import { unlockCategoryApi, updateCategoryApi } from "../../../server/api/user.api";
import { updateOptionsAction } from "../../../server/features/user.features";

import { menuStyles } from '../../../styles/menu.styles'

import { CategoryProps } from "../../../types/props.types";

const Category = ({ user, category, isConnection }: CategoryProps) => {

    const dispatch = useDispatch()

    const animate = useRef(new Animated.Value(0.5)).current

    const selectCategory = async () => {

        if(isConnection) {
            try {
                const { data } = await updateCategoryApi(category._id, user.token)
                dispatch(updateOptionsAction(data))
            } catch (error) {
                console.log(error);
            }
        }
    }

    const newUnlock = async () => {

        if(isConnection) {
            if (user.user.categories.filter((u) => u.isUnlocked).length !== user.user.level.level) {
                try {
                    const { data } = await unlockCategoryApi(category._id, user.token)
                    dispatch(updateOptionsAction(data))
                } catch (error) {
                    console.log(error);
                }
            }
        }

    }

    useEffect(() => {
    }, [user.user, dispatch])

    useEffect(() => {
        if (user.user.categories.filter((u) => u.isUnlocked).length !== user.user.level.level) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(animate, {
                        toValue: 45,
                        useNativeDriver: true,
                        delay: 1000
                    }),
                    Animated.timing(animate, {
                        toValue: -45,
                        useNativeDriver: true
                    }),
                    Animated.timing(animate, {
                        toValue: 0,
                        useNativeDriver: true
                    })
                ])
            )
                .start();
        }
    }, []);

    return (
        <Pressable style={category.isUnlocked ? menuStyles.categoryContainer : menuStyles.categoryContainerUnlocked}
            onPress={category.isUnlocked ?
                (selectCategory) : (user.user.categories.filter((u) => u.isUnlocked).length !== user.user.level.level ? (newUnlock) : null)}>
            <Text adjustsFontSizeToFit style={category.isUnlocked ? menuStyles.textCategory : menuStyles.textCategoryUnlocked}>
                {category.category.name}
            </Text>
            {
                category.isUnlocked ? (
                    <CheckBox
                        value={category.isSelect}
                        color={category.isSelect ? '#597EEE' : undefined}
                        style={{ padding: Dimensions.get("window").height / 92.5 }}
                    />
                ) : (
                    <>
                        {
                            user.user.categories.filter((u) => u.isUnlocked).length === user.user.level.level ? (
                                <AntDesign name="lock" color={"#fff"} size={Dimensions.get('window').height / 37} />
                            ) : (
                                <Animated.View style={{
                                    transform: [
                                        {
                                            rotate: animate.interpolate({
                                                inputRange: [0, 100],
                                                outputRange: ['0deg', '45deg']
                                            }),
                                        },
                                    ]
                                }}>
                                    <AntDesign name="unlock" color={"#fff"} size={Dimensions.get('window').height / 37} />
                                </Animated.View>
                            )
                        }
                    </>
                )
            }
        </Pressable>
    )
}

export default Category