import { IQuestion } from "../interface/Game";

export function gameWithoutInternet(games: IQuestion[][]): IQuestion[] {
    
    let questions: IQuestion[] = []

    for (let i = 0; i < games.length; i++) {
        for (let j = 0; j < games[i].length; j++) {
            questions.push(games[i][j])   
        }
    }

    return questions

}