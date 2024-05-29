/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { useContext, useState } from "react";
import "../index.css";

import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";
import { Avatar, Typography } from "@mui/material";
import { ChatContext } from "../context/ChatContext";

function OtherUserProfile({ setotherprofile }: any) {
  const show = true;
  let aboutData: any;
  let useraboutinfo;
  const { data } = useContext(ChatContext);
  const [aboutinfo, setAboutInfo] = useState("");

  const [viewimg, setViewImg] = useState(false);

  useEffect(() => {
    const ignoreClickOnImg = document.getElementsByClassName("profileimg")[0];

    const overlayimg = document.getElementsByClassName("overlayImg")[0];

    overlayimg?.addEventListener("click", function (e: any) {
      const isClick = ignoreClickOnImg.contains(e.target);

      if (!isClick) {
        setViewImg(false);
      }
    });
  }, [viewimg]);

  useEffect(() => {
    (async () => {
      const userDocRef = doc(db, "aboutUser", data.user.uid);

      try {
        aboutData = await getDoc(userDocRef);
      } catch (error) {
        console.log(error);
      }

      useraboutinfo =
        aboutData._document.data.value.mapValue.fields.about.stringValue;

      setAboutInfo(useraboutinfo);
    })();
  }, []);

  return (
    <>
      {!viewimg ? null : (
        <div className="overlayImg">
          <Box sx={{ position: "absolute", top: "20%", left: "38%" }}>
            <img src={data.user?.photoURL} className="profileimg" />
          </Box>{" "}
        </div>
      )}

      {!show ? null : <div className="overlay" />}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: " 100vh",
            height: "70vh",
            zIndex: 2,
            position: "absolute",
            top: "10%",
            left: "28%",
            bgcolor: "var(--second-color)",
          },
        }}
      >
        <Paper
          elevation={16}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CloseIcon
            sx={{
              fontSize: 30,
              cursor: "pointer",
              color: "white",
              float: "right",
              pt: 1,
            }}
            onClick={() => setotherprofile(false)}
          />

          <Box sx={{ flexGrow: 0, p: "10px" }}>
            <Avatar
              // alt={}
              src={data.user?.photoURL}
              sx={{
                borderRadius: "50%",
                height: { lg: "16.5rem", xs: "3rem" },
                width: { lg: "16.5rem", xs: "3rem" },
              }}
            />
          </Box>

          <Box sx={{ mt: "35px", width: "55%" }}>
            <Box sx={{ mb: "20px", borderBottom: "3px solid white" }}>
              <Typography
                variant="h6"
                sx={{ color: "white", fontWeight: 600, letterSpacing: 2 }}
              >
                Name
              </Typography>

              {/* <label htmlFor="username">Your name</label> */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                id="user"
              >
                <input
                  type="text"
                  className="userinfo"
                  id="username"
                  readOnly
                  value={data.user.displayName}
                />{" "}
              </Box>
            </Box>

            <Box sx={{ borderBottom: "3px solid white" }}>
              <Typography
                variant="h6"
                sx={{ color: "white", fontWeight: 600, letterSpacing: 2 }}
              >
                About
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  type="text"
                  className="userinfo"
                  id="userinfo"
                  readOnly
                  value={aboutinfo}
                />{" "}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      <ToastContainer />
    </>
  );
}

export default OtherUserProfile;
