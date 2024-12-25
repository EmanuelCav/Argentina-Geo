import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { IQuestion } from "../interface/Game";

export type RoutesProps = {
    Home: undefined;
    Play: undefined;
    Playing: {
        questionsWC: IQuestion[];
        isConnection: boolean | null;
    };
    Ranking: undefined;
    Settings: undefined;
    Tent: undefined;
    Options: undefined;
    Categories: undefined;
    Profile: undefined;
};

export type StackNavigation = NativeStackNavigationProp<RoutesProps>;

export type ButtonMenuPropsType = {
    text: string;
    redirect: () => void;
    disabled: boolean;
}

export type ButtonAcceptPropsType = {
    isCategory: boolean;
    func: () => void;
    text: string;
}

export type DateRankType = 'total' | 'year' | 'month' | 'day';
export type RanksType = 'user-alt' | 'flag' | 'city' | 'location-arrow';
export type LocationRankType = 'pais' | 'provincia' | 'municipio';
export type HelpType = 'add' | 'help';