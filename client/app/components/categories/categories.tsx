import { useState, useEffect } from 'react'
import { View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';

import Category from './components/category';
import ButtonMenu from '../buttonMenu';

import { menuStyles } from "../../styles/menu.styles";
import { homeStyles } from "../../styles/home.styles";
import { configGamesStyles } from "../../styles/game.styles";

import { CategoriesProps } from '../../types/props.types';
import { ICategories } from '../../interface/Game';

const Categories = ({ user, categories, setIsCategories, isConnection }: CategoriesProps) => {

    const [min, setMin] = useState<number>(0)
    const [max, setMax] = useState<number>(8)

    const acceptCategories = () => {
        setIsCategories(false)
    }

    const next = () => {
        if (max > categories.length) {
            return
        }

        setMin(min + 8)
        setMax(max + 8)
    }

    const before = () => {
        if (min === 0) {
            return
        }

        setMin(min - 8)
        setMax(max - 8)
    }

    useEffect(() => {
    }, [max, min])

    return (
        <View style={configGamesStyles.containerConfigGames}>
            <View style={configGamesStyles.configGamesContain}>
                <View style={configGamesStyles.containShowConfig}>
                    <View style={menuStyles.showCategoriesContain}>
                        {
                            categories.map((category: ICategories, index: number) => {
                                return <Category user={user} category={category} isConnection={isConnection} key={index} />
                            }).slice(min, max)
                        }
                    </View>
                    <View style={configGamesStyles.containMoveCategories}>
                        <AntDesign name="left" style={min === 0 ? configGamesStyles.iconMoveCategoriesDisable : configGamesStyles.iconMoveCategories} onPress={before} />
                        <AntDesign name="right" style={max > categories.length ? configGamesStyles.iconMoveCategoriesDisable : configGamesStyles.iconMoveCategories} onPress={next} />
                    </View>
                </View>
                <View style={homeStyles.containerActionsView}>
                    <ButtonMenu text="Aceptar" redirect={acceptCategories} isAccept={true} isCategory={false} />
                </View>
            </View>
        </View>
    )
}

export default Categories