import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Switch, message } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import { Popup } from 'Atoms/Popup';
import ListCard from 'Molecules/ListCard';
// import AddEditReqForm from './Components/AddEditReqForm';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
// import { getRequestFormsList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getFormsFields } from '../../../../AQA/Forms/ducks/actions';
import { getFormList } from '../../ducks/actions';
import { updateForm } from '../../ducks/services';
import AddEditReqForm from './Components/AddEditReqForm';


export default (props) => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState();
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchVal] = useState(null);
  const requestFormsList = useSelector((state) => state.marketingcustomize.formList);

  useEffect(() => {
    dispatch(getFormsFields());
    if (!visible) {
      dispatch(getFormList(page, limit, '', ''));
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
      dataIndex: 'form_fields_count',
      key: 'form_fields_count',
      sorter: false,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      sorter: false,
      render: (text, record) => <Switch checked={text == 'Active' ? true : false} onChange={() => onStatus(record.name, text)} />,
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      align: 'center',
      render: (text, record) =>
          <Button type="link" className="list-links c-gray">
            <CloseCircleFilled />
          </Button>
    },
  ];

  const onStatus = (id, stat) => {
    updateForm(id, {status: stat == 'Active' ? 'Inactive': 'Active'}).then(res => {
      message.success('Form Status Updated');
      onUpdate();
    })
  };

  const btnList = [
    {
      text: '+ New Form',
      classes: 'green-btn',
      action: () => {
        setVisible(true);
      },
    },
  ];

  const onUpdate = () => {
    setVisible(false);
    setFormFields(null);
    dispatch(getFormList(page, limit, '', ''));
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

  // const deleteRequest = async (name) => {
  //   props.setLoading(true);
  //   deleteRequestForm(name)
  //     .then((response) => {
  //       props.setLoading(false);
  //       if (response.data.message.success == true) {
  //         message.success(response.data.message.message);
  //         onUpdate();
  //       } else {
  //         message.error(response.data.message.message);
  //       }
  //     })
  //     .catch((error) => {
  //       props.setLoading(false);
  //       message.error('Something went wrong')
  //     })
  // };

  const onClickRow = (record) => {
      setFormFields(record);
      setVisible(true);
  };

  const onSearch = (value) => {
    if (value) {
      setPage(1);
      setSearchVal(value?.request_form);
      dispatch(getFormList(1, 10, '', '', value?.request_form));
    }
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(
        getFormList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, searchValue),
      );
    } else {
      dispatch(getFormList(pagination.current, pagination.pageSize, '', '', searchValue));
    }
  };
  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Request Forms" btnList={btnList} />
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
