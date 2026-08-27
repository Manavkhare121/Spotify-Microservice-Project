import musicModel from "../models/music.model.js";

import {
    uploadMusicOnImageKit,
    uploadCoverImageOnImageKit
} from "../service/cloudinary.service.js";


export async function uploadMusic(req, res) {

    try {

        const musicFile = req.files?.music?.[0];
        const coverImageFile = req.files?.coverImage?.[0];

        if (!musicFile) {
            return res.status(400).json({
                message: "Music file is required"
            });
        }

        if (!coverImageFile) {
            return res.status(400).json({
                message: "Cover image is required"
            });
        }


        const music = await uploadMusicOnImageKit(
            musicFile.path
        );


        const coverImage = await uploadCoverImageOnImageKit(
            coverImageFile.path
        );


        if (!music || !coverImage) {

            return res.status(500).json({
                message: "Error uploading files"
            });

        }
        
        const newMusic = await musicModel.create({

            title: req.body.title,

            artist:
                req.user.fullName.firstName +
                " " +
                req.user.fullName.lastName,

            artistId: req.user.id,

            musicKey: music.url,

            coverImageKey: coverImage.url

        });


        return res.status(201).json({

            message: "Music uploaded successfully",

            music: newMusic

        });

    } catch (error) {

        console.log(
            "Music Upload Error:",
            error
        );

        return res.status(500).json({

            message: "Internal server error"

        });

    }

}