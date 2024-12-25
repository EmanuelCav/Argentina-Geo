import { View } from 'react-native'
import { openBrowserAsync } from "expo-web-browser";

import ElementTent from './components/ElementTent'

import { ITent } from '../../interface/User'
import { MenuTentPropsType } from '../../types/tent.types';

import { tentStyle } from '../../styles/tent.styles';

import { handleIntegrationMP } from '../../utils/integration';

const MenuTent = ({ tents, user }: MenuTentPropsType) => {

    const handleTent = async (tent: ITent) => {
        
        const data = await handleIntegrationMP(tent._id, user.user.token!)

        await openBrowserAsync(data)

    }

    return (
        <View style={tentStyle.containerMenuTent}>
            {
                tents.map((element: ITent, index: number) => {
                    return <ElementTent handleTent={handleTent} element={element} key={index} />
                })
            }
        </View>
    )
}

export default MenuTent