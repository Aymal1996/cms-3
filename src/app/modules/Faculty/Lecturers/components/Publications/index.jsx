import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Button } from 'antd';
import ListCard from '../../../../../molecules/ListCard';
import { DownloadIcon } from '../../../../../atoms/CustomIcons';
import PublicationDetail from './PublicationDetails';
import { getPublicationGraph } from '../../ducks/services';
import GraphComponent from '../../../../../molecules/GraphComponent';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPublicationList } from '../../ducks/actions';

const ListCol = [
  {
    title: 'Date',
    dataIndex: 'published_date',
    key: 'published_date',
    sorter: true,
  },
  {
    title: 'Type',
    dataIndex: 'publication_type',
    key: 'publication_type',
    sorter: true,
  },
  {
    title: 'Research Name',
    dataIndex: 'publication_name',
    key: 'publication_name',
    sorter: true,
    ellipsis: true,
  },
  {
    title: 'Published On',
    dataIndex: 'publisher',
    key: 'publisher',
    sorter: true,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    render: () => (
      <Button type="link" htmlType="button" className="p-0" icon={<DownloadIcon className="c-success" />} />
    ),
  },
];

export default () => {
  const { Title, Text } = Typography;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loadDetail, setLoadDetail] = useState(false);
  const [journalDetail, setJournalDetail] = useState({});
  const [publicationGraphData, setPublicationGraphData] = useState([]);
  const publishList = useSelector((state) => state.lecturers.publication_list);
  const graphProps = {
    title: '',
    barColor: '#02A574',
    countClass: 'c-success',
    count: publicationGraphData?.records && publicationGraphData?.records[0].total_count,
    text: 'Publications',
    // search: <SearchProgram onSearch={onSearch} field1={faculty} field2={program} />,
  };
  const onClickRow = (record) => {
    return {
      onClick: () => {
        setLoadDetail(true);
        setJournalDetail(record);
      },
    };
  };

  useEffect(() => {
    dispatch(getPublicationList(id, '', ''));
    getPublicationGraph(id).then((response) => setPublicationGraphData(response?.data?.message));
  }, [id]);

  const onTableChange = (pagination, filters, sorter) => {
    if (sorter.order) {
      dispatch(getPublicationList(id, sorter.order, sorter.columnKey));
    } else {
      dispatch(getPublicationList(id, '', ''));
    }
  };
  return (
    <>
      {!loadDetail ? (
        <Row gutter={[24, 30]}>
          <Col>
            <Row gutter={24}>
              <Col span={24}>
                <Title level={4} className="c-default">
                  Total Publication
                </Title>
              </Col>
              <Col span={24}>
                <GraphComponent data={publicationGraphData?.data} cardClass="b-black" {...graphProps} />
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <ListCard
              title="Publication List"
              className="clickRow"
              listClass="nospace-card"
              onChange={onTableChange}
              ListCol={ListCol}
              ListData={publishList}
              onRow={onClickRow}
              scrolling={500}
              pagination={false}
            />
          </Col>
        </Row>
      ) : (
        <PublicationDetail
          backbtnTitle="Publication List"
          mainTitle="No more rules: graphic design and postmodernism"
          data={journalDetail}
          setLoadDetail={setLoadDetail}
        />
      )}
    </>
  );
};
