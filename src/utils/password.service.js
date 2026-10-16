
import bcrypt from "bcryptjs";

async function hashPassword(password) {
    const saltRounds = 12;

    const passwordHash = await bcrypt.hash(password, saltRounds);

    return passwordHash;
}

async function verifyPassword(passwordHash, password) {
    const result = await bcrypt.compare(password, passwordHash);

    return result;
}

function removePasswordHashFromUserObj(user) {
    user = [user].map(user => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }));

    user = user[0];

    return user;
}

export {
    hashPassword,
    verifyPassword,
    removePasswordHashFromUserObj
};
