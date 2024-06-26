import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function GamePage({ token }) {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [review, setReview] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [likeStatus, setLikeStatus] = useState(false);
  const iframeRef = useRef(null); // Reference for the iframe

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/games/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGame(response.data);
        setLikeStatus(response.data.likedGames.includes(id));
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    fetchGame();
  }, [id, token]);

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const submitReview = async () => {
    try {
      await axios.post(`http://localhost:8080/reviews`, {
        gameId: id,
        content: review,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReview('');
      setSubmissionStatus('Review submitted successfully!');
      const response = await axios.get(`http://localhost:8080/games/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGame(response.data);
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmissionStatus('Failed to submit review.');
    }
  };

  const handleLikeGame = async () => {
    try {
      await axios.post(`http://localhost:8080/games/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLikeStatus(true);
      const response = await axios.get(`http://localhost:8080/games/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGame(response.data);
    } catch (error) {
      console.error('Error liking the game:', error);
    }
  };

  const handleUnlikeGame = async () => {
    try {
      await axios.post(`http://localhost:8080/games/${id}/unlike`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLikeStatus(false);
      const response = await axios.get(`http://localhost:8080/games/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setGame(response.data);
    } catch (error) {
      console.error('Error unliking the game:', error);
    }
  };

  const handleFullscreen = () => {
    if (iframeRef.current.requestFullscreen) {
      iframeRef.current.requestFullscreen();
    } else if (iframeRef.current.mozRequestFullScreen) { // Firefox
      iframeRef.current.mozRequestFullScreen();
    } else if (iframeRef.current.webkitRequestFullscreen) { // Chrome, Safari, and Opera
      iframeRef.current.webkitRequestFullscreen();
    } else if (iframeRef.current.msRequestFullscreen) { // IE/Edge
      iframeRef.current.msRequestFullscreen();
    }
  };

  return (
    <div className="game-page-container">
      <h1>{game.name}</h1>
      <p><strong>Description:</strong> {game.description}</p>
      <p><strong>Genres:</strong> {game.genres ? game.genres.join(', ') : ''}</p>
      <div className="game-iframe-container">
        <iframe
          ref={iframeRef} // Add ref to iframe
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
        <button onClick={handleFullscreen} style={{ marginTop: '10px' }}>Go Fullscreen</button>
      </div>
      {likeStatus ? (
        <button className="unlike-button" onClick={handleUnlikeGame}>
          Unlike <span>{game.likeCount}</span>
        </button>
      ) : (
        <button className="like-button" onClick={handleLikeGame}>
          Like <span>{game.likeCount}</span>
        </button>
      )}
      <div className="review-section">
        <h2>Reviews</h2>
        {game.reviewIds ? game.reviewIds.map((review, index) => (
          <div key={index} className="review">
            <div className="review-icon"></div>
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
