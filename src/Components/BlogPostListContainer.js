import React, { useEffect, useState } from 'react';
import BlogPostList from './BlogPostList';

const BlogPostListContainer = () => {
    //useState is used to store BlogPost data 
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // fetch API is used to fetch blog post articles 
        fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-06-25&sortBy=publishedAt&apiKey=07e83f02f11c4cadab7345f30d6c3736')
            .then((res) => res.json()) // parse response in JSON format
            .then((data) => setPosts(data.articles))//setState update with fetched arcticles
            .catch((e) => console.log(e, "Error"));// shows error if posts not found
    }, []); //load the content at firsttime load only

    const handleNavigateToDetails = (index) => {
        // Perform navigation logic here, e.g., changing state or updating URL
        console.log(`Navigating to details of post ${index}`); //navigate to particular post index details like post which have index of 5
    };

    return (
        //render blogpost data and with naviagate handler
        <BlogPostList posts={posts} onNavigateToDetails={handleNavigateToDetails} />
    );
};

export default BlogPostListContainer;