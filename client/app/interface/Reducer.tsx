import { GameType } from "../types/games.types";
import { UserType } from "../types/user.types";
import { ResponseType } from "../types/response.types";

export interface IReducer {
    games: GameType;
    users: UserType;
    response: ResponseType;
}