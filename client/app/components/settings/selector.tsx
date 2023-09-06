import { View } from 'react-native'

import InputSelect from './components/inputSelect'

import { generalStyles } from '../../styles/home.styles'

const Selector = () => {
    return (
        <View style={generalStyles.containSelector}>
            <InputSelect value="Selecciona un país" />
            <InputSelect value="Selecciona una provincia" />
            <InputSelect value="Selecciona un partido/barrio" />
            {/* <Select data={paises} /> */}
        </View>
    )
}

export default Selector