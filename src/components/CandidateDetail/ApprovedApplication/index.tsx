import React, { useState } from 'react';
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

interface IApprovalApplication {
  setStatusApplication: React.Dispatch<React.SetStateAction<number>>;
}
const ApprovedApplication: React.FC<IApprovalApplication> = (props) => {
  const { setStatusApplication } = props;

  const searchParams = useSearchParams();

  const [OpenRecruit, setOpenRecruit] = useState(false);

  const handleClose = () => setOpenRecruit(false);

  const languageRedux = useSelector((state: RootState) => state.changeLaguage.language)


  const handleClickPassRecruitment = async () => {
    const candidateId = parseInt(searchParams.get('application_id') ?? '');

    try {
      const result = await appplicationApi.updateApplication(candidateId, 4);
      if (result) {
        setStatusApplication(4);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        name="submitApply"
        type="default"
        style={{
          backgroundColor: '#0D99FF',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginLeft: '8px',
        }}
        onClick={() => setOpenRecruit(true)}
      >
        {
          languageRedux === 1 ?
            "Xác nhận tuyển ứng viên" :
            "Confirm recruitment of candidates"
        }
      </Button>
      <Modal
        open={OpenRecruit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {
              languageRedux === 1 ?
                "Xác nhận tuyển ?" :
                "Confirmed recruitment ?"
            }
          </Typography>
          <Typography id="modal-modal-description" sx={{ my: 3 }}>
            {
              languageRedux === 1 ?
                "Hãy đảm bảo bạn và ứng viên đã liên hệ và sẽ làm việc cùng nhau." :
                "Make sure you and the candidate have made contact and will work together."
            }
          </Typography>
          <div className="button-modal_reject">
            <Button
              type="default"
              danger
              onClick={() => setOpenRecruit(false)}
              name="cancleApprovedApply"
            >
              {
                languageRedux === 1 ?
                  "Huỷ" : "Cancel"
              }
            </Button>
            <Button
              type="default"
              className='ml-2'
              onClick={handleClickPassRecruitment}
              name="submitApprovedApply"
            >
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

export default ApprovedApplication;
