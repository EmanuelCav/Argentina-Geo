import { Dispatch } from "react";
import { AnyAction } from "redux";

import { StackNavigation } from "./props.types";

export type MenuPlayPropsType = {
    navigation: StackNavigation;
    dispatch: Dispatch<AnyAction>;
    token: string;
    isConnection: boolean;
}