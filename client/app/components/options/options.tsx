import { View } from "react-native";

import InputOptions from "./components/InputOptions";

import { configGamesStyles } from '../../styles/game.styles'

const OptionsGame = ({ setIsOptionsGame }: { setIsOptionsGame: (isOptionsGame: boolean) => void }) => {

    return (
        <View style={configGamesStyles.containerConfigGames}>
            <InputOptions setIsOptionsGame={setIsOptionsGame} />
        </View>
    )
}

export default OptionsGame