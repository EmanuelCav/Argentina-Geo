import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'

import Category from './components/category';
import ButtonMenu from '../buttonMenu';

import { menuStyles } from "../../styles/menu.styles";
import { homeStyles } from "../../styles/home.styles";

import { CategoriesProps } from '../../types/props.types';
import { ICategoriesUser } from '../../interface/Game';

const Categories = ({ user, categories, setIsCategories }: CategoriesProps) => {

    const [min, setMin] = useState<number>(0)
    const [max, setMax] = useState<number>(8)

    const acceptCategories = () => {
        setIsCategories(false)
    }

    const next = () => {
        if(max+9 > categories.length) {
            return
        }

        setMin(min+9)
        setMax(max+9)
    }

    const before = () => {
        if(min === 0) {
            return
        }

        setMin(min-9)
        setMax(max-9)
    }

    useEffect(() => {
    }, [max, min])

    return (
        <View style={menuStyles.containerCategories}>
            <View style={menuStyles.categoriesContain}>
                <View style={menuStyles.showCategoriesContain}>
                    {
                        categories.map((category: ICategoriesUser, index: number) => {
                            return <Category user={user} category={category} key={index} />
                        }).slice(min, max)
                    }
                </View>
                <View>
                <View />
                    <ButtonMenu text="Siguiente" redirect={next} isAccept={false} />
                </View>
                <View style={homeStyles.containerActionsView}>
                    <ButtonMenu text="Aceptar" redirect={acceptCategories} isAccept={true}  />
                </View>
            </View>
        </View>
    )
}

export default Categories