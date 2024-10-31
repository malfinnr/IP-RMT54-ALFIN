import Navbar from "../components/Navbar";
import logo from "../assets/Image.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiHelps from "../helpers/ApiHelps";
import { getAccessToken } from "../helpers/CredentialToken";

const DetailProduct = () => {
  const [dataProductDetail, setDataProductDetail] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [reload, setReload] = useState(false);

  const params = useParams();
  useEffect(() => {
    const getDataProductDetail = async () => {
      console.log("getDataProduct");
      try {
        const response = await apiHelps.get(`/pub/products/${params.id}`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });
        console.log(response);
        const productDetail = response.data;
        setDataProductDetail(productDetail);
        setReload(false);
      } catch (error) {
        console.log(error);
        setReload(false);
      }
    };
    getDataProductDetail();
  }, [params.id, reload]);

  const handleSubmitComment = async () => {
    try {
      const response = await apiHelps.post(
        `/comment/${dataProductDetail.id}`,
        {
          comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );
      setReload(true);
      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(dataProductDetail);
  return (
    <div>
      <Navbar />
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 px-8">
        <div className="mx-auto w-full max-w-md">
          <img
            alt="Your Company"
            src={logo}
            className="mx-auto h-32 pt-16 w-auto"
          />
          <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
            Detail Memories
          </h2>
        </div>

        <div className="mt-10 mx-auto w-full max-w-[480px]">
          <div className="bg-white py-12 shadow rounded-lg px-12">
            <div className="space-y-6">
              <div>
                <p className="block text-sm font-medium text-gray-900">Name</p>
                <div className="mt-2">
                  <p className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-warm-brown text-sm">
                    {dataProductDetail?.name}
                  </p>
                </div>
              </div>
              <div>
                <p className="block text-sm font-medium text-gray-900">Image</p>
                <div className="mt-2">
                  <img
                    className="w-full h-auto"
                    src={dataProductDetail?.image}
                    alt=""
                  />
                </div>
              </div>
              <div>
                <p className="block text-sm font-medium text-gray-900">
                  Description
                </p>
                <div className="mt-2">
                  <p className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-warm-brown text-sm">
                    {dataProductDetail?.description}
                  </p>
                </div>
              </div>
              <div>
                <p className="block text-sm/6 font-medium text-gray-900">
                  From Name
                </p>
                <div className="mt-2">
                  <p className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-warm-brown text-sm">
                    {dataProductDetail?.fromName}
                  </p>
                </div>
              </div>
              <div>
                <p className="block text-sm font-medium text-gray-900">
                  Duration of Relationship
                </p>
                <div className="mt-2">
                  <p className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-warm-brown text-sm">
                    {dataProductDetail?.durationOfRelationship}
                  </p>
                </div>
              </div>
              <div>
                <p className="block text-sm font-medium text-gray-900">
                  Category
                </p>
                <p className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-warm-brown text-sm">
                  {dataProductDetail?.Category?.name}
                </p>
              </div>
              <div className="pt-6 divide-y divide-warm-brown border-t border-dark-brown">
                <p className="text-base font-semibold text-black-primary">
                  Your Comment
                </p>
                <div>
                  <div className="flex max-w-md">
                    <input
                      value={newComment}
                      onChange={(event) => setNewComment(event.target.value)}
                      id="newComment"
                      name="newComment"
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-warm-brown text-sm"
                    />
                    <button
                      onClick={handleSubmitComment}
                      className="flex items-center rounded-md bg-warm-brown px-4 py-2 text-white"
                    >
                      Comment
                    </button>
                  </div>
                  {dataProductDetail?.Comments?.length ? (
                    <div>
                      {dataProductDetail?.Comments?.map(
                        (dataComment, index) => {
                          return (
                            <div
                              key={index}
                              className="flex pb-2 border-b border-gray-500"
                            >
                              <p className="text-sm text-dark-brown">
                                {dataComment.comment}
                              </p>
                            </div>
                          );
                        }
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
