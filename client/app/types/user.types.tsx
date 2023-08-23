import { IUser } from "../interface/User"

export type UserType = {
    users: IUser[];
    user: IUser;
    isLoggedIn: boolean;
    profile: IUser;
}