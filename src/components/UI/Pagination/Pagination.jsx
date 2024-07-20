/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Pagination as Pag, ConfigProvider } from 'antd';

function Pagination({ total, pageSize = 5, onChange, current }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemActiveBg: '#1890FF',
            colorPrimary: '#ffffff',
          },
        },
      }}
    >
      <Pag
        total={total}
        // hideOnSinglePage={true}
        showSizeChanger={false}
        pageSize={pageSize}
        onChange={onChange}
        current={current}
      />
    </ConfigProvider>
  );
}

export default Pagination;
