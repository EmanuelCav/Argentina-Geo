import { useState, useEffect } from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from 'react-redux'

import { getCountriesApi, getProvinciasApi, getMunicipiosApi } from "../server/api/location.api";

import Selector from "../components/settings/Selector";
import CodeSettings from "../components/settings/CodeSettings";
import Select from "../components/settings/Select";
import Auth from "../components/settings/components/Auth";
import ChangeCode from "../components/settings/ChangeCode";
import ChangeName from "../components/settings/ChangeName";
import ButtonAccept from "../components/general/ButtonAccept";

import { IReducer } from "../interface/Reducer";
import { ISetting } from "../interface/User";
import { StackNavigation } from "../types/props.types";

import { generalStyles } from "../styles/general.styles";

import { selector } from "../helper/selector";

const Settings = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()

    const initialState: ISetting = {
        pais: users.user.user?.pais?.name,
        provincia: users.user.user?.provincia ? users.user.user.provincia.name : "",
        municipio: users.user.user?.municipio ? users.user.user.municipio.name : ""
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
        getPaises()
        getProvincias()

        if (provincia !== "") {
            getMunicipios()
        }

    }, [isPais, isProvincia, isMunicipio])

    return (
        <View style={generalStyles.containerGeneral}>
            {
                isPais && <Select loc="Pais" user={users.user} setSettingsData={setSettingsData} userLocation={pais} settingsData={settingsData} data={paises}
                    setIsPais={setIsPais} setIsProvincia={setIsProvincia} setIsMunicipio={setIsMunicipio} />
            }
            {
                isProvincia && <Select loc="Provincia" user={users.user} setSettingsData={setSettingsData} settingsData={settingsData} userLocation={provincia} data={provincias}
                    setIsPais={setIsPais} setIsProvincia={setIsProvincia} setIsMunicipio={setIsMunicipio} />
            }
            {
                isMunicipio && <Select loc="Municipio" user={users.user} setSettingsData={setSettingsData} userLocation={municipio} settingsData={settingsData} data={municipios}
                    setIsPais={setIsPais} setIsProvincia={setIsProvincia} setIsMunicipio={setIsMunicipio} />
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
            <Selector settingsData={settingsData} setIsPais={setIsPais} setIsProvincia={setIsProvincia} setIsMunicipio={setIsMunicipio} />
            <CodeSettings password={users.user.user?.password!} nickname={users.user.user?.nickname!}
                setIsAuth={setIsAuth} setIsCode={setIsCode} setIsNickname={setIsNickname} />
            <ButtonAccept text="ACEPTAR" func={() => navigation.goBack()} isCategory={false} />
        </View>
    )
}

export default Settings