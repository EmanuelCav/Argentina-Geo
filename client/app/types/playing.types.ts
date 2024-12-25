import { RouteProp } from "@react-navigation/native";
import { InterstitialAd } from "react-native-google-mobile-ads";

import { HelpType, RoutesProps, StackNavigation } from "./props.types";
import { IQuestion } from "../interface/Game";

export type PlayingType = {
    route: RouteProp<RoutesProps, 'Playing'>;
    navigation: StackNavigation;
}

export type FinishPropsType = {
    seconds: number;
    minutes: number;
    corrects: number;
    points: number;
    navigation: StackNavigation;
    viewErrors: () => void;
    areErrors: boolean;
    isGameError: boolean;
    isConnection: boolean | null;
    isAdd: boolean;
    changeHelp: (type: HelpType) => void;
    interstitial: InterstitialAd;
    isRecompensadoLoaded: boolean;
    setIsRecompensadoLoaded: (isRecompensadoLoaded: boolean) => void;
    isIntersitialLoaded: boolean;
}

export type DataFinishPropsType = {
    seconds: number;
    minutes: number;
    corrects: number;
    points: number;
    isGameError: boolean;
}

export type ShowQuestionPropsType = {
    questions: IQuestion[];
    numberQuestion: number;
}

export type GameDataPropsType = {
    numberQuestion: number;
    amountQuestions: number;
    seconds: number;
    minutes: number;
    helps: number;
    isHelped: boolean; 
    changeHelp: (type: HelpType) => void;
    isGameError: boolean;
}

export type HelpsPropsType = {
    changeHelp: (type: HelpType) => void; 
    helps: number; 
    isHelped: boolean;
}

export type QuestionPositionPropsType = {
    numberQuestion: number; 
    amountQuestions: number;
}

export type TimePropsType = {
    seconds: number;
    minutes: number;
}

export type AnswerPropsType = {
    isCorrect: boolean; 
    answer: string;  
    continueGame: () => void;
}

export type ShowOptionGamePropsType = {
    options: string[];
    nextQuestion: (item: string) => void;
    amountOptions: number;
    isHelped: boolean;
    optionsHelped: string[];
}

export type OptionGamePropsType = {
    text: string;
    nextQuestion: (item: string) => void;
    amountOptions: number;
    disabled: boolean
}