import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../style/MusicDetails.css";

const MUSIC_API = "http://localhost:3002/api/music";

function MusicDetails() {
  const { id } = useParams();
  const audioRef = useRef(null);
  const [music, setMusic] = useState(null);
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMusic = async () => {
      try {
        const response = await axios.get(`${MUSIC_API}/get-details/${id}`, {
          withCredentials: true,
        });
        setMusic(response.data.music);
      } catch (loadError) {
        setError(
          loadError.response?.data?.message || "Unable to load this track."
        );
      } finally {
        setLoading(false);
      }
    };

    loadMusic();
  }, [id]);

  const handleVolumeChange = (event) => {
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
    if (audioRef.current) {
      audioRef.current.volume = nextVolume;
    }
  };

  const handleSpeedChange = (event) => {
    const nextSpeed = Number(event.target.value);
    setSpeed(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  return (
    <main className="music-details-page">
      <div className="music-details-shell">
        <Link className="music-details-back" to="/">
          Back to library
        </Link>

        {loading && <p className="music-details-message">Loading track...</p>}
        {!loading && error && <p className="music-details-message">{error}</p>}

        {!loading && !error && music && (
          <section className="music-details-card" aria-labelledby="music-details-title">
            <div className="music-details-art-wrap">
              {music.coverImageKey ? (
                <img className="music-details-art" src={music.coverImageKey} alt={`${music.title} cover`} />
              ) : (
                <div className="music-details-art music-details-art--fallback" aria-hidden="true">
                  {music.title?.[0]}
                </div>
              )}
            </div>

            <div className="music-details-copy">
              <span className="eyebrow">Now playing</span>
              <h1 id="music-details-title">{music.title}</h1>
              <p className="music-details-artist">{music.artist}</p>

              {music.musicKey ? (
                <div className="music-player">
                  <audio ref={audioRef} controls preload="metadata" src={music.musicKey} />
                  <div className="music-player-setting">
                    <label htmlFor="volume-control">Volume</label>
                    <input
                      id="volume-control"
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                    />
                    <output htmlFor="volume-control">{Math.round(volume * 100)}%</output>
                  </div>
                  <div className="music-player-setting">
                    <label htmlFor="speed-control">Playback speed</label>
                    <input
                      id="speed-control"
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.25"
                      value={speed}
                      onChange={handleSpeedChange}
                    />
                    <output htmlFor="speed-control">{speed}x</output>
                  </div>
                </div>
              ) : (
                <p className="music-details-message">Audio is not available for this track.</p>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default MusicDetails;
