import { StackNavigation } from "../types/props.types";
import { ILogin, IUser } from "./User";

export interface IGame {
    _id: string;
    createdAt: string;
    updatedAt: string;
    user: string;
    corrects: number;
    questions: IQuestion[];
}

export interface ICategoriesUser {
    _id: string;
    createdAt: string;
    updatedAt: string;
    category: ICategories;
    questions: number;
    corrects: number;
    isSelect: boolean;
    isUnlocked: boolean;
}

export interface ICategories {
    _id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
}

export interface ICounterGame {
    games: IGame[],
    game: object;
    categories: ICategories[];
}

export interface IQuestion {
    _id: string;
    createdAt: string;
    updatedAt: string;
    question: IQuestionGame;
    options: string[];
    user: IUser;
    categoryUser: string;
}

export interface IImage {
    _id: string;
    createdAt: string;
    updatedAt: string;
    image: string;
    imageId: string;
}

export interface IQuestionGame {
    _id: string;
    createdAt: string;
    updatedAt: string;
    question: string;
    category: string;
    image: IImage;
    answer: string;
    text: string;
}

export interface IGameGenerate {
    token: string;
    navigation: StackNavigation;
    setMessage: (message: string) => void;
}