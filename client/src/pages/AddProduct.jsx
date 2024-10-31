import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHelps from "../helpers/ApiHelps";
import { getAccessToken } from "../helpers/CredentialToken";
import Navbar from "../components/Navbar";
import logo from "../assets/Image.png";

const AddProduct = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [dataCategories, setDataCategories] = useState([]);
  const [fromName, setFromName] = useState("");
  const [durationOfRelationship, setDurationOfRelationship] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDataCategories = async () => {
      try {
        console.log(getAccessToken());
        const response = await apiHelps.get("/categories", {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });
        setDataCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(localStorage.getItem("access_token"));
    getDataCategories();
  }, []);

  const onSubmitAddProduct = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      const newProduct = {
        name: name,
        image: image,
        description: description,
        fromName: fromName,
        durationOfRelationship: durationOfRelationship,
        categoryId: +categoryId,
      };
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("image", newProduct.image);
      formData.append("description", newProduct.description);
      formData.append("fromName", newProduct.fromName);
      formData.append(
        "durationOfRelationship",
        newProduct.durationOfRelationship
      );
      formData.append("categoryId", newProduct.categoryId);

      const response = await apiHelps.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      navigate("/");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 px-8">
        <div className="mx-auto w-full max-w-md">
          <img
            alt="Your Company"
            src={logo}
            className="mx-auto h-32 pt-16 w-auto"
          />
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
            Add Your Memories
          </h2>
        </div>

        <div className="mt-10 mx-auto w-full max-w-[480px]">
          <div className="bg-white py-12 shadow rounded-lg px-12">
            <form onSubmit={onSubmitAddProduct} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    id="name"
                    name="name"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-warm-brown text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-900"
                >
                  Image
                </label>
                <div className="mt-2">
                  <input
                    multiple={false}
                    onChange={(event) => {
                      if (event.target.files) {
                        const file = event.target.files[0];
                        setImage(file);
                      }
                    }}
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-warm-brown text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <input
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    id="descriptioj"
                    name="description"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-warm-brown text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="fromName"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  From Name
                </label>
                <div className="mt-2">
                  <input
                    value={fromName}
                    onChange={(event) => setFromName(event.target.value)}
                    id="fromName"
                    name="fromName"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-warm-brown text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="durationOfRelationship"
                  className="block text-sm font-medium text-gray-900"
                >
                  Duration of Relationship
                </label>
                <div className="mt-2">
                  <input
                    value={durationOfRelationship}
                    onChange={(event) =>
                      setDurationOfRelationship(event.target.value)
                    }
                    id="durationOfRelationship"
                    name="durationOfRelationship"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-warm-brown text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="categoryId"
                  className="block text-sm font-medium text-gray-900"
                >
                  Category
                </label>
                <select
                  className="mt-2"
                  value={categoryId}
                  onChange={(event) => setCategoryId(event.target.value)}
                  id="categoryId"
                  name="categoryId"
                >
                  <option value="">Select Category</option>
                  {dataCategories.map((value) => {
                    return (
                      <option key={value.id} value={value.id}>
                        {value.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <button
                  disabled={loading}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-dark-brown px-3 py-1.5 text-sm font-semibold text-white shadow-sm"
                >
                  {loading ? "loading..." : "Add Memories"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
