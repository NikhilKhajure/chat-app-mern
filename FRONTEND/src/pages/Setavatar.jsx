import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./pages.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setAvatarRoute } from '../utils/APIROUTES.JS';
import avatarImage2 from '../assets/avatar2 (1).jpg'
import avatarImage3 from '../assets/avatar2 (2).jpg'
import avatarImage4 from '../assets/avatar2 (3).jpg'
import avatarImage1 from '../assets/avatar2 (4).jpg'
function Setavatar() {
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [])
  const [avatar, setAvatar] = useState([avatarImage1, avatarImage2, avatarImage3, avatarImage4]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toasOpt = {
    position: "bottom-right",
    autoClose: "8000",
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please Select Avatar", toasOpt);
      return;
    }
    const user = await JSON.parse(localStorage.getItem("chat-app-user"));
    const userId = user._id;
    const { data } = await axios.post(setAvatarRoute, { selectedAvatar, userId });
    if (data.isSet === true) {
      user.isAvatarImage = true;
      user.avatarImage = data.image;
      localStorage.setItem("chat-app-user", JSON.stringify(user));
      toast.success("Avatar Selected Successfully", toasOpt);
      navigate("/")
      return;
    } else {
      toast.error("Please Select Avatar");
      return;
    }
  }
  return (
    <>
      <div className="avatars">
        <div className="avatar">
          {avatar.map((avatar, index) => {
            return (
              <div
                className={`avatar ${selectedAvatar === index ? "selected" : ""
                  }`}
              >
                <img
                  src={avatar}
                  alt="avatar"
                  key={avatar}
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>

            );
          })}
        </div>
        <button onClick={setProfilePicture} className="submit-btn">
          Set as Profile Picture
        </button>
      </div>
      <ToastContainer />
    </>
  )
}
export default Setavatar
