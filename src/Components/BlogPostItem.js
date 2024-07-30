import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BlogPostItem = () => {
    
    const { id } = useParams();
  
    const [post, setPost] = useState(null);
   
    const [loading, setLoading] = useState(true);

    useEffect(() => {  
        const fetchPost = async () => {
            try {
                const res = await fetch(`https://newsapi.org/v2/everything?q=tesla&from=2024-06-25&sortBy=publishedAt&apiKey=07e83f02f11c4cadab7345f30d6c3736`);
                const data = await res.json(); 
                const postId = parseInt(id, 10); 
                setPost(data.articles[postId]); 
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); 
            }
        };

        fetchPost();
    }, [id]); 

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!post) {
        return <div>Post not found</div>; 
    }

    return (
        <div>
            <Link to="/">Back to list</Link> 
            <h1>{post.title}</h1> 
            <img src={post.urlToImage} alt={post.title} /> 
            <p>{post.content}</p> 
        </div>
    );
};

export default BlogPostItem;
