import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogPostItem = () => {
    //extract id from URL
    const { id } = useParams();
    //store the blogpost data by initializing state
    const [post, setPost] = useState(null);
    //to show the loader
    const [loading, setLoading] = useState(true);

    useEffect(() => {  // useEffect will render the data at first time load as well as when id get changes
        const fetchPost = async () => {
            try {
                const res = await fetch(`https://newsapi.org/v2/everything?q=tesla&from=2024-06-25&sortBy=publishedAt&apiKey=07e83f02f11c4cadab7345f30d6c3736`);
                const data = await res.json(); //parse res in JSON format
                const postId = parseInt(id, 10); // Convert id to an integer
                setPost(data.articles[postId]); //setPost used to update data with particular postId
                setLoading(false); //update loading status
            } catch (error) {
                console.error('Error fetching data:', error);// shows errror when failed to fetch
                setLoading(false); //update loading status
            }
        };

        fetchPost();
    }, [id]); // give dependency to render the data when dependency change

    if (loading) {
        return <div>Loading...</div>; //show loading before rendering the posts data
    }

    if (!post) {
        return <div>Post not found</div>; //if there is no post then show message
    }

    return (
        <div>
            <Link to="/">Back to list</Link> {/* navigate back to postlist home page */}
            <h1>{post.title}</h1> {/* render titles */}
            <img src={post.urlToImage} alt={post.title} /> {/* render image and alternative post title */}
            <p>{post.content}</p> {/* render the post content */}
        </div>
    );
};

export default BlogPostItem;
