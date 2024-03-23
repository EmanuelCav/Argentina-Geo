import { Image } from "react-native";
import { StackNavigation } from "../types/props.types";
import { UserDataType } from "../types/user.types";
import { IPoints, IUser } from "./User";

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
}

export interface IQuestion {
    _id: string;
    createdAt: string;
    updatedAt: string;
    question: string;
    options: string[];
    category: ICategories;
    answer: string;
    image: IImage;
}

export interface IImage {
    _id: string;
    createdAt: string;
    updatedAt: string;
    image: string;
    imageId: string;
}

export interface IGameGenerate {
    token: string;
    navigation: StackNavigation;
    setMessage: (message: string) => void;
}

export interface IExperienceGame {
    pointsData: IPoints;
    user: UserDataType;
}