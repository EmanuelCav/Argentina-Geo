import { SetStateAction } from 'react'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { IOptions, ISetting, IUser } from "../interface/User";
import { ICategoriesUser, IGame } from "../interface/Game";
import { UserDataType, UserReducerType } from "./user.types";

type RoutesProps = {
    New: undefined;
    Home: undefined;
    Play: undefined;
    Playing: undefined;
    Ranking: undefined;
    Settings: undefined;
};

export type StackNavigation = NativeStackNavigationProp<RoutesProps>;

export type ButtonGameProps = {
    text: string;
    redirect: () => void;
    isAccept: boolean;
}

export type ButtonNavigateProps = {
    text: string;
    redirect: () => void;
    styles: any;
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
    user: UserDataType;
    categories: ICategoriesUser[];
    setIsCategories: (isCategories: boolean) => void;
}

export type NewProps = {
    navigation: StackNavigation;
    setIsAuth: (isAuth: boolean) => void;
}

export type InputProps = {
    label: string;
    value: string;
    handleChange: (value: string) => void;
    isPassword: boolean;
}

export type CodeProps = {
    password: string;
    nickname: string;
    setIsAuth: (isAuth: boolean) => void;
    setIsCode: (isCode: boolean) => void;
    setIsNickname: (isNickname: boolean) => void;
}

export type SelectOptionProps = {
    setOptionsData: (optionData: SetStateAction<IOptions>) => void; 
    optionsData: IOptions, 
    amountOptions: number;
}

export type SelectQuestionProps = {
    setOptionsData: (optionData: SetStateAction<IOptions>) => void; 
    optionsData: IOptions, 
    amountQuestions: number;
}

export type ChangeCodeProps = {
    setIsCode:  (isCode: boolean) => void;
    user: UserDataType;
}

export type ChangeNicknameProps = {
    setIsNickname:  (isNickname: boolean) => void;
    user: UserDataType;
}

export type CategoryProps = {
    user: UserDataType;
    category: ICategoriesUser;
}

export type SelectSettingsProps = {
    settingsData: ISetting;
    setIsPais: (isPais: boolean) => void;
    setIsProvincia: (isProvincia: boolean) => void;
    setIsMunicipio: (isMunicipio: boolean) => void;
}

export type InputSettingsType = {
    value: string | undefined;
    setIsPais: (isLocation: boolean) => void;
    setIsProvincia: (isProvincia: boolean) => void;
    setIsMunicipio: (isMunicipio: boolean) => void;
    isDisabled: boolean;
    location: string;
}

export type SelectProps = {
    loc: string;
    user: UserDataType;
    setSettingsData: (userLocation: ISetting) => void;
    userLocation: string | undefined;
    settingsData: ISetting;
    data: string[];
    setIsPais: (isLocation: boolean) => void;
    setIsProvincia: (isProvincia: boolean) => void;
    setIsMunicipio: (isMunicipio: boolean) => void;
}

export type LocationProps = {
    loc: string;
    settingsData: ISetting;
    setSettingsData: (userLocation: ISetting) => void;
    location: string;
    userLocation: string | undefined;
}