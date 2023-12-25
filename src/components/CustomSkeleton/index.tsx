'use client';
import React from 'react';
import {Skeleton, Space} from 'antd';
import './style.scss';
import {LineChartOutlined} from '@ant-design/icons';

const CustomSkeleton: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        border: '1px solid #ccc',
        borderRadius: '12px',
        padding: '12px',
      }}
    >
      <Space style={{display: 'flex'}} className="space_custom__skeleton">
        <div>
          <Skeleton.Image active={true} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
          }}
          className="wrap_title__skeleton"
        >
          <div style={{display: 'flex', gap: '12px'}}>
            <Skeleton.Input
              active={true}
              size="default"
              block
              className="skeleton_input"
            />

            <Skeleton.Avatar active={true} />
          </div>
          <div>
            <Skeleton.Input active={true} size="default" block />
          </div>
        </div>
      </Space>
    </div>
  );
};

export const ImageChangeSkeleton: React.FC = () => {
  return (
    <Skeleton.Node active={true}>
      <LineChartOutlined style={{fontSize: 50, color: '#000'}} />
    </Skeleton.Node>
  );
};

export default CustomSkeleton;
