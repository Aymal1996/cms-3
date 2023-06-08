import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useTranslate } from 'Translate';
import ListCard from '../../../../molecules/ListCard';
import { useHistory } from 'react-router-dom';
import { getFaculty } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

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
];

export default () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [filterVal, setFilterVal] = useState(filters[0].value);
  const i18n = useTranslate();
  const { t } = i18n;

  const addNew = () => history.push('faculty/addnew');

  const btnList = [
    {
      text: '+ New Faculty',
      action: () => addNew(),
    },
  ];

  const ListCol = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.length - b.code.length,
      width: 90,
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty',
      key: 'faculty',
      sorter: (a, b) => a.faculty.length - b.faculty.length,
      ellipsis: true,
      width: 280,
      render: (text) => (
        <Button type="link" className="p-0" onClick={() => history.push('/aqa/faculty/edit')}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Expiring Programmes',
      dataIndex: 'expiring',
      key: 'expiring',
      sorter: (a, b) => a.expiring - b.expiring,
      align: 'center',
      render: (text) => (Number(text) > 0 ? <span className="c-pending">{text}</span> : text),
    },
    {
      title: 'Expired Programmes',
      dataIndex: 'expired',
      key: 'expired',
      align: 'center',
      sorter: (a, b) => a.expired - b.expired,
      render: (text) => (Number(text) > 0 ? <span className="c-error">{text}</span> : text),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (text) => {
        let clname = '';
        if (text == 'active') {
          clname = 'c-success';
        } else if (text == 'draft') {
          clname = 'c-pending';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },
    {
      title: 'Programmes',
      dataIndex: 'programmes',
      key: 'programmes',
      align: 'center',
      sorter: (a, b) => a.programmes.length - b.programmes.length,
    },
    {
      title: 'Active Students',
      dataIndex: 'activestudents',
      key: 'activestudents',
      align: 'center',
      sorter: (a, b) => a.programmes.length - b.programmes.length,
    },
  ];

  useEffect(() => {
    dispatch(getFaculty());
  }, []);

  const onFilter = (e) => {
    setFilterVal(e.target.value);
  };

  return (
    <Row gutter={[30, 24]}>
      <Col span={24}>
        <HeadingChip title={t('AQA.Faculty.title1')} btnList={btnList} />
      </Col>
      <Col span={24}>
        <ListCard
          filters={filters}
          filterValue={filterVal}
          onFilter={onFilter}
          ListCol={ListCol}
          ListData={ListData}
          pagination={true}
        />
      </Col>
    </Row>
  );
};
