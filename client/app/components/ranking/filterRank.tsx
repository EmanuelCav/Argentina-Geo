import { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import { useDispatch } from 'react-redux';
import FilterIcon from 'react-native-vector-icons/FontAwesome5';

import { rankingStyles } from '../../styles/home.styles';

import { RankingProps } from "../../types/props.types";
import { LocationRankType, RanksType } from "../../types/user.types";
import { rankingLocation, rankingUser } from "../../server/actions/user.actions";

const FilterRank = ({ users, setRankData, rankData }: RankingProps) => {

    const dispatch = useDispatch()

    const [isTotal, setIsTotal] = useState<boolean>(true)
    const [isYear, setIsYear] = useState<boolean>(false)
    const [isMonth, setIsMonth] = useState<boolean>(false)
    const [isDay, setIsDay] = useState<boolean>(false)

    const rankState = useRef<RanksType[]>([
        'user-alt', 'flag', 'city', 'location-arrow'
    ])

    const dateRank = useRef<LocationRankType[]>([
        "pais", "provincia", "municipio"
    ])

    const [positionRank, setPositionRank] = useState<number>(1)

    const showTotal = async () => {
        setRankData("total")
        setIsTotal(true)
        setIsYear(false)
        setIsMonth(false)
        setIsDay(false)
    }

    const showYear = async () => {
        setRankData("year")
        setIsTotal(false)
        setIsYear(true)
        setIsMonth(false)
        setIsDay(false)
    }

    const showMonth = async () => {
        setRankData("month")
        setIsTotal(false)
        setIsYear(false)
        setIsMonth(true)
        setIsDay(false)
    }

    const showDay = async () => {
        setRankData("day")
        setIsTotal(false)
        setIsYear(false)
        setIsMonth(false)
        setIsDay(true)
    }

    const changeFilter = () => {
        if (positionRank === rankState.current.length - 1) {
            setPositionRank(0)
            return
        }

        setPositionRank(positionRank + 1)
    }

    const getRankLocation = async () => {

        try {

            dispatch(rankingLocation({
                positionRank: dateRank.current[(positionRank - 2) < 0 ? positionRank + 2 : positionRank - 2],
                rankData,
                token: users.user.token
            }) as any)

        } catch (error) {
            console.log(error);
        }

    }

    const getUserRank = async () => {

        dispatch(rankingUser({
            rankData,
            token: users.user.token
        }) as any)

    }

    useEffect(() => {

        if (rankState.current[positionRank - 1] !== 'user-alt') {
            getRankLocation()
            return
        }

        getUserRank()

    }, [positionRank, rankData])

    return (
        <View>
            <View style={rankingStyles.containerHeaderRank}>
                <FilterIcon onPress={changeFilter} name={rankState.current[positionRank]} color={'#5d8cff'} size={Dimensions.get("window").height / 28} />
                {
                    users.users.ranking?.length! > 0 &&
                    <>
                        {(users.users.ranking!.map((u) => u._id).indexOf(users.user.user._id) + 1 === 0) ? (
                            <Text style={rankingStyles.infoUserRank}>Usted no se encuetra aquí</Text>
                        ) : (
                            <Text style={rankingStyles.infoUserRank}>Su posición actual es {users.users.ranking!.map((u) => u._id)
                                .indexOf(users.user.user._id) + 1}°
                            </Text>
                        )}
                    </>
                }
            </View>
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