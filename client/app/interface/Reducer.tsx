import { GameType } from "../types/games.types";
import { UserType } from "../types/user.types";

export interface IReducer {
    games: GameType;
    users: UserType;
}