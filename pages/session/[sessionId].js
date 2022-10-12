import { useRouter } from 'next/router'

const Post = () => {
    const router = useRouter()
    const { sessionId } = router.query
    console.log("http://localhost:3000" + router.asPath)
    return <p>SessionId: {sessionId}</p>
}

export default Post
