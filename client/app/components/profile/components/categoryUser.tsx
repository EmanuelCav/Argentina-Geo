import { View, Text } from "react-native";

import { ICategoriesUser } from "../../../interface/Game";

const CategoryUser = ({ category }: { category: ICategoriesUser }) => {
    return (
        <View>
            <Text>{category.category.name}</Text>
        </View>
    )
}

export default CategoryUser