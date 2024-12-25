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

export const categoryStatistic = (categories: ICategoriesUser[], questionCategory: string): string | undefined  => {

    const category = categories.find(category => category.category.name === questionCategory)

    if(!category) return

    return category._id

}

export const categoryStatisticCorrect = (categories: ICategoriesUser[], questionCategory: string, number: number) => {

    const category = categories.find(category => category.category.name === questionCategory)

    if(!category){
        return
    }


}