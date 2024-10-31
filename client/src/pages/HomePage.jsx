import { useEffect, useState } from "react";

// import Select from '../components/Select';
import Navbar from "../components/Navbar";
import apiHelps from "../helpers/ApiHelps";
import CardProduct from "../components/CardProduct";

function HomePage() {
  const [dataCategories, setDataCategories] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getDataCategories = async () => {
      try {
        const response = await apiHelps.get("/categories");
        // console.log(response);
        setDataCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDataCategories();
  }, []);

  useEffect(() => {
    const getDataProducts = async () => {
      try {
        const response = await apiHelps.get(
          `/pub/products?categories=${selectedCategory}&search=${search}`
        );

        setDataProducts(response.data);
        setRefresh(false);
      } catch (error) {
        console.log(error);
      }
    };
    getDataProducts();
  }, [selectedCategory, search, refresh]);

  const onClickLikeProduct = async (productId) => {
    try {
      const response = await apiHelps.post(`/likes/${productId}`);

      setRefresh(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative flex flex-col">
      <Navbar />

      <div className="mt-[60px] max-w-7xl mx-auto px-4 w-full">
        <div className="py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-black-primary">
            Toko Barang Mantan
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-warm-brown">
            Berisi berbagai kenangan istimewa bersama sang mantan, semua ada di
            sini untuk memberi arti baru. Jelajahi, beri 'like', dan tinggalkan
            komentar — siapa tahu, ada cerita menarik di balik setiap barang
            bersama mantan!
          </p>
          <div className="flex justify-center mt-10">
            <button className="bg-vintage-pink text-black-primary font-semibold rounded-full py-2 px-4 box-dark-brown">
              Curahan Hati Sang Mantan
            </button>
          </div>
        </div>

        <div className="w-full border-y border-dark-brown py-6">
          <div className="flex items-center justify-between">
            <div>
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                name="category"
                id="category"
              >
                <option value="">All Category</option>
                {dataCategories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex max-w-md">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                id="search"
                name="search"
                type="text"
                placeholder="Search"
                className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-black-primary placeholder-gray-500 shadow-sm focus:border-warm-brown focus:outline-none focus:ring-1 focus:ring-warm-brown"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 py-20">
          {dataProducts.map((product) => {
            return (
              <CardProduct
                key={product.id}
                product={product}
                onClickLike={() => onClickLikeProduct(product.id)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
