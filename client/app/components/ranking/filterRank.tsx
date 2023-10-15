import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useDispatch } from 'react-redux';

import { usersApi } from "../../server/api/user.api";
import { usersAction } from "../../server/features/user.features";

import { rankingStyles } from '../../styles/home.styles';

import { RankingProps } from "../../types/props.types";

const FilterRank = ({ users, setRankData }: RankingProps) => {

    const dispatch = useDispatch()

    const [isTotal, setIsTotal] = useState<boolean>(true)
    const [isYear, setIsYear] = useState<boolean>(false)
    const [isMonth, setIsMonth] = useState<boolean>(false)
    const [isDay, setIsDay] = useState<boolean>(false)

    const showTotal = async () => {

        const { data } = await usersApi("total", users.user.token)

        dispatch(usersAction(data))

        setRankData("total")
        setIsTotal(true)
        setIsYear(false)
        setIsMonth(false)
        setIsDay(false)
    }

    const showYear = async () => {

        const { data } = await usersApi("year", users.user.token)

        dispatch(usersAction(data))

        setRankData("year")
        setIsTotal(false)
        setIsYear(true)
        setIsMonth(false)
        setIsDay(false)
    }

    const showMonth = async () => {

        const { data } = await usersApi("month", users.user.token)

        dispatch(usersAction(data))

        setRankData("month")
        setIsTotal(false)
        setIsYear(false)
        setIsMonth(true)
        setIsDay(false)
    }

    const showDay = async () => {

        const { data } = await usersApi("day", users.user.token)

        dispatch(usersAction(data))

        setRankData("day")
        setIsTotal(false)
        setIsYear(false)
        setIsMonth(false)
        setIsDay(true)
    }

    return (
        <View>
            <Text style={rankingStyles.infoUserRank}>{users.users.ranking!.map((u) => u._id)
                .indexOf(users.user.user._id) + 1 === 0 ? (
                <Text>
                    Usted no se encuetra aquí
                </Text>
            ) : (
                <Text>
                    Su posición actual es {users.users.ranking!.map((u) => u._id)
                        .indexOf(users.user.user._id) + 1}°
                </Text>
            )}</Text>
            <View style={rankingStyles.containerDateRank}>
                <Pressable style={isTotal ? rankingStyles.buttonDateRankSelected : rankingStyles.buttonDateRank}
                    onPress={showTotal} disabled={isTotal}>
                    <Text style={isTotal ? rankingStyles.infoUserRankSelected : rankingStyles.infoUserRank}>Total</Text>
                </Pressable>
                <Pressable style={isYear ? rankingStyles.buttonDateRankSelected : rankingStyles.buttonDateRank}
                    onPress={showYear} disabled={isYear}>
                    <Text style={isYear ? rankingStyles.infoUserRankSelected : rankingStyles.infoUserRank}>Año</Text>
                </Pressable>
                <Pressable style={isMonth ? rankingStyles.buttonDateRankSelected : rankingStyles.buttonDateRank}
                    onPress={showMonth} disabled={isMonth}>
                    <Text style={isMonth ? rankingStyles.infoUserRankSelected : rankingStyles.infoUserRank}>Mes</Text>
                </Pressable>
                <Pressable style={isDay ? rankingStyles.buttonDateRankSelected : rankingStyles.buttonDateRank}
                    onPress={showDay} disabled={isDay}>
                    <Text style={isDay ? rankingStyles.infoUserRankSelected : rankingStyles.infoUserRank}>Día</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default FilterRank