import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Text, View } from 'react-native'

import MenuTent from '../components/tent/MenuTent'
import HeaderTent from '../components/tent/HeaderTent'
import ButtonMenu from '../components/ButtonMenu'

import { StackNavigation } from '../types/props.types'
import { ITent } from '../interface/User'
import { IReducer } from '../interface/Reducer'

import { socket } from '../server/socket'

import { homeStyles } from '../styles/home.styles'
import { tentStyle } from '../styles/tent.styles'

import { selector } from '../helper/selector'
import { getTents } from '../server/actions/user.actions'
import { updateOptionsAction } from '../server/features/user.features'

const Tent = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()

    const [tents, setTents] = useState<ITent[]>([])
    const [isPayed, setIsPayed] = useState<boolean>(false)

    useEffect(() => {
        dispatch(getTents({
            setTents,
            token: users.user.token
        }) as any)
    }, [])

    useEffect(() => {
        socket.on('payment', (data: any) => {
            dispatch(updateOptionsAction(data.user))
            setIsPayed(true)
        })
    }, [])

    return (
        <View style={homeStyles.containerHome}>
            <HeaderTent />
            {
                isPayed && <View style={tentStyle.containerTextPayment}>
                    <Text style={tentStyle.textPayment}>¡Pago exitoso!</Text>
                </View>
            }
            <MenuTent tents={tents} user={users} />
            <View style={homeStyles.containerActionsView}>
                <ButtonMenu text="Regresar" redirect={() => navigation.navigate('Home')} isAccept={true} disabled={false} />
            </View>
        </View>
    )
}

export default Tent