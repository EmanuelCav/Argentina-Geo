import { Text } from "react-native";

import { TimeProps } from "../../../types/props.types";

import { gameStyles } from '../../../styles/game.styles';

const Time = ({ seconds, minutes, specialText }: TimeProps) => {
    return (
        <>
            {
                seconds <= 9 ? (
                    <>
                        {
                            minutes <= 9 ? (
                                <Text style={gameStyles.textDataGame}>{specialText}0{minutes}:0{seconds}</Text>
                            ) : (
                                <Text style={gameStyles.textDataGame}>{specialText}{minutes}:0{seconds}</Text>
                            )
                        }
                    </>
                ) : (
                    <>
                        {
                            minutes <= 9 ? (
                                <Text style={gameStyles.textDataGame}>{specialText}0{minutes}:{seconds}</Text>
                            ) : (
                                <Text style={gameStyles.textDataGame}>{specialText}{minutes}:{seconds}</Text>
                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default Time