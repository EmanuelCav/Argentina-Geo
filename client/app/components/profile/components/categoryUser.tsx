import { View, Text } from "react-native";

import { ICategoriesUser } from "../../../interface/Game";

import { profileStyles } from "../../../styles/profile.styles";

const CategoryUser = ({ category }: { category: ICategoriesUser }) => {
    return (
        <View style={profileStyles.containCategoryProfile}>
            <Text style={profileStyles.categoryProfile}>{category.category.name}</Text>
            <Text style={profileStyles.userInfoProfile}>Cantidad de preguntas: {category.questions}</Text>
            <Text style={profileStyles.userInfoProfile}>Respuestas correctas: {category.corrects}</Text>
            <>
                {category.questions === 0 ? (
                    <Text style={profileStyles.userInfoProfile}>
                        Efectividad: {(category.questions).toFixed(2)}%
                    </Text>
                ) : (
                    <Text style={profileStyles.userInfoProfile}>
                        Efectividad: {((category.corrects * 100) / category.questions).toFixed(2)}%
                    </Text>
                )
                }
            </>
        </View>
    )
}

export default CategoryUser