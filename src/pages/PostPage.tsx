import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


const PostPage = () => {
    const {id} = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        getPost()
    }), [];


    const getPost = async () => {
        try {
            const res = await fetch(`https://forjupad-frontend-moment-3-api.onrender.com/posts/${id}`);

            if(!res.ok) throw error;

            const data = await res.json();

            setPost(data);
        } catch (error) {
            setError("Kunde inte hämta inlägget");
        }
    } 


    return (
        <div>
            
        </div>
    )
}

export default PostPage