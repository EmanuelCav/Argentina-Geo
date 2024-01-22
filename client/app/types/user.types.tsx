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

export type DateRankType = 'total' | 'year' | 'month' | 'day';
export type RanksType = 'user-alt' | 'flag' | 'city' | 'location-arrow';
export type LocationRankType = 'pais' | 'provincia' | 'municipio'