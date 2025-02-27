import { useState } from "react"
const apiUrl = import.meta.env.VITE_API_URL;


const CreatePostPage = () => {
    // States
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const post = {title, content}
            const token = localStorage.getItem('token');
            const res = await fetch(`${apiUrl}/posts`, {
                method: 'POST',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify(post)
            });

            if(!res.ok) {
                throw error;
            } else {
                setSuccess("Ditt inlägg har sparats!");
                setTitle("");
                setContent("");
                setError("");
            }

        } catch (error) {
            setError("Något gick fel vid lagring av inlägget");
            setSuccess("");
        }
    }

    return (
        <div className="create-form-container" >
            <h2>Skapa inlägg</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Titel</label>
                <input 
                    type="text"
                    id ="title"
                    value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="content">Text</label>
                <textarea 
                    name="content" 
                    id="content" 
                    rows={20}
                    value = {content}
                    onChange={(e) => setContent(e.target.value)}    
                >
                </textarea>

                <button type="submit">Skapa inlägg</button>
                {
                    error && <p>{error}</p>
                }
                {
                    success && <p>{success}</p>
                }
            </form>
        </div>
    )
}

export default CreatePostPage
