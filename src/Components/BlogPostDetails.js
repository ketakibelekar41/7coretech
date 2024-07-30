import React, { useEffect, useState } from 'react';
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
const BlogPostDetails = ({ match }) => {
  
    const { id } = match.params;
   
    const [post, setPost] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-06-25&sortBy=publishedAt&apiKey=07e83f02f11c4cadab7345f30d6c3736')
            .then((res) => res.json())
            .then((data) => {
                setPost(data.articles[id]); 
                setLoading(false);
            })
            .catch((e) => console.log(e, "Error"));
    }, [id]); 

    if (loading) {
        return <div>Loading...</div>; // used to show loader before post load
    }

    return (
        <div>
            <button onClick={() => window.history.back()}>Back to list</button>
            <h1>{post.title}</h1>{/* render post titles */}
            <img src={post.urlToImage} alt={post.title} />
            <p>{post.content}</p>
        </div>
    );
};

export default BlogPostDetails;
