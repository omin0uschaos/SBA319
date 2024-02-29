function userIdGen() {
    const characters = 'ABCDEFGHI123456789JKLMNOPQRSTU012345678VWXYZ12345789';
    const idLength = 12;
    let userId = '';

    for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        userId += characters[randomIndex];
    }

    return userId;
}

function songIdGen() {
    const characters = 'ABCDEFGHI123456789JKLMNOPQRSTU012345678VWXYZ12345789';
    const idLength = 16;
    let songId= '';

    for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        songId += characters[randomIndex];
    }

    return songId;
}

export { userIdGen, songIdGen };