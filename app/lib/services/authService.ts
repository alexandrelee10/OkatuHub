import prisma from '../prisma'
import bcrypt from 'bcrypt'
// Add tokens later

export async function verifyUserCredentials(email: string, password:string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if(!user) throw new Error('Username was not found')

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) throw new Error('Invalid password');

        const { password: _p, ...safeUser } = user;
        return safeUser;
}