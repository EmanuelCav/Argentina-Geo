import { View, Text } from 'react-native'

import InputSelect from './components/inputSelect'

import { generalStyles } from '../../styles/home.styles'
import { authStyles } from '../../styles/settings.styles'

import { SelectSettingsProps } from '../../types/props.types'

const Selector = ({ settingsData, setIsPais, setIsProvincia, setIsMunicipio }: SelectSettingsProps) => {
    return (
        <View style={generalStyles.containSelector}>
            <Text style={authStyles.labelForm}>País</Text>
            <InputSelect value={settingsData.pais} setIsPais={setIsPais} setIsProvincia={setIsProvincia} setIsMunicipio={setIsMunicipio} 
            isDisabled={false} location="Pais" />
            <Text style={authStyles.labelForm}>Provincia/Distrito</Text>
            <InputSelect value={settingsData.provincia} setIsPais={setIsPais} setIsProvincia={setIsProvincia} setIsMunicipio={setIsMunicipio} 
            isDisabled={settingsData.pais === "Argentina" ? false : true} location="Provincia" />
            <Text style={authStyles.labelForm}>Partido/barrio</Text>
            <InputSelect value={settingsData.municipio} setIsPais={setIsPais} setIsProvincia={setIsProvincia} setIsMunicipio={setIsMunicipio} 
            isDisabled={settingsData.provincia === "" ? true : false} location="Municipio" />
        </View>
    )
}

export default Selector