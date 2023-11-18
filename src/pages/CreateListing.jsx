/* eslint-disable no-unused-vars */
import React from "react";

export default function CreateListing() {
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
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              multiple
            />
            <button className="p-3 text-green-600 border border-green-600 rounded uppercase hover:shadow-lg disabled:opacity-70">
              Upload
            </button>
          </div>
          <button className="p-3 bg-slate-600 text-white rounded-lg hover:opacity-90 disabled:opacity-70">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
