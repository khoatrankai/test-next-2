import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import {useSelector} from 'react-redux';
import {Button} from 'antd';

import './style.scss';
import {RootState} from '@/redux/reducer';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 620,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '10px',
  p: 4,
  '@media (max-width: 399px)': {
    width: 360,
  },
  '@media (max-width: 375px)': {
    width: 300,
  },

  '@media (min-width: 400px) and (max-width: 640px)': {
    width: 410,
  },
};

interface IPropModalNoteCreatePost {
  openModalNoteCreateCompany: boolean;
  setOpenModalNoteCreateCompany: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalNoteCreateCompany: React.FC<IPropModalNoteCreatePost> = (props) => {
  const {openModalNoteCreateCompany, setOpenModalNoteCreateCompany} = props;
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );

  const handleCreateCompany = () => {
    setOpenModalNoteCreateCompany(false);
    window.open('company-infor', '_self');
  };

  const handleClose = () => setOpenModalNoteCreateCompany(false);
  return (
    <div>
      <Modal
        open={openModalNoteCreateCompany}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="wrap-guide">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: '10px',
              top: '30px',
              transform: 'translateY(-50%)',
            }}
          >
            <CloseIcon />
          </IconButton>
          <h2 className="title-post_guide">
            {languageRedux === 1
              ? 'Bạn chưa có thông tin công ty!'
              : 'You do not have company information yet!'}
          </h2>
          <div className="wrap-imagePost_guide">
            <img
              src="https://res.cloudinary.com/ddwjnjssj/image/upload/v1700801817/images/loginLogo/lvgtifwwvztusmbwkiug.png"
              alt=""
              style={{width: '103px', height: '150px'}}
            />
          </div>
          <div className="wrap-textPost_guide">
            <p>
              {languageRedux === 1
                ? 'Bài đăng của bạn sẽ được nhiều ứng viên hơn khi có thông tin công ty. Hãy cập nhật thông tin công ty để nhiều ứng viên quan tâm hơn!'
                : 'Your post will be more candidates when there is company information. Please update company information so that more candidates are interested!'}
            </p>
          </div>
          <div className="wrap-button_haveCompany">
            <Button
              block
              style={{marginTop: '12px'}}
              type="default"
              onClick={() => {
                setOpenModalNoteCreateCompany(false);
              }}
            >
              {languageRedux === 1 ? 'Chỉnh sửa sau' : 'Edit later'}
            </Button>
            <Button
              block
              style={{marginTop: '12px'}}
              type="default"
              onClick={handleCreateCompany}
            >
              {languageRedux === 1
                ? 'Tạo thông tin công ty'
                : 'Create company information'}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalNoteCreateCompany;
