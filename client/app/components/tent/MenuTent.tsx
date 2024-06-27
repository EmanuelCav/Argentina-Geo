import { View } from 'react-native'

import ElementTent from './components/ElementTent'

import { ITent } from '../../interface/User'

import { tentStyle } from '../../styles/tent.styles';

const MenuTent = ({ tents }: { tents: ITent[] }) => {

    const handleTent = async (tent: ITent) => {
        
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