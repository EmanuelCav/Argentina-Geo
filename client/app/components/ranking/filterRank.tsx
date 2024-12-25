import { useState, useEffect, useRef } from "react";
import { View } from "react-native";

import HeaderRank from "./components/HeaderRank";
import DateRank from "./components/DateRank";

import { FilterRankPropsType } from "../../types/ranking.types";
import { LocationRankType, RanksType } from "../../types/props.types";

import { rankingLocation, rankingUser } from "../../server/actions/user.actions";

const FilterRank = ({ users, setRankData, rankData, dispatch }: FilterRankPropsType) => {

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
                token: users.user.token!
            }) as any)

        } catch (error) {
            console.log(error);
        }

    }

    const getUserRank = async () => {

        dispatch(rankingUser({
            rankData,
            token: users.user.token!
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
        <View style={{ width: '100%' }}>
            <HeaderRank changeFilter={changeFilter} positionRank={positionRank} rankState={rankState} users={users} />
            <DateRank isDay={isDay} isMonth={isMonth} isYear={isYear} isTotal={isTotal} 
            showDay={showDay} showMonth={showMonth} showTotal={showTotal} showYear={showYear} />
        </View>
    )
}

export default FilterRank