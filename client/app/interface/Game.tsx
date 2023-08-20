export interface IGame {
    _id: string;
    createdAt: string;
    updatedAt: string;
    questions: string[];
    user: string;
}

export interface ICounterGame {
    games: IGame[],
    game: object;
}