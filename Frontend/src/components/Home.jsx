import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../style/Home.css'

const MUSIC_API = 'http://localhost:3002/api/music'

function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [music, setMusic] = useState([])
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadLibrary = async () => {
      try {
        const [musicResponse, playlistResponse] = await Promise.all([
          axios.get(MUSIC_API, { withCredentials: true }),
          axios.get(`${MUSIC_API}/playlists`, { withCredentials: true }),
        ])

        setMusic(musicResponse.data.musics || [])
        setPlaylists(playlistResponse.data.playlists || [])
      } catch (loadError) {
        setError(
          loadError.response?.data?.message ||
          'Unable to load the music library.',
        )
      } finally {
        setLoading(false)
      }
    }

    loadLibrary()
  }, [])

  const visibleMusic = music.filter((track) =>
    `${track.title} ${track.artist}`.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  const visiblePlaylists = playlists.filter((playlist) =>
    `${playlist.title} ${playlist.artist}`.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <main className="home-page">
      <header className="home-header">
        <Link className="brand" to="/">spotify</Link>
        <nav className="home-nav" aria-label="Main navigation">
          <Link to="/login">Log in</Link>
          <Link className="nav-cta" to="/register">Sign up</Link>
        </nav>
      </header>

      <section className="home-hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <span className="eyebrow">Your sound, in one place</span>
          <h1 id="home-title">Find the feeling behind the music.</h1>
          <p>Explore hand-picked listening spaces made for every version of you.</p>
          <Link className="hero-cta" to="/register">Start listening</Link>
        </div>
        <div className="hero-art" aria-hidden="true">
          <span className="art-disc art-disc-one" />
          <span className="art-disc art-disc-two" />
          <span className="art-note">♪</span>
        </div>
      </section>

      <section className="collection-section" aria-labelledby="collection-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">The library</span>
            <h2 id="collection-title">Music and playlists</h2>
          </div>
          <label className="collection-search">
            <span className="sr-only">Search collections</span>
            <input
              type="search"
              placeholder="Search music or playlists"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </div>

        {loading && <p className="empty-state">Loading the library...</p>}
        {!loading && error && <p className="empty-state">{error}</p>}

        {!loading && !error && (
          <div className="library-layout">
            <section className="library-panel" aria-labelledby="music-title">
              <div className="library-panel-heading">
                <h3 id="music-title">All music</h3>
                <span>{visibleMusic.length} tracks</span>
              </div>
              {visibleMusic.length > 0 ? (
                <ul className="music-list">
                  {visibleMusic.map((track) => (
                    <li className="music-item" key={track._id}>
                      <Link className="music-item-link" to={`/music/${track._id}`}>
                        {track.coverImageKey ? (
                          <img src={track.coverImageKey} alt={`${track.title} cover`} />
                        ) : (
                          <span className="music-item-art" aria-hidden="true">{track.title?.[0]}</span>
                        )}
                        <div className="music-item-copy">
                          <strong>{track.title}</strong>
                          <span>{track.artist}</span>
                        </div>
                      </Link>
                      
                    </li>
                  ))}
                </ul>
              ) : <p className="empty-state">No music found.</p>}
            </section>

            <section className="library-panel" aria-labelledby="playlists-title">
              <div className="library-panel-heading">
                <h3 id="playlists-title">All playlists</h3>
                <span>{visiblePlaylists.length} playlists</span>
              </div>
              {visiblePlaylists.length > 0 ? (
                <ul className="playlist-list">
                  {visiblePlaylists.map((playlist) => (
                    <li className="playlist-item" key={playlist._id}>
                      <span className="playlist-art" aria-hidden="true">{playlist.title?.[0]}</span>
                      <div>
                        <strong>{playlist.title}</strong>
                        <span>{playlist.artist} · {playlist.musics?.length || 0} tracks</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : <p className="empty-state">No playlists found.</p>}
            </section>
          </div>
        )}

        {!loading && !error && !music.length && !playlists.length && (
          <p className="empty-state">The library is empty.</p>
        )}
      </section>
    </main>
  )
}

export default Home
