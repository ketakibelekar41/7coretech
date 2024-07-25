import React, { useEffect, useState } from 'react';
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
const BlogPostDetails = ({ match }) => {
    //extract id paramaeter from the URL and match it 
    const { id } = match.params;
    //store data by initialixing the state
    const [post, setPost] = useState(null);
    //used to update loader
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-06-25&sortBy=publishedAt&apiKey=07e83f02f11c4cadab7345f30d6c3736')
            .then((res) => res.json())// parsing data in JSON format
            .then((data) => {
                setPost(data.articles[id]); //setPost by updating the article of particular id
                setLoading(false);// update loader status
            })
            .catch((e) => console.log(e, "Error"));// show error if post not load
    }, [id]); //update data when dependency change

    if (loading) {
        return <div>Loading...</div>; // used to show loader before post load
    }

    return (
        <div>
            <button onClick={() => window.history.back()}>Back to list</button>{/* navigate back to blog postlist */}
            <h1>{post.title}</h1>{/* render post titles */}
            <img src={post.urlToImage} alt={post.title} /> {/* render image and alternative tite text */}
            <p>{post.content}</p>{/* render post content */}
        </div>
    );
};

export default BlogPostDetails;