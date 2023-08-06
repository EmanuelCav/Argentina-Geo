import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {

    const salt: string = await bcrypt.genSalt(8)
    return await bcrypt.hash(password, salt)

}