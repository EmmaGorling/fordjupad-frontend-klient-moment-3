import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Post } from '../types/post.types';
import { useAuth } from "../context/authContext";
const apiUrl = import.meta.env.VITE_API_URL;
import './PostPage.scss'


const PostPage = () => {
    const {id} = useParams();
    const { user } = useAuth();
    const [post, setPost] = useState<Post| null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getPost()
    }, []);


    const getPost = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${apiUrl}/posts/${id}`);

            if(!res.ok) throw error;

            const data = await res.json();

            setPost(data);
            setLoading(false);
        } catch (error) {
            setError("Kunde inte hämta inlägget");
        } finally {
            setLoading(false);
        }
    } 
    const handleEdit = () => {
        navigate(`/edit/${id}`);
    }

    

    return (
        <div className="single-post-container">
            {
                error && <p className="erroMsg">{error}</p>
            }
            {
                loading && <p className="loading">Laddar...</p>
            }
            {
                post && (
                <article>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                    <div className='date-container'>
                        <span className='published'>
                            Publicerad:
                            <span className='date'>
                            {new Date(post.createdAt).toLocaleString('sv-SE', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                            </span>
                        </span>
                        
                        {
                            post.updatedAt && 
                                <span className='updated'>
                                    Uppdaterad:
                                    <span className='date'>
                                    {new Date(post.updatedAt).toLocaleString('sv-SE', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                    </span>
                                </span>
                        }
                    </div>
                    {user && <button onClick={handleEdit}>Redigera inlägg</button>}
                </article>
            )}
        </div>
    )
}

export default PostPage