import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL
import { Post } from '../types/post.types'
import './ArchivePosts.scss'


const ArchivePosts = () => {
    // States
        const [posts, setPosts] = useState<Post[] | []>([]);
        const [error, setError] = useState("");
        const [loading, setLoading] = useState<boolean>(false);


        useEffect(() => {
            getPosts();
        }, []);

        const getPosts = async () => {
            try {
                setLoading(true)
                const res = await fetch(`${apiUrl}/posts`);
    
                if(!res.ok) {
                    setError("Något gick fel vid hämtning av inläggen");
                }
                const data = await res.json();

                const olderPosts = data.slice(6);
    
                setPosts(olderPosts);
                setLoading(false);
            } catch (error) {
                setError("Något gick fel vid hämtning av inlägg");
            } finally {
                setLoading(false);
            }
        }

    return (
        <div className='archive-container'>
            <section>
                <h3>Äldre inlägg</h3>
                { error && <p className='errorMsg'>{error}</p>}
                { loading && <p className='loading'>Laddar arkiv...</p>}
                {posts.length > 0 && 
                    posts.map((post) => (
                        <Link to={`/post/${post._id}`} key={post._id}>
                            <h4>{post.title}</h4>
                        </Link>
                    ))
                }
            </section>
        </div>
    )
}

export default ArchivePosts