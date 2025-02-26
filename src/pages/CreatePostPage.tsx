import { useState } from "react"



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
            const res = await fetch("https://forjupad-frontend-moment-3-api.onrender.com/posts", {
                method: 'POST',
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            });

            if(!res.ok) {
                throw error;
            } else {
                setSuccess("Ditt inlägg har sparats!")
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
