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
    pais: string;
    provincia: string;
    municipio: string;
}
