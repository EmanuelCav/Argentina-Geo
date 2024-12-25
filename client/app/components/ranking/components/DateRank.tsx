import { View } from 'react-native'

import ButtonDateRank from './components/ButtonDateRank'

import { rankingStyles } from '../../../styles/ranking.styles'

import { DateRankPropsType } from '../../../types/ranking.types'

const DateRank = ({ isTotal, isYear, isMonth, isDay, showTotal, showYear, showMonth, showDay }: DateRankPropsType) => {
    return (
        <View style={rankingStyles.containerDateRank}>
            <ButtonDateRank isDisabled={isTotal} func={showTotal} text="Total" />
            <ButtonDateRank isDisabled={isYear} func={showYear} text="Año" />
            <ButtonDateRank isDisabled={isMonth} func={showMonth} text="Mes" />
            <ButtonDateRank isDisabled={isDay} func={showDay} text="Día" />
        </View>
    )
}

export default DateRank