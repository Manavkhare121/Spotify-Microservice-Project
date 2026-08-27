import ImageKit from "imagekit";
import fs from "fs";
import config from "../config/config.js";

const imagekit = new ImageKit({
    publicKey: config.IMAGEKIT_PUBLIC_KEY,
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: config.IMAGEKIT_URL_ENDPOINT
});

export const uploadMusicOnImageKit = async (localFilePath) => {

    try {

        if (!localFilePath) {
            console.log("Music file path is missing");
            return null;
        }

        console.log("Music path:", localFilePath);
        console.log(
            "Music exists:",
            fs.existsSync(localFilePath)
        );


        if (!fs.existsSync(localFilePath)) {
            console.log("Music file does not exist");
            return null;
        }


        const fileBuffer = fs.readFileSync(localFilePath);

        console.log(
            "Music file size:",
            fileBuffer.length
        );


        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: `music-${Date.now()}.mp3`,
            folder: "/Spotify/Music"
        });


        console.log(
            "ImageKit Music Upload Response:",
            response
        );


        // Delete local file after successful upload
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }


        return response;

    } catch (error) {

        console.log(
            "IMAGEKIT MUSIC FULL ERROR:",
            error
        );

        console.log(
            "IMAGEKIT MUSIC ERROR JSON:",
            JSON.stringify(error, null, 2)
        );


        // Delete local file if upload fails
        if (
            localFilePath &&
            fs.existsSync(localFilePath)
        ) {
            fs.unlinkSync(localFilePath);
        }


        return null;
    }
};



// ===============================
// Upload Cover Image
// ===============================

export const uploadCoverImageOnImageKit = async (localFilePath) => {

    try {

        if (!localFilePath) {
            console.log("Cover image path is missing");
            return null;
        }

        console.log("Cover path:", localFilePath);

        console.log(
            "Cover exists:",
            fs.existsSync(localFilePath)
        );


        if (!fs.existsSync(localFilePath)) {
            console.log("Cover image does not exist");
            return null;
        }


        const fileBuffer = fs.readFileSync(localFilePath);

        console.log(
            "Cover file size:",
            fileBuffer.length
        );


        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: `cover-${Date.now()}.jpg`,
            folder: "/Spotify/CoverImages"
        });


        console.log(
            "ImageKit Cover Upload Response:",
            response
        );


        // Delete local file after successful upload
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }


        return response;

    } catch (error) {

        console.log(
            "IMAGEKIT COVER FULL ERROR:",
            error
        );

        console.log(
            "IMAGEKIT COVER ERROR JSON:",
            JSON.stringify(error, null, 2)
        );


        // Delete local file if upload fails
        if (
            localFilePath &&
            fs.existsSync(localFilePath)
        ) {
            fs.unlinkSync(localFilePath);
        }


        return null;
    }
};