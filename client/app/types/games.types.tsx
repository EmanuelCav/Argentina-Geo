import { RouteProp } from "@react-navigation/native";
import { ICategories, IGame } from "../interface/Game";
import { RoutesProps, StackNavigation } from "./props.types";

export type GameType = {
    games: IGame[];
    game: IGame;
    categories: ICategories[];
}

export type PlayingType = {
    route: RouteProp<RoutesProps, 'Playing'>;
    navigation: StackNavigation;
}