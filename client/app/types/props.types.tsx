import { SetStateAction } from 'react'
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { InterstitialAd } from 'react-native-google-mobile-ads';

import { ILocationRank, IOptions, ISetting, IUser, IUsersRank } from "../interface/User";
import { ICategories, IGame, IQuestion } from "../interface/Game";
import { DateRankType, UserDataType, UserReducerType, UserType } from "./user.types";

export type RoutesProps = {
    Home: undefined;
    Play: undefined;
    Playing: {
        questionsWC: IQuestion[];
        isConnection: boolean | null;
    };
    Ranking: undefined;
    Settings: undefined;
};

export type StackNavigation = NativeStackNavigationProp<RoutesProps>;

export type ButtonGameProps = {
    text: string;
    redirect: () => void;
    isAccept: boolean;
    isCategory: boolean;
}

export type ButtonNavigateProps = {
    text: string;
    redirect: () => void;
    styles: any;
}

export type ShowStatisticsProps = {
    navigation: StackNavigation;
    setIsProfile: (isProfile: boolean) => void;
    user: UserReducerType;
    isConnection: boolean | null;
    setIsChangeView: (isChangeView: boolean) => void;
    isChangeView: boolean;
}

export type UserInfoProps = {
    user: IUser;
    users: IUsersRank;
    categoriesLength: number;
}

export type ProfileProps = {
    user: UserType;
    games: IGame[];
    setIsProfile: (isProfile: boolean) => void;
    isConnection: boolean | null
}

export type CategoriesProps = {
    user: UserDataType;
    categories: ICategories[];
    setIsCategories: (isCategories: boolean) => void;
    isConnection: boolean | null;
}

export type NewProps = {
    navigation: StackNavigation;
    setIsAuth: (isAuth: boolean) => void;
    dispatch: Dispatch<AnyAction>
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
    isConnection: boolean | null;
}

export type SelectOptionProps = {
    setOptionsData: (optionData: SetStateAction<IOptions>) => void;
    optionsData: IOptions,
    amountOptions: number;
    level: number;
}

export type GameOptionsType = {
    setIsOptionsGame: (isOptionsGame: boolean) => void;
    isConnection: boolean | null;
}

export type SelectQuestionProps = {
    setOptionsData: (optionData: SetStateAction<IOptions>) => void;
    optionsData: IOptions,
    amountQuestions: number;
    level: number;
}

export type ChangeCodeProps = {
    setIsCode: (isCode: boolean) => void;
    user: UserDataType;
}

export type ChangeNicknameProps = {
    setIsNickname: (isNickname: boolean) => void;
    user: UserDataType;
}

export type CategoryProps = {
    user: UserDataType;
    category: ICategories;
    isConnection: boolean | null;
}

export type SelectSettingsProps = {
    settingsData: ISetting;
    setIsPais: (isPais: boolean) => void;
    setIsProvincia: (isProvincia: boolean) => void;
    setIsMunicipio: (isMunicipio: boolean) => void;
    isConnection: boolean | null;
}

export type InputSettingsType = {
    value: string | undefined;
    setIsPais: (isLocation: boolean) => void;
    setIsProvincia: (isProvincia: boolean) => void;
    setIsMunicipio: (isMunicipio: boolean) => void;
    isDisabled: boolean;
    location: string;
    isConnection: boolean | null;
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
    isConnection: boolean | null;
}

export type LocationProps = {
    loc: string;
    settingsData: ISetting;
    setSettingsData: (userLocation: ISetting) => void;
    location: string;
    userLocation: string | undefined;
}

export type GameDataProps = {
    numberQuestion: number;
    amountQuestions: number;
    seconds: number;
    minutes: number;
}

export type TimeProps = {
    seconds: number;
    minutes: number;
    specialText: string;
}

export type FinishProps = {
    seconds: number;
    minutes: number;
    corrects: number;
    points: number;
    navigation: StackNavigation;
    viewErrors: () => void;
    areErrors: boolean;
    isGameError: boolean;
    isConnection: boolean | null;
    interstitial?: InterstitialAd;
}

export type ShowQuestionProps = {
    questions: IQuestion[];
    numberQuestion: number;
}

export type ShowOptionGameProps = {
    questions: IQuestion[];
    numberQuestion: number;
    styles: any;
    nextQuestion: (item: string) => void;
}

export type RankingProps = {
    users: UserType;
    setRankData: (rankData: DateRankType) => void;
    isConnection: boolean | null;
    rankData: DateRankType;
}

export type UserRankingProps = {
    index: number;
    user: IUser;
    users: UserReducerType;
    rankData: DateRankType;
    setIsProfile: (isProfile: boolean) => void;
    isConnection: boolean | null;
}

export type RankingActionProps = {
    user: UserReducerType;
    navigation: StackNavigation;
}

export type FinishedGameProps = {
    isGameError: boolean;
    isConnection: boolean;
    game: IGame;
    token: string;
}

export type UnlockCategoryProps = {
    id: string;
    token: string;
}

export type LocationRankProps = {
    location: ILocationRank;
    index: number;
}