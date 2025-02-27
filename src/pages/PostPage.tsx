import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from '../types/post.types';
const apiUrl = import.meta.env.VITE_API_URL;


const PostPage = () => {
    const {id} = useParams();
    const [post, setPost] = useState<Post| null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        getPost()
    }), [];


    const getPost = async () => {
        try {
            const res = await fetch(`${apiUrl}/posts/${id}`);

            if(!res.ok) throw error;

            const data = await res.json();

            setPost(data);
        } catch (error) {
            setError("Kunde inte hämta inlägget");
        }
    } 


    return (
        <div>
                {
                    post && 
                    <article>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </article>
                }
        </div>
    )
}

export default PostPage