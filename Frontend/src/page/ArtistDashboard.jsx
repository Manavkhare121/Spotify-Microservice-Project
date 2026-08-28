import "../style/ArtistDashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MUSIC_API = "http://localhost:3002/api/music";

function ArtistDashboard() {
  const navigate = useNavigate();
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [musicResponse, playlistResponse] = await Promise.all([
          axios.get(`${MUSIC_API}/my-musics`, { withCredentials: true }),
          axios.get(`${MUSIC_API}/playlist/artist`, { withCredentials: true }),
        ]);

        setTracks(musicResponse.data.musics || []);
        setPlaylists(playlistResponse.data.playlists || []);
      } catch (loadError) {
        setError(
          loadError.response?.data?.message ||
          loadError.message ||
          "Unable to load your music and playlists."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <main className="artist-dashboard">
      <header className="artist-dashboard__header">
        <div className="artist-dashboard__heading">
          <span className="eyebrow">Artist workspace</span>
          <h1>Artist Dashboard</h1>
          <p>Keep your releases and playlists in rhythm.</p>
        </div>
        <button
          className="artist-dashboard__upload"
          type="button"
          onClick={() => navigate("/artist/dashboard/upload-music")}
        >
          + Upload music
        </button>
      </header>

      <div className="artist-dashboard__content">
        <section className="artist-dashboard__section artist-dashboard__section--music" aria-labelledby="music-title">
          <div className="artist-dashboard__section-heading">
            <h2 id="music-title">Your music</h2>
            <span className="artist-dashboard__count">{tracks.length} releases</span>
          </div>
          {loading && <p className="artist-dashboard__empty">Loading your music...</p>}
          {!loading && !tracks.length && <p className="artist-dashboard__empty">No music uploaded yet.</p>}
          {!loading && tracks.length > 0 && (
            <ul className="artist-dashboard__track-list">
              {tracks.map((track) => (
                <li className="artist-dashboard__track" key={track._id}>
                  {track.coverImageKey ? (
                    <img className="artist-dashboard__cover" src={track.coverImageKey} alt="" />
                  ) : (
                    <span className="artist-dashboard__cover" aria-hidden="true">{track.title?.[0]}</span>
                  )}
                  <div>
                    <p className="artist-dashboard__track-title">{track.title}</p>
                    <p className="artist-dashboard__track-meta">{track.artist}</p>
                  </div>
                  {track.musicKey && (
                    <audio className="artist-dashboard__audio" controls preload="none" src={track.musicKey} />
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="artist-dashboard__section" aria-labelledby="playlists-title">
          <div className="artist-dashboard__section-heading">
            <h2 id="playlists-title">Playlists</h2>
            <span className="artist-dashboard__count">{playlists.length} collections</span>
          </div>
          {loading && <p className="artist-dashboard__empty">Loading playlists...</p>}
          {!loading && !playlists.length && <p className="artist-dashboard__empty">No playlists created yet.</p>}
          {!loading && playlists.length > 0 && (
            <ul className="artist-dashboard__playlist-list">
              {playlists.map((playlist) => (
                <li className="artist-dashboard__playlist" key={playlist._id}>
                  <span className="artist-dashboard__playlist-art" aria-hidden="true">{playlist.title?.[0]}</span>
                  <div>
                    <h3>{playlist.title}</h3>
                    <p>{playlist.artist} · {playlist.musics?.length || 0} tracks</p>
                  </div>
                  <button
                    className="artist-dashboard__action"
                    type="button"
                    onClick={() => setSelectedPlaylist(playlist)}
                  >
                    Open
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        {selectedPlaylist && (
          <section className="artist-dashboard__section" aria-labelledby="playlist-details-title">
            <div className="artist-dashboard__section-heading">
              <h2 id="playlist-details-title">{selectedPlaylist.title}</h2>
              <button
                className="artist-dashboard__action"
                type="button"
                onClick={() => setSelectedPlaylist(null)}
              >
                Close
              </button>
            </div>
            <p className="artist-dashboard__playlist-owner">By {selectedPlaylist.artist}</p>
            {selectedPlaylist.musics?.length ? (
              <ul className="artist-dashboard__playlist-tracks">
                {selectedPlaylist.musics.map((music) => (
                  <li className="artist-dashboard__playlist-track" key={music._id}>
                    <img className="artist-dashboard__playlist-cover" src={music.coverImageKey} alt="" />
                    <div>
                      <p className="artist-dashboard__track-title">{music.title}</p>
                      <p className="artist-dashboard__track-meta">{music.artist}</p>
                    </div>
                    <audio controls preload="none" src={music.musicKey} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="artist-dashboard__empty">This playlist has no music yet.</p>
            )}
          </section>
        )}

        <section className="artist-dashboard__section" aria-labelledby="recent-title">
          <div className="artist-dashboard__section-heading">
            <h2 id="recent-title">Recent activity</h2>
          </div>
          <p className="artist-dashboard__empty">{error || "Your latest uploads will appear here."}</p>
        </section>
      </div>
    </main>
  )
}

export default ArtistDashboard
