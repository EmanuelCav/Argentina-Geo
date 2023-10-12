import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from 'react-redux';

import { usersApi } from "../../server/api/user.api";
import { usersAction } from "../../server/features/user.features";

import { rankingStyles } from '../../styles/home.styles';

import { UserType } from "../../types/user.types";

const FilterRank = ({ users }: { users: UserType }) => {

    const dispatch = useDispatch()

    const [isTotal, setIsTotal] = useState<boolean>(true)
    const [isYear, setIsYear] = useState<boolean>(false)
    const [isMonth, setIsMonth] = useState<boolean>(false)
    const [isDay, setIsDay] = useState<boolean>(false)

    const showTotal = async () => {

        const { data } = await usersApi("total", users.user.token)

        dispatch(usersAction(data))

        setIsTotal(true)
        setIsYear(false)
        setIsMonth(false)
        setIsDay(false)
    }

    const showYear = async () => {

        const { data } = await usersApi("year", users.user.token)

        dispatch(usersAction(data))

        setIsTotal(false)
        setIsYear(true)
        setIsMonth(false)
        setIsDay(false)
    }

    const showMonth = async () => {

        const { data } = await usersApi("month", users.user.token)

        dispatch(usersAction(data))

        setIsTotal(false)
        setIsYear(false)
        setIsMonth(true)
        setIsDay(false)
    }

    const showDay = async () => {

        const { data } = await usersApi("day", users.user.token)

        dispatch(usersAction(data))

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