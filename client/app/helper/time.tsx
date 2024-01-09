import { UserType } from "../types/user.types"

const url = "http://worldtimeapi.org/api/timezone/America/Argentina/Buenos_Aires"

export const getTime = async () => {

    try {

        const time = await fetch(url).then((res) => {
            return res.json()
        })
        
        return time.datetime.split("T")[0]
        
    } catch (error) {
        console.log(error);
    }

}

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