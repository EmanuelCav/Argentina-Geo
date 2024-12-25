import { ICounterUser, ILogin, IOptions, ITent, IUserInfo } from "../interface/User";
import { DateRankType, StackNavigation } from "./props.types";

export type AuthActionPropsType = {
    userData: ILogin;
    setIsAuth: (isAuth: boolean) => void;
    setMessage: (message: string) => void;
    setUserData: (userData: ILogin) => void;
    navigation: StackNavigation;
}

export type GetUserActionPropsType = {
    id: string;
    user: ICounterUser;
    navigation: StackNavigation;
}

export type GetRankingActionPropsType = {
    user: ICounterUser;
    navigation: StackNavigation;
}

export type RankingLocationActionPropsType ={
    positionRank: string;
    rankData: DateRankType;
    token: string;
}

export type RankingUserActionPropsType = {
    token: string;
    rankData: DateRankType;
}

export type UpdateCategoryActionPropsType = {
    id: string;
    token: string;
}

export type UpdateOptionsActionPropsType = {
    navigation: StackNavigation;
    user: IUserInfo;
    optionsData: IOptions;
}

export type UpdateAllCategoryActionPropsType = {
    query: string;
    token: string;
}

export type GetTentActionPropsType = {
    setTents: (tents: ITent[]) => void;
    token: string;
}