const express = require('express');
const router = express.Router();

const REPLACE_ME = 'HELP REPLACE ME!!!!';

const { getAllVideoGames,
    getVideoGameById,
    createVideoGame,
    updateVideoGame,
    deleteVideoGame } = require('../db/videoGames');
const { deleteBoardGame } = require('../db/boardGames');

// GET - /api/video-games - get all video games
router.get('/', async (req, res, next) => {
    try {
        const videoGames = await getAllVideoGames();
        res.send(videoGames);
    } catch (error) {
        next(error);
    }
});

// GET - /api/video-games/:id - get a single video game by id
//with /:id i'm going to have to pull the id from the url but that looks like
//that's about it
router.get('/:id', async (req, res, next) => {
    try {
        const videoGame = await getVideoGameById(req.params.id);
        res.send(videoGame);
    } catch (error) {
        next(error);
    }
});

// POST - /api/video-games - create a new video game
//use an async function to call the createVideoGame function
//then send that bad boy to the db
router.post('/', async (req, res, next) => {
    // LOGIC GOES HERE 
    try {
        const videoGame = await createVideoGame(req.body);
        res.send(videoGame);
    } catch (error) {
        next(error);
    }
});


// PUT - /api/video-games/:id - update a single video game by id
//pull id from url again and then use an UPDATE query to update the correct field
router.put('/:id', async (req, res, next) => {
    try {
        const videoGame = await updateVideoGame(req.params.id, req.body);
        res.send(videoGame);
    } catch (error) {
        next(error);
    }
});

// DELETE - /api/video-games/:id - delete a single video game by id
//pull id from url, use that value to delete the correct row
router.delete('/:id', async (req, res, next) => {
    try {
        const videoGame = await deleteVideoGame(req.params.id);
        res.send(videoGame);
    } catch (err) {
        throw(err);
    }
});

module.exports = router;
