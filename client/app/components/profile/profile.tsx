import { View, Text } from "react-native";

import { menuStyles } from '../../styles/menu.styles'

const Profile = () => {
    return (
        <View style={menuStyles.containerCategories} >
            <View style={menuStyles.categoriesContain}>
                <Text>Profile</Text>
            </View>
        </View>
    )
}

export default Profile