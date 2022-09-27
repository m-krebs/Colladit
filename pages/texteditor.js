import { useRouter } from 'next/router';

function Texteditor() {
    const router = useRouter();
    const { pid } = router.query
    return (<p>Post: { pid }</p>)
}

export default Texteditor;