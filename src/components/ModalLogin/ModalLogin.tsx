"use client";
import Modal from "@mui/material/Modal";
import React, { useEffect, useRef, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import OtpInput from "react-otp-input";
import CountdownTimer from "./CountdownTimer";
import "./ModalLogin.scss";
import GoogleLogin from "@leecheuk/react-google-login";
import { gapi } from "gapi-script";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useDispatch, useSelector } from "react-redux";
import signInEmailApi from "@/api/authApi";
import { fetchProfile } from "@/redux/reducer/profileReducer/profileSlice";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Person3Icon from "@mui/icons-material/Person3";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "@/configs/axiosClient";
interface AuthReponse {
  accountId: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

type Props = {
  isOpen: boolean;
  handleToggleModal: any;
};

interface IReponseGoogle {
  code: number;
  data: any;
}

interface IReponseSignInRecruit {
  code: number;
  data: any;
}

interface IReponseSignInRecruit {
  statusCode: number;
  message: string;
}

const ModalLogin = (props: Props) => {
  const { isOpen, handleToggleModal } = props;
  const [openVerifyCode, setOpenVerifyCode] = useState(false);
  const handleClose = () => handleToggleModal();
  const handleOpenVerifyCode = () => setOpenVerifyCode(true);
  const handleCloseVerifyCode = () => setOpenVerifyCode(false);
  const handleCloseConfirmPassword = () => setIsOpenConfrimPassword(false);
  const [isOpenVerifyOtpAndPassword, setIsOpenVerifyOtpAndPassword] =
    useState(false);
  const [
    isOpenVerifyOtpAndPasswordForgot,
    setIsOpenVerifyOtpAndPasswordForgot,
  ] = useState(false);
  const [isInputFilled, setIsInputFilled] = useState(false);
  const [otp, setOTP] = useState("");
  const [isOpenConfrimPassword, setIsOpenConfrimPassword] = useState(false);
  const [isOpenConfrimPasswordForgot, setIsOpenConfrimPasswordForgot] =
    useState(false);
  const modalRef = useRef<any>();
  const [resendCode, setResendCode] = useState(true);
  const [widthModal, setWidthModal] = useState(
    window.innerWidth < 768 ? "80%" : "36rem"
  );
  const [heightModal, setHeightModal] = useState(
    window.innerWidth < 768 ? "70%" : "56%"
  );
  const appId = process.env.REACT_APP_FACEBOOK_APP_ID
    ? process.env.REACT_APP_FACEBOOK_APP_ID
    : "";
  const googleClient = process.env.REACT_APP_GOOGLE_CLIENT_ID
    ? process.env.REACT_APP_GOOGLE_CLIENT_ID
    : "";
  const dispatch = useDispatch();
  const [emailOtp, setEmailOtp] = useState("");
  const [alignment, setAlignment] = React.useState("user");
  const [emailRecruit, setEmailRecruit] = useState("");
  const [passwordRecruit, setPasswordRecruit] = useState("");
  const [emailOtpVefify, setEmailOtpVefify] = useState("");
  const [isOpenModalSendOtpRecruit, setIsOpenModalSendOtpRecruit] =
    useState(false);
  const [
    isOpenModalSendOtpForgotPassword,
    setIsOpenModalSendOtpForgotPassword,
  ] = useState(false);
  const [password, setPassword] = useState("");
  const [cofirmPassword, setCofirmPassword] = useState("");
  const [passwordForgot, setPasswordForgot] = useState("");
  const [cofirmPasswordForgot, setCofirmPasswordForgot] = useState("");
  const [otpRecruit, setOtpRecruit] = useState("");
  const [otpForgot, setOtpForgot] = useState("");
  const [emailForgot, setEmailForgot] = useState("");
  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.trim() !== "" && emailRegex.test(email);
  };
  const languageRedux = useSelector(
    (state: any) => state.changeLaguage.language
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setWidthModal("80%");
        setHeightModal("70%");
      } else {
        setWidthModal("36rem");
        setHeightModal("56%");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const style = {
    minHeight: "fit-content",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: widthModal,
    maxWidth: "576px",
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
    // height: heightModal,
  };

  const handleOtpChange = (otpValue: string) => {
    setOTP(otpValue);

    setIsInputFilled(otpValue.length > 5);
  };

  const handleResendCode = () => {};

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: googleClient,
        scope: "",
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const responseGoogle = async (response: any) => {
    try {
      if (response.accessToken) {
        const res = (await signInEmailApi.signInGoogle(
          response.tokenId
        )) as unknown as IReponseGoogle;

        if (res && res.code === 200) {
          fetchDataProfile(res.data);
        }
      }
    } catch (error) {
      console.log("error gg", error);
    }
  };

  const fetchDataProfile = async (auth: AuthReponse) => {
    localStorage.setItem(
      "accountId",
      auth && auth.accountId ? auth.accountId : ""
    );
    localStorage.setItem(
      "accessToken",
      auth && auth.accessToken ? auth.accessToken : ""
    );
    localStorage.setItem(
      "refreshToken",
      auth && auth.refreshToken ? auth.refreshToken : ""
    );

    dispatch(fetchProfile("vi") as any);
    handleClose();
  };

  const handleOnChageInputEmailOtp = (e: any) => {
    setEmailOtp(e.target.value);
  };

  const handleSendOtp = async () => {
    try {
      const check = isEmailValid(emailOtp);

      if (check) {
        const res = (await signInEmailApi.signInEmail(
          emailOtp
        )) as unknown as IReponseGoogle;

        if (res && res.code === 200) {
          handleOpenVerifyCode();
        } else {
          toast.warning(
            languageRedux === 1
              ? "OTP vẫn còn hạn, vui lòng kiểm tra email"
              : "OTP is still valid, please check your email",
            {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
          setOpenVerifyCode(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginOtp = async () => {
    try {
      const res = (await signInEmailApi.verifyOtp(
        emailOtp,
        otp
      )) as unknown as IReponseGoogle;

      if (res && res.code === 200) {
        fetchDataProfile(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const handleOnChageInputEmailRecruit = (e: any) => {
    setEmailRecruit(e.target.value);
  };

  const handleOnChageInputPasswordRecruit = (e: any) => {
    setPasswordRecruit(e.target.value);
  };

  const handleLoginRecruit = async () => {
    try {
      const res = (await signInEmailApi.signInRecruit(
        emailRecruit,
        passwordRecruit
      )) as unknown as IReponseSignInRecruit;

      if (res && res.code === 200) {
        fetchDataProfile(res.data);
      } else {
        toast.error(
          languageRedux === 1
            ? "Sai email hoặc mật khẩu"
            : "Wrong email or password",
          {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChageInputEmailOtpRecurit = (e: any) => {
    setEmailOtpVefify(e.target.value);
  };

  const handleCloseModalOtpVerify = () => {
    setIsOpenModalSendOtpRecruit(false);
  };

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleComfirmPassword = (e: any) => {
    setCofirmPassword(e.target.value);
  };

  const handleSendOtpRecruiter = async () => {
    try {
      const check = isEmailValid(emailOtpVefify);

      if (check) {
        const res = (await signInEmailApi.signInEmailRecruit(
          emailOtpVefify
        )) as unknown as IReponseSignInRecruit;

        if (res && res.statusCode === 200) {
          setIsOpenModalSendOtpRecruit(false);
          setIsOpenVerifyOtpAndPassword(true);
        } else {
          toast.warning(
            languageRedux === 1
              ? "Email đã tồn tại trong hệ thống"
              : "Email already exists in the system",
            {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            }
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOtpRecruitChange = (otpValue: string) => {
    setOtpRecruit(otpValue);
    setIsInputFilled(otpValue.length > 5);
  };

  const handleOtpForgotChange = (otpValue: string) => {
    setOtpForgot(otpValue);
    setIsInputFilled(otpValue.length > 5);
  };

  const handleVerifyOtpRecruit = async () => {
    const res = (await signInEmailApi.verifyOtpRecruit(
      emailOtpVefify,
      otpRecruit
    )) as unknown as IReponseSignInRecruit;

    if (res && res.statusCode === 200) {
      setIsOpenVerifyOtpAndPassword(false);
      setIsOpenConfrimPassword(true);
    } else {
      toast.error(
        languageRedux === 1 ? "Mã OTP không hợp lệ" : "Invalid OTP code",
        {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }
  };

  const handleVerifyConfirmPassword = async () => {
    const res = (await signInEmailApi.verifyConfirmPassword(
      emailOtpVefify,
      password
    )) as unknown as IReponseSignInRecruit;

    if (res && res.statusCode === 200) {
      fetchDataProfile(res.data);
      setIsOpenConfrimPassword(false);
    }
  };

  const handleBackLogin = () => {
    setOpenVerifyCode(false);
  };

  const handleOnChageInputEmailOtpForgotPassword = (e: any) => {
    setEmailForgot(e.target.value);
  };

  const handleSendOtpForgot = () => {
    const fetchData = async () => {
      const res = (await axiosClient.post(
        `https://web-service-tkv2.onrender.com/api/v3/users/forgot-password`,
        {
          email: emailForgot,
        }
      )) as unknown as IReponseSignInRecruit;

      if (res && res.statusCode === 200) {
        setIsOpenModalSendOtpForgotPassword(false);
        setIsOpenVerifyOtpAndPasswordForgot(true);
        handleToggleModal();
      } else {
        toast.error(res?.message, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    };

    fetchData();
  };

  const handleVerifyOtpForgot = () => {
    setIsOpenVerifyOtpAndPasswordForgot(false);
    const fetchData = async () => {
      const res = (await axiosClient.post(
        `https://web-service-tkv2.onrender.com/api/v3/users/forgot-password/confirm`,
        {
          email: emailForgot,
          otp: otpForgot,
        }
      )) as unknown as IReponseSignInRecruit;

      if (res && res.statusCode === 200) {
        setIsOpenModalSendOtpForgotPassword(false);
        setIsOpenConfrimPasswordForgot(true);
        handleToggleModal();
      } else {
        toast.error(
          languageRedux === 1 ? "Mã OTP không hợp lệ" : "Invalid OTP code",
          {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }
    };
    fetchData();
  };

  const handleVerifyConfirmPasswordForgot = () => {
    const fetchData = async () => {
      const res = (await axiosClient.post(
        `https://web-service-tkv2.onrender.com/api/v3/users/forgot-password/modify`,
        {
          email: emailForgot,
          password: passwordForgot,
        }
      )) as unknown as IReponseSignInRecruit;

      if (res && res.statusCode === 200) {
        setIsOpenConfrimPasswordForgot(false);
        handleToggleModal();
        toast.success(
          languageRedux === 1
            ? "Cập nhật mật khẩu thành công"
            : "Password update successful",
          {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }
    };

    fetchData();
  };

  return (
    <div>
      <Modal open={isOpen} onClose={handleClose} ref={modalRef}>
        <Box sx={style}>
          <Box sx={{ textAlign: "center", marginBottom: "3px" }}>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="user">
                <Person3Icon />
              </ToggleButton>
              <ToggleButton value="recruit">
                <ManageAccountsIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          {alignment === "recruit" ? (
            <Box>
              <Typography
                sx={{ textAlign: "center", fontSize: 24, fontWeight: 700 }}
              >
                {languageRedux === 1
                  ? "Đăng nhập nhà tuyển dụng"
                  : "Recruiter login"}
              </Typography>

              <Box>
                <Typography
                  sx={{
                    mb: 1,
                    fontFamily: "Roboto,-apple-system,sans-serif!important",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  Email:{" "}
                </Typography>
                <TextField
                  sx={{ width: "100%", marginBottom: "5px" }}
                  size="small"
                  placeholder={
                    languageRedux === 1 ? "Enter email ...." : "Nhập email ...."
                  }
                  onChange={(e) => handleOnChageInputEmailRecruit(e)}
                ></TextField>
                <Typography
                  sx={{
                    mb: 1,
                    fontFamily: "Roboto,-apple-system,sans-serif!important",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {languageRedux === 1 ? "Mật khẩu" : "Password"}
                </Typography>
                <TextField
                  sx={{ width: "100%" }}
                  size="small"
                  type="password"
                  placeholder={
                    languageRedux === 1
                      ? "Enter password ...."
                      : "Nhập password ...."
                  }
                  onChange={(e) => handleOnChageInputPasswordRecruit(e)}
                  onKeyDown={(e: any) => {
                    if (e.key === "Enter") {
                      handleClose();
                      handleLoginRecruit();
                    }
                  }}
                ></TextField>
                <Button
                  sx={{
                    bgcolor: "#517f6a",
                    width: "100%",
                    mt: 3,
                    color: "white",
                    "&:hover": {
                      bgcolor: "#5b3c61",
                    },
                    borderRadius: "15px",
                  }}
                  size="large"
                  onClick={() => handleLoginRecruit()}
                >
                  {languageRedux === 1 ? "Đăng nhập" : "Login"}
                </Button>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      mt: 2,
                      color: "#d4a650",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setIsOpenModalSendOtpRecruit(true);
                      handleToggleModal();
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Roboto,-apple-system,sans-serif!important",
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      {languageRedux === 1 ? "Đăng kí" : "Register"}
                    </Typography>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        mt: 2,
                        color: "#d4a650",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        handleToggleModal();
                        setIsOpenModalSendOtpForgotPassword(true);
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily:
                            "Roboto,-apple-system,sans-serif!important",
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                      >
                        {languageRedux === 1
                          ? "Quên mật khẩu"
                          : "Forgot password"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography
                sx={{ textAlign: "center", fontSize: 24, fontWeight: 700 }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                {languageRedux === 1 ? "Đăng nhập" : "Login"}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    gap: 3,
                    alignItems: "center",
                    bgcolor: "ButtonHighlight",
                    padding: 1.5,
                    borderRadius: 3,
                    width: "100%",
                    cursor: "pointer",
                  }}
                >
                  <FacebookLogin
                    appId={appId}
                    autoLoad={false}
                    // onSuccess={responseFacebook}
                    // onFailure={responseFailFacebookAndGoogle}
                    render={(renderProps: any) => (
                      <div
                        className="bnt-login_facebook bnt-login"
                        onClick={renderProps.onClick}
                      >
                        <Typography
                          sx={{
                            fontFamily:
                              "Roboto,-apple-system,sans-serif!important",
                            fontSize: 14,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              alignItems: "center",
                            }}
                          >
                            <img
                              style={{ width: 30, height: 30 }}
                              src="https://res.cloudinary.com/ddwjnjssj/image/upload/v1697703397/images/loginLogo/s6l6rugoegsff0qi55eu.png"
                              alt="anh"
                            />
                            <Typography
                              sx={{
                                fontFamily:
                                  "Roboto,-apple-system,sans-serif!important",
                                fontSize: 14,
                              }}
                            >
                              {languageRedux === 1
                                ? "Đăng nhập bằng tài khoản Facebook"
                                : "Log in with your Facebook account"}
                            </Typography>
                          </Box>
                        </Typography>
                      </div>
                    )}
                  />
                </Box>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "left",
                    gap: 3,
                    alignItems: "center",
                    bgcolor: "ButtonHighlight",
                    padding: 1.5,
                    borderRadius: 3,
                    cursor: "pointer",
                  }}
                >
                  <GoogleLogin
                    clientId="436273589347-ot9ec9jhm235q3irsvjpnltr8hsun5cp.apps.googleusercontent.com"
                    scope="profile email"
                    render={(renderProps) => (
                      <div
                        className="bnt-login_google bnt-login"
                        onClick={renderProps.onClick}
                      >
                        <Typography
                          sx={{
                            fontFamily:
                              "Roboto,-apple-system,sans-serif!important",
                            fontSize: 14,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              gap: 3,
                              alignItems: "center",
                            }}
                          >
                            <img
                              style={{ width: 30, height: 30 }}
                              src="https://res.cloudinary.com/ddwjnjssj/image/upload/v1697703377/images/loginLogo/babfrbawqkb6ccnvxybx.png"
                              alt="anh"
                            />
                            <Typography
                              sx={{
                                fontFamily:
                                  "Roboto,-apple-system,sans-serif!important",
                                fontSize: 14,
                              }}
                            >
                              {languageRedux === 1
                                ? "Đăng nhập bằng tài khoản Google"
                                : "Log in with your Google account"}
                            </Typography>
                          </Box>
                        </Typography>
                      </div>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    // onFailure={responseFailFacebookAndGoogle}
                  />
                </Box>
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{
                  mt: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box>
                  <div
                    style={{ border: "0.5px solid #cfc8c8", width: "80px" }}
                  ></div>
                </Box>
                <Typography>{languageRedux === 1 ? "Hoặc" : "Or"}</Typography>
                <Box>
                  <div
                    style={{ border: "0.5px solid #cfc8c8", width: "80px" }}
                  ></div>
                </Box>
              </Typography>
              <Box>
                <Typography
                  sx={{
                    mb: 1,
                    fontFamily: "Roboto,-apple-system,sans-serif!important",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  Email
                </Typography>
                <TextField
                  sx={{ width: "100%" }}
                  size="small"
                  placeholder={
                    languageRedux === 1 ? "Nhập email ...." : "Enter email ...."
                  }
                  onChange={(e) => handleOnChageInputEmailOtp(e)}
                  onKeyDown={(e: any) => {
                    if (e.key === "Enter") {
                      handleClose();
                      handleSendOtp();
                    }
                  }}
                ></TextField>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    mt: 1,
                    textAlign: "center",
                    fontFamily: "Roboto,-apple-system,sans-serif!important",
                    fontStyle: "italic",
                  }}
                >
                  {languageRedux === 1
                    ? "Mã xác nhận sẽ được gửi vào email bạn đăng nhập."
                    : "The confirmation code will be sent to the email you logged in with."}
                </Typography>
              </Box>
              <Box>
                <Button
                  sx={{
                    bgcolor: "#517f6a",
                    width: "100%",
                    mt: 2,
                    color: "white",
                    "&:hover": {
                      bgcolor: "#5b3c61",
                    },
                    borderRadius: "15px",
                  }}
                  size="large"
                  onClick={() => {
                    handleClose();
                    handleSendOtp();
                  }}
                >
                  {languageRedux === 1 ? "Đăng nhập" : "Login"}
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>

      {/* <Button onClick={handleOpenVerifyCode}>Open verify code</Button> */}

      <Modal open={openVerifyCode} onClose={handleCloseVerifyCode}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <KeyboardArrowLeftOutlinedIcon
              className="icon-left_login"
              sx={{
                width: "2rem",
                height: "2rem",
                cursor: "pointer",
                fontWeight: "300",
                position: "absolute",
                left: 0,
              }}
              onClick={handleBackLogin}
            />
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "Roboto,-apple-system,sans-serif!important",
                fontWeight: 700,
                fontSize: 24,
              }}
            >
              {languageRedux === 1 ? "Đăng nhập" : "Login"}
            </Typography>
          </Box>
          <Typography
            sx={{
              mt: 4,
              textAlign: "center",
              fontFamily: "Roboto,-apple-system,sans-serif!important",
            }}
          >
            {languageRedux === 1
              ? "Bạn hãy nhập mã OTP được gửi đến email:"
              : "Please enter the OTP code sent to email:"}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Roboto,-apple-system,sans-serif!important",
              fontWeight: 700,
              fontSize: 20,
              textAlign: "center",
              mt: 3,
            }}
          >
            {emailOtp ? emailOtp : ""}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Roboto,-apple-system,sans-serif!important",
              fontSize: 13,
              fontWeight: 600,
              color: "red",
              textAlign: "center",
              mt: 2,
            }}
          >
            {languageRedux === 1
              ? "Nếu không nhận được mã OTP qua email, bạn vui lòng kiểm tra lại email đã nhập chính xác chưa hoặc kiểm tra trong thư mục spam."
              : "If you do not receive the OTP code via email, please check again Email has been entered correctly or check in spam folder."}
          </Typography>
          <div
            className="otp-inputs"
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={6}
              renderSeparator={<span></span>}
              inputStyle={{
                width: "2rem",
                height: "2rem",
                margin: "1rem 0.5rem",
                fontSize: "1.5rem",
                borderRadius: 2,
                outline: "none",
                border: "none",
                borderBottom: "2px solid gray",
              }}
              renderInput={(props: any) => (
                <input {...props} className="otp-input" />
              )}
            />
          </div>
          <button
            type="button"
            className="button-login"
            style={{
              backgroundColor: isInputFilled ? "#d4a650" : "#DCDCDC",
              cursor: isInputFilled ? "pointer" : "not-allowed",
              marginTop: "20px",
            }}
            onClick={handleLoginOtp}
            disabled={!isInputFilled}
          >
            {languageRedux === 1 ? "Xác thực email" : "Email authentication"}
          </button>
          <div className="wrap-countDown">
            <p className="resend-otp" onClick={handleResendCode}>
              {"Gửi lại mã"}{" "}
            </p>
            {!resendCode ? (
              <p className="resend-otp_countDown"></p>
            ) : (
              <CountdownTimer
                // resendCode={resendCode}
                setResendCode={setResendCode}
              />
            )}
          </div>
        </Box>
      </Modal>

      <Modal
        open={isOpenModalSendOtpRecruit}
        onClose={handleCloseModalOtpVerify}
        ref={modalRef}
      >
        <Box sx={style}>
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "Roboto,-apple-system,sans-serif!important",
              fontWeight: 700,
              fontSize: 24,
            }}
          >
            {languageRedux === 1 ? "Xác thực email" : "Email authentication"}
          </Typography>
          <Typography
            sx={{
              mt: 4,
              mb: 2,
              fontFamily: "Roboto,-apple-system,sans-serif!important",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Email:{" "}
          </Typography>
          <TextField
            placeholder="Nhập email"
            sx={{ width: "100%" }}
            onChange={(e) => handleOnChageInputEmailOtpRecurit(e)}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                handleSendOtpRecruiter();
              }
            }}
          ></TextField>
          <Button
            sx={{
              bgcolor: "#517f6a",
              width: "100%",
              mt: 5,
              color: "white",
              "&:hover": {
                bgcolor: "#5b3c61",
              },
              borderRadius: "15px",
            }}
            size="large"
            onClick={() => handleSendOtpRecruiter()}
          >
            {languageRedux === 1 ? "Gửi mã xác thực" : "Send verification code"}
          </Button>
        </Box>
      </Modal>

      <Modal open={isOpenVerifyOtpAndPassword} onClose={handleCloseVerifyCode}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <KeyboardArrowLeftOutlinedIcon
              className="icon-left_login"
              sx={{
                width: "2rem",
                height: "2rem",
                cursor: "pointer",
                fontWeight: "300",
                position: "absolute",
                left: 0,
              }}
              onClick={() => {
                setIsOpenVerifyOtpAndPassword(false);
                setIsOpenModalSendOtpRecruit(true);
              }}
            />
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "Roboto,-apple-system,sans-serif!important",
                fontWeight: 700,
                fontSize: 24,
              }}
            >
              {languageRedux === 1 ? "Xác thực" : "Accuracy"}
            </Typography>
          </Box>
          <Typography
            sx={{
              mt: 4,
              textAlign: "center",
              fontFamily: "Roboto,-apple-system,sans-serif!important",
            }}
          >
            {languageRedux === 1
              ? "Bạn hãy nhập mã OTP được gửi đến email:"
              : "Please enter the OTP code sent to email:"}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Roboto,-apple-system,sans-serif!important",
              fontWeight: 700,
              fontSize: 20,
              textAlign: "center",
              mt: 3,
            }}
          >
            {emailOtpVefify ? emailOtpVefify : ""}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Roboto,-apple-system,sans-serif!important",
              fontSize: 13,
              fontWeight: 600,
              color: "red",
              textAlign: "center",
              mt: 2,
            }}
          >
            {languageRedux === 1
              ? "Nếu không nhận được mã OTP qua email, bạn vui lòng kiểm tra lại email đã nhập chính xác chưa hoặc kiểm tra trong thư mục spam."
              : "If you do not receive the OTP code via email, please check again Email has been entered correctly or check in spam folder."}
          </Typography>
          <div
            className="otp-inputs"
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <OtpInput
              value={otpRecruit}
              onChange={handleOtpRecruitChange}
              numInputs={6}
              renderSeparator={<span></span>}
              inputStyle={{
                width: "2rem",
                height: "2rem",
                margin: "1rem 0.5rem",
                fontSize: "1.5rem",
                borderRadius: 2,
                outline: "none",
                border: "none",
                borderBottom: "2px solid gray",
              }}
              renderInput={(props: any) => (
                <input {...props} className="otp-input" />
              )}
            />
          </div>
          <button
            type="button"
            className="button-login"
            style={{
              backgroundColor: isInputFilled ? "#d4a650" : "#DCDCDC",
              cursor: isInputFilled ? "pointer" : "not-allowed",
              marginTop: "20px",
            }}
            onClick={handleVerifyOtpRecruit}
          >
            {languageRedux === 1 ? "Xác nhận" : "Confirm"}
          </button>
          <div className="wrap-countDown">
            <p className="resend-otp" onClick={handleResendCode}>
              {languageRedux === 1 ? "Gửi lại mã" : "Resend Code"}{" "}
            </p>
            {!resendCode ? (
              <p className="resend-otp_countDown"></p>
            ) : (
              <CountdownTimer
                // resendCode={resendCode}
                setResendCode={setResendCode}
              />
            )}
          </div>
        </Box>
      </Modal>
      <Modal open={isOpenConfrimPassword} onClose={handleCloseConfirmPassword}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <KeyboardArrowLeftOutlinedIcon
              className="icon-left_login"
              sx={{
                width: "2rem",
                height: "2rem",
                cursor: "pointer",
                fontWeight: "300",
                position: "absolute",
                left: 0,
              }}
              onClick={() => {
                setIsOpenConfrimPassword(false);
                setIsOpenVerifyOtpAndPassword(true);
              }}
            />
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "Roboto,-apple-system,sans-serif!important",
                fontWeight: 700,
                fontSize: 24,
              }}
            >
              {languageRedux === 1
                ? "Xác thực nhà tuyển dụng"
                : "Authenticate the employer"}
            </Typography>
          </Box>
          <Box>
            <TextField
              sx={{
                width: "100%",
                mt: 5,
              }}
              type="password"
              placeholder="Password"
              onChange={(e) => handleChangePassword(e)}
            ></TextField>
          </Box>
          <Box>
            <TextField
              sx={{
                width: "100%",
                mt: 3,
              }}
              placeholder="Cofirm Password"
              type="password"
              onChange={(e) => handleComfirmPassword(e)}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  if (
                    password.trim() !== "" &&
                    cofirmPassword.trim() !== "" &&
                    cofirmPassword.trim() === password.trim()
                  ) {
                    handleVerifyConfirmPassword();
                  }
                }
              }}
            ></TextField>
          </Box>
          <button
            type="button"
            className="button-login"
            style={{
              backgroundColor: isInputFilled ? "#d4a650" : "#DCDCDC",
              cursor:
                password.trim() !== "" &&
                cofirmPassword.trim() !== "" &&
                password.trim() === cofirmPassword.trim()
                  ? "pointer"
                  : "not-allowed",
              marginTop: "20px",
            }}
            onClick={handleVerifyConfirmPassword}
            disabled={
              password.trim() !== "" &&
              cofirmPassword.trim() !== "" &&
              password.trim() === cofirmPassword.trim()
                ? false
                : true
            }
          >
            {languageRedux === 1 ? "Xác nhận" : "Confirm"}
          </button>
        </Box>
      </Modal>
      <Modal
        open={isOpenModalSendOtpForgotPassword}
        onClose={() => {
          setIsOpenModalSendOtpForgotPassword(false);
        }}
        ref={modalRef}
      >
        <Box sx={style}>
          <Typography
            sx={{
              textAlign: "center",
              fontFamily: "Roboto,-apple-system,sans-serif!important",
              fontWeight: 700,
              fontSize: 24,
            }}
          >
            {languageRedux === 1 ? "Xác thực email" : "Email authentication"}
          </Typography>
          <Typography
            sx={{
              mt: 4,
              mb: 2,
              fontFamily: "Roboto,-apple-system,sans-serif!important",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Email:{" "}
          </Typography>
          <TextField
            placeholder="Nhập email"
            sx={{ width: "100%" }}
            onChange={(e) => handleOnChageInputEmailOtpForgotPassword(e)}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                handleSendOtpForgot();
              }
            }}
          ></TextField>
          <Button
            sx={{
              bgcolor: "#517f6a",
              width: "100%",
              mt: 5,
              color: "white",
              "&:hover": {
                bgcolor: "#5b3c61",
              },
              borderRadius: "15px",
            }}
            size="large"
            onClick={() => handleSendOtpForgot()}
          >
            {languageRedux === 1 ? "Gửi mã" : "Send Code"}
          </Button>
        </Box>
      </Modal>
      <Modal
        open={isOpenVerifyOtpAndPasswordForgot}
        onClose={() => {
          setIsOpenModalSendOtpForgotPassword(false);
        }}
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <KeyboardArrowLeftOutlinedIcon
              className="icon-left_login"
              sx={{
                width: "2rem",
                height: "2rem",
                cursor: "pointer",
                fontWeight: "300",
                position: "absolute",
                left: 0,
              }}
              onClick={() => {
                setIsOpenVerifyOtpAndPasswordForgot(false);
                setIsOpenModalSendOtpForgotPassword(true);
              }}
            />
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "Roboto,-apple-system,sans-serif!important",
                fontWeight: 700,
                fontSize: 24,
              }}
            >
              {languageRedux === 1 ? "Xác thực" : "Accuracy"}
            </Typography>
          </Box>
          <Typography
            sx={{
              mt: 4,
              textAlign: "center",
              fontFamily: "Roboto,-apple-system,sans-serif!important",
            }}
          >
            {languageRedux === 1
              ? "Bạn hãy nhập mã OTP được gửi đến email:"
              : "Please enter the OTP code sent to email:"}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Roboto,-apple-system,sans-serif!important",
              fontWeight: 700,
              fontSize: 20,
              textAlign: "center",
              mt: 3,
            }}
          >
            {emailForgot ? emailForgot : ""}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Roboto,-apple-system,sans-serif!important",
              fontSize: 13,
              fontWeight: 600,
              color: "red",
              textAlign: "center",
              mt: 2,
            }}
          >
            {languageRedux === 1
              ? "Nếu không nhận được mã OTP qua email, bạn vui lòng kiểm tra lại email đã nhập chính xác chưa hoặc kiểm tra trong thư mục spam."
              : "If you do not receive the OTP code via email, please check again Email has been entered correctly or check in spam folder."}
          </Typography>
          <div
            className="otp-inputs"
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <OtpInput
              value={otpForgot}
              onChange={handleOtpForgotChange}
              numInputs={6}
              renderSeparator={<span></span>}
              inputStyle={{
                width: "2rem",
                height: "2rem",
                margin: "1rem 0.5rem",
                fontSize: "1.5rem",
                borderRadius: 2,
                outline: "none",
                border: "none",
                borderBottom: "2px solid gray",
              }}
              renderInput={(props: any) => (
                <input {...props} className="otp-input" />
              )}
            />
          </div>
          <button
            type="button"
            className="button-login"
            style={{
              backgroundColor: isInputFilled ? "#d4a650" : "#DCDCDC",
              cursor: isInputFilled ? "pointer" : "not-allowed",
              marginTop: "20px",
            }}
            onClick={handleVerifyOtpForgot}
          >
            {languageRedux === 1 ? "Xác nhận" : "Confirm"}
          </button>
          <div className="wrap-countDown">
            <p className="resend-otp" onClick={() => {}}>
              {"Gửi lại mã"}{" "}
            </p>
            {!resendCode ? (
              <p className="resend-otp_countDown"></p>
            ) : (
              <CountdownTimer
                // resendCode={resendCode}
                setResendCode={setResendCode}
              />
            )}
          </div>
        </Box>
      </Modal>
      <Modal
        open={isOpenConfrimPasswordForgot}
        onClose={() => {
          setIsOpenModalSendOtpForgotPassword(false);
        }}
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <KeyboardArrowLeftOutlinedIcon
              className="icon-left_login"
              sx={{
                width: "2rem",
                height: "2rem",
                cursor: "pointer",
                fontWeight: "300",
                position: "absolute",
                left: 0,
              }}
              onClick={() => {
                setIsOpenConfrimPasswordForgot(false);
                setIsOpenVerifyOtpAndPasswordForgot(true);
              }}
            />
            <Typography
              sx={{
                textAlign: "center",
                fontFamily: "Roboto,-apple-system,sans-serif!important",
                fontWeight: 700,
                fontSize: 24,
              }}
            >
              {languageRedux === 1
                ? "Xác thực mật khẩu"
                : "Password authentication"}
            </Typography>
          </Box>
          <Box>
            <TextField
              sx={{
                width: "100%",
                mt: 5,
              }}
              type="password"
              placeholder="Password"
              onChange={(e) => setPasswordForgot(e.target.value)}
            ></TextField>
          </Box>
          <Box>
            <TextField
              sx={{
                width: "100%",
                mt: 3,
              }}
              placeholder="Cofirm Password"
              type="password"
              onChange={(e) => setCofirmPasswordForgot(e.target.value)}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  if (
                    passwordForgot &&
                    cofirmPasswordForgot &&
                    cofirmPasswordForgot === passwordForgot
                  ) {
                    handleVerifyConfirmPasswordForgot();
                  }
                }
              }}
            ></TextField>
          </Box>
          <button
            type="button"
            className="button-login"
            style={{
              backgroundColor: isInputFilled ? "#d4a650" : "#DCDCDC",
              cursor:
                passwordForgot &&
                cofirmPasswordForgot &&
                passwordForgot === cofirmPasswordForgot
                  ? "pointer"
                  : "not-allowed",
              marginTop: "20px",
            }}
            onClick={handleVerifyConfirmPasswordForgot}
            disabled={
              passwordForgot &&
              cofirmPasswordForgot &&
              passwordForgot === cofirmPasswordForgot
                ? false
                : true
            }
          >
            {languageRedux === 1 ? "Xác nhận" : "Confirm"}
          </button>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default ModalLogin;
