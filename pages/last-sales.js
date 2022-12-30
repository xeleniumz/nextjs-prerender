import { useEffect, useState } from "react";
import useSwr from 'swr';

const LastSalesPage = (props) => {
    const [sales, setSales] = useState(props.sales);
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error } =
        useSwr('https://nextjs-course-f7911-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json',fetcher);
    
    useEffect(() => {
        if (data) {
            const transformedSales = [];
            for (const key in data) {
                transformedSales.push({
                    id: key,
                    username: data[key].username,
                    volume: data[key].volume,
                });
            }
            setSales(transformedSales);
        }
    },[data]);

    if (error) {
        return <p>Fail to Load.</p>
    }
    if (!data && !sales) {
        return <p>Loading...</p>
    }
    return (
        <ul>
            {sales.map((sale) => <li key={sale.id}>{sale.username} - {sale.volume}</li>)}
        </ul>
    );
};

export const getStaticProps = async (ctx) => {
    const resp = await fetch('https://nextjs-course-f7911-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json')
    const data = await resp.json();
    const transformedSales = [];
    for (const key in data) {
        transformedSales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
        });
    }
    return {
        props: {
            sales: transformedSales,
        },
    }; 
};

export default LastSalesPage;
