import { useState, useEffect } from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import { fetch } from "@react-native-community/netinfo";
import { useRoute } from '@react-navigation/native';

import { getCountriesApi, getProvinciasApi, getMunicipiosApi } from "../server/api/location.api";

import ButtonMenu from "../components/ButtonMenu";
import Selector from "../components/settings/Selector";
import CodeSettings from "../components/settings/CodeSettings";
import Select from "../components/Select";
import Auth from "../components/settings/components/Auth";
import ChangeCode from "../components/settings/ChangeCode";
import ChangeName from "../components/settings/ChangeName";

import { IReducer } from "../interface/Reducer";
import { ISetting } from "../interface/User";
import { StackNavigation } from "../types/props.types";

import { homeStyles, generalStyles } from '../styles/home.styles'

import { selector } from "../helper/selector";

const Settings = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()
    const route = useRoute()

    const initialState: ISetting = {
        pais: users.user.user.pais.name,
        provincia: users.user.user.provincia ? users.user.user.provincia.name : "",
        municipio: users.user.user.municipio ? users.user.user.municipio.name : ""
    }

    const [settingsData, setSettingsData] = useState<ISetting>(initialState)

    const [paises, setPaises] = useState<string[]>([])
    const [provincias, setProvincias] = useState<string[]>([])
    const [municipios, setMunicipios] = useState<string[]>([])

    const [isPais, setIsPais] = useState<boolean>(false)
    const [isProvincia, setIsProvincia] = useState<boolean>(false)
    const [isMunicipio, setIsMunicipio] = useState<boolean>(false)

    const [isAuth, setIsAuth] = useState<boolean>(false)
    const [isCode, setIsCode] = useState<boolean>(false)
    const [isNickname, setIsNickname] = useState<boolean>(false)

    const [isConnection, setIsConnection] = useState<boolean | null>(true)

    const { pais, provincia, municipio } = settingsData

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
        fetch().then(conn => conn).then(state => setIsConnection(state.isConnected));
    }, [isConnection, route.name])

    useEffect(() => {
        getPaises()
        getProvincias()

        if (provincia !== "") {
            getMunicipios()
        }
    }, [isPais, isProvincia, isMunicipio])

    return (
        <View style={generalStyles.containerInfoSelect}>
            {
                isPais && <Select loc="Pais" user={users.user} setSettingsData={setSettingsData} userLocation={pais} settingsData={settingsData} data={paises}
                    setIsPais={setIsPais} setIsProvincia={setIsProvincia} setIsMunicipio={setIsMunicipio} isConnection={isConnection} />
            }
            {
                isProvincia && <Select loc="Provincia" user={users.user} setSettingsData={setSettingsData} settingsData={settingsData} userLocation={provincia} data={provincias}
                    setIsPais={setIsPais} setIsProvincia={setIsProvincia} setIsMunicipio={setIsMunicipio} isConnection={isConnection} />
            }
            {
                isMunicipio && <Select loc="Municipio" user={users.user} setSettingsData={setSettingsData} userLocation={municipio} settingsData={settingsData} data={municipios}
                    setIsPais={setIsPais} setIsProvincia={setIsProvincia} setIsMunicipio={setIsMunicipio} isConnection={isConnection} />
            }
            {
                isAuth && <Auth setIsAuth={setIsAuth} navigation={navigation} dispatch={dispatch} />
            }
            {
                isCode && <ChangeCode setIsCode={setIsCode} user={users.user} />
            }
            {
                isNickname && <ChangeName setIsNickname={setIsNickname} user={users.user} />
            }
            <Selector settingsData={settingsData} setIsPais={setIsPais} setIsProvincia={setIsProvincia} setIsMunicipio={setIsMunicipio} isConnection={isConnection} />
            <CodeSettings password={users.user.user.password} nickname={users.user.user.nickname}
                setIsAuth={setIsAuth} setIsCode={setIsCode} setIsNickname={setIsNickname} isConnection={isConnection} />
            <View style={homeStyles.containerActionsView}>
                <ButtonMenu text="Aceptar" redirect={() => navigation.navigate('Home')} isAccept={true} />
            </View>
        </View>
    )
}

export default Settings