import React from 'react';
import {
  MoreOutlined,
  CloseSquareOutlined,
  EditOutlined,
} from '@ant-design/icons';
import postsApi from '@/api/posts/postsApi';


interface ISubicon {
  postId: number;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
  status: number;
  language: any;
  languageRedux: any;
}
const SubIcon: React.FC<ISubicon> = (props) => {
  const { postId, setStatus, status, language, languageRedux } = props;


  const handleClickClosePost = async () => {
    try {
      const result = await postsApi.updateStatusPost(postId, 3);
      if (result) {
        setStatus(3);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickEditPost = async () => {
    // const result = await postApi.updateStatusPost(postId, 1);
    window.open(`/edit-posted?postId=${postId}`, '_parent');
  };


  return (
    <div className="subs-icon_moreOutlined">
      <div
        className="sub-icon_moreOutlined sub-edit_post"
        onClick={handleClickEditPost}
      >
        <EditOutlined />
        {
          'Sửa'
        }
      </div>

      <div
        className="sub-icon_moreOutlined sub-close_post"
        onClick={status !== 3 ? handleClickClosePost : () => { }}
        style={
          status === 3 ? { cursor: 'not-allowed', background: '#aaa' } : {}
        }
      >
        <CloseSquareOutlined />
        {status === 3 ? 'Đã đóng' : 'Đóng bài'}
      </div>
    </div>
  );
};

export default SubIcon;
