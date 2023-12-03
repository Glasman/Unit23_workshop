const client = require('./client');
const util = require('util');

const REPLACE_ME = 'HELP REPLACE ME!!!!';

// GET - /api/video-games - get all video games
//seems like a simple start, it's just missing SELECT *
async function getAllVideoGames() {
    try {
        const { rows: videoGames } = await client.query(`
            SELECT * FROM videoGames;
        `);
        return videoGames;
    } catch (error) {
        throw new Error("Make sure you have replaced the REPLACE_ME placeholder.")
    }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
    try {
        const { rows: [videoGame] } = await client.query(`
            SELECT * FROM videoGames
            WHERE id = $1;
        `, [id]);
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// POST - /api/video-games - create a new video game
//use a sql query to add a column with new video game data
async function createVideoGame(body) {
    const { name, description, price, inStock, isPopular, imgUrl } = body;
    try {
        const { rows: [videoGame] } = await client.query(`
            INSERT INTO videoGames(name, description, price, "inStock", "isPopular", "imgUrl")
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `, [name, description, price, inStock, isPopular, imgUrl]);

        return videoGame;
    } catch (error) {
        throw error;
    }
}

// PUT - /api/video-games/:id - update a single video game by id
//confirm that new value isn't an empty string, then push that value to videogames db using UPDATE
async function updateVideoGame(id, fields = {}) {
    const setString = Object.keys(fields).map((key, index) => `"${key}"=$${index + 1}`).join(', ');
    if (setString.length === 0) {
        return;
    }
    try {
        const { rows: [videoGame] } = await client.query(`
            UPDATE videogames
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `, Object.values(fields));
        return videoGame;
    } catch (error) {
        throw error;
    }
}

// DELETE - /api/video-games/:id - delete a single video game by id
//pull id from url, use that value to delete the correct row
async function deleteVideoGame(id) {
    try {
        const { rows: [videoGames] } = await client.query(`
        DELETE FROM videogames
        WHERE id=$1
        RETURNING *;`
        , [id]);
        return videoGames;
    } catch (err) {
        throw err}
}

module.exports = {
    getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame
}