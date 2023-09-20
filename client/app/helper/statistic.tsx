import { ICategoriesUser } from "../interface/Game";

export const totalQuestions = (categories: ICategoriesUser[]): number => {

    let total: number = 0

    categories.forEach((category) => {
        total+=category.questions
    })

    return total

}

export const totalCorrects = (categories: ICategoriesUser[]): number => {

    let total: number = 0

    categories.forEach((category) => {
        total+=category.corrects
    })

    return total

}