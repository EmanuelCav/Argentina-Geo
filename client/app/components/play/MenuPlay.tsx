import { useState } from 'react'
import { View } from 'react-native'

import questionsJson from '../../../assets/questions.json'

import ButtonMenu from '../general/ButtonMenu'
import Error from '../response/Error'

import { game } from '../../server/actions/game.actions'

import { MenuPlayPropsType } from '../../types/play.types'

import { generalStyles } from '../../styles/general.styles'

import { shuffle } from '../../helper/generator'

const MenuPlay = ({ navigation, isConnection, dispatch, token }: MenuPlayPropsType) => {

    const [message, setMessage] = useState<string>("")

    const generateGame = async () => {

        if (!isConnection) {

            navigation.navigate('Playing', {
                questionsWC: shuffle(questionsJson.filter((q) => !q.image)),
                isConnection
            })

            return
        }

        dispatch(game({
            token,
            navigation,
            setMessage
        }) as any)
    }

    const showCategories = () => {
        navigation.navigate('Categories')
        setMessage("")
    }

    const showOptions = () => {
        navigation.navigate('Options')
        setMessage("")
    }

    const back = () => {
        navigation.popToTop();
        setMessage("");
    }

    return (
        <View style={generalStyles.containerMenu}>
            {
                message && <Error msg={message} />
            }
            <ButtonMenu text="INICIAR JUEGO" redirect={generateGame} disabled={false} />
            <ButtonMenu text="CATEGORÍAS" redirect={showCategories} disabled={!isConnection} />
            <ButtonMenu text="OPCIONES" redirect={showOptions} disabled={!isConnection} />
            <ButtonMenu text="REGRESAR" redirect={back} disabled={false} />
        </View>
    )
}

export default MenuPlay