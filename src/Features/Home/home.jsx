// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace 'reactjs' with the subreddit you want to display.
        const response = await axios.get(
          'https://oauth.reddit.com/r/reactjs/hot?limit=10',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'User-Agent': 'portfolio redit clone', // Replace with your app name
            },
          }
        );
        setPosts(response.data.data.children);
      } catch (error) {
        console.error(error);
        // Handle error fetching posts here
      }
    };
    fetchPosts();
  }, [accessToken]);

  return (
    <div>
      <h1>Reddit Clone</h1>
      <div>
        {posts.map((post) => (
          <div key={post.data.id}>
            <h2>{post.data.title}</h2>
            <p>{post.data.author}</p>
            <p>{post.data.score}</p>
            {/* Add more details about the post if needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
