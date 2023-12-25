import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import MuiAlert, { AlertProps } from '@mui/material/Alert';


import './style.scss';
import { RootState } from '@/redux/reducer';
import { setAlertCancleSave } from '@/redux/reducer/alertReducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ShowCancleSave: React.FC = () => {
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const dispatch = useDispatch();
  // const cancleSave = useSelector((state: any) => state.showAlert.cancalAlert);


  const handleClose = () => dispatch<any>(setAlertCancleSave(false));
  return (
    <div>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          // open={cancleSave}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{ width: '100%', backgroundColor: '#000000', boxShadow: 'none' }}
          >
            {languageRedux === 1 ? 'Đã bỏ lưu thành công!' : 'Unsaved successfully'}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};

export default ShowCancleSave;
