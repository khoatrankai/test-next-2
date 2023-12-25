import { RootState } from '@/redux/reducer';
import { Dropdown, MenuProps } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';

interface IJobInfoDropDown {
  moveToAppliedJob: () => any;
  moveToSaveJob: () => any;
  moveToRecruimentPost: () => any;
  moveToNewestJob: () => any;
  moveToOpeningPost: () => any;
  moveToHotJob: () => any;
  moveToClosedPost: () => any;
  moveToJobByHotPlace: () => any;
  moveToPostjob: () => any;
  moveToSuggestedJob: () => any;
  moveToCompanyInfor: () => any;
}

const JobInfoDropDown: React.FC<IJobInfoDropDown> = (props) => {
  const {
    moveToAppliedJob,
    moveToSaveJob,
    moveToRecruimentPost,
    moveToNewestJob,
    moveToOpeningPost,
    moveToHotJob,
    moveToClosedPost,
    moveToJobByHotPlace,
    moveToPostjob,
    moveToSuggestedJob,
    moveToCompanyInfor,
  } = props;

  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const jobInfo = [
    {
      key: '1',
      label: (
        <a
          style={{display: 'block'}}
          onClick={moveToAppliedJob}
        >
          {languageRedux === 1 ? 'Việc làm đã ứng tuyển' : 'Apllied Jobs'}
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a onClick={moveToSaveJob}>
          {
            languageRedux === 1
              ? 'Việc làm đã lưu'
              : 'Saved jobs'
         }
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a onClick={moveToNewestJob}>
          {languageRedux === 1
              ? 'Công việc mới nhất'
              : 'Newest jobs'
          }
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <a onClick={moveToHotJob}>
          {languageRedux === 1
              ? 'Công việc nổi bật'
              : 'Hot jobs'
            }
        </a>
      ),
    },
    {
      key: '5',
      label: (
        <a onClick={moveToJobByHotPlace}>
          {languageRedux === 1
              ? 'Công việc theo chủ đề'
              : 'Job by hot places'
            }
        </a>
      ),
    },
    {
      key: '6',
      label: (
        <a onClick={moveToSuggestedJob }>
          {languageRedux === 1
              ? 'Công việc gợi ý'
              : 'Suggested jobs'
          }
        </a>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items: jobInfo }}
      placement="bottomLeft"
      trigger={['hover']}
    >
      <h3>
        {languageRedux === 1
            ? 'Thông tin việc làm'
            : 'Job information'
        }
      </h3>
    </Dropdown>
  );
};

export default JobInfoDropDown;
