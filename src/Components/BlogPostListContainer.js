import React, { useEffect, useState } from 'react';
import BlogPostList from './BlogPostList';

const BlogPostListContainer = () => {
    
    const [posts, setPosts] = useState([]);

    useEffect(() => {
    
        fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-06-25&sortBy=publishedAt&apiKey=07e83f02f11c4cadab7345f30d6c3736')
            .then((res) => res.json())
            .then((data) => setPosts(data.articles))
            .catch((e) => console.log(e, "Error"));
    }, []); 

    const handleNavigateToDetails = (index) => {
  
        console.log(`Navigating to details of post ${index}`); 
    };

    return (
     
        <BlogPostList posts={posts} onNavigateToDetails={handleNavigateToDetails} />
    );
};

export default BlogPostListContainer;
