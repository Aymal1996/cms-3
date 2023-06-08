import React, { useState } from 'react';
import { Row, Col, Button } from 'antd';
import ListCard from 'Molecules/ListCard';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { closeAllOpenForms, getFinanceDetail } from '../../ducks/actions';
import { LeftOutlined } from '@ant-design/icons';
import AddAsset from '../../components/AddAssest';
import { allowed } from '../../../../../../routing/config/utils';
import Roles from '../../../../../../routing/config/Roles';
import moment from 'moment';

const assetsCol = [
  {
    title: 'Asset No',
    dataIndex: 'asset_id',
    key: 'asset_id',
    sorter: (a, b) => a.asset_no.length - b.asset_no.length,
  },
  {
    title: 'Start',
    dataIndex: 'start_date',
    key: 'start_date',
    sorter: true,
    render: (text) => moment(text).format('Do MMMM YYYY'),
  },
  {
    title: 'End',
    dataIndex: 'end_date',
    key: 'end_date',
    sorter: true,
    render: (text) => moment(text).format('Do MMMM YYYY'),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
];

export default (props) => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { assetData } = props;
  const [rowData, setRowData] = useState();
  const [viewAssetsForm, setViewAssetsForm] = useState(false);
  const tabVal = useSelector((state) => state.hrmsfinance.tabClose);

  const onFormViewer = (record) => {
    setRowData(record);
    dispatch(closeAllOpenForms(true));
    setViewAssetsForm(true);
  };

  const onCloseForm = () => {
    dispatch(getFinanceDetail(id));
    setViewAssetsForm(false);
  };

  const onRowClickHandler = (record) => {
    return {
      onClick: () => {
        onFormViewer(record);
      },
    };
  };
  
  return (
    <Row gutter={[24, 30]} align="bottom">
      {viewAssetsForm && tabVal ? (
        <Col span={24}>
          <Button
            type="link"
            htmlType="button"
            className="mb-1 p-0 c-gray-linkbtn"
            icon={<LeftOutlined />}
            onClick={onCloseForm}
          >
            Assets in Possession
          </Button>
          <AddAsset data={rowData} onUpdateComplete={onCloseForm} />
        </Col>
      ) : (
        <Col span={24}>
          <Row gutter={[20, 30]} justify="end">
            <Col span={24}>
              <ListCard
                title="Assets in Position"
                ListCol={assetsCol}
                ListData={assetData}
                classes="clickRow"
                listClass="nospace-card"
                pagination={false}
                onRow={onRowClickHandler}
                scrolling={500}
              />
            </Col>
            {allowed([Roles.HRMSFINANCE], 'write') &&
            <Col>
              <Button size="large" type="primary" onClick={onFormViewer}>
                + Add New Asset
              </Button>
            </Col>}
          </Row>
        </Col>
      )}
    </Row>
  );
};