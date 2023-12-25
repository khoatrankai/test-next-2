import React, {useState, FormEvent} from 'react';
import './style.scss';
import imageCompression from 'browser-image-compression';
import {Button, Input, message, Modal} from 'antd';
import type {RcFile} from 'antd/es/upload/interface';
// @ts-ignore
// @ts-ignore
import {useDropzone} from 'react-dropzone';
import {Box} from '@mui/material';
import {useSelector} from 'react-redux';
// @ts-ignore
import communityApi from '@/api/community/apiCommunity';
import {RootState} from '@/redux/reducer';
import {setCookie} from '@/cookies';
import apiCommunity from '@/api/community/apiCommunity';
import RollTop from '@/components/RollTop';
import {CameraComunityIcon, DeleteImageComunityIcon} from '@/icons';
import validatePostImages from '@/validations/post/image';
import {useRouter, useSearchParams} from 'next/navigation';
import JoditEditor from 'jodit-react';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';
import {useSrollContext} from '@/context/AppProvider';

const ComunityCreatePost = () => {
  const language = useSelector(
    (state: RootState) => state.dataLanguage.languages,
  );
  const [valueTitle, setValueTitle] = useState('');
  const [valueContent, setValueContent] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTitle, setPreviewTitle] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [selectedImages, setSelectedImages] = React.useState<
    {
      id: any;
      image: any;
    }[]
  >([]);
  const {handleLoadHrefPage} = useSrollContext();

  const searchParams: any = useSearchParams();
  const POST_COMMUNITY_ID = searchParams.get('post-community');
  const [communityPost, setCommunityPost] = React.useState<any>();
  const [deleteImages, setDeleteImages] = React.useState<any[]>([]);
  const languageRedux = useSelector(
    (state: RootState) => state.changeLaguage.language,
  );
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  React.useEffect(() => {
    handleLoadHrefPage();
    const accountId = localStorage.getItem('accountId');
    if (!accountId) {
      window.open('/', '_parent');
    }
  }, []);

  const handleGetDetailCommunityById = async () => {
    try {
      if (POST_COMMUNITY_ID) {
        const result = await communityApi.getCommunityDetailId(
          POST_COMMUNITY_ID,
          languageRedux === 1 ? 'vi' : 'en',
        );
        if (result) {
          setCommunityPost(result?.data);
          setValueTitle(result?.data?.title);
          setValueContent(result?.data?.content);
          setSelectedImages(result?.data?.image);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    handleGetDetailCommunityById();
  }, [POST_COMMUNITY_ID, languageRedux]);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 840,
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;

    const imagesUpload: any = Array.from(
      event.target.files ? event.target.files : [],
    );

    selectedFiles.forEach((file: any) => URL.revokeObjectURL(file.preview));

    const imagesToCheck =
      selectedFiles.length + imagesUpload.length > 5
        ? imagesUpload.slice(0, 5 - selectedImages.length)
        : imagesUpload;

    if (imagesToCheck.length > 0) {
      const validateImagesReply = validatePostImages(imagesToCheck);
      if (validateImagesReply.isError) {
        message.error('Hình không đúng định dạng');
        return;
      } else {
        try {
          const compressedImages: any = [];
          await Promise.all(
            imagesToCheck.map(async (image: any) => {
              const compressedImage = await imageCompression(image, options);
              compressedImages.push(
                new File([compressedImage], compressedImage.name, {
                  type: compressedImage.type,
                }),
              );
            }),
          );
          if (selectedImages.length < 5) {
            setSelectedFiles((prevState) => [
              ...prevState,
              ...compressedImages,
            ]);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    if (files) {
      if (files.length > 5) {
        message.error(language?.limit_5_img);
        return;
      }
      const newImages: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = () => {
          const imageDataURL = reader.result as string;
          newImages.push(imageDataURL);

          if (newImages.length === files.length) {
            const newImageSelected = [
              ...selectedImages,
              ...newImages.map((item: any, index: number) => ({
                id: index,
                image: item,
              })),
            ];
            if (newImageSelected.length > 5) {
              message.error(language?.limit_5_img);
              return;
            }
            setSelectedImages(newImageSelected);
            event.target.value = '';
          }
        };

        reader.readAsDataURL(file);
      }
    }
  };

  const handleDeleteImage = (index: number, deleteId: any) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
    setDeleteImages((prevImages) => {
      const deletedImages = [...prevImages];
      deletedImages.push(deleteId);
      return deletedImages;
    });
  };

  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': [],
    },
    // maxFiles: 5,
    onDragEnter: () => {
      setIsDragActive(true);
    },
    onDragLeave: () => {
      setIsDragActive(false);
    },
    onDrop: async (acceptedFiles: File[]) => {
      setIsDragActive(false);

      const fileUploaded = acceptedFiles.map((file: any) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );

      if (fileUploaded.length > 5) {
        message.error(language?.limit_5_img);
        return;
      }

      const newFileSelected = [...selectedFiles, ...fileUploaded];

      if (newFileSelected.length > 5) {
        message.error(language?.limit_5_img);

        return;
      }

      if (selectedImages.length < 5) {
        setSelectedFiles(newFileSelected);
      }

      const newImages: string[] = [];

      for (let i = 0; i < fileUploaded.length; i++) {
        const file = fileUploaded[i];
        const reader = new FileReader();

        reader.onload = () => {
          const imageDataURL = reader.result as string;
          newImages.push(imageDataURL);

          if (newImages.length === fileUploaded.length) {
            const newImageSelected = [
              ...selectedImages,
              ...newImages.map((item: any, index: number) => ({
                id: index,
                image: item,
              })),
            ];
            if (newImageSelected.length > 5) {
              message.error('Chỉ có thể tối đa 5 ảnh');

              return;
            }
            setSelectedImages(newImageSelected);
          }
        };

        reader.readAsDataURL(file);
      }
    },
  });

  React.useEffect(() => {
    setCookie('workingId', '0', 1);
    setCookie('hijobId', '0', 1);
    return () => {
      selectedFiles.length !== 0 &&
        selectedFiles.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [selectedFiles]);

  // valid values form data
  const validValue = () => {
    if (valueTitle === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập chủ đề bài viết'
            : 'Please enter the topic of the post',
        checkForm: false,
      };
    }

    if (valueContent === '') {
      return {
        message:
          languageRedux === 1
            ? 'Vui lòng nhập nội dung bài viết'
            : 'Please enter the content of the post',
        checkForm: false,
      };
    }

    return {
      message: '',
      checkForm: true,
    };
  };

  const handleSaveCommunity = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | FormEvent,
  ) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('title', valueTitle);
    formData.append('content', valueContent);
    selectedFiles.forEach((image: any) => {
      formData.append('images', image);
    });
    POST_COMMUNITY_ID &&
      deleteImages.forEach((id: any) => {
        formData.append('deleteImages', id);
      });

    for (const pair of formData.entries()) {
    }

    if (formData) {
      POST_COMMUNITY_ID ? updateCommunity(formData) : createCommunity(formData);
    }
  };

  const updateCommunity = async (formData: any) => {
    const {message, checkForm} = validValue();
    try {
      if (checkForm) {
        const result = await apiCommunity.putCommunityByAccount(
          Number(POST_COMMUNITY_ID),
          formData,
        );
        if (result) {
          // window.open('/comunity_create_success', '_parent');
          localStorage.setItem('community_success', 'true');
          toast.success(
            languageRedux === 1
              ? 'Sửa bài viết thành công'
              : 'Edit post failed',
            {
              position: 'bottom-center',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: 'dark',
              progress: undefined,
            },
          );
        } else {
          // messageApi.open({
          //   type: 'error',
          //   content:
          //     languageRedux === 1
          //       ? 'Sửa bài viết không thành công'
          //       : 'Edit post failed',
          // });
          toast.error(
            languageRedux === 1
              ? 'Sửa bài viết không thành công'
              : 'Edit post failed',
            {
              position: 'bottom-center',
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: 'dark',
              progress: undefined,
            },
          );
        }
      } else {
        messageApi.open({
          type: 'error',
          content: message,
        });
      }
    } catch (error) {}
  };

  const createCommunity = async (formData: any) => {
    const {message, checkForm} = validValue();
    try {
      if (checkForm) {
        const result = await apiCommunity.postCommunications(formData);

        if (result && result.status === 201) {
          toast.success('Tạo bài đăng thành công', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
          router.push('/blog');

          localStorage.setItem('community_success', 'true');
        } else {
          toast.error('Tạo bài đăng không thành công', {
            position: 'bottom-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: 'dark',
            progress: undefined,
          });
        }
      } else {
        messageApi.open({
          type: 'error',
          content: message,
        });
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const onBlur = (e: any) => {
    setValueContent(e);
  };

  return (
    <div className="comunity-create-post-container">
      {contextHolder}
      <div className="comunity-create-post-content">
        <div className="create-post-header">
          <h3 style={{fontWeight: '800'}}>
            {POST_COMMUNITY_ID
              ? languageRedux === 1
                ? 'Sửa bài viết'
                : 'Edit post'
              : languageRedux === 1
              ? 'Tạo bài viết mới'
              : 'Creat new post'}
          </h3>
        </div>
        <div className="create-post-body">
          <div className="create-post-body_input">
            <h3>{languageRedux === 1 ? '1. Chủ đề' : '1. Topic'}</h3>
            <Input
              value={valueTitle}
              onChange={(e: any) => {
                if (e.target.value.length <= 500) {
                  setValueTitle(e.target.value);
                } else {
                  message.error(
                    languageRedux === 1
                      ? 'Tiêu đề không được vượt quá 500 ký tự'
                      : "Topics can't exceed 500 characters",
                  );
                }
              }}
              className="input-title"
              placeholder={
                languageRedux === 1 ? 'Chủ đề cần chia sẻ' : 'Topics to share'
              }
            />
          </div>
          <div className="create-post-body_input">
            <h3>{languageRedux === 1 ? '2. Nội dung' : '2. Contents'}</h3>
            <JoditEditor
              value={valueContent}
              config={{
                readonly: false,
                height: 600,
                toolbar: true,
                toolbarButtonSize: 'large',
                showTooltip: true,
                showTooltipDelay: 0,
                style: {
                  background: 'white',
                  color: 'black',
                },
              }}
              onBlur={(e) => onBlur(e)}
            />
          </div>
          <div className="create-post-body_input">
            <h3>
              <span>
                {languageRedux === 1 ? '3. Thêm hình ảnh' : '3. Add images'}
              </span>
              <p
                style={{
                  display:
                    selectedImages?.length > 0 || selectedFiles.length > 0
                      ? 'block'
                      : 'none',
                  cursor: 'pointer',
                }}
              >
                <label htmlFor="submit">
                  {languageRedux === 1 ? 'Thêm hình ảnh' : 'Add images'}
                </label>
                <input
                  id="submit"
                  type="file"
                  name="images"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                  multiple
                />
              </p>
            </h3>
            <div
              className="post-comunity-images"
              style={{
                height:
                  selectedImages?.length > 0 || selectedFiles.length > 0
                    ? 'fit-content'
                    : '310px',
                border:
                  selectedImages?.length > 0 || selectedFiles.length > 0
                    ? 'none'
                    : '1px solid #ccc',
              }}
            >
              <Box p="0rem 0">
                <section className="drag-img-container">
                  <div
                    {...getRootProps({
                      className: isDragActive ? 'dropzone on-drag' : 'dropzone',
                    })}
                  >
                    <input {...getInputProps()} />
                    <div
                      className="drag-img-camera"
                      style={{
                        display:
                          (selectedImages?.length === 0 &&
                            selectedFiles.length === 0) ||
                          isDragActive
                            ? 'flex'
                            : 'none',
                      }}
                    >
                      <CameraComunityIcon />
                      <p>
                        {languageRedux === 1
                          ? 'Thêm hình ảnh cho bài viết'
                          : 'Add an image to the post'}
                      </p>
                    </div>
                  </div>
                </section>
                <Box className="list_iamges">
                  {selectedImages?.map((item: any, index: number) => (
                    <div className="item-image" key={index}>
                      <img
                        key={index}
                        src={item?.image}
                        alt={language?.err_none_img}
                      />
                      <div
                        className="deleteButton"
                        style={{
                          zIndex: isDragActive ? '0' : '2',
                        }}
                        onClick={() => handleDeleteImage(index, item?.id)}
                      >
                        <DeleteImageComunityIcon />
                      </div>
                    </div>
                  ))}
                </Box>
              </Box>
            </div>
          </div>
          <div className="save_btn">
            <Button
              onClick={handleSaveCommunity}
              className={
                valueTitle === '' || valueContent === ''
                  ? 'submit'
                  : 'submit full-info'
              }
            >
              {valueTitle === '' || valueContent === ''
                ? languageRedux === 1
                  ? 'Lưu bài'
                  : 'Save post'
                : languageRedux === 1
                ? 'Đăng bài viết'
                : 'Post an article'}
            </Button>
          </div>
        </div>
      </div>
      <RollTop />
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{width: '100%'}} src={previewImage} />
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default ComunityCreatePost;
