import { ScrollView, View, Text } from 'react-native'

import ButtonMenu from './buttonMenu';

import { menuStyles } from '../styles/menu.styles';
import { homeStyles } from '../styles/home.styles';

const RenderItem = ({ item }: { item: string }) => {
    return (
        <Text>{item}</Text>
    )
}

const Select = ({ data }: { data: string[] }) => {
    return (
        <View style={menuStyles.containerCategories} >
            <View style={menuStyles.categoriesContain}>
                <View style={menuStyles.containerScroll}>
                    <ScrollView>
                        {
                            data.map((item, index) => {
                                return <RenderItem item={item} key={index} />
                            })
                        }
                    </ScrollView>
                </View>
                <View style={homeStyles.containerActionsView}>
                    <ButtonMenu text="Aceptar" redirect={() => console.log("fdsfsd")} isAccept={true} />
                </View>
            </View>
        </View>
    )
}

export default Select