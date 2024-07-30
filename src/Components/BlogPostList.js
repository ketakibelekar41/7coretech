import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './BlogPostList.css';

const BlogPostList = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-06-25&sortBy=publishedAt&apiKey=07e83f02f11c4cadab7345f30d6c3736')
            .then((res) => res.json()) 
            .then((data) => setPosts(data.articles)) 
            .catch((e) => console.log(e, "Error"));
    }, []);

    return (
        <div className="container"> 
            {posts?.map((post, index) => (
                <div key={index} className="post"> 
                    <h1>{post.title}</h1>
                    <Link to={`/post/${index}`}>View Details</Link> 
                </div>
            ))}
        </div>
    );
};

export default BlogPostList;
