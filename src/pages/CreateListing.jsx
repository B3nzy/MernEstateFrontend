/* eslint-disable no-unused-vars */
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { app } from "../firebase";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (err) => {
          reject(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setUploading(false);
          setImageUploadError("Image upload failed (2 mb max per image)");
        });
    } else {
      if (files.length === 0) {
        setImageUploadError(
          "Please select the images that you want to upload!"
        );
      } else {
        setImageUploadError("You can only upload upto 6 images per listing!");
      }
    }
  };

  const handleRemoveImage = (index) => {
    console.log(index);
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((url, i) => i !== index),
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-5 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            maxLength="70"
            minLength="5"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div>
              <label className="flex gap-1">
                <input type="checkbox" className="w-5" id="sale" />
                Sell
              </label>
            </div>
            <div>
              <label className="flex gap-1">
                <input type="checkbox" className="w-5" id="rent" />
                Rent
              </label>
            </div>
            <div>
              <label className="flex gap-1">
                <input type="checkbox" className="w-5" id="parking" />
                Parking spot
              </label>
            </div>
            <div>
              <label className="flex gap-1">
                <input type="checkbox" className="w-5" id="furnished" />
                Furnished
              </label>
            </div>
            <div>
              <label className="flex gap-1">
                <input type="checkbox" className="w-5" id="offer" />
                Offer
              </label>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div>
              <label className="flex gap-1 items-center">
                <input
                  className="p-3 border border-gray-300 rounded-lg"
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="20"
                  required
                />
                Beds
              </label>
            </div>
            <div>
              <label className="flex gap-1 items-center">
                <input
                  className="p-3 border border-gray-300 rounded-lg"
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="20"
                  required
                />
                Baths
              </label>
            </div>
            <div>
              <label className="flex gap-1 items-center">
                <input
                  className="p-3 border border-gray-300 rounded-lg"
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="20"
                  required
                />
                <div className="flex flex-col items-center">
                  Regular price
                  <span className="text-sm">($ / Month)</span>
                </div>
              </label>
            </div>
            <div>
              <label className="flex gap-1 items-center">
                <input
                  className="p-3 border border-gray-300 rounded-lg"
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="20"
                  required
                />
                <div className="flex flex-col items-center">
                  Discounted price
                  <span className="text-sm">($ / Month)</span>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-500 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button
              onClick={handleImageSubmit}
              disabled={uploading}
              type="button"
              className="p-3 text-green-600 border border-green-600 rounded uppercase hover:shadow-lg disabled:opacity-70"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-600 text-sm">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                className="flex justify-between p-3 border border-slate-200 items-center shadow-md"
                key={url}
              >
                <img
                  key={index}
                  src={url}
                  alt="listing image"
                  className="h-20 object-contain rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-3 text-red-600 rounded-lg uppercase hover:opacity-70 hover:border hover:shadow-lg"
                >
                  Delete
                </button>
              </div>
            ))}
          <button className="p-3 bg-slate-600 text-white rounded-lg hover:opacity-90 disabled:opacity-70">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
