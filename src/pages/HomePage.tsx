import ArchivePosts from "../components/ArchivePosts"
import RecentPosts from "../components/RecentPosts"
import './HomePage.scss'

const HomePage = () => {

    return (
        <div className="two-sections">
            <RecentPosts />
            <ArchivePosts />
        </div>
        
    )
}

export default HomePage