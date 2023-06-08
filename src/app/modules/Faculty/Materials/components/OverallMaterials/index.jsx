import React, { useState, useEffect } from 'react';
import ListCard from '../../../../../molecules/ListCard';
import { Row, Col, Rate } from 'antd';
import Search from '../Search';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getOverallMaterial, editMaterialType } from '../../ducks/actions';
import moment from 'moment';

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
    render: (text) => <Rate style={{ color: '#E89005' }} disabled defaultValue={text} />,
  },
];

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [filterData, setFilterData] = useState(null);
  const [filt, setFilt] = useState(null);
  const overllMaterial = useSelector((state) => state.material.overall_material);

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
      dispatch(getOverallMaterial(10, 1, '', '', searchVal));
    } else {
      dispatch(getOverallMaterial(10, page, '', '', null));
    }
  };
  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    if (sorter.order) {
      dispatch(getOverallMaterial(10, pagination.current, sorter.order, sorter.columnKey, filt));
    } else {
      dispatch(getOverallMaterial(10, pagination.current, '', '', filt));
    }
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`/faculty/materials/${record.name}`);
        dispatch(editMaterialType('rev'));
      },
    };
  };

  useEffect(() => {
    dispatch(getOverallMaterial(10, page, '', '', ''));
  }, []);

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <ListCard
          classes="clickRow"
          onRow={onClickRow}
          onChange={onTableChange}
          ListCol={ListCol}
          ListData={overllMaterial?.rows}
          filterData={filterData}
          Search={Search}
          onSearch={Search && onSearch}
          pagination={{
            total: overllMaterial?.count,
            current: page,
            pageSize: 10,
          }}
        />
      </Col>
    </Row>
  );
};
