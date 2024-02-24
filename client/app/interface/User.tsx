import { StackNavigation } from "../types/props.types";
import { UserReducerType } from "../types/user.types";
import { ICategoriesUser } from "./Game";

interface ICounterUserReducer {
    token?: string;
    user?: object;
}

export interface IUsersRank {
    total?: IUser[],
    ranking?: IUser[];
    locationRanking?: ILocationRank[];
}

export interface ILocationRank {
    _id: string;
    points: number;
}

export interface ICounterUser {
    users: IUsersRank;
    user: ICounterUserReducer;
    isLoggedIn: boolean;
    profile: object;
}

export interface IUser {
    _id: string;
    createdAt: string;
    updatedAt: string;
    nickname: string;
    password: string;
    role: string;
    points: IExperience;
    categories: ICategoriesUser[];
    amountOptions: number;
    amountQuestions: number;
    pais: IPais;
    provincia: IProvincia;
    municipio: IMunicipio;
    helps: number;
}

export interface IUserReducer {
    user: IUser,
    token: string;
}

export interface ILogin {
    nickname: string;
    password: string;
}

export interface IPais {
    _id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
}

export interface IProvincia {
    _id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    pais: IPais;
}

export interface IMunicipio {
    _id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    provincia: IProvincia;
}

export interface IOptions {
    amountQuestions: number;
    amountOptions: number;
}

export interface ISetting {
    pais?: string;
    provincia?: string;
    municipio?: string;
}

export interface IExperience {
    _id: string;
    createdAt: string;
    updatedAt: string;
    day: number;
    month: number;
    year: number;
    total: number;
    user: IUser;
    levelExperience: number;
    bestPuntuation: number;
    lastGame: string;
}

export interface IPassword {
    password: string;
}

export interface INickname {
    nickname: string;
}

export interface IPoints {
    points: number;
}

export interface IAuthAction {
    userData: ILogin;
    setIsAuth: (isAuth: boolean) => void;
    setMessage: (message: string) => void;
    setUserData: (userData: ILogin) => void;
    navigation: StackNavigation;
}

export interface IGetUserAction {
    id: string;
    user: UserReducerType;
    setIsProfile: (isProfile: boolean) => void;
}
