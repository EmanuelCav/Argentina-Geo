import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RoutesProps = {
    Home: undefined;
    Play: undefined;
    Playing: undefined;
    Ranking: undefined;
    Settings: undefined;
};

export type StackNavigation = NativeStackNavigationProp<RoutesProps>;

export type ButtonNavigateProps = {
    text: string;
    redirect: () => void;
}

export type ShowStatisticsProps = {
    navigation: StackNavigation;
    setIsProfile: (isProfile: boolean) => void;
    isProfile: boolean;
}
