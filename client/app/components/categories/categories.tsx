import { View } from 'react-native'

import Category from './components/category';
import ButtonMenu from '../buttonMenu';

import { menuStyles } from "../../styles/menu.styles";
import { homeStyles } from "../../styles/home.styles";

import { CategoriesProps } from '../../types/props.types';
import { ICategoriesUser } from '../../interface/Game';

const Categories = ({ categories, setIsCategories }: CategoriesProps) => {

    const acceptCategories = () => {
        setIsCategories(false)
    }

    return (
        <View style={menuStyles.containerCategories}>
            <View style={menuStyles.categoriesContain}>
                <View>
                    {
                        categories.map((category: ICategoriesUser, index: number) => {
                            return <Category category={category.category.name} key={index} />
                        })
                    }
                </View>
                <View style={homeStyles.containerActionsView}>
                    <ButtonMenu text="Aceptar" redirect={acceptCategories} />
                </View>
            </View>
        </View>
    )
}

export default Categories