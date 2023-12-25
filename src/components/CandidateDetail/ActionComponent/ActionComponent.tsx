import React from 'react';
import { Box, Typography, Modal } from '@mui/material';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/reducer';
import appplicationApi from '@/api/applicationApi';
import { useSearchParams } from 'next/navigation';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  outline: 'none',
  borderRadius: '10px',
  p: 4,
};

interface ISeenApplication {
  setStatusApplication: React.Dispatch<React.SetStateAction<number>>;
}

const SeenApplication: React.FC<ISeenApplication> = (props) => {
  const { setStatusApplication } = props;
  const searchParams = useSearchParams();
  const [openReject, setOpenReject] = React.useState(false);
  const [openApprove, setOpenApprove] = React.useState(false);
  const handleClose = () => setOpenReject(false);
  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language)

  const handleClickReject = async () => {
    const candidateId = parseInt(searchParams.get('application_id') ?? '');
    try {
      const result = await appplicationApi.updateApplication(candidateId, 3);
      if (result) {
        setStatusApplication(3);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickApproved = async () => {
    const candidateId = parseInt(searchParams.get('application_id') ?? '');

    try {
      const result = await appplicationApi.updateApplication(candidateId, 2);
      if (result) {
        setStatusApplication(2);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        name="SeenApplicationReject"
        type="default"
        style={{
          backgroundColor: '#BD3131',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 8px',
        }}
        onClick={() => setOpenReject(true)}
      >
        {
          languageRedux === 1 ?
            "Từ chối hồ sơ" :
            "Reject application"
        }
      </Button>
      <Button
        name="SeenApplicationApprove"
        type="default"
        style={{
          backgroundColor: '#5CB365',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => setOpenApprove(true)}
      >
        {
          languageRedux === 1 ?
            "Duyệt hồ sơ" :
            "Browse profiles"
        }
      </Button>
      <Modal
        open={openReject}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {
              languageRedux === 1 ?
                "Từ chối hồ sơ ?" :
                "Reject application?"
            }
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 3 }}>
            {
              languageRedux === 1 ?
                "Ứng viên này không phù hợp với công việc của bạn" :
                "This candidate is not suitable for your job"
            }
          </Typography>
          <div className="button-modal_reject">
            <Button type="default" danger onClick={() => setOpenReject(false)}>
              {
                languageRedux === 1 ?
                  "Huỷ" : "Cancel"
              }
            </Button>
            <Button className='ml-2' type="default" onClick={handleClickReject}>
              {
                languageRedux === 1 ?
                  "Đồng ý" : "Ok"
              }
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openApprove}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {
              languageRedux === 1 ?
                "Duyệt hồ sơ ?" :
                "Browse profiles ?"
            }
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 3 }}>
            {
              languageRedux === 1 ?
                "Ứng viên sẽ nhận được thông báo từ bạn" :
                "Candidates will receive notification from you"
            }
          </Typography>
          <div className="button-modal_reject">
            <Button type="default" danger onClick={() => setOpenApprove(false)}>
              {
                languageRedux === 1 ?
                  "Huỷ" : "Cancel"
              }
            </Button>
            <Button className='ml-2' type="default" onClick={handleClickApproved}>
              {
                languageRedux === 1 ?
                  "Đồng ý" : "Ok"
              }
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default SeenApplication;
