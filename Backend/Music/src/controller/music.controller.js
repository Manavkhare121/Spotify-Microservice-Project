import musicModel from "../models/music.model.js";
import playlistModel from "../models/playlist.model.js";
import {
  uploadMusicOnImageKit,
  uploadCoverImageOnImageKit,
} from "../service/cloudinary.service.js";

export async function uploadMusic(req, res) {
  try {
    const musicFile = req.files?.music?.[0];
    const coverImageFile = req.files?.coverImage?.[0];

    if (!musicFile) {
      return res.status(400).json({
        message: "Music file is required",
      });
    }

    if (!coverImageFile) {
      return res.status(400).json({
        message: "Cover image is required",
      });
    }

    const music = await uploadMusicOnImageKit(musicFile.path);

    const coverImage = await uploadCoverImageOnImageKit(coverImageFile.path);

    if (!music || !coverImage) {
      return res.status(500).json({
        message: "Error uploading files",
      });
    }

    const newMusic = await musicModel.create({
      title: req.body.title,

      artist: req.user.fullName.firstName + " " + req.user.fullName.lastName,

      artistId: req.user.id,

      musicKey: music.url,

      coverImageKey: coverImage.url,
    });

    return res.status(201).json({
      message: "Music uploaded successfully",

      music: newMusic,
    });
  } catch (error) {
    console.log("Music Upload Error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
export async function getArtistMusics(req, res) {
  try {
    const musics = await musicModel.find({
      artistId: req.user.id,
    });

    return res.status(200).json({
      message: "Artist musics fetched successfully",
      musics,
    });
  } catch (err) {
    console.log("Get Artist Musics Error:", err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function createPlaylist(req, res) {
  const { title, musics } = req.body;
  try {
    const playlist = await playlistModel.create({
      artist: req.user.fullName.firstName + " " + req.user.fullName.lastName,
      artistId: req.user.id,
      title,
      userId: req.user.id,
      musics,
    });
    return res.status(201).json({
      message: "Playlist created successfully",
      playlist,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Interval server error" });
  }
}

export async function getplaylists(req,res){
    try{
        const playlists=await playlistModel
          .find({artistId:req.user.id})
          .populate('musics')
        return res.status(200).json({playlists});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Internal server error'});
    }
}

export async function getAllMusics(req, res) {
  try {
    const musics = await musicModel.find();

    return res.status(200).json({
      message: "All musics fetched successfully",
      musics,
    });
  } catch (err) {
    console.log("Get All Musics Error:", err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getPlaylistById(req, res) {
  try {
    const { id } = req.params;

    const playlist = await playlistModel.findById(id);

    if (!playlist) {
      return res.status(404).json({
        message: "Playlist not found",
      });
    }

    return res.status(200).json({
      message: "Playlist fetched successfully",
      playlist,
    });
  } catch (err) {
    console.log("Get Playlist By ID Error:", err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

export async function getMusicById(req, res) {
  try {
    const { id } = req.params;

    const music = await musicModel.findById(id);

    if (!music) {
      return res.status(404).json({
        message: "Music not found",
      });
    }

    return res.status(200).json({
      message: "Music fetched successfully",
      music,
    });
  } catch (err) {
    console.log("Get Music By ID Error:", err);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}


export default async function getArtistPlaylists(req,res) {
    try{
        const playlists=await playlistModel
          .find({artistId:req.user.id})
          .populate("musics");
        return res.status(200).json({playlists})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:'Internal server error'});
    }
}