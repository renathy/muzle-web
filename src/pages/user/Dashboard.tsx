import React from "react";
import { Link } from "react-router-dom";
import UserLayout from "components/UserLayout";

const UserWelcome: React.FC = () => {
  return (
    <UserLayout>
      <div className="bg-white rounded-sm p-4 shadow1">
        <Link className="buttonPrimary" to="/user/games">
          Check Available Games
        </Link>
      </div>
    </UserLayout>
  );
};

export default UserWelcome;