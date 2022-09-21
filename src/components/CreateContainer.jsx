import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import Loader from "./Loader";
import { categories, heroData } from "../utils/data";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../firebase.config";
import { saveItem } from "../utils/firebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { getAllFoodItems } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";

function CreateContainer() {
  const [title, setTiltle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imgeAsset, setImgeAsset] = useState(null);
  const [field, setField] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [foodItems, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setField(true);
        setMsg("Error while uploading : Try AGain 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setField(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgeAsset(downloadURL);
          setIsLoading(false);
          setField(true);
          setMsg("Image uploaded successfully 😊");
          setAlertStatus("success");
          setTimeout(() => {
            setField(false);
          }, 4000);
        });
      }
    );
    console.log(uploadImage);
  };
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imgeAsset);
    deleteObject(deleteRef).then(() => {
      setImgeAsset(null);
      setIsLoading(false);
      setMsg("Image Delete successfully 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setField(false);
      }, 4000);
    });
  };
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !calories || !imgeAsset || !price || !category) {
        setField(true);
        setMsg("Required fields cannot be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setField(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURl: imgeAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };
        saveItem(data);
        setImgeAsset(null);
        setIsLoading(false);
        setMsg("Data Upload successfully 😊");
        clearData();
        setAlertStatus("success");
        setTimeout(() => {
          setField(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setField(true);
      setMsg("Error while uploading : Try AGain 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setField(false);
        setIsLoading(false);
      }, 4000);
    }
    fetchData();
  };

  const clearData = () => {
    setTiltle("");
    setImgeAsset(null);
    setCalories("");
    setPrice("");
    setCalories("");
  };
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {field && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-sans ${
              alertStatus === "danger"
                ? "bg-red-400 text-white"
                : "bg-emerald-500 text- text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTiltle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none
             placeholder:text-gray-400 text-textColor "
          />
        </div>
        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2
             border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div
          className="group flex justify-center items-center flex-col border-2 border-dotted
           border-gray-300 w-full h-225 md:h-300 cursor-pointer rounded-lg"
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imgeAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 hover:text-gray-700">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click Here To Upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadImage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imgeAsset}
                      alt="uploaded image"
                      className="w-full h-full object-cover "
                    />
                    <button
                      type="butoon"
                      className="absolute  bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl 
                      curror-pointer outline-none  hover:shadow-md duration-500 transition-all ease-in-out "
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white " />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full  py-2 border-b border-gray-300 flex items-center gap-2 ">
            <MdFoodBank className="text-gray-700 text-2xl " />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-one 
            border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
          <div className="w-full  py-2 border-b border-gray-300 flex items-center gap-2 ">
            <MdAttachMoney className="text-gray-700 text-2xl " />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="200.000đ"
              className="w-full h-full text-lg bg-transparent outline-one 
            border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <button
            type="button"
            className="ml-0  w-full md:w-auto 
border-none outline-one bg-emerald-500 px-12 py-2 rounded-lg
text-lg text-white font-sans"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateContainer;
