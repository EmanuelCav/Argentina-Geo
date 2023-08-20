import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RoutesProps = {
    Home: undefined;
    Play: undefined;
    Playing: undefined;
};

export type StackNavigation = NativeStackNavigationProp<RoutesProps>;

export type ButtonNavigateProps = {
    text: string;
    redirect: () => void;
}
