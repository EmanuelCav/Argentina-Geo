import { ICounterUser, IUser, IUsersRank } from "../interface/User";
import { StackNavigation } from "./props.types";

export type UserInfoPropsType = {
    user: IUser;
    users: IUsersRank;
}

export type MenuPropsType = {
    navigation: StackNavigation;
    user: ICounterUser;
    isConnection: boolean | null;
    setIsChangeView: (isChangeView: boolean) => void;
    isChangeView: boolean;
}