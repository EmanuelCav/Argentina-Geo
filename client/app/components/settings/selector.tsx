import { View, Text } from 'react-native'

import InputSelect from './components/InputSelect'

import { settingsStyles } from '../../styles/settings.styles'

import { SelectorPropsType } from '../../types/settings.types'

const Selector = ({ settingsData, setIsPais, setIsProvincia, setIsMunicipio }: SelectorPropsType) => {
    return (
        <View style={settingsStyles.containerSelector}>
            <Text style={settingsStyles.labelForm}>País</Text>
            <InputSelect value={settingsData.pais} setIsPais={setIsPais} setIsProvincia={setIsProvincia} setIsMunicipio={setIsMunicipio} 
            isDisabled={false} location="Pais" />
            <Text style={settingsStyles.labelForm}>Provincia/Distrito</Text>
            <InputSelect value={settingsData.provincia} setIsPais={setIsPais} setIsProvincia={setIsProvincia} setIsMunicipio={setIsMunicipio} 
            isDisabled={settingsData.pais !== "Argentina"} location="Provincia" />
            <Text style={settingsStyles.labelForm}>Departamento/Partido/barrio</Text>
            <InputSelect value={settingsData.municipio} setIsPais={setIsPais} setIsProvincia={setIsProvincia} setIsMunicipio={setIsMunicipio} 
            isDisabled={settingsData.provincia === ""} location="Municipio" />
        </View>
    )
}

export default Selector