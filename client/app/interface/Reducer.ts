import { ICounterUser } from "./User";
import { IResponse } from "./Response";

export interface IReducer {
    users: ICounterUser;
    response: IResponse;
}