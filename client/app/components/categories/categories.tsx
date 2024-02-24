import { Dimensions, Pressable, View, Text } from 'react-native'
import { useDispatch } from "react-redux";

import Category from './components/Category';
import ButtonMenu from '../ButtonMenu';

import { menuStyles } from "../../styles/menu.styles";
import { homeStyles } from "../../styles/home.styles";
import { configGamesStyles } from "../../styles/game.styles";

import { CategoriesProps } from '../../types/props.types';
import { ICategoriesUser } from '../../interface/Game';
import { updateAllCategory } from '../../server/actions/user.actions';

const Categories = ({ user, categories, setIsCategories, isConnection }: CategoriesProps) => {

    const dispatch = useDispatch()

    const acceptCategories = () => {
        setIsCategories(false)
    }

    const selectAll = () => {
        dispatch(updateAllCategory({
            query: {
                query: 'select'
            },
            token: user.token
        }) as any)
    }

    const quitAll = () => {
        dispatch(updateAllCategory({
            query: {
                query: 'quit'
            },
            token: user.token
        }) as any)
    }

    return (
        <View style={configGamesStyles.containerConfigGames}>
            <View style={configGamesStyles.configGamesContain}>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Pressable onPress={selectAll} style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#DDDDDD' : '#FFFFFF',
                        },
                        {
                            borderWidth: 1, borderColor: '#597EEE', borderStyle: 'solid', padding: Dimensions.get("window").height / 106, width: '50%', justifyContent: 'center', alignItems: 'center'
                        }
                    ]}>
                        <Text style={{ fontSize: Dimensions.get("window").height / 46, color: '#597EEE' }}>Seleccionar todo</Text>
                    </Pressable>
                    <Pressable onPress={quitAll} style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#DDDDDD' : '#FFFFFF',
                        },
                        {
                            borderWidth: 1, borderColor: '#597EEE', borderStyle: 'solid', padding: Dimensions.get("window").height / 106, width: '50%', justifyContent: 'center', alignItems: 'center'
                        }
                    ]} >
                        <Text style={{ fontSize: Dimensions.get("window").height / 46, color: '#597EEE' }}>Quitar todo</Text>
                    </Pressable>
                </View>
                <View style={configGamesStyles.containShowConfig}>
                    <View style={menuStyles.showCategoriesContain}>
                        {
                            categories.map((category: ICategoriesUser, index: number) => {
                                return <Category user={user} category={category.category} isConnection={isConnection} key={index} />
                            })
                        }
                    </View>
                </View>
                <View style={homeStyles.containerActionsView}>
                    <ButtonMenu text="Aceptar" redirect={acceptCategories} isAccept={true} />
                </View>
            </View>
        </View >
    )
}

export default Categories