import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Post } from '../types/post.types';
import { useAuth } from "../context/authContext";
const apiUrl = import.meta.env.VITE_API_URL;


const PostPage = () => {
    const {id} = useParams();
    const { user } = useAuth();
    const [post, setPost] = useState<Post| null>(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
    const handleEdit = () => {
        navigate(`/edit/$id`);
    }


    return (
        <div>
            {
                error && <p>{error}</p>
            }
            {
                post && (
                <article>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <span>
                        {new Date(post.createdAt).toLocaleString('sv-SE', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </span>
                    {
                        post.updatedAt && 
                            <span>
                                Uppdaterad:
                                {new Date(post.createdAt).toLocaleString('sv-SE', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </span>
                    }
                    {user && <button onClick={handleEdit}>Redigera inlägg</button>}
                </article>
            )}
        </div>
    )
}

export default PostPage