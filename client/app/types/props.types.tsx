import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { IUser } from "../interface/User";
import { IGame } from "../interface/Game";
import { UserReducerType } from "./user.types";

type RoutesProps = {
    New: undefined;
    Home: undefined;
    Play: undefined;
    Playing: undefined;
    Ranking: undefined;
    Settings: undefined;
};

export type StackNavigation = NativeStackNavigationProp<RoutesProps>;

export type ButtonNavigateProps = {
    text: string;
    redirect: () => void;
}

export type ShowStatisticsProps = {
    navigation: StackNavigation;
    setIsProfile: (isProfile: boolean) => void;
    isProfile: boolean;
}

export type UserInfoProps = {
    user: IUser;
    users: IUser[];
    games: IGame[];
}

export type ProfileProps = {
    user: UserReducerType;
    games: IGame[];
    id: string;
    setIsProfile: (isProfile: boolean) => void;
}

export type CategoriesProps = {
    categories: string[];
    setIsCategories: (isCategories: boolean) => void;
}

export type NewProps = {
    navigation: StackNavigation;
    setIsAuth: (isAuth: boolean) => void;
}