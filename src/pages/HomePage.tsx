import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Post } from '../types/post.types';

const HomePage = () => {
    // States
    const [posts, setPosts] = useState<Post[] | []>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = async () => {
        try {
            setLoading(true)
            const res = await fetch("https://forjupad-frontend-moment-3-api.onrender.com/posts/recent");

            if(!res.ok) {
                setError("Något gick fel vid hämtning av inläggen");
            }
            const data = await res.json();

            setPosts(data);
            setLoading(false);
        } catch (error) {
            setError("Något gick fel vid hämtning av inlägg");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h2>Senaste blogginläggen</h2>
            <div>
            {
                error && <p>{error}</p>
            }
            {
                loading && <p>Laddar inlägg...</p>
            }
            {
                posts.length > 0 && 
                    posts.map((post) => {
                        const contentPreview = post.content.split(" ").slice(0, 30).join(" ") + (post.content.split(" ").length > 30 ? "..." : "");

                        return (
                            <Link to={`/post/${post._id}`} >
                                <article key={post._id}>
                                    <h3>{post.title}</h3>
                                    <p>{contentPreview}</p> {/* Begränsad text */}
                                    <span>
                                        {new Date(post.createdAt).toLocaleString('sv-SE', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </article>
                            </Link>
                        );
                    })
            }   
            </div>
            
        </>
        
    )
}

export default HomePage