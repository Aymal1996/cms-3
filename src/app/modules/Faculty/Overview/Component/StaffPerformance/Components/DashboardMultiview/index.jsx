import React, { useState, useEffect, Fragment } from 'react';
import ListCard from '../../../../../../../molecules/ListCard';
import { Radio, Space, Typography, Select, Pagination, Button } from 'antd';
import { useHistory } from 'react-router';
import { AppstoreFilled, DatabaseFilled } from '@ant-design/icons';
import MainStatusCardDashboard from '../../../../../../../atoms/MainStatusCard';
import { useForm } from 'react-hook-form';

import { Column } from '@ant-design/charts';

const _ = require('lodash');
const { Title } = Typography;
const { Option } = Select;

export default (props) => {
  const { control } = useForm()
  const { iProps } = props;
  const history = useHistory();
  const { link, updateApi, carddata, statusKey, Search, cardcount, listCol, listcount, listdata, searchDropdowns } = iProps;
  const [page, setPage] = useState(1);
  const [limit,setLimit] = useState(6);
  const [view, setView] = useState('card');
  const [sorting, setSorting] = useState('');
  const [searchVal, setSearchVal] = useState(null);
  const [teamSelected, setTeamSelected] = useState('');

  var data = [
    {
      type: '100%',
      sales: 100,
    },
    {
      type: '90%',
      sales: 90,
    },
    {
      type: '86%',
      sales: 86,
    },
    {
      type: '80%',
      sales: 80,
    },
    {
      type: '70%',
      sales: 70,
    },
    {
      type: '60%',
      sales: 60,
    },
    {
      type: '55%',
      sales: 55,
    },
    {
      type: '52%',
      sales: 52,
    },
    {
      type: '50%',
      sales: 50,
    },
    {
      type: '48%',
      sales: 48,
    },
    {
      type: '45%',
      sales: 45,
    },
    {
      type: '38%',
      sales: 38,
    },
    {
      type: '26%',
      sales: 26,
    },
    {
      type: '20%',
      sales: 20,
    },
    {
      type: '15%',
      sales: 15,
    },
  ];
  var config = {
    data: data,
    xField: 'type',
    yField: 'sales',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  
  useEffect(() => {
    updateApi(page, limit, '', '', view, null, teamSelected);
  }, []);

  // Card Pagination
  const onPageChange = (pg) => {
    setPage(pg);
    updateApi(pg, 6, sorting, '', view, null, teamSelected);
  };

  const onSorting = () => {
    if (sorting == 'ASC') {
      setSorting('DESC');
      updateApi(page, limit, 'DESC', '', view, null, teamSelected);
    } else {
      setSorting('ASC');
      updateApi(page, limit, 'ASC', '', view, null, teamSelected);
    }
  };

  // Switching Views

  const onViewChange = (e) => {
    setView(e.target.value);
    setPage(1);
    if (e.target.value == 'list') {
      setLimit(10);
      updateApi(1, 10, '', '', e.target.value, null, teamSelected);
    } else if (e.target.value == 'graph') {
    
    } else {
      setLimit(6);
      updateApi(1, 6, '', '', e.target.value, null, teamSelected);
    }
  };

  const SwitchView = () => {
    return (
      <Space size={30} className="optionsTabs">
        {view == 'card' || view == 'graph' && (
          <Space>
            <Title level={5} className="mb-0 c-default">
              Sort by:
            </Title>
            <Button type="button" className="gray-btn" onClick={onSorting}>
              {sorting == 'ASC' ? 'Oldest' : 'Latest'}
            </Button>
          </Space>
        )}
        <Space>
          <Title level={5} className="mb-0 c-default">
            View:
          </Title>
          <Radio.Group onChange={onViewChange} value={view} buttonStyle="solid">
            <Radio.Button value={'graph'}>
              <DatabaseFilled />
            </Radio.Button>
            <Radio.Button value={'list'}>
              <DatabaseFilled />
            </Radio.Button>
            <Radio.Button value={'card'}>
              <AppstoreFilled />
            </Radio.Button>
          </Radio.Group>
        </Space>
      </Space>
    );
  };

  // List/ Table Function

  const onSearch = (val) => {
    setSearchVal(val);
    setPage(1);
    updateApi(e.target.value, 1, 10, '', '', view, val, teamSelected);
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`${listLink || link}${record?.employee_id}`);
      },
    };
  };

  const onTableChange = (pagination, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      updateApi(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, view, searchVal, teamSelected);
    } else {
      updateApi(pagination.current, pagination.pageSize, '', '', view, searchVal, teamSelected);
    }
  };

  const onTeamChange = (e) => {
    setTeamSelected(e);
    setPage(1);
    updateApi(1, limit, '', '', view, null, e);
  }

  return (
    <>
      <SwitchView />
      {view == 'list' && (
        <ListCard
          classes='clickRow'
          onRow={onClickRow}
          Search={Search && Search}
          onSearch={Search && onSearch}
          ListCol={listCol}
          ListData={listdata}
          onChange={onTableChange}
          {...searchDropdowns}
          pagination={{
            total: listcount,
            current: page,
            pageSize: limit,
          }}
        />
      )}
      {view == 'card' && (
        <>
          <div className="flexibleRow">
            {carddata.map((item, index) => (
                <Fragment key={index}>
                <div className='requestPanel'>
                    <MainStatusCardDashboard data={item} link={link} statusKey={statusKey} />
                </div>
              </Fragment>
            ))}
          </div>
          <div className="w-100 text-right mt-2">
            <Pagination pageSize={6} current={page} hideOnSinglePage={true} showSizeChanger={false} onChange={onPageChange} total={cardcount} />
          </div>
        </>
      )}

      {view == 'graph' && (
        <>
          <Column {...config} />
        </>
      )}
    </>
  );
};
