import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('myWatchlist');
    if (savedMovies) {
      return JSON.parse(savedMovies);
    } else {
      return [];
    }
  });
  
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    localStorage.setItem('myWatchlist', JSON.stringify(movies));
  }, [movies]); 

  const handleAddMovie = (e) => {
    e.preventDefault(); 
    if (title.trim() === '') return;

    const newMovie = {
      id: Date.now(), 
      title: title,
      comment: comment,
      rating: parseInt(rating)
    };

    setMovies([...movies, newMovie]);
    setTitle('');
    setComment('');
    setRating(5);
  };

  const handleRemoveMovie = (id) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const renderStars = (num) => {
    return '⭐'.repeat(num);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Tobch's Watchlist</h1>
        <p>Log and review your favorite movies.</p>
      </header>

      <form className="movie-form" onSubmit={handleAddMovie}>
        <div className="input-group">
          <label>Movie Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="e.g., The Matrix"
            required 
          />
        </div>

        <div className="input-group">
          <label>Review / Comments</label>
          <textarea 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            placeholder="What did you think of it?"
            rows="3"
          />
        </div>

        <div className="input-group">
          <label>Rating (1-5 Stars)</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="5">5 - Masterpiece</option>
            <option value="4">4 - Great</option>
            <option value="3">3 - Good</option>
            <option value="2">2 - Meh</option>
            <option value="1">1 - Terrible</option>
          </select>
        </div>

        <button type="submit" className="add-btn">Add to List</button>
      </form>

      <div className="movie-list">
        {movies.length === 0 ? (
          <p className="empty-state">Your watchlist is empty. Add a movie above!</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="movie-header">
                <h2>{movie.title}</h2>
                <span className="stars">{renderStars(movie.rating)}</span>
              </div>
              <p className="movie-comment">"{movie.comment}"</p>
              <button 
                className="delete-btn" 
                onClick={() => handleRemoveMovie(movie.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;