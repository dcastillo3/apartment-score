export const buildUserData = (data) => {
    const userData = {
        id: data.id,
        email: data.email,
        displayName: data.displayName,
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image
    };

    return userData;
};
