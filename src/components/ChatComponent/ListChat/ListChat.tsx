"use client";
import React, { useEffect, useState, useContext, useRef } from "react";
import { Button, notification } from "antd";
import io from "socket.io-client";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import "./style.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/reducer";
import { ChatContext } from "@/context/ChatProvider";
import messageApi from "@/api/messageApi";
import { CloseIcon, ImageIcon, SendIcon } from "@/icons";
import { useRouter, useSearchParams } from "next/navigation";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  outline: "none",
  borderRadius: "10px",
  p: 4,
  "@media (max-width: 399px)": {
    width: 360,
  },
  "@media (max-width: 600px)": {
    width: 400,
  },
};

interface IOpenListChat {
  setOpenListChat: (params: any) => any;
  openListChat: boolean;
  setApply: React.Dispatch<React.SetStateAction<boolean>>;
}

const ListChat: React.FC<IOpenListChat> = (props) => {
  const searchParams: any = useSearchParams();
  const [windowWidth, setWindowWidth] = useState(false);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages
  );

  const [message, setMessage] = useState("");
  const [allListChat, setAllListChat] = useState<any>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const [openModalApply, setOpenModalApply] = React.useState(false);
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const updateWindowWidth = () => {
    if (window.innerWidth <= 555) {
      setWindowWidth(true);
    } else {
      setWindowWidth(false);
    }
  };

  useEffect(() => {
    updateWindowWidth();
  }, [windowWidth]);

  const closeListChat = () => {
    props.setOpenListChat(false);
  };

  const {
    userInfoChat,
    setSendMessages,
    sendMessages,
    receivedMessages,
    setReceivedMessages,
  } = useContext(ChatContext);

  let socket = useRef<any>();
  const listRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<any>(null);
  const lastChatRef = useRef<any>(null);

  const getAllListChat = async () => {
    const currentURL = window.location.href;
    const url = new URL(currentURL);

    setOpenBackdrop(true);
    try {
      const result = await messageApi.getChatMessage(
        url.searchParams.get("user_id"),
        Number(url.searchParams.get("post_id")),
        languageRedux === 1 ? "vi" : "en"
      );

      if (result) {
        setAllListChat(result?.data?.data);
        setOpenBackdrop(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getAllListChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedMessages, sendMessages, userInfoChat, languageRedux]);

  useEffect(() => {
    if (isConnected === false && !socket.current) {
      socket.current = io("https://web-service-tkv.onrender.com", {
        extraHeaders: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      socket.current.on("disconnect", (reason: any) => {
        setIsConnected(false);
      });

      if (socket.current.connected === false) {
        setIsConnected(true);
      }

      socket.current.on("connect", () => {
        setIsConnected(true);
      });

      socket.current.on("server-send-message-to-receiver", (data: any) => {
        // Xử lý tin nhắn từ máy chủ
        setReceivedMessages((prevReceive: any) => [...prevReceive, data]);
      });

      socket.current.on("server-send-message-was-sent", (data: any) => {
        setSendMessages((prevSend: any[]) => [...prevSend, data]);
      });
    }
  }, []); // Thêm một mảng phụ thuộc trống

  const handleSendMessage = () => {
    const currentURL = window.location.href;
    const url = new URL(currentURL);

    if (message !== "")
      socket.current.emit("client-send-message", {
        receiverId: url.searchParams.get("user_id"),
        message: message,
        createdAt: Date.now(),
        type: "text",
        postId: url.searchParams.get("post_id"),
      });

    setMessage("");
  };

  // enter sent message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleImageSelect = () => {
    if (imageInputRef) imageInputRef.current?.click();
  };

  const handleImageUpload = (e: any) => {
    const currentURL = window.location.href;
    const url = new URL(currentURL);

    const selectedImage = e.target.files;

    if (selectedImage) {
      const formData = new FormData();

      setLoading(true);

      formData.append("files", selectedImage);

      socket.current.emit("client-send-message", {
        receiverId: url.searchParams.get("user_id"),
        files: Array.from(selectedImage),
        createdAt: Date.now(),
        type: "image",
        postId: url.searchParams.get("post_id"),
      });

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [allListChat]);

  const handleClickApplication = () => {
    setOpenModalApply(true);
  };

  const handleCloseModalApply = () => {
    setOpenModalApply(false);
  };

  const handleApply = async () => {
    router.push(`post-detail/${searchParams.get("post_id")}`);
  };

  if (userInfoChat.length !== 0) {
    return (
      <div
        className={`list-chat ${
          props.openListChat === true && windowWidth
            ? "show-list-chat-responesive"
            : ""
        }`}
      >
        {contextHolder}
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            background: "transparent",
          }}
          open={openBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="header-list_chat">
          <div className="wrap-img_Userchat">
            <div className="wrap_img">
              <img
                src={
                  userInfoChat.avatar ? userInfoChat.avatar : userInfoChat.image
                }
                alt={userInfoChat.company_name}
                onError={(e: any) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://res.cloudinary.com/ddwjnjssj/image/upload/v1698248267/images/loginLogo/nrxqhjpwf1gt0flnjcsa.png";
                }}
              />
              <span
                className={`user-chat_online ${
                  userInfoChat.is_online ? "user-chat_onlineTrue" : ""
                }`}
              ></span>
            </div>
            <div className="wrap-infoUser_chat">
              <h4>{userInfoChat.name}</h4>
              {userInfoChat.isOnline ? (
                <span>{languageRedux ? `Đang hoạt động` : `Active`}</span>
              ) : (
                <span>offline</span>
              )}
            </div>
          </div>
          {userInfoChat.company_name ? (
            <div className="wrap-icon_chat">
              <div className="wrap-infoCompany_chat">
                <div className="imgCompany_chat">
                  <img
                    src={userInfoChat.image}
                    alt="Ảnh lỗi"
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://res.cloudinary.com/ddwjnjssj/image/upload/v1698248267/images/loginLogo/nrxqhjpwf1gt0flnjcsa.png";
                    }}
                  />
                </div>
                <div className="infoCompany_chat">
                  <h4>{userInfoChat.post_title}</h4>
                  <h6>{userInfoChat.company_name}</h6>
                  <p>
                    {new Intl.NumberFormat("en-US").format(
                      userInfoChat.salary_max
                    )}{" "}
                    -
                    {new Intl.NumberFormat("en-US").format(
                      userInfoChat.salary_min
                    )}{" "}
                    {userInfoChat.money_type_text}/
                    {userInfoChat.salary_type_id === 1
                      ? "Giờ"
                      : userInfoChat.salary_type_id === 2
                      ? "Ngày"
                      : userInfoChat.salary_type_id === 3
                      ? "Tháng"
                      : userInfoChat.salary_type_id === 4
                      ? "Tuần"
                      : userInfoChat.salary_type_id === 5
                      ? "Công việc"
                      : userInfoChat.salary_type_id === 6
                      ? "Thương lượng"
                      : ""}
                  </p>
                </div>
              </div>

              <Button
                type={userInfoChat.applied ? "default" : "default"}
                disabled={
                  userInfoChat.post_status === 3 ||
                  userInfoChat.post_status === 0
                }
                style={
                  userInfoChat.is_owner === true
                    ? { display: "none" }
                    : { display: "" }
                }
                onClick={handleClickApplication}
              >
                {userInfoChat.post_status === 3
                  ? languageRedux === 1
                    ? "Đã đóng"
                    : "Closed"
                  : userInfoChat.applied === false &&
                    userInfoChat.post_status === 0
                  ? languageRedux === 1
                    ? "Chưa duyệt"
                    : "Not approved"
                  : userInfoChat.applied === false &&
                    userInfoChat.post_status === 1
                  ? languageRedux === 1
                    ? "Xem bài đăng"
                    : "View post"
                  : userInfoChat.applied === true
                  ? languageRedux === 1
                    ? "Đã ứng tuyển"
                    : "Applied"
                  : ""}
              </Button>
            </div>
          ) : (
            <></>
          )}
          <div className="wrap-icon_close" onClick={() => closeListChat()}>
            <CloseIcon />
          </div>
        </div>

        <div className="list-content_chat relative" ref={listRef}>
          {loading && (
            <div className="fixed top-1/2 left-1/2 transform(-50%, -50%)">
              <CircularProgress />
            </div>
          )}
          {allListChat.map((chat: any, index: number) => {
            const chatDate = new Date(chat.created_at).toLocaleDateString();
            let showDate = false;

            if (localStorage.getItem("accountId") === chat.sender_id) {
              return (
                <div
                  className={`content-chat ${
                    index === allListChat.length - 1 ? "lastChatRef" : null
                  }`}
                  key={index}
                  ref={index === allListChat.length - 1 ? lastChatRef : null}
                >
                  {showDate && (
                    <div className="wrap-date_chat">
                      <hr className="horizontal-line"></hr>
                      <span className="date-chat">
                        {chatDate === new Date().toLocaleDateString()
                          ? "Hôm nay"
                          : chatDate}
                      </span>
                      <hr className="horizontal-line"></hr>
                    </div>
                  )}
                  <div className="wrap-text_chat">
                    <span
                      className={`text-chat ${
                        chat.message === null || chat.message === ""
                          ? "text-chat_hidden"
                          : ""
                      }`}
                    >
                      {chat.message !== "" || chat.message !== null
                        ? chat.message
                        : null}
                    </span>
                    {chat.image !== null ? (
                      <img
                        src={chat.image !== null ? chat.image : null}
                        alt={chat.image}
                      />
                    ) : (
                      <></>
                    )}
                    <small>
                      {new Date(chat.created_at).getHours()}:
                      {new Date(chat.created_at)
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}
                    </small>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className={`content-chat2 ${
                    index === allListChat.length - 1
                      ? "dddddddddddddddddddddddd"
                      : null
                  }`}
                  key={index}
                  ref={index === allListChat.length - 1 ? lastChatRef : null}
                >
                  {showDate && (
                    <div className="wrap-date_chat">
                      <hr className="horizontal-line"></hr>
                      <span className="date-chat">
                        {chatDate === new Date().toLocaleDateString()
                          ? language?.messages_page?.to_day
                          : chatDate}
                      </span>
                      <hr className="horizontal-line"></hr>
                    </div>
                  )}
                  <div className="wrap-text_chat2">
                    <span
                      className={`text-chat ${
                        chat.message === "" || chat.message === null
                          ? "text-chat_hidden"
                          : ""
                      }`}
                    >
                      {chat.message !== "" || chat.message !== null
                        ? chat.message
                        : null}
                    </span>
                    {chat.image !== null ? (
                      <img
                        src={chat.image !== null ? chat.image : null}
                        alt={chat.image}
                      />
                    ) : (
                      <></>
                    )}
                    <small>
                      {new Date(chat.created_at).getHours()}:
                      {new Date(chat.created_at)
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}
                    </small>
                  </div>
                </div>
              );
            }
          })}
        </div>

        <div className="inputs-chat">
          <input
            placeholder={
              languageRedux === 1 ? "Nhập tin nhắn..." : "Enter message..."
            }
            value={message}
            onChange={(e) => {
              listRef?.current?.scrollIntoView({
                behavior: "smooth",
                block: "end",
              });
              window.scrollTo(0, document.body.scrollHeight);
              setMessage(e.target.value);
            }}
            onKeyDown={handleKeyPress}
            style={{
              fontStyle: "normal",
              width: "100%",
              borderRadius: "10px",
              border: "1px solid #aaa",
              outline: "none",
            }}
          />
          <input
            type="file"
            ref={imageInputRef}
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <span className="input-chatIcon" onClick={handleImageSelect}>
            <ImageIcon />
          </span>
          <span className="input-chatIcon" onClick={handleSendMessage}>
            <SendIcon />
          </span>
        </div>

        <Modal
          open={openModalApply}
          onClose={handleCloseModalApply}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={{ textAlign: "center", color: "#d4a650" }}
            >
              {languageRedux === 1
                ? `Trờ lại bài đăng này`
                : `Return to this post`}
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h4"
              sx={{ margin: "24px 0", fontSize: "15px", textAlign: "center" }}
            >
              {languageRedux === 1
                ? `Bạn sẽ được trở về trang chi tiết bài đăng`
                : `You will be returned to the post detail page`}
            </Typography>

            <Box
              sx={{
                margin: "12px auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <Button
                type="primary"
                danger
                onClick={handleCloseModalApply}
                style={{
                  width: "300px",
                }}
              >
                {languageRedux === 1 ? "Không" : "No"}
              </Button>
              <Button
                onClick={handleApply}
                style={{
                  width: "300px",
                  backgroundColor: "#d4a650",
                }}
              >
                {languageRedux === 1 ? "Có" : "Yes"}
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    );
  } else {
    return (
      <div className="list-chat">
        <div className="wrap-img_chat">
          <img src="./images/imageChatBegin.png" alt="" />
          <div>
            {languageRedux === 1
              ? `Chat giúp bạn thêm nhiều thông tin hiệu quả, nhanh chóng`
              : `Chat helps you get more effective and quick information`}
          </div>
        </div>
      </div>
    );
  }
};

export default ListChat;
