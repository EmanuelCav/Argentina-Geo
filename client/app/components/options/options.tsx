import { View } from "react-native";

import InputOptions from "./components/inputOptions";

import { menuStyles } from '../../styles/menu.styles'

const OptionsGame = ({ setIsOptionsGame }: { setIsOptionsGame: (isOptionsGame: boolean) => void }) => {

    return (
        <View style={menuStyles.containerCategories}>
            <InputOptions setIsOptionsGame={setIsOptionsGame} />
        </View>
    )
}

export default OptionsGame