import { IUser, IUsersRank } from "../interface/User"

export type UserDataType = {
    user: IUser;
    token: string;
}

export type UserType = {
    users: IUsersRank;
    user: UserDataType;
    isLoggedIn: boolean;
    profile: IUser;
}

export type UserReducerType = {
    users: object;
    user: UserDataType;
    isLoggedIn: boolean;
    profile: IUser;
}
