import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL

const EditPostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const getPost = async () => {
        const res = await fetch(`${apiUrl}/posts/${id}`);
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
    }

    useEffect(() => {
        getPost();
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${apiUrl}/posts/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ title, content})
            });

            if(res.ok) {
                navigate(`/post/${id}`);
            }
        } catch (error) {
            setError("Något gick fel vid uppdateringen");
        }
    }

    const handleCancel = () => {
        navigate(`/post/${id}`)
    }

    const handleDelete = async () => {
        const confirm = window.confirm("Är du säker på att du vill radera det här inlägget?");
        if(confirm) {
            try {
                const res = await fetch(`${apiUrl}/posts/${id}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })

                if(res.ok) {
                    navigate(`/`);
                } else {
                    setError("Kunde inte ta bort inlägget");
                }
            } catch (error) {
                setError("Något gick fel vid radering")
            }
        }
    }

    return (
        <div>
            <h2>Redigera inlägg</h2>
            <form onSubmit={handleUpdate}>
                <div className="form-section">
                    <label htmlFor="title">Titel</label>
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-section">
                    <label htmlFor="content">Text</label>
                    <textarea 
                        name="content" 
                        id="content"
                        rows={12}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    >
                    </textarea>
                </div>
                {
                    error && <p className="errorMsg">{error}</p>
                }
                <div>
                    <button type="submit">Spara ändringar</button>
                    <button className="abort-btn" type="button" onClick={handleCancel}>Avbryt</button>
                    <button className="delete-btn" type="button" onClick={handleDelete}>Radera</button>
                </div>
            </form>
        </div>
    )
}

export default EditPostPage