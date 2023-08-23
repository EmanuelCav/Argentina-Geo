import { View } from 'react-native'

import Category from './components/category';

import { menuStyles } from "../../styles/menu.styles";

const Categories = ({ categories }: { categories: string[] }) => {
    return (
        <View style={menuStyles.containerCategories}>
            <View style={menuStyles.categoriesContain}>
                {
                    categories.map((category: string, index: number) => {
                        return <Category category={category} key={index} />
                    })
                }
            </View>
        </View>
    )
}

export default Categories