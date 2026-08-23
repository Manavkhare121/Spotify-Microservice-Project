import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../style/Home.css'

const collections = [
  { title: 'Daily Mix', description: 'Made for your everyday listening', color: 'mint' },
  { title: 'Mood Boost', description: 'Bright sounds for a better day', color: 'gold' },
  { title: 'Fresh Finds', description: 'New releases worth hearing', color: 'coral' },
]

function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const visibleCollections = collections.filter((collection) =>
    collection.title.toLowerCase().includes(searchTerm.toLowerCase()),
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
            <span className="eyebrow">Curated for you</span>
            <h2 id="collection-title">Your listening spaces</h2>
          </div>
          <label className="collection-search">
            <span className="sr-only">Search collections</span>
            <input
              type="search"
              placeholder="Search collections"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </div>

        <div className="collection-grid">
          {visibleCollections.map((collection) => (
            <article className={`collection-card ${collection.color}`} key={collection.title}>
              <div className="card-art" aria-hidden="true">♫</div>
              <h3>{collection.title}</h3>
              <p>{collection.description}</p>
              <button type="button">Open collection</button>
            </article>
          ))}
          {visibleCollections.length === 0 && (
            <p className="empty-state">No collections found.</p>
          )}
        </div>
      </section>
    </main>
  )
}

export default Home
