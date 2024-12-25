import { ICounterUser, ITent } from "../interface/User";

export type MenuTentPropsType = {
    tents: ITent[];
    user: ICounterUser;
}

export type ElementTentPropsType = {
    handleTent: (tent: ITent) => void;
    element: ITent;
}