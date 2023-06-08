import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Rate, Space, Typography } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import ListCard from '../../../../../molecules/ListCard';
import Search from '../Search';
import { useHistory } from 'react-router';
import { editMaterialType, getMyMaterial, showMaterialForm } from '../../ducks/actions';
import { BreakingPoint } from '../../../../../../configs/constantData';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment';

const filters = [
  {
    label: 'My Materials',
    value: 'My Materials',
  },
  {
    label: 'Faculty Materials',
    value: 'Faculty Materials',
  },
  {
    label: 'Draft',
    value: 'Draft',
  },
];

export default (props) => {
  const { iProps } = props;
  const { data, link, updateApi, count, innerKey, key, addbtn, btnAction, btnclass } = iProps;
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const history = useHistory();
  const dispatch = useDispatch();
  const [filterVal, setFilterVal] = useState(filters[0].value);
  const [page, setPage] = useState(1);
  const [filt, setFilt] = useState(null);

  const myMaterial = useSelector((state) => state.material.my_material);
  const ListCol = [
    {
      title: 'Material Name',
      dataIndex: 'material_name',
      key: 'material_name',
      sorter: true,
    },
    {
      title: 'Published Date',
      dataIndex: 'publish_date',
      key: 'publish_date',
      sorter: true,
      render: (text) => (text ? moment(text).format('Do MMMM YYYY') : '-'),
    },
    // {
    //   title: 'Module',
    //   dataIndex: 'assigned_module',
    //   key: 'assigned_module',
    //   sorter: true,
    // },
    {
      title: 'Type',
      dataIndex: 'material_type',
      key: 'material_type',
      sorter: true,
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
      sorter: true,
    },
    {
      title: 'Appreciations',
      dataIndex: 'rating',
      key: 'rating',
      render: (text) => <Rate style={{ color: '#E89005' }} disabled value={text} />,
    },
  ];

  const onSearch = (search) => {
    if (search) {
      let searchVal = {};
      searchVal = {
        material_name: search.material_name,
        author: search.author,
        module_name: search.module_name.value,
        material_type: search.material_type.value,
      };
      setFilt(searchVal);
      dispatch(getMyMaterial(1, 10, '', '', searchVal, filterVal));
    } else {
      dispatch(getMyMaterial(page, 10, '', '', null, filterVal));
    }
  };

  const onFilter = (e) => {
    setFilterVal(e.target.value);
    setPage(1);
    dispatch(getMyMaterial(1, 10, '', '', '', e.target.value));
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    if (sorter.order) {
      dispatch(getMyMaterial(pagination.current, 10, sorter.order, sorter.columnKey, filt, filterVal));
    } else {
      dispatch(getMyMaterial(pagination.current, 10, '', '', filt, filterVal));
    }
  };
  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`/faculty/materials/${record.name}`);
        dispatch(editMaterialType(filterVal == 'My Materials' ? '' : 'rev'));
      },
    };
  };
  useEffect(() => {
    dispatch(getMyMaterial(page, 10, '', '', '', filterVal));
  }, []);

  const SideOption = () => {
    return (
      <Space size={30} className={`optionsTabs ${!isHDScreen ? 'optionsTabsRes' : ''}`}>
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
      <Row gutter={[20, 30]}>
        <Col span={24} className="clickRow">
          <ListCard
            Search={Search}
            filters={filters}
            filterValue={filterVal}
            onSearch={onSearch}
            onFilter={onFilter}
            onRow={onClickRow}
            onChange={onTableChange}
            ListCol={ListCol}
            ListData={myMaterial?.rows}
            class="mb-0"
            pagination={{
              total: myMaterial?.count,
              current: page,
              pageSize: 10,
            }}
          />
        </Col>
      </Row>
    </>
  );
};
