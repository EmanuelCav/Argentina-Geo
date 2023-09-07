import { View, Text } from 'react-native'

import InputSelect from './components/inputSelect'

import { generalStyles } from '../../styles/home.styles'
import { authStyles } from '../../styles/settings.styles'

import { ISetting } from '../../interface/User'

const Selector = ({ settingsData }: { settingsData: ISetting }) => {
    return (
        <View style={generalStyles.containSelector}>
            <Text style={authStyles.labelForm}>País</Text>
            <InputSelect value={settingsData.pais} />
            <Text style={authStyles.labelForm}>Provincia</Text>
            <InputSelect value={settingsData.provincia} />
            <Text style={authStyles.labelForm}>Partido/barrio</Text>
            <InputSelect value={settingsData.municipio} />
        </View>
    )
}

export default Selector