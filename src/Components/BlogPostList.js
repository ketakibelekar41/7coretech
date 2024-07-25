import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './BlogPostList.css'; // Import the CSS file

const BlogPostList = () => {
    //store data by initializing state
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-06-25&sortBy=publishedAt&apiKey=07e83f02f11c4cadab7345f30d6c3736')
            .then((res) => res.json()) //parse response in json format
            .then((data) => setPosts(data.articles)) //updating setPosts by fetched data
            .catch((e) => console.log(e, "Error"));// shows error when failed to fetch
    }, []);// load data at first time load

    return (
        <div className="container"> {/* Apply the container class */}
            {posts?.map((post, index) => ( //maping the post data 
                <div key={index} className="post"> {/* Apply the post class */}
                    <h1>{post.title}</h1>
                    <Link to={`/post/${index}`}>View Details</Link> {/* navigate to postpage with particular postID data */}
                </div>
            ))}
        </div>
    );
};

export default BlogPostList;