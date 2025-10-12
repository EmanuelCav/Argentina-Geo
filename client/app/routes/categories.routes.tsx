import { View } from 'react-native'
import { useDispatch, useSelector } from "react-redux";

import Container from '../Container';
import ActionsCategories from '../components/categories/ActionsCategories';
import ShowCategories from '../components/categories/ShowCategories';
import ButtonAccept from '../components/general/ButtonAccept';

import { StackNavigation } from '../types/props.types';
import { IReducer } from '../interface/Reducer';

import { categoriesStyles } from '../styles/categories.styles';

import { updateAllCategory, updateCategory } from '../server/actions/user.actions';

import { selector } from '../helper/selector';

const Categories = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()

    const handleAccept = () => {
        navigation.navigate('Play')
    }

    const handleAction = (action: string) => {
        dispatch(updateAllCategory({
            query: action,
            token: users.user.token!
        }) as any)
    }

    const changeCategory = (id: string) => {
        dispatch(updateCategory({
            id,
            token: users.user.token!
        }) as any)
    }

    return (
        <Container>
            <View style={categoriesStyles.containCategories}>
                <ActionsCategories handleAction={handleAction} />
                <ShowCategories categories={users.user.user?.categories!} changeCategory={changeCategory} />
            </View>
            <ButtonAccept func={handleAccept} text='ACEPTAR' isCategory={false} />
        </Container>
    )
}

export default Categories