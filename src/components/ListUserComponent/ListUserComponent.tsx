'use client';

import messageApi from '@/api/messageApi';
import React, {useEffect, useState} from 'react';

interface Props {}

const ListUserComponent = (props: Props) => {

  const getAllUserChat = async () => {
    try {
      const result = await messageApi.getUserChated('vi');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUserChat()
  }, []);
  return (
    <div>
        <h1>List User</h1>
    </div>
  )
};

export default ListUserComponent;
