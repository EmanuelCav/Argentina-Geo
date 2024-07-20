import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { View } from 'react-native'

import MenuTent from '../components/tent/MenuTent'
import HeaderTent from '../components/tent/HeaderTent'
import ButtonMenu from '../components/ButtonMenu'

import { StackNavigation } from '../types/props.types'
import { ITent } from '../interface/User'
import { IReducer } from '../interface/Reducer'

import { tentsApi } from '../server/api/user.api'
import { homeStyles } from '../styles/home.styles'

import { selector } from '../helper/selector'

const Tent = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const [tents, setTents] = useState<ITent[]>([])

    const getData = async () => {

        try {

            const { data } = await tentsApi(users.user.token)
            setTents(data)

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <View style={homeStyles.containerHome}>
            <HeaderTent />
            <MenuTent tents={tents} user={users} />
            <View style={homeStyles.containerActionsView}>
                <ButtonMenu text="Regresar" redirect={() => navigation.navigate('Home')} isAccept={true} disabled={false} />
            </View>
        </View>
    )
}

export default Tent