export interface ICounterUser {
    users: IUser[];
    user: object;
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
    categories: string[];
    amountOptions: number;
    amountQuestions: number;
}
