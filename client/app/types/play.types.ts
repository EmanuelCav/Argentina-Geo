import { Dispatch } from "react";
import { UnknownAction } from "redux";

import { StackNavigation } from "./props.types";

export type MenuPlayPropsType = {
    navigation: StackNavigation;
    dispatch: Dispatch<UnknownAction>;
    token: string;
    isConnection: boolean;
}