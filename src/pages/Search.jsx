/* eslint-disable no-unused-vars */
import React from "react";

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8">
          <label className="flex flex-row whitespace-nowrap items-center gap-2">
            {" "}
            <span className="font-semibold">Search Term :</span>
            <input
              type="text"
              id="searchTerm"
              placeholder="Serch..."
              className="border p-3 w-full"
            />
          </label>
          <div className="flex gap-5 flex-wrap">
            <span className="font-semibold">Type :</span>
            <label className="flex gap-1">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent & Sale</span>
            </label>
            <label className="flex gap-1">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </label>
            <label className="flex gap-1">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sale</span>
            </label>
            <label className="flex gap-1">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </label>
          </div>
          <div className="flex gap-5 flex-wrap">
            <span className="font-semibold">Amenities :</span>
            <label className="flex gap-1">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </label>
            <label className="flex gap-1">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </label>
          </div>
          <label className="flex items-center gap-5">
            <span className="font-semibold">Sort :</span>
            <select id="sort_order" className="border rounded-lg p-2">
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </label>
          <button className="text-slate-700 p-3 border border-slate-400 rounded-lg uppercase hover:bg-slate-600 hover:text-white hover:shadow-lg transition ease-in-out hover:scale-105 duration-200">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing Results :{" "}
        </h1>
      </div>
    </div>
  );
}
