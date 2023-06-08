import React, { useState, useEffect, Fragment } from 'react';
import { Space, Typography, Pagination, Button, Empty } from 'antd';
import RequestCard from '../../atoms/RequestCard';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../configs/constantData';

const { Title } = Typography;

export default (props) => {
  const { iProps } = props;
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const { data, link, updateApi, count, innerKey, key, addbtn, btnAction, btnclass, limit } = iProps;
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState('');

  useEffect(() => {
    updateApi(key, 1, sorting, limit);
  }, []);

  const onPageChange = (pg) => {
    setPage(pg);
    updateApi(key, pg, sorting, limit);
  };

  const onSorting = () => {
    if (sorting == 'ASC') {
      setSorting('DESC');
      updateApi(key, page, 'DESC', limit);
    } else {
      setSorting('ASC');
      updateApi(key, page, 'ASC', limit);
    }
  };

  const SideOption = () => {
    return (
      <Space size={30} className={`optionsTabs ${!isHDScreen ? 'optionsTabsRes' : ''}`}>
        <Space>
          <Title level={5} className="mb-0 c-default">
            Sort by:
          </Title>
          <Button type="button" className="gray-btn" onClick={onSorting}>
            {sorting == 'ASC' ? 'Oldest' : 'Latest'}
          </Button>
        </Space>
        {addbtn && (
          <Button
            type="primary"
            htmlType="button"
            className={btnclass ? btnclass : ''}
            size="large"
            onClick={btnAction}
          >
            {addbtn}
          </Button>
        )}
      </Space>
    );
  };

  return (
    <>
      <SideOption />
      {data && data?.length > 0 ? (
        <>
          <div className="flexibleRow">
            {data.map((item, index) => (
              <Fragment key={index}>
                <div className="flexibleRow">
                  <div className="requestPanel">
                    <RequestCard data={item} link={item[innerKey] ? `${link}${item[innerKey]}` : ''} stateKey={key} />
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
          <div className="w-100 text-right mt-2">
            <Pagination pageSize={limit} current={page} hideOnSinglePage={true} onChange={onPageChange} total={count} />
          </div>
        </>
      ) : (
        data && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </>
  );
};
