import { View, Text, TouchableOpacity } from 'react-native'

import { menuStyles } from '../../../styles/menu.styles'

const Category = ({ category }: { category: string }) => {
    return (
        <View>
            
        </View>
        // <View style={menuStyles.containerCategory}>
        //     <Text style={menuStyles.textCategory}>{category}</Text>
        //     <TouchableOpacity style={menuStyles.buttonCategory}>
        //         <Text>Seleccionar</Text>
        //     </TouchableOpacity>
        // </View>
    )
}

export default Category