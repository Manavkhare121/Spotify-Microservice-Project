import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/UploadMusic.css";

const MUSIC_UPLOAD_API = "http://localhost:3002/api/music/upload";

function UploadMusic() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [music, setMusic] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!coverImage) {
      setCoverPreview("");
      return undefined;
    }

    const previewUrl = URL.createObjectURL(coverImage);
    setCoverPreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [coverImage]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!music || !coverImage) {
      setError("Choose both an audio file and a cover image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("music", music);
    formData.append("coverImage", coverImage);

    setLoading(true);

    try {
      await axios.post(MUSIC_UPLOAD_API, formData, {
        withCredentials: true,
      });
      setSuccess("Your music was uploaded successfully.");
      setTimeout(() => navigate("/artist/dashboard"), 700);
    } catch (uploadError) {
      setError(
        uploadError.response?.data?.message ||
        "We could not upload your music. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="upload-music-page">
      <section className="upload-music-panel" aria-labelledby="upload-music-title">
        <Link className="upload-music-back" to="/artist/dashboard">
          Back to dashboard
        </Link>
        <div className="upload-music-heading">
          <span className="eyebrow">New release</span>
          <h1 id="upload-music-title">Upload music</h1>
          <p>Add a track to your artist catalogue with its cover artwork.</p>
        </div>

        <form className="upload-music-form" onSubmit={handleSubmit}>
          <label htmlFor="music-title">Track title</label>
          <input
            id="music-title"
            name="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter a track title"
            required
          />

          <label className="upload-music-file" htmlFor="music-file">
            <span>Music file</span>
            <small>{music ? music.name : "Choose an audio file"}</small>
            <input
              id="music-file"
              name="music"
              type="file"
              accept="audio/*"
              onChange={(event) => setMusic(event.target.files?.[0] || null)}
              required
            />
          </label>

          <label className="upload-music-file" htmlFor="cover-image">
            <span>Cover image</span>
            <small>{coverImage ? coverImage.name : "Choose a JPG, PNG, or WebP image"}</small>
            <input
              id="cover-image"
              name="coverImage"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => setCoverImage(event.target.files?.[0] || null)}
              required
            />
          </label>

          {coverPreview && (
            <div className="upload-music-preview">
              <span>Cover preview</span>
              <img src={coverPreview} alt="Selected cover artwork preview" />
            </div>
          )}

          {(error || success) && (
            <p className={success ? "upload-music-message upload-music-message--success" : "upload-music-message"} role="status">
              {success || error}
            </p>
          )}

          <button className="upload-music-submit" type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload track"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default UploadMusic;
