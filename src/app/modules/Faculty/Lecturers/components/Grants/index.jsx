import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button, Card } from 'antd';
import { useParams } from 'react-router-dom';
import ListCard from '../../../../../molecules/ListCard';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import GrantDetail from './GrantsDetail';
import { getGrantsGraph } from '../../ducks/services';
import GraphComponent from '../../../../../molecules/GraphComponent';
import { useSelector, useDispatch } from 'react-redux';
import { getGrantsList } from '../../ducks/actions';

const ListCol = [
  {
    title: 'Date',
    dataIndex: 'grant_date',
    key: 'grant_date',
    sorter: true,
  },
  {
    title: 'Source',
    dataIndex: 'source',
    key: 'source',
    sorter: true,
  },
  {
    title: 'Research Name',
    dataIndex: 'grant_name',
    key: 'grant_name',
    sorter: true,
    ellipsis: true,
  },
  {
    title: 'Amount',
    dataIndex: 'grant_amount',
    key: 'grant_amount',
    sorter: true,
    render: (text) => (Number(text) > 0 ? <span className="c-success">{`RM${text}`}</span> : text),
  },
  {
    title: 'Faculty',
    dataIndex: 'faculty_verification',
    key: 'faculty_verification',
    align: 'center',
    render: (text) =>
      text == 'Verified' ? <CheckCircleFilled className=" c-success" /> : <CloseCircleFilled className=" c-error" />,
  },
  {
    title: 'Finance',
    dataIndex: 'finance_verification',
    key: 'finance_verification',
    align: 'center',
    render: (text) =>
      text == 'Verified' ? <CheckCircleFilled className=" c-success" /> : <CloseCircleFilled className=" c-error" />,
  },
];

export default () => {
  const { Title, Text } = Typography;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loadDetail, setLoadDetail] = useState(false);
  const [grantDetail, setGrantDetails] = useState({});
  const [grantsGraphDdata, setGrantsGraphData] = useState([]);
  const grantList = useSelector((state) => state.lecturers.grants_list);
  console.log({ grantsGraphDdata });
  const graphProps = {
    title: '',
    barColor: '#02A574',
    countClass: 'c-success',
    count: `RM${grantsGraphDdata.records && grantsGraphDdata.records[0].total_sum}`,
    text: `${grantsGraphDdata.records && grantsGraphDdata.records[0].total_count} Research Grants in Total`,
    // search: <SearchProgram onSearch={onSearch} field1={faculty} field2={program} />,
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setLoadDetail(true);
        setGrantDetails(record);
      },
    };
  };

  useEffect(() => {
    dispatch(getGrantsList(id, '', ''));
    getGrantsGraph(id).then((response) => setGrantsGraphData(response?.data?.message));
  }, [id]);

  const onTableChange = (pagination, filters, sorter) => {
    if (sorter.order) {
      dispatch(getGrantsList(id, sorter.order, sorter.columnKey));
    } else {
      dispatch(getGrantsList(id, '', ''));
    }
  };
  return (
    <>
      {!loadDetail ? (
        <Row gutter={[24, 30]}>
          <Col span={24}>
            <Row gutter={24}>
              <Col span={24}>
                <Title level={4} className="c-default">
                  Total Research Grant Amount
                </Title>
              </Col>
              <Col span={24}>
                <GraphComponent data={grantsGraphDdata?.data} cardClass="b-black" {...graphProps} />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <ListCard
              title="Research Grant List"
              className="clickRow"
              listClass="nospace-card"
              ListCol={ListCol}
              ListData={grantList}
              onRow={onClickRow}
              onChange={onTableChange}
              scrolling={500}
              pagination={false}
            />
          </Col>
        </Row>
      ) : (
        <GrantDetail
          backbtnTitle="Research Grant List"
          mainTitle="Interactive Graphic Design using Automatic Presentation Knowledge"
          grantDetail={grantDetail}
          setLoadDetail={setLoadDetail}
        />
      )}
    </>
  );
};
