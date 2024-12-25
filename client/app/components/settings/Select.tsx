import { useDispatch } from 'react-redux';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native'

import ButtonAccept from '../general/ButtonAccept';

import { LocationPropsType, SelectPropsType } from '../../types/settings.types';

import { menuStyles } from '../../styles/menu.styles';
import { settingsStyles } from "../../styles/settings.styles";

import { updateLocationApi } from '../../server/api/user.api';
import { updateOptionsAction } from '../../server/features/user.features';

const Location = ({ loc, settingsData, setSettingsData, location, userLocation }: LocationPropsType) => {

    const selectLocation = () => {
        if (loc === "Pais") {
            setSettingsData({
                pais: location,
                provincia: "",
                municipio: ""
            })
            return
        }

        if (loc === "Provincia") {
            setSettingsData({
                pais: settingsData.pais,
                provincia: location,
                municipio: ""
            })
            return
        }

        if (loc === "Municipio") {
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
        <TouchableOpacity style={userLocation === location ? settingsStyles.locationSelected : settingsStyles.locationSelect} onPress={selectLocation}>
            <Text adjustsFontSizeToFit style={userLocation === location ? settingsStyles.textLocationSelected : settingsStyles.textLocationSelect}>{location}</Text>
        </TouchableOpacity>
    )
}

const Select = ({ loc, user, setSettingsData, userLocation, settingsData, data, setIsPais, setIsProvincia, setIsMunicipio }: SelectPropsType) => {

    const dispatch = useDispatch()

    const acceptSelection = async () => {

        try {

            const { data } = await updateLocationApi(user.user?._id!, settingsData, user.token!)
            dispatch(updateOptionsAction(data))

        } catch (error) {
            console.log(error);
        }

        setIsPais(false)
        setIsProvincia(false)
        setIsMunicipio(false)
    }

    return (
        <View style={settingsStyles.containerSelect} >
            <View style={menuStyles.containerScroll}>
                <ScrollView>
                    {
                        data.map((location, index) => {
                            return <Location loc={loc} settingsData={settingsData} setSettingsData={setSettingsData}
                                userLocation={userLocation} location={location} key={index} />
                        })
                    }
                </ScrollView>
            </View>
            <ButtonAccept text='ACEPTAR' func={acceptSelection} isCategory={false} />
        </View>
    )
}

export default Select