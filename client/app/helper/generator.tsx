import { IQuestion } from "../interface/Game";

export function gameWithoutInternet(games: IQuestion[][]): IQuestion[] {

    let questions: IQuestion[] = []

    for (let i = 0; i < games.length; i++) {
        for (let j = 0; j < games[i].length; j++) {
            questions.push(games[i][j])
        }
    }

    return shuffle(questions)

}

export const generateOptions = (options: string[], amountOptions: number): string[] => {

    let arr = []

    const correctOption = Math.floor(Math.random() * amountOptions)

    const shuffledOptions: string[] = shuffle(options.slice(1, amountOptions + 1))

    for (let i = 0; i < amountOptions; i++) {
        if(i === correctOption) {
            arr.push(options[0])
        } else {
            arr.push(shuffledOptions[i])
        }
    }

    return arr

}

export const helpsOptions = (options: string[], question: IQuestion, amountOptions: number): string[] => {

    const optionsFiltered = shuffle(options.filter(o => o !== question.answer)).slice(0, amountOptions / 2)

    return optionsFiltered

}

function shuffle(array: any[]) {

    let currentIndex = array.length, randomIndex;

    while (currentIndex > 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;

}
