import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditAsset from './Components/AddEditAssets';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getAssetsList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { allowed } from '../../../../../../routing/config/utils';
import Roles from '../../../../../../routing/config/Roles';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [assetField, setAssetField] = useState('');
  const [page, setPage] = useState(1);
  const [searchValue, setSearchVal] = useState(null);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const assetsList = useSelector((state) => state.setup.assetsListData);

  useEffect(() => {
    if (!visible) {
      dispatch(getAssetsList(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'Asset No.',
      dataIndex: 'assets_id',
      key: 'assets_id',
      sorter: true,
    },
    {
      title: 'Asset Name',
      dataIndex: 'assets_name',
      key: 'assets_name',
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      render: (text) => {
        let clname = '';
        if (text == 'In Staff Possession') {
          clname = 'c-pending';
        } else if (text == 'With Company') {
          clname = 'c-success';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      sorted: (a, b) => a.Action - b.Action,
      align: 'center',
      render: (text, record) => (
        <Button type="link" className="list-links c-gray" onClick={() => {}}>
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const btnList = [
    {
      text: '+ New Asset',
      classes: 'green-btn',
      action: () => {
        setAssetField({ name: '', status: '', assets_id: '', assets_name: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    class: 'black-modal',
    content: (
      <AddEditAsset
        asset={assetField}
        title={`${assetField.name ? 'Edit' : 'Add New'} Asset`}
        onClose={() => setVisible(false)}
      />
    ),
    width: 536,
    onCancel: () => setVisible(false),
  };

  const deleteRecord = async (record) => {
    //props.setLoading(true);
    let url = `${apiresource}/HRMS Teams/${record.name}`;
    try {
      await axios.delete(url);
      message.success('Record Successfully Deleted');
      //props.setLoading(false);
      dispatch(getAssetsList(page, pageSize));
    } catch (e) {
      //props.setLoading(false);
      const { response } = e;
      message.error('Something went wrong');
    }
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        if (allowed([Roles.SETUP], 'write')) {
          setAssetField(record);
          setVisible(true);
        }
      },
    };
  };

  const onSearch = (value) => {
    if (value) {
      let searchVal = {
        assets_name: value?.asset_name ? value?.asset_name : '',
      };
      setSearchVal(searchVal);
      setPage(1);
      dispatch(getAssetsList(1, 10, '', '', searchVal));
    }
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getAssetsList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, searchValue));
    } else {
      dispatch(getAssetsList(pagination.current, pagination.pageSize, '', '', searchValue));
    }
  };

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Assets" btnList={allowed([Roles.SETUP], 'write') ? btnList : null} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={Search && onSearch}
            ListCol={ListCol}
            ListData={assetsList?.rows}
            pagination={{
              total: assetsList?.count,
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
