import ProductCard from '@/components/ProductCard';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useEffect, useState } from 'react';

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosPublic.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [axiosPublic]);
  return (
    <div className=" container grid grid-cols-4 gap-5">
      {products?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Home;
