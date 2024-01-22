import { UserType } from "../types/user.types"

export const isNewDate = (time: string, users: UserType) => {

    const dateFound = users.users.total?.find((u) => {
        if (u.points.lastGame) {
            return u.points.lastGame === time
        }
    })

    if (dateFound) {
        return false
    }

    return true
}