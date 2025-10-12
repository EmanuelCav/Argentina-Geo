import { Dispatch } from "react";
import { UnknownAction } from "redux";

import { ISetting, IUserInfo } from "../interface/User";
import { StackNavigation } from "./props.types";

export type SelectPropsType = {
    loc: string;
    user: IUserInfo;
    setSettingsData: (userLocation: ISetting) => void;
    userLocation?: string;
    settingsData: ISetting;
    data: string[];
    setIsPais: (isLocation: boolean) => void;
    setIsProvincia: (isProvincia: boolean) => void;
    setIsMunicipio: (isMunicipio: boolean) => void;
}

export type LocationPropsType = {
    loc: string;
    settingsData: ISetting;
    setSettingsData: (userLocation: ISetting) => void;
    location: string;
    userLocation?: string;
}

export type AuthPropsType = {
    navigation: StackNavigation;
    setIsAuth: (isAuth: boolean) => void;
    dispatch: Dispatch<UnknownAction>
}

export type InputPropsType = {
    label: string;
    value: string;
    handleChange: (value: string) => void;
    isPassword: boolean;
}

export type ButtonNavigatePropsType = {
    text: string;
    redirect: () => void;
}

export type ChangeCodePropsType = {
    setIsCode: (isCode: boolean) => void;
    user: IUserInfo;
}

export type ChangeNicknamePropsType = {
    setIsNickname: (isNickname: boolean) => void;
    user: IUserInfo;
}

export type SelectorPropsType = {
    settingsData: ISetting;
    setIsPais: (isPais: boolean) => void;
    setIsProvincia: (isProvincia: boolean) => void;
    setIsMunicipio: (isMunicipio: boolean) => void;
}

export type InputSelectPropsType = {
    value?: string;
    setIsPais: (isLocation: boolean) => void;
    setIsProvincia: (isProvincia: boolean) => void;
    setIsMunicipio: (isMunicipio: boolean) => void;
    isDisabled: boolean;
    location: string;
}

export type CodeSettingsPropsType = {
    password: string;
    nickname: string;
    setIsAuth: (isAuth: boolean) => void;
    setIsCode: (isCode: boolean) => void;
    setIsNickname: (isNickname: boolean) => void;
}