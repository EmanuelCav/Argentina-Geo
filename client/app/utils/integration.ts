import { createPaymentApi } from "../server/api/user.api"

export const handleIntegrationMP = async (id: string, token: string) => {

    try {

        const response = await createPaymentApi(id, token)
        
        return response.data

    } catch (error) {
        console.log(error)
    }
}