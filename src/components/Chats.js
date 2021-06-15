import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { setLogLevel } from "firebase";

const Chats = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  // const asda = useRef;
  const {
    REACT_APP_CHAT_ENGINE_ID: CHAT_ENGINE_ID,
    REACT_APP_CHAT_ENGINE_KEY: CHAT_ENGINE_KEY,
  } = process.env;

  // console.log(process.env, CHAT_ENGINE_ID, CHAT_ENGINE_KEY);
  useEffect(() => {
    if (!user) {
      history.push("/");
      return;
    }

    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": "24c46824-ecc5-4fe9-950a-782bcdf28a8c",
          "user-name": user.email,
          "user-secret": user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);
        getFile(user.photoURL).then((avatar) => {
          console.log(avatar);
          formdata.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": CHAT_ENGINE_KEY,
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, history]);

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "test.jpg", { type: "image/jpeg" });
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Unichat</div>
        <div className="logout-tab" onClick={() => handleLogout()}>
          Logout
        </div>
      </div>
      {!user || loading ? (
        <h1>Loading</h1>
      ) : (
        <ChatEngine
          height="calc(100vh-66px)"
          projectID={CHAT_ENGINE_ID}
          userName={user.email}
          userSecret={user.uid}
        />
      )}
    </div>
  );
};

export default Chats;
