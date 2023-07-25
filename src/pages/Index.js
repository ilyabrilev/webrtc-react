import { redirect } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const IndexPage = () => {
    return <></>;
}

export async function loader() {
    return redirect(`/${uuidv4()}`);
}

export default IndexPage;