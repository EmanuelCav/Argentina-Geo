import { ICategories } from "./Game";

interface ICounterUserReducer {
    token: string;
    user: object;
}

export interface ICounterUser {
    users: IUser[];
    user: ICounterUserReducer;
    isLoggedIn: boolean;
    profile: object;
}

export interface IUser {
    _id: string;
    createdAt: string;
    updatedAt: string;
    nickname: string;
    phone: string;
    password: string;
    role: string;
    level: ILevel;
    points: IExperience;
    categories: ICategories[];
    amountOptions: number;
    amountQuestions: number;
    pais: IPais;
    provincia: IProvincia;
    municipio: IMunicipio;
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
    amountOptions: string;
}

export interface ISetting {
    pais: string;
    provincia: string;
    municipio: string;
}

export interface ILevel {
    _id: string;
    createdAt: string;
    updatedAt: string;
    level: number;
    max: number;
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
}