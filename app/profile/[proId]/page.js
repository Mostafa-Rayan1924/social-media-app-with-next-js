import UserPost from "@/app/_components/UserPost";
import UserProfileDetails from "@/app/_components/UserProfileDetails";
import React from "react";

const ProfilePage = ({ params }) => {
  return (
    <div>
      <UserProfileDetails userId={params.proId} />
      <UserPost userId={params.proId} />
    </div>
  );
};

export default ProfilePage;
