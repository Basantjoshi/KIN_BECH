import { Button, Upload,message } from "antd";

import React from "react";
import { useDispatch } from "react-redux";
import { EditProduct, UploadProductImage } from "../../../apicalls/products";
import { setLoader } from "../../../redux/loadersSlice";

function Images({
  selectedProduct,
  setSelectedProduct,
  setshowProductForm,
  getData
}
) {
  const [showPreview = false, setShowPreview] = React.useState(true);
  const [images = [], setImages] = React.useState(selectedProduct.images);
  const [file = null, setFile] = React.useState(null);
  const dispatch = useDispatch();

  const upload = async () => {
    try {
      dispatch(setLoader(true));
      //upload image to cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedProduct._id);
      const response = await UploadProductImage(formData);
      dispatch(setLoader(false));

      if (response.success) {
        message.success(response.message);
        setImages([...images, response.data]);
        setShowPreview(false);
        setFile(null);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  const deleteImage = async(image)=>{
    try {
      const updatedImagesArray = images.filter((img) =>img!==image);
      const updatedProduct = {...selectedProduct,images:updatedImagesArray};
      const response = await EditProduct(
        selectedProduct._id,
        updatedProduct
      );
      if(response.success){
        message.success(response.message);
        setImages(updatedImagesArray);
        getData();
      }
      else{
        throw new Error(response.message);
      }
      dispatch(setLoader(true));
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message)
      
    }
  }
  return (
    <div>
      <div className="flex gap-5 mb-5">
        {images.map((image) => {
          return (
            <div className="flex gap-2 border border-solid border-gray-500 roundec p-3 items-end">
              <img className="h-20 w-20 object-cover" src={image} alt="" />
              <i
                className="ri-delete-bin-line cursor-pointer"
                onClick={() => deleteImage(image)}
              ></i>
            </div>
          );
        })}
      </div>
      <Upload
        listType="picture"
        beforeUpload={() => false}
        onChange={(info) => {
          setFile(info.file);
          setShowPreview(true);
        }}
        showUploadList={showPreview}
      >
        <Button type="dashed">Upload Image</Button>
      </Upload>
      <div className="flex justify-end gap-5 mt-5">
        <Button
          type="default"
          onClick={() => {
            setshowProductForm(false);
          }}
        >
          Cancel
        </Button>
        <Button type="primary" disabled={!file} onClick={upload}>
          Upload
        </Button>
      </div>
    </div>
  );
}



export default Images;
