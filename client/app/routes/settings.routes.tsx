import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Select, { Item } from 'react-native-picker-select'

import { getCountriesApi, getProvinciasApi, getMunicipiosApi } from "../server/api/location.api";

const Settings = () => {

    const [paises, setPaises] = useState<Item[]>([])
    const [provincias, setProvincias] = useState<Item[]>([])
    const [municipios, setMunicipios] = useState<Item[]>([])

    const getPaises = async () => {

        const paisesData: Item[] = []

        const { data } = await getCountriesApi()
        
        for (let i = 0; i < data.length; i++) {
            paisesData.push({
                label: data[i].name,
                value: data[i].name
            })
        }

        setPaises(paisesData)
    }

    const getProvincias = async () => {

        const provinciasData: Item[] = []

        const { data } = await getProvinciasApi("Argentina")
        
        for (let i = 0; i < data.length; i++) {
            provinciasData.push({
                label: data[i].name,
                value: data[i].name
            })
        }

        setProvincias(provinciasData)
    }

    const getMunicipios = async () => {

        const municipiosData: Item[] = []

        const { data } = await getMunicipiosApi("Buenos Aires")
        
        for (let i = 0; i < data.length; i++) {
            municipiosData.push({
                label: data[i].name,
                value: data[i].name
            })
        }

        setMunicipios(municipiosData)
    }

    useEffect(() => {
        getPaises()
        getProvincias()
        // getMunicipios()
    }, [])


    return (
        <View>
            <Select
                onValueChange={(value) => console.log(value)}
                items={paises}
                placeholder={{
                    label: "Selecciona un país",
                    value: null
                }}
                value={"Argentina"}
            />
            <Select
                onValueChange={(value) => console.log(value)}
                items={provincias}
                placeholder={{
                    label: "Selecciona una provincia",
                    value: null
                }}
            />
            <Select
                onValueChange={(value) => console.log(value)}
                items={municipios}
                disabled
            />
        </View>
    )
}

export default Settings