import prisma from "./db";

export default async function getUserByUsername(username: string) {
    const user = await prisma.user.findUnique({
        where: { username },
    })

    return user;
}