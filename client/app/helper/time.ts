import { ICounterUser } from "../interface/User"

export const isNewDate = (time: string, users: ICounterUser) => {

    const dateFound = users.users.total?.find((u) => {
        if (u.points?.lastGame) return u.points.lastGame === time
    })

    if (dateFound) return false
    
    return true
}