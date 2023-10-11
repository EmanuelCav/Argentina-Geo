import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { rankingStyles } from '../../styles/home.styles';

const FilterRank = () => {

    const [isTotal, setIsTotal] = useState<boolean>(true)
    const [isYear, setIsYear] = useState<boolean>(false)
    const [isMonth, setIsMonth] = useState<boolean>(false)
    const [isDay, setIsDay] = useState<boolean>(false)

    const showTotal = () => {
        setIsTotal(true)
        setIsYear(false)
        setIsMonth(false)
        setIsDay(false)
    }

    const showYear = () => {
        setIsTotal(false)
        setIsYear(true)
        setIsMonth(false)
        setIsDay(false)
    }

    const showMonth = () => {
        setIsTotal(false)
        setIsYear(false)
        setIsMonth(true)
        setIsDay(false)
    }

    const showDay = () => {
        setIsTotal(false)
        setIsYear(false)
        setIsMonth(false)
        setIsDay(true)
    }

    return (
        <View style={rankingStyles.containerFilterRanking}>
            <Text style={rankingStyles.infoUserRank}>Su posición actual es 2500°</Text>
            <View style={rankingStyles.containerDateRank}>
                <TouchableOpacity style={isTotal ? rankingStyles.buttonDateRankSelected : rankingStyles.buttonDateRank}
                    onPress={showTotal} disabled={isTotal}>
                    <Text style={isTotal ? rankingStyles.infoUserRankSelected : rankingStyles.infoUserRank}>Total</Text>
                </TouchableOpacity>
                <TouchableOpacity style={isYear ? rankingStyles.buttonDateRankSelected : rankingStyles.buttonDateRank}
                    onPress={showYear} disabled={isYear}>
                    <Text style={isYear ? rankingStyles.infoUserRankSelected : rankingStyles.infoUserRank}>Año</Text>
                </TouchableOpacity>
                <TouchableOpacity style={isMonth ? rankingStyles.buttonDateRankSelected : rankingStyles.buttonDateRank}
                    onPress={showMonth} disabled={isMonth}>
                    <Text style={isMonth ? rankingStyles.infoUserRankSelected : rankingStyles.infoUserRank}>Mes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={isDay ? rankingStyles.buttonDateRankSelected : rankingStyles.buttonDateRank}
                    onPress={showDay} disabled={isDay}>
                    <Text style={isDay ? rankingStyles.infoUserRankSelected : rankingStyles.infoUserRank}>Día</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default FilterRank