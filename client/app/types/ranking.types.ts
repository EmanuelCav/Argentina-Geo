import { Dispatch, MutableRefObject } from "react";
import { AnyAction } from "redux";

import { ICounterUser, ILocationRank, IUser } from "../interface/User";
import { DateRankType, RanksType, StackNavigation } from "./props.types";

export type HeaderRankPropsType = {
    changeFilter: () => void;
    users: ICounterUser;
    positionRank: number;
    rankState: MutableRefObject<RanksType[]>;
}

export type DateRankPropsType = {
    isTotal: boolean;
    isYear: boolean; 
    isMonth: boolean; 
    isDay: boolean; 
    showTotal: () => void; 
    showYear: () => void; 
    showMonth: () => void; 
    showDay: () => void;
}

export type ButtonDateRankPropsType = {
    func: () => void;
    isDisabled: boolean;
    text: string;
}

export type FilterRankPropsType = {
    users: ICounterUser;
    setRankData: (rankData: DateRankType) => void;
    rankData: DateRankType;
    dispatch: Dispatch<AnyAction>
}

export type UserRankPropsType = {
    index: number;
    user: IUser;
    users: ICounterUser;
    rankData: DateRankType;
    navigation: StackNavigation;
}

export type LocationRankPropsType = {
    location: ILocationRank;
    index: number;
}