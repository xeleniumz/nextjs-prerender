import fs from 'fs/promises';
import Link from 'next/link';
import path from 'path';

const HomePage = (props) => {
  const render = props.products.map((product) => {
    return (
      <li key={product.id}><Link href={`/products/${product.id}`}>{product.title}</Link></li>
    );
  });
  return (
    <div>
      <ul>
        {render}
      </ul>
   </div>
  );
}
export const getStaticProps = async () => {
  console.log('REGENERATING...');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
      },
    };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
    redirect: '/'
  }

}

export default HomePage;