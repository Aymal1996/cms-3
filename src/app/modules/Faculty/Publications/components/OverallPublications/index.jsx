import React, { useState, useEffect } from 'react';
import HeadingChip from '../../../../../molecules/HeadingChip';
import ListCard from '../../../../../molecules/ListCard';
import { Row, Col, Button, Pagination,Typography, message } from 'antd';
import { CheckCircleFilled,CloseCircleFilled,} from '@ant-design/icons';
import { DownloadIcon } from '../../../../../atoms/CustomIcons';
import Search from '../Search';
import { useHistory } from 'react-router';
import GraphComponent from '../../../../../molecules/GraphComponent';
import { useSelector, useDispatch } from 'react-redux';
import {getOverallPublicationsList, getPublicationGraph } from '../../ducks/actions';

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
    title: 'Publication Name',
    dataIndex: 'publication_name',
    key: 'publication_name',
    sorter: true,
  },
  {
    title: 'Author Name',
    dataIndex: 'author_name',
    key: 'author_name',
    sorter: true,
  },
  {
    title: 'Published On',
    dataIndex: 'publisher',
    key: 'publisher',
    sorter: true,
    align: 'center',
  },
  
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    sorted: (a, b) => a.Action - b.Action,
    align: 'center',
    render: (text, record) => {
      let clname = '';
        return <Button type="link" className="c-success" onClick={() => {}}>
        <DownloadIcon />
      </Button>;
     
    },

  },

];

export default (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const overallPublications = useSelector((state) => state.publications.allpublicationlist);
  const allPublicationsGraph = useSelector((state) => state.publications.publicationallgraph);

  useEffect(() => {
    dispatch(getPublicationGraph());
 }, []);

  const onClickRow = (record) => { 
    return {
      onClick: () => {
        history.push(`/faculty/publications/${record.name}`)
      },
    };
  }

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);


  const onSearch = (val) => {
    if (val) {
      let searchVal = {
      publication_name: val.publication_name,
      author_name: val.author_name,
      publication_name: val.publication_name,
      publication_type: val?.publication_type ? val.publication_type.value : '',
      publisher: val?.publisher ? val.publisher.value : '',
      };
      console.log('submit',searchVal);
      dispatch(getOverallPublicationsList(page, limit, '', '', JSON.stringify(searchVal)));
    }
  };


  useEffect(() => {
    dispatch(getOverallPublicationsList(1, 10));
  }, []);

    const onTableChange = (pagination, filters, sorter) => {
    console.log('heloo', pagination, sorter);
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getOverallPublicationsList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getOverallPublicationsList(pagination.current, pagination.pageSize, '', ''));
    }
  };
  
    return (
        <>
	   <Row gutter={[20, 30]}>
	       
        <Col span={24}>
			  <GraphComponent 
          data={allPublicationsGraph?.data}
          title={'Total Publications'}
          barColor={'#02A574'}
          countClass='c-success'
          count={allPublicationsGraph?.records?.total_count}
          text={'Publications In Total'}
			  />
			  </Col>
     
        <Col span={24}>
          <HeadingChip title="Publication List" />
        </Col>
        <Col span={24}>
             <ListCard
            classes="clickRow"
            // onRow={onClickRow}
            onChange={onTableChange}
            ListCol={ListCol}
            ListData={overallPublications?.rows}
            Search={Search}
            onSearch={Search && onSearch}
            pagination={{
              total: overallPublications?.count,
              current: page,
              pageSize: limit,
            }}
          />

        </Col>
      </Row>
        </>
    )
}