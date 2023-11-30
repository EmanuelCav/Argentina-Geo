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
