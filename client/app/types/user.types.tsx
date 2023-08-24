import { IUser } from "../interface/User"

export type UserDataType = {
    user: IUser;
    token: string;
}

export type UserType = {
    users: IUser[];
    user: UserDataType;
    isLoggedIn: boolean;
    profile: IUser;
}