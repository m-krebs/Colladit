import { useRouter } from 'next/router';

function SessionId() {
    const router = useRouter();
    const { pid } = router.query;
    // console.log(router.query)

    return (<p>Post: { pid }</p>)
}

export default SessionId;