import ProductCard from '@/components/ProductCard';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { useEffect, useState } from 'react';

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const [products, setProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [sortPrice, setSortPrice] = useState('');
  const [sortDate, setSortDate] = useState('');
  const [search, setSearch] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosPublic.get(
          `/products?size=${itemsPerPage}&search=${search}&filter=${filter}&filterBrand=${filterBrand}&sortPrice=${sortPrice}&sortDate=${sortDate}&page=${currentPage}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [axiosPublic, currentPage, filter, filterBrand, itemsPerPage, search, sortDate, sortPrice]);

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axiosPublic.get(`/count?filter=${filter}&filterBrand=${filterBrand}&search=${search}`);
      setCount(data.count);
    };
    getCount();
  }, [axiosPublic, currentPage, filter, filterBrand, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    // setSearch(e.target.search.value);
    setSearch(searchText);
  };

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  return (
    <div className="container">
      <form onSubmit={handleSearch}>
        <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-neutral-400 focus-within:ring-neutral-300">
          <input
            className="px-6 py-2  w-full text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
            type="text"
            name="search"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            placeholder="Enter Phone Name"
            aria-label="Enter Phone Name"
          />

          <button
            type="submit"
            className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
            Search
          </button>
        </div>
      </form>
      <div className="flex flex-wrap md:flex-row justify-center items-center max-sm:gap-3 gap-5 my-4">
        <div>
          <select
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
            value={filter}
            name="category"
            id="category"
            className="border p-4 rounded-lg">
            <option value="">Filter By Category</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Tablet">Tablet</option>
            <option value="Laptop">Laptop</option>
          </select>
        </div>
        <div>
          <select
            onChange={(e) => {
              setFilterBrand(e.target.value);
              setCurrentPage(1);
            }}
            value={filterBrand}
            name="brand"
            id="brand"
            className="border p-4 rounded-lg">
            <option value="">Filter By Brand</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Lenovo">Lenovo</option>
            <option value="Google">Google</option>
            <option value="Dell">Dell</option>
            <option value="Xiaomi">Xiaomi</option>
            <option value="Oppo">Oppo</option>
            <option value="Huawei">Huawei</option>
            <option value="Microsoft">Microsoft</option>
            <option value="Realme">Realme</option>
            <option value="Sony">Sony</option>
            <option value="OnePlus">OnePlus</option>
            <option value="HP">HP</option>
          </select>
        </div>
        <div>
          <select
            onChange={(e) => {
              setSortPrice(e.target.value);
              setCurrentPage(1);
            }}
            value={sortPrice}
            name="sortPrice"
            id="sortPrice"
            className="border p-4 rounded-md">
            <option value="">Sort By Price</option>
            <option value="dsc">High to low</option>
            <option value="asc">Low to high</option>
          </select>
        </div>
        <div>
          <select
            onChange={(e) => {
              setSortDate(e.target.value);
              setCurrentPage(1);
            }}
            value={sortDate}
            name="sortDate"
            id="sortDate"
            className="border p-4 rounded-md">
            <option value="">Sort By Date</option>
            <option value="dsc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-4 max-sm:grid-cols-1 max-sm:gap-2 max-lg:grid-cols-3 gap-5">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-12">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white">
          <div className="flex items-center -mx-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-1 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>

            <span className="mx-1">previous</span>
          </div>
        </button>

        {/* Numbers */}
        {pages.map((btnNum) => (
          <button
            onClick={() => setCurrentPage(btnNum)}
            key={btnNum}
            className={`hidden ${
              currentPage === btnNum ? 'bg-neutral-800 text-white' : ''
            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-neutral-700  hover:text-white`}>
            {btnNum}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === numberOfPages}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-neutral-800 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500">
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>

            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-1 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Home;
