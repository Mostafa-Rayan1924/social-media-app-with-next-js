"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const UserProfileDetails = ({ userId }) => {
  let [details, setDetails] = useState({});
  useEffect(() => {
    let getData = async () => {
      try {
        let res = await axios.get(
          `https://tarmeezacademy.com/api/v1/users/${userId}`
        );
        setDetails(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div className="container mt-10  ">
      <div className="relative block overflow-hidden rounded-lg border bg-white dark:bg-cardDark dark:border-slate-800 border-gray-100 p-4 sm:p-6 lg:p-8">
        <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

        <div className="flex-col flex sm:flex-row justify-center items-center sm:items-start text-center sm:text-start  sm:justify-between sm:gap-4">
          <div>
            <h3 className="text-lg font-bold dark:text-textSmDark text-gray-900 sm:text-xl">
              {details?.username}
            </h3>

            <p className="mt-1 dark:text-gray-500 text-xs font-medium text-gray-600">
              {details?.email}
            </p>
          </div>

          <div className="block sm:shrink-0">
            <Image
              alt=""
              src={
                details?.profile_image?.length == undefined
                  ? "/images/ano.png"
                  : details?.profile_image
              }
              width={80}
              height={80}
              className="mt-2 sm:mt-auto rounded-full aspect-square object-cover shadow-sm"
            />
          </div>
        </div>

        <div className="mt-4 ">
          <p className="text-pretty text-center sm:text-start text-base dark:text-gray-300 text-gray-500">
            "Hey, I’m{" "}
            <span className="border-b-2 border-dotted border-purple-600 text-purple-600 font-bold mr-1">
              {details.name}.
            </span>
            Always striving to achieve my goals, learn new things, and make the
            most out of every opportunity life offers." `
          </p>
        </div>

        <dl className="mt-6 flex justify-center sm:justify-start gap-4 sm:gap-6">
          <div className="flex flex-col-reverse">
            <dd className="text-2xl text-center  text-gray-500">
              {details?.comments_count}
            </dd>
            <dt className="text-sm font-medium dark:text-textSmDark text-gray-600">
              Comments Count
            </dt>
          </div>

          <div className="flex flex-col-reverse">
            <dd className="text-2xl text-center text-gray-500">
              {details.posts_count}
            </dd>
            <dt className="text-sm font-medium text-gray-600 dark:text-textSmDark">
              Posts Count
            </dt>
          </div>
        </dl>
      </div>
      <h2 className="text-center my-10 text-3xl sm:text-4xl font-bold ">
        {details.length > 0 ? details?.username : ""}
      </h2>
    </div>
  );
};

export default UserProfileDetails;
