import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button, Switch, message } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditReqForm from './Components/AddEditReqForm';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getRequestFormsList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject, deleteRequestForm, delRequest } from '../../ducks/services';
import { getRoles } from '../../../../Application/ducks/actions';
import { getFieldsList } from '../../../Requests/ducks/actions';
import Roles from '../../../../../../routing/config/Roles';
import { allowed } from '../../../../../../routing/config/utils';

export default (props) => {
  const [formFields, setFormFields] = useState();
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchVal] = useState(null);
  const dispatch = useDispatch();
  const requestFormsList = useSelector((state) => state.setup.requestFormsListData);

  useEffect(() => {
    // dispatch(getJobs());
    dispatch(getRoles());
    dispatch(getFieldsList());
    if (!visible) {
      dispatch(getRequestFormsList(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'Form Name',
      dataIndex: 'form_name',
      key: 'form_name',
      sorter: true,
      render: (text, record) => (
        <Button type="link" className="list-links c-gray" onClick={() => onClickRow(record)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Fields',
      dataIndex: 'field_count',
      key: 'field_count',
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      sorter: true,
      render: (text, record) => <Switch checked={text == 'Active' ? true : false} disabled />,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      align: 'center',
      render: (text, record) =>
        allowed([Roles.SETUP], 'delete') ? (
          <Button type="link" className="list-links c-gray" onClick={() => deleteRequest(record.name)}>
            <CloseCircleFilled />
          </Button>
        ) : null,
    },
  ];

  const btnList = [
    {
      text: '+ New Request Forms',
      classes: 'green-btn',
      action: () => {
        setVisible(true);
      },
    },
  ];

  const onUpdate = () => {
    setVisible(false);
    setFormFields(null);
    dispatch(getRequestFormsList(page, limit, '', ''));
  };

  const popup = {
    closable: true,
    visibility: visible,
    content: (
      <AddEditReqForm
        title="Add New Form"
        data={formFields}
        onClose={() => {
          setVisible(false);
          setFormFields(null);
        }}
        onUpdate={onUpdate}
      />
    ),
    width: 536,
    onCancel: () => setVisible(false),
  };

  const deleteRequest = async (name) => {
    props.setLoading(true);
    deleteRequestForm(name)
      .then((response) => {
        props.setLoading(false);
        if (response.data.message.success == true) {
          message.success(response.data.message.message);
          onUpdate();
        } else {
          message.error(response.data.message.message);
        }
      })
      .catch((error) => {
        props.setLoading(false);
        message.error('Something went wrong')
      })
  };

  const onClickRow = (record) => {
    if (allowed([Roles.SETUP], 'write')) {
      setFormFields(record);
      setVisible(true);
    }
  };
  const onSearch = (value) => {
    if (value) {
      let searchVal = {
        name: value?.request_form ? value?.request_form : '',
      };
      setSearchVal(searchVal);
      setPage(1);
      dispatch(getRequestFormsList(1, 10, '', '', searchVal));
    }
  };
  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(
        getRequestFormsList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, searchValue),
      );
    } else {
      dispatch(getRequestFormsList(pagination.current, pagination.pageSize, '', '', searchValue));
    }
  };
  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Request Forms" btnList={allowed([Roles.SETUP], 'write') ? btnList : null} />
        </Col>
        <Col span={24}>
          <ListCard
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={requestFormsList?.rows}
            pagination={{
              total: requestFormsList?.count,
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
