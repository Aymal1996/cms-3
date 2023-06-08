import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Rate } from 'antd';
import { OrganizationGraph } from '@ant-design/charts';
import ListCard from '../../../../../molecules/ListCard';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRevisionGraph } from '../../ducks/services';
import { getRevisionList } from '../../ducks/actions';
import { generateTree } from '../../../../../../features/utility';

export default () => {
  const { Title, Text } = Typography;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [graphData, setGraphData] = useState({ id: 0, value: { value: 0 } });
  const materialName = useSelector((state) => state.material.material_name);
  const revisionList = useSelector((state) => state.material.revision_list);

  const ListCol = [
    {
      title: 'Revision No.',
      dataIndex: 'revision_no',
      key: 'revision_no',
      sorter: true,
      render: (text) => <Text>{`Revision ${text}`}</Text>,
    },
    {
      title: 'Publication Date',
      dataIndex: 'publish_date',
      key: 'publish_date',
      sorter: true,
    },
    {
      title: 'Revised By',
      dataIndex: 'revision_by',
      key: 'revision_by',
      sorter: true,
      align: 'center',
      render: (text) => <Text>{text ? text : '-'}</Text>,
    },
    {
      title: 'Appreciations',
      dataIndex: 'rating',
      key: 'rating',
      render: (text) => <Rate style={{ color: '#E89005' }} disabled value={text} />,
    },
  ];

  useEffect(() => {
    if (materialName.length) {
      dispatch(getRevisionList(materialName, page, 5, '', ''));
      getRevisionGraph(materialName).then((response) => {
        console.log({ response });
        let graph = generateTree(response?.data?.message);
        console.log(graph[0]);
        setGraphData(graph[0]);
      });
    }
  }, [materialName]);

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    if (sorter.order) {
      dispatch(getRevisionList(materialName, 5, pagination.current, sorter.order, sorter.columnKey));
    } else {
      dispatch(getRevisionList(materialName, 5, pagination.current, '', ''));
    }
  };
  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        <Title className="mb-0" level={4}>
          Material Revision Chart
        </Title>
      </Col>
      <Col span={24}>
        <Card bordered={false} className={`uni-card b-black`}>
          <OrganizationGraph
            style={{ backgroundColor: 'transparent' }}
            data={graphData}
            autoFit={true}
            nodeCfg={{
              style: {
                fill: 'transparent',
                radius: [30, 30, 30, 30],
                lineWidth: 6,
              },

              size: [60, 60],
              nodeStateStyles: {
                hover: {
                  lineWidth: 6,
                },
              },
            }}
            edgeCfg={{
              style: {
                lineWidth: 2,
              },
              endArrow: { fill: 'orange' },
            }}
            layout={{
              getHeight: () => {
                return 60;
              },
            }}
          />
        </Card>
      </Col>
      <Col span={24}>
        <ListCard
          title="Material Revision"
          className="clickRow"
          listClass="nospace-card"
          onChange={onTableChange}
          ListCol={ListCol}
          ListData={revisionList?.rows}
          scrolling={500}
          pagination={{
            total: revisionList?.count,
            current: page,
            pageSize: 5,
          }}
        />
      </Col>
    </Row>
  );
};
