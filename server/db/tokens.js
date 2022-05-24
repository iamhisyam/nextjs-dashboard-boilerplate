import { nanoid } from 'nanoid';

export async function findTokenByIdAndType(db, id, type) {
  const token = await db.token
    .findFirst({
      where: {
        id,
        type,
      },
    });

    return token
}

export async function findAndDeleteTokenByIdAndType(db, id, type) {
 
  const token = await db.token.findFirst({
    where: {
      id: id,
     type: type
    }
  })


  if(!token) return null;
  const  deleteToken = await db.token.delete({
      where: { id:token.id },
    });

    return deleteToken
}

export async function createToken(db, { userId, type, expireAt }) {
  const securedTokenId = nanoid(32);
  const token = {
    id: securedTokenId,
    userId,
    type,
    expireAt,
  };
  await db.token.create({ data: token });
  return token;
}