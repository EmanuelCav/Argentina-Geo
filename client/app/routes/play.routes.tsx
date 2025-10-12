import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetch } from "@react-native-community/netinfo";

import Container from "../Container";
import Banner from "../components/general/Banner";
import MenuPlay from "../components/play/MenuPlay";
import User from "../components/home/User";
import UserNoConnection from "../components/home/UserNoConnection";

import { getDateExperienceApi } from "../server/api/user.api";

import { StackNavigation } from "../types/props.types";
import { IReducer } from "../interface/Reducer";

import { selector } from "../helper/selector";
import { isNewDate } from "../helper/time";

const Play = ({ navigation }: { navigation: StackNavigation }) => {

    const users = useSelector((state: IReducer) => selector(state).users)

    const dispatch = useDispatch()

    const [isConnection, setIsConnection] = useState<boolean>(true)

    const getNewDate = async () => {

        try {

            await getDateExperienceApi(users.user.token!)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetch().then(conn => conn).then(state => setIsConnection(state.isConnected!));
    }, [isConnection])

    useEffect(() => {
        if (isConnection && users.isLoggedIn) {
            if (isNewDate(new Date(new Date().setHours(new Date().getHours() - 3)).toISOString().split("T")[0], users)) {
                getNewDate()
            }
        }
    }, [isConnection])

    return (
        <Container>
            {
                isConnection && users.user.user?.isAdd && <Banner />
            }
            {
                isConnection ? <User user={users.user.user!} users={users.users} /> : <UserNoConnection />
            }
            <MenuPlay dispatch={dispatch} isConnection={isConnection} navigation={navigation} token={users.user.token!} />
        </Container>
    )
}

export default Play