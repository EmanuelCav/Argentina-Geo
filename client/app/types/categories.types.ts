import { ICategoriesUser } from "../interface/Game";

export type ActionCategoryPropsType = {
    text: string; 
    handleAction: (action: string) => void;
    action: string;
}

export type CategoryPropsType = {
    changeCategory: (id: string) => void;
    category: ICategoriesUser;
}

export type ShowCategoriesPropsType = {
    changeCategory: (id: string) => void;
    categories: ICategoriesUser[];
}