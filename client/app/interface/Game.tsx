export interface IGame {
    _id: string;
    createdAt: string;
    updatedAt: string;
    questions: string[];
    user: string;
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
    categories: ICategories[]
}