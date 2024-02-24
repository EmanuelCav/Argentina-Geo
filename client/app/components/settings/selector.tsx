import { View, Text } from 'react-native'

import InputSelect from './components/InputSelect'

import { generalStyles } from '../../styles/home.styles'
import { authStyles } from '../../styles/settings.styles'

import { SelectSettingsProps } from '../../types/props.types'

const Selector = ({ settingsData, setIsPais, setIsProvincia, setIsMunicipio, isConnection }: SelectSettingsProps) => {
    return (
        <View style={generalStyles.containSelector}>
            <Text style={authStyles.labelForm}>País</Text>
            <InputSelect value={settingsData.pais} setIsPais={setIsPais} setIsProvincia={setIsProvincia} setIsMunicipio={setIsMunicipio} 
            isDisabled={false} location="Pais" isConnection={isConnection} />
            <Text style={authStyles.labelForm}>Provincia/Distrito</Text>
            <InputSelect value={settingsData.provincia} setIsPais={setIsPais} setIsProvincia={setIsProvincia} setIsMunicipio={setIsMunicipio} 
            isDisabled={settingsData.pais === "Argentina" ? false : true} location="Provincia" isConnection={isConnection} />
            <Text style={authStyles.labelForm}>Departamento/Partido/barrio</Text>
            <InputSelect value={settingsData.municipio} setIsPais={setIsPais} setIsProvincia={setIsProvincia} setIsMunicipio={setIsMunicipio} 
            isDisabled={settingsData.provincia === "" ? true : false} location="Municipio" isConnection={isConnection} />
        </View>
    )
}

export default Selector