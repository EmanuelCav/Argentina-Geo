import { ICategories } from "./Game";

export interface ICounterUser {
    users: IUser[];
    user: object;
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
    level: number;
    points: number;
    categories: ICategories[];
    amountOptions: number;
    amountQuestions: number;
    pais: IPais;
    provincia: IProvincia;
    municipio: IMunicipio;
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