import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button, Pagination, message } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditSkils from './Components/AddEditSkills';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getAllSkillList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import Roles from '../../../../../../routing/config/Roles';
import { allowed } from '../../../../../../routing/config/utils';

export default (props) => {
  const [skillField, setSkillField] = useState('');
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchVal] = useState(null);
  const dispatch = useDispatch();
  const skillListData = useSelector((state) => state.setup.allSkills);

  useEffect(() => {
    if (!visible) {
      dispatch(getAllSkillList(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'Skill',
      dataIndex: 'skill_name',
      key: 'skill_name',
      sorter: true,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      align: 'center',
      width: '100px',
      render: (text, record) => (
        <Button type="link" className="list-links c-gray" onClick={() => deleteRecord(record)}>
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const btnList = [
    {
      text: '+ New Skill',
      classes: 'green-btn',
      action: () => {
        setSkillField({ name: '', skill_name: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    class: 'black-modal',
    content: (
      <AddEditSkils
        skill={skillField}
        title={`${skillField.name ? 'Edit' : 'Add New'} Skill`}
        onClose={() => setVisible(false)}
      />
    ),
    width: 536,
    onCancel: () => setVisible(false),
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        if (allowed([Roles.SETUP], 'write')) {
          setSkillField(record);
          setVisible(true);
        }
      },
    };
  };
  const onSearch = (value) => {
    if (value) {
      let searchVal = {
        skill_name: value?.skill ? value?.skill : '',
      };
      setSearchVal(searchVal);
      setPage(1);
      dispatch(getAllSkillList(1, 10, '', '', searchVal));
    }
  };

  const onTableChange = (pagination, filters, sorter) => {
    console.log('heloo', pagination);
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getAllSkillList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, searchValue));
    } else {
      dispatch(getAllSkillList(pagination.current, pagination.pageSize, '', '', searchValue));
    }
  };

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Skills" btnList={allowed([Roles.SETUP], 'write') ? btnList : null} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={skillListData?.rows}
            pagination={{
              total: skillListData?.count,
              current: page,
              pageSize: limit,
            }}
            onChange={onTableChange}
          />
        </Col>
      </Row>
      <Popup {...popup} />
    </>
  );
};
