/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const params = useParams();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          setError(data.message);
          return;
        }
        console.log(data);
        setLoading(false);
        setListing(data.listing);
      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    })();
  }, []);

  return (
    <div>
      {loading && (
        <ReactLoading
          type={"spinningBubbles"}
          color={"#2B2A4C"}
          height={120}
          width={120}
          className="mx-auto my-16"
        />
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrls.map((url, index) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat fixed`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
}
