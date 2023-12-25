import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { useSelector } from 'react-redux';
import styles from './style.module.scss';
import { RootState } from '@/redux';
import apiCompany from '@/api/company/apiCompany';

interface IModalReviewNotice {
    openModalConfirmDelete: boolean;
    setOpenModalConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
    companyId: any,
    setOpenBackdrop: React.Dispatch<React.SetStateAction<boolean>>;
    setStatus: React.Dispatch<React.SetStateAction<any>>;
    setOpenModalPostReviewSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    setStar: React.Dispatch<React.SetStateAction<any>>;
    setReview: React.Dispatch<React.SetStateAction<any>>;
    setMyReview: React.Dispatch<React.SetStateAction<any>>;
    setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    inputRef: any;
    isSuccess: boolean;
}

const ModalConfirmDelete: React.FC<IModalReviewNotice> = (props) => {
    const languageRedux = useSelector(
        (state: RootState) => state.changeLaguage.language,
    );
    const { openModalConfirmDelete,
        setOpenModalConfirmDelete,
        companyId,
        setOpenBackdrop,
        setStatus,
        setOpenModalPostReviewSuccess,
        setStar,
        setReview,
        setMyReview,
        setIsSuccess,
        inputRef,
        isSuccess
    } = props;

    const handleCloseModal = () => {
        setOpenModalConfirmDelete(false);
    };

    const handleDeleteReview = async () => {
        try {
            setOpenBackdrop(true);
            const result = await apiCompany.deleteCompanyReview(companyId);
            if (result) {
                setOpenModalConfirmDelete(false);
                setOpenBackdrop(false);
                setStatus('delete');
                setOpenModalPostReviewSuccess(true);
                setStar(0);
                setReview('');
                setMyReview(undefined);
                setIsSuccess(!isSuccess);
                inputRef.current!.focus({
                    cursor: 'end',
                });
            }
        } catch (error) { }
    };

    return (
        <Modal
            width={500}
            centered
            title={
                <h3
                    style={{
                        fontFamily: 'Roboto',
                        fontSize: '24px',
                        // fontWeight: '700',
                        lineHeight: '24px',
                        letterSpacing: '0em',
                        textAlign: 'center',
                    }}
                >
                    {languageRedux === 1
                        ? 'Xác nhận xóa đánh giá'
                        : 'Confirm deletion of review'}
                </h3>
            }
            footer={null}
            open={openModalConfirmDelete}
            onCancel={handleCloseModal}
        >
            <p
                style={{
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '400',
                    lineHeight: '24px',
                    letterSpacing: '0.5px',
                    textAlign: 'center',
                }}
            >
                {
                    languageRedux === 1
                        ? 'Bạn có chắc chắn muốn xóa đánh giá này. Sau khi xóa, đánh giá của bạn về công ty này sẽ không còn xuất hiện.'
                        : 'Are you sure you want to delete this review. Once deleted, your review of this company will no longer appear.'
                }
            </p>
            <div className={styles.modal_confirm_delete_buttons}>
                <Button
                    type="primary"
                    shape="round"
                    onClick={handleDeleteReview}
                >
                    {languageRedux === 1 ? 'Xóa' : 'Delete'}
                </Button>
                <Button
                    type="text"
                    shape="round"
                    onClick={handleCloseModal}
                >
                    {languageRedux === 1 ? 'Hủy' : 'Cancel'}
                </Button>
            </div>
        </Modal>
    );
};

export default ModalConfirmDelete;
