'use client';
import profileAPi from '@/api/profiles/profileApi';
import { useSrollContext } from '@/context/AppProvider';
import {Box, Button, TextField, Typography} from '@mui/material';
import React, { useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import {useSelector} from 'react-redux';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {};

interface IUpdatePassword {
  statusCode: number;
  message: string;
  error: string;
}

const page = (props: Props) => {
  const [checkVerify, setCheckVerify] = React.useState(false);
  const languageRedux = useSelector(
    (state: any) => state.changeLaguage.language,
  );
  const profile = useSelector((state: any) => state.profile.profile);
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const onChange = (e: any) => {
    if (e) {
      setCheckVerify(true);
    }
  };
  const {handleLoadHrefPage} = useSrollContext();

  useEffect(() => {
    handleLoadHrefPage();
  }, [])

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      toast.warning(
        languageRedux === 1
          ? 'Mật khẩu nhập lại không trùng khớp'
          : 'The re-entered password does not match',
        {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        },
      );

      return;
    }

    const fetchData = async () => {
      try {
        let res = (await profileAPi.recruitUpdatePassword(
          newPassword,
          oldPassword,
          languageRedux === 1 ? 'vi' : 'en',
        )) as any as IUpdatePassword;

        if (res && res.statusCode === 200) {
          toast.success(languageRedux === 1 ? 'Cập nhật mật khẩu thành công' : 'Updated password successfully', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
          setOldPassword('');
          setNewPassword('');
          setConfirmPassword('');
        } else {
          toast.warning(languageRedux === 1 ? 'Vui lòng kiểm tra lại mật khẩu': 'Please check your password again', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  };
  return (
    <div className="w-full flex flex-col justify-center items-center gap-9 mt-10 p-3">
      <Typography variant="h4" component="h4" fontWeight={500}>
        {languageRedux !== 1 ? 'Update Password' : 'Cập nhật mật khẩu'}
      </Typography>
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
      >
        <TextField
          type="password"
          required
          id="outlined-required"
          label={languageRedux !== 1 ? 'Old Password' : 'Mật khẩu cũ'}
          fullWidth
          value={oldPassword}
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
        />
      </Box>
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
      >
        <TextField
          required
          type="password"
          id="outlined-required"
          value={newPassword}
          label={languageRedux !== 1 ? 'New Password' : 'Mật khẩu mới'}
          fullWidth
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
      </Box>
      <Box
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
      >
        <TextField
          required
          type="password"
          id="outlined-required"
          value={confirmPassword}
          label={languageRedux !== 1 ? 'Confirm Password' : 'Xác nhận mật khẩu'}
          fullWidth
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </Box>

      <ReCAPTCHA
        sitekey="6Lf-Mg8pAAAAAJA0rxDngsb9imp09yJQJdVCUBpC"
        onChange={(e) => onChange(e)}
        hl={languageRedux === 1 ? 'vi' : 'en'}
      />

      <Button
        variant="contained"
        disabled={
          oldPassword.trim() === '' ||
          newPassword.trim() === '' ||
          confirmPassword.trim() === '' ||
          !checkVerify
        }
        sx={{
          width: 500,
          maxWidth: '100%',
          backgroundColor: '#d4a650',
        }}
        onClick={() => {
          handleUpdatePassword();
        }}
      >
        {languageRedux !== 1 ? 'Update' : 'Cập nhật'}
      </Button>
      <ToastContainer />
    </div>
  );
};

export default page;
