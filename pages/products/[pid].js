import { Fragment } from "react";
import fs from 'fs/promises';
import path from 'path';

function userDetailPage(props) {
    const { loadedProduct } = props;
    if (!loadedProduct) {
        return <p>Loading...</p>
    }

    return (
        <Fragment>
            <h1>The Product Detail Page</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    )
}

const getData = async () => {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    return data;
};

export const getStaticProps = async (ctx) => {
    const { params } = ctx;
    const productId = params.pid;
    const data = await getData();
    const product = data.products.find((product) => product.id === productId);
    if (!product) {
        return { notFound: true };
    }
    return {
        props: {
            loadedProduct: product,
        },
    };
};

export const getStaticPaths = async () => {
    const data = await getData();
    const ids = data.products.map((product) => product.id);
    const params = ids.map((id) => ({ params: { pid: id } }));

    return {
        paths: params,
        fallback: true,
    }
};

export default userDetailPage;