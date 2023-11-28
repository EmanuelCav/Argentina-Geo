import { View } from "react-native";

import InputOptions from "./components/inputOptions";

import { GameOptionsType } from "../../types/props.types";

import { configGamesStyles } from '../../styles/game.styles'

const OptionsGame = ({ setIsOptionsGame, isConnection }: GameOptionsType) => {

    return (
        <View style={configGamesStyles.containerConfigGames}>
            <InputOptions setIsOptionsGame={setIsOptionsGame} isConnection={isConnection} />
        </View>
    )
}

export default OptionsGame