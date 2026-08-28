import express from "express";

import multer from "multer";

import getArtistPlaylists, { uploadMusic,getArtistMusics ,createPlaylist, getplaylists,getAllMusics,getPlaylistById, getMusicById} from "../controller/music.controller.js";
import { authArtistMiddleware,authUserMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();


const upload = multer({

    dest: "uploads/"

});

router.get('/',authUserMiddleware,getAllMusics)
router.post(

    "/upload",authArtistMiddleware,

    upload.fields([

        {
            name: "music",
            maxCount: 1
        },

        {
            name: "coverImage",
            maxCount: 1
        }

    ]),

    uploadMusic

);

router.get(
    "/my-musics",
    authArtistMiddleware,
    getArtistMusics
);
export default router;

router.post('/playlist',authArtistMiddleware,createPlaylist)

router.get('/playlists',authUserMiddleware,getplaylists)

router.get('/playlist/artist',authArtistMiddleware,getArtistPlaylists)

router.get('/playlist/:id',authUserMiddleware,getPlaylistById)

router.get('/get-details/:id',authUserMiddleware,getMusicById)