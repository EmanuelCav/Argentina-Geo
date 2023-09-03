import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { View } from "react-native";

import { getCountriesApi, getProvinciasApi, getMunicipiosApi } from "../server/api/location.api";

import ButtonMenu from "../components/buttonMenu";
import Select from "../components/select";

import { IReducer } from "../interface/Reducer";
import { ISetting } from "../interface/User";
import { StackNavigation } from "../types/props.types";

import { menuStyles } from '../styles/menu.styles'
import { homeStyles } from '../styles/home.styles'

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

    const [isMunicipio, setIsMunicipio] = useState<boolean>(false)

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
        <View>
            <View style={menuStyles.categoriesContain}>
                <Select data={paises} />
            </View>
            <View style={homeStyles.containerActionsView}>
                <ButtonMenu text="Aceptar" redirect={() => navigation.navigate('Home')} />
            </View>
        </View>
    )
}

export default Settings