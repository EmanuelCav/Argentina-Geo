import { useDispatch } from 'react-redux';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'

import ButtonMenu from './buttonMenu';

import { LocationProps, SelectProps } from '../types/props.types';

import { menuStyles } from '../styles/menu.styles';
import { homeStyles } from '../styles/home.styles';
import { sectionStyle } from "../styles/settings.styles";

import { updateLocationApi } from '../server/api/user.api';
import { updateOptionsAction } from '../server/features/user.features';

const Location = ({ loc, settingsData, setSettingsData, location, userLocation }: LocationProps) => {

    const selectLocation = () => {
        if (loc === "Pais") {
            setSettingsData({
                pais: location,
                provincia: "",
                municipio: ""
            })
            return
        }

        if(loc === "Provincia") {
            setSettingsData({
                pais: settingsData.pais,
                provincia: location,
                municipio: ""
            })
            return
        }

        if(loc === "Municipio") {
            setSettingsData({
                pais: settingsData.pais,
                provincia: settingsData.provincia,
                municipio: location
            })
            return
        }

        return
    }

    return (
        <TouchableOpacity style={userLocation === location ? sectionStyle.locationSelected : sectionStyle.locationSelect} onPress={selectLocation}>
            <Text style={userLocation === location ? sectionStyle.textLocationSelected : sectionStyle.textLocationSelect}>{location}</Text>
        </TouchableOpacity>
    )
}

const Select = ({ loc, user, setSettingsData, userLocation, settingsData, data, setIsPais, setIsProvincia, setIsMunicipio }: SelectProps) => {

    const dispatch = useDispatch()

    const acceptSelection = async () => {

        try {
            
            const { data } = await updateLocationApi(user.user._id, settingsData, user.token)
            dispatch(updateOptionsAction(data))

        } catch (error) {
            console.log(error);
        }

        setIsPais(false)
        setIsProvincia(false)
        setIsMunicipio(false)
    }

    return (
        <View style={menuStyles.containerCategories} >
            <View style={menuStyles.categoriesContain}>
                <View style={menuStyles.containerScroll}>
                    <ScrollView>
                        {
                            data.map((location, index) => {
                                return <Location loc={loc} settingsData={settingsData} setSettingsData={setSettingsData} userLocation={userLocation} location={location} key={index} />
                            })
                        }
                    </ScrollView>
                </View>
                <View style={homeStyles.containerActionsView}>
                    <ButtonMenu text="Seleccionar" redirect={acceptSelection} isAccept={true} />
                </View>
            </View>
        </View>
    )
}

export default Select