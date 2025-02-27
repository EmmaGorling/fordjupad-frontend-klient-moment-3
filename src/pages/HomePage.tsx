import ArchivePosts from "../components/ArchivePosts"
import RecentPosts from "../components/RecentPosts"

const HomePage = () => {

    return (
        <>
            <RecentPosts />
            <div>
                <ArchivePosts />
            </div>
        </>
        
    )
}

export default HomePage