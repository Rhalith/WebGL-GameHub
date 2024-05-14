import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from './api/axiosConfig';
import './App.css';

function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [review, setReview] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await api.get(`/games/${id}`);
        console.log(response)
        setGame(response.data);
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    fetchGame();
  }, [id]);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const submitReview = async () => {
    try {
      await api.post(`/reviews`, {
        gameId: id,
        content: review,
      });
      setReview('');
      setSubmissionStatus('Review submitted successfully!');
      // Re-fetch game to update reviews immediately after submission
      const response = await api.get(`/games/${id}`);
      setGame(response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmissionStatus('Failed to submit review.');
    }
  };

  return (
    <div className="game-page-container">
      <h1>{game.name}</h1>
      <p><strong>Description:</strong> {game.description}</p>
      <p><strong>Like Count:</strong> {game.likeCount}</p>
      <p><strong>Genres:</strong> {game.genres ? game.genres.join(', ') : ''}</p>
      <div className="game-iframe-container">
        <iframe
          scrolling="no"
          allowtransparency="true"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          msallowfullscreen="true"
          id="game_drop"
          src={game.gameLink}
          allowFullscreen="true"
          frameBorder="0"
          allow="autoplay; fullscreen *; geolocation; microphone; camera; midi; monetization; xr-spatial-tracking; gamepad; gyroscope; accelerometer; xr; cross-origin-isolated"
          style={{ width: '100%', height: '500px' }}
        ></iframe>
      </div>
      <div className="review-section">
    <h2>Reviews</h2>
    {game.reviewIds ? game.reviewIds.map((review, index) => (
        <div key={index} className="review">
            <div className="review-icon"></div>  {/* User profile icon */}
            <div className="review-content">
                <p>{review.content}</p>
            </div>
        </div>
    )) : <p>No reviews yet.</p>}
    <h2>Write a Review</h2>
    <textarea value={review} onChange={handleReviewChange} placeholder="Enter your review here..." rows="5"></textarea>
    <button onClick={submitReview} style={{ marginTop: '10px' }}>Submit Review</button>
    {submissionStatus && <p>{submissionStatus}</p>}
</div>

    </div>
  );
}

export default GamePage;
