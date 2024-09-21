"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import SliderCard from "./SliderCard";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"; // Import navigation styles

// Import required Swiper modules
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";
const Slider = () => {
  let [users, setUsers] = useState([]);
  useEffect(() => {
    async function getData() {
      let headers = {
        authorization: "Bearer " + localStorage.getItem("token"),
      };
      try {
        const res = await axios.get(
          `https://tarmeezacademy.com/api/v1/users?page=1`,
          {
            headers: headers,
          }
        );

        setUsers(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);
  let usersMap = users.map((user) => {
    return (
      <SwiperSlide>
        <SliderCard user={user} />
      </SwiperSlide>
    );
  });
  return (
    <div className=" mb-10">
      <Swiper
        modules={[Navigation]}
        navigation
        className="container"
        spaceBetween={10}
        breakpoints={{
          // when window width is >= 640px
          0: {
            slidesPerView: 1.4, // Show 1 slide
            spaceBetween: 10, // 10px space between slides
          },
          360: {
            slidesPerView: 3.4, // Show 2 slides
            spaceBetween: 10, // 20px space between slides
          },
          640: {
            slidesPerView: 5.4, // Show 2 slides
            spaceBetween: 10, // 20px space between slides
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 6.4, // Show 3 slides
            spaceBetween: 10, // 40px space between slides
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 7.3, // Show 4 slides
            spaceBetween: 10, // 50px space between slides
          },
        }}>
        {usersMap}
      </Swiper>
    </div>
  );
};

export default Slider;
