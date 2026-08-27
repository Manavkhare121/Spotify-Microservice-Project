import express from "express";

import multer from "multer";

import { uploadMusic } from "../controller/music.controller.js";
import { authArtistMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();


const upload = multer({

    dest: "uploads/"

});


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


export default router;