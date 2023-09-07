import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useSelector } from 'react-redux'

import { getCountriesApi, getProvinciasApi, getMunicipiosApi } from "../server/api/location.api";

import ButtonMenu from "../components/buttonMenu";
import Selector from "../components/settings/selector";
import CodeSettings from "../components/settings/codeSettings";
import Select from "../components/select";

import { IReducer } from "../interface/Reducer";
import { ISetting } from "../interface/User";
import { StackNavigation } from "../types/props.types";

import { homeStyles, generalStyles } from '../styles/home.styles'

import { selector } from "../helper/selector";

const Settings = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const initialState: ISetting = {
        pais: users.user.user.pais.name,
        provincia: users.user.user.provincia ? users.user.user.provincia.name : "",
        municipio: users.user.user.municipio ? users.user.user.municipio.name : "",
        password: users.user.user.password
    }

    const [settingsData, setSettingsData] = useState<ISetting>(initialState)

    const [paises, setPaises] = useState<string[]>([])
    const [provincias, setProvincias] = useState<string[]>([])
    const [municipios, setMunicipios] = useState<string[]>([])

    const [isSelector, setisSelector] = useState<boolean>(false)

    const { pais, provincia, municipio, password } = settingsData

    const getPaises = async () => {

        const paisesData: string[] = []

        const { data } = await getCountriesApi()

        for (let i = 0; i < data.length; i++) {
            paisesData.push(data[i].name)
        }

        setPaises(paisesData)
    }

    const getProvincias = async () => {

        const provinciasData: string[] = []

        const { data } = await getProvinciasApi(pais)

        for (let i = 0; i < data.length; i++) {
            provinciasData.push(data[i].name)
        }

        setProvincias(provinciasData)
    }

    const getMunicipios = async () => {

        const municipiosData: string[] = []

        const { data } = await getMunicipiosApi(provincia)

        for (let i = 0; i < data.length; i++) {
            municipiosData.push(data[i].name)
        }

        setMunicipios(municipiosData)
    }

    useEffect(() => {
        getPaises()
        getProvincias()
    }, [pais])

    return (
        <View style={generalStyles.containerInfoSelect}>
            {
                isSelector && <Select data={paises} />
            }
            <Selector settingsData={settingsData} />
            <CodeSettings password={password} />
            <View style={homeStyles.containerActionsView}>
                <ButtonMenu text="Aceptar" redirect={() => navigation.navigate('Home')} />
            </View>
        </View>
    )
}

export default Settings