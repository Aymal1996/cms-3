import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useTranslate } from 'Translate';
import ListCard from '../../../../molecules/ListCard';
import { useHistory } from 'react-router-dom';
import { getModules } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../components/Search';

const filters = [
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Draft',
    value: 'draft',
  },
  {
    label: 'Archive',
    value: 'archive',
  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
];

const ListCol = [
  {
    title: 'Code',
    dataIndex: 'module_code',
    key: 'module_code',
    sorter: true,
    width: 90,
  },
  {
    title: 'Module Name',
    dataIndex: 'module_name',
    key: 'module_name',
    sorter: true,
    ellipsis: true,
    width: 280,
  },
  {
    title: 'Expiring Programmes',
    dataIndex: 'expiring',
    key: 'expiring',
    sorter: true,
    align: 'center',
    render: (text) => (Number(text) > 0 ? <span className="c-pending">{text}</span> : text),
  },
  {
    title: 'Expired Programmes',
    dataIndex: 'expired',
    key: 'expired',
    align: 'center',
    sorter: true,
    render: (text) => (Number(text) > 0 ? <span className="c-error">{text}</span> : text),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: (text) => {
      let clname = '';
      if (text == 'Active') {
        clname = 'c-success';
      } else if (text == 'Inactive') {
        clname = 'c-error';
      } else if (text == 'Draft') {
        clname = 'c-pending';
      }
      return <span className={`SentanceCase ${clname}`}>{text}</span>;
    },
  },
];

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const modulesApi = useSelector((state) => state.modules.moduleList);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filterVal, setFilterVal] = useState(filters[0].value);
  const i18n = useTranslate();
  const { t } = i18n;

  const addNew = () => history.push('modules/addnew');

  const btnList = [
    {
      text: '+ New Module',
      action: () => addNew(),
    },
  ];

  

  const onSearch = (value) => {
    if (value) {
      dispatch(getModules(filterVal, 1, 10, '', '', value))
    } else {
      dispatch(getModules(filterVal, 1, 10, '', ''));
    }
  };

  useEffect(() => {
    dispatch(getModules(filterVal, 1, 10, '', ''));
  }, [filterVal]);

  const onFilter = (e) => {
    setFilterVal(e.target.value);
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getModules(filterVal, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getModules(filterVal, pagination.current, pagination.pageSize, '', ''));
    }
  }

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`/aqa/modules/edit/${record.name}`)
      },
    };
  }


  return (
    <Row gutter={[30, 24]}>
      <Col span={24}>
        <HeadingChip title={t('AQA.Module.title1')} btnList={btnList} />
      </Col>
      <Col span={24} className="clickRow">
        <ListCard
          onRow={onClickRow} 
          Search={Search}
          onSearch={onSearch}
          filters={filters}
          filterValue={filterVal}
          onFilter={onFilter}
          ListCol={ListCol}
          ListData={modulesApi?.rows}
          onChange={onTableChange}
          pagination={{
              total: modulesApi?.count,
              current: page,
              pageSize: limit
          }}
        />
      </Col>
    </Row>
  );
};
