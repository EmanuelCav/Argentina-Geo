import { SetStateAction } from "react";

import { IOptions } from "../interface/User";

export type SelectOptionPropsType = {
    setOptionsData: (optionData: SetStateAction<IOptions>) => void;
    amountOptions: number;
}

export type SliderQuestionPropsType = {
    setOptionsData: (optionData: SetStateAction<IOptions>) => void;
    amountQuestions: number;
}

export type OptionSelectPropsType = {
    amountOptions: number;
    optionData: (value: number) => void;
    number: number;
}