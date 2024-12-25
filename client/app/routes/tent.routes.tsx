import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Text, View } from 'react-native'

import MenuTent from '../components/tent/MenuTent'
import HeaderTent from '../components/tent/HeaderTent'
import ButtonAccept from '../components/general/ButtonAccept'

import { StackNavigation } from '../types/props.types'
import { ITent } from '../interface/User'
import { IReducer } from '../interface/Reducer'

import { socket } from '../server/socket'

import { tentStyle } from '../styles/tent.styles'
import { generalStyles } from '../styles/general.styles'

import { getTents } from '../server/actions/user.actions'
import { updateOptionsAction } from '../server/features/user.features'

import { selector } from '../helper/selector'

const Tent = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()

    const [tents, setTents] = useState<ITent[]>([])
    const [isPayed, setIsPayed] = useState<boolean>(false)

    useEffect(() => {
        dispatch(getTents({
            setTents,
            token: users.user.token!
        }) as any)
    }, [])

    useEffect(() => {
        socket.on('payment', (data: any) => {
            dispatch(updateOptionsAction(data.user))
            setIsPayed(true)
        })
    }, [])

    return (
        <View style={generalStyles.containerGeneral}>
            <HeaderTent />
            {
                isPayed && <View style={tentStyle.containerTextPayment}>
                    <Text style={tentStyle.textPayment}>¡Pago exitoso!</Text>
                </View>
            }
            <MenuTent tents={tents} user={users} />
            <ButtonAccept text='REGRESAR' func={() => navigation.navigate('Home')} isCategory={false} />
        </View>
    )
}

export default Tent