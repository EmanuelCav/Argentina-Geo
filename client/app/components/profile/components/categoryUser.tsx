import { View, Text } from "react-native";

import { ICategoriesUser } from "../../../interface/Game";

import { homeStyles } from '../../../styles/home.styles';
import { menuStyles } from '../../../styles/menu.styles';

const CategoryUser = ({ category }: { category: ICategoriesUser }) => {
    return (
        <View style={menuStyles.containCategoryProfile}>
            <Text style={menuStyles.categoryProfile}>{category.category.name}</Text>
            <Text style={homeStyles.userInfo}>Cantidad de preguntas: {category.questions}</Text>
            <Text style={homeStyles.userInfo}>Respuestas correctas: {category.corrects}</Text>
            <>
                {category.questions === 0 ? (
                    <Text style={homeStyles.userInfo}>
                        Efectividad: {(category.questions).toFixed(2)}%
                    </Text>
                ) : (
                    <Text style={homeStyles.userInfo}>
                        Efectividad: {((category.corrects * 100) / category.questions).toFixed(2)}%
                    </Text>
                )
                }
            </>
        </View>
    )
}

export default CategoryUser