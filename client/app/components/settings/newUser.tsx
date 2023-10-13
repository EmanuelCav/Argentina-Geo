import { View } from "react-native";

import ButtonSettings from "./components/components/buttonSettings";

import { loadingAction } from "../../server/features/response.features";
import { newUser } from "../../server/actions/user.actions";

import { NewProps } from "../../types/props.types";

import { newStyles } from '../../styles/settings.styles'

const NewUser = ({ navigation, setIsAuth, dispatch }: NewProps) => {

    const redirectHome = () => {
        // dispatch(loadingAction(true))
        // navigation.navigate('Home')

        // setTimeout(() => {
        //     dispatch(loadingAction(false))
        // }, 2000);
        dispatch(newUser(navigation) as any)
    }

    const redirectForm = () => {
        setIsAuth(true)
    }

    return (
        <View style={newStyles.newContain}>
            <ButtonSettings text="Soy un jugador nuevo" styles={null} redirect={redirectHome} />
            <ButtonSettings text="Ya tengo un usuario" styles={null} redirect={redirectForm} />
        </View>
    )
}

export default NewUser