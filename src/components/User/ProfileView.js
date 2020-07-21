import React, { useContext } from "react";
import firebaseConfig from "../../store/base";
import { AuthContext } from "../../App";

const ProfileView = () => {
  const { isLoggedIn } = useContext(AuthContext);

  //USER DETAILS
  const user = JSON.parse(window.sessionStorage.getItem(`firebase:authUser:${firebaseConfig.apiKey}:[DEFAULT]`));
  let [userImage, userName, userEmail] = '';
  if (isLoggedIn) {
    userImage = user.photoURL ? user.photoURL : `https://ukdj.imgix.net/455a0284eb7a4194d11239e17b11ab2a_/generic-user-profile_354184.png?auto=compress%2Cformat&ixlib=php-1.2.1&s=c64c1c0b04a6a8e47171f09b66a258bf`;
    userName = user.displayName ? user.displayName : ``;
    userEmail = user.email ? user.email : ``;
  }

  return (
    <div className="main">
      <div className="container footer_padding">
        { !!user &&
          <div className="user_details">
            <div className="user_details_image">
              <img
                src={userImage}
                width="70"
                height="70"
                alt="avatar"
              />
            </div>
            <div className="user_details_text">
              <p>{userName}</p>
              <p>{userEmail}</p>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default ProfileView;
