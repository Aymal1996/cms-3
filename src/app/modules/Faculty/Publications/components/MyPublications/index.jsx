import React, {useState, useEffect } from 'react';
import HeadingChip from '../../../../../molecules/HeadingChip';
import ListCard from '../../../../../molecules/ListCard';
import { Row, Col, Button } from 'antd';
import { DownloadIcon } from '../../../../../atoms/CustomIcons';
import Search from'../Search';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import {getPublicationsListByStatus,getMyPublicationGraph} from '../../ducks/actions';
import GraphComponent from '../../../../../molecules/GraphComponent';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../../configs/constantData';

const filters = [
  {
    label: 'My Publications',
    value: 'My Publications',
  },
  {
    label: 'All Publications',
    value: 'All Publications',
  },
  {
    label: 'Draft',
    value: 'Draft',
  }
];

export default (props) => {
	
  const btnList = [
    {
      text: '+ New Publication',
      classes: 'green-btn',
      action: () => history.push('/faculty/publications/addpublications')
    },
  ];

  const history = useHistory();
  const dispatch = useDispatch();
  const PublicationsList = useSelector((state) => state.publications.publicationlist_by_status);
  const myPublicationsGraph = useSelector((state) => state.publications.publicationmygraph);
  const [filterVal, setFilterVal] = useState('My Publications');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });



  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`/faculty/publications/${record.name}`)
      },
    };
  }

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

  
  useEffect(() => {
    dispatch(getPublicationsListByStatus(page, limit, '', '','',filterVal));
    dispatch(getMyPublicationGraph());
 }, []);


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
    dispatch(getPublicationsListByStatus(page, limit,'', '', JSON.stringify(searchVal),filterVal));
  }
};
    const onFilter = (e) => {
      setFilterVal(e.target.value);
      dispatch(getPublicationsListByStatus(1, 10,'','','', e.target.value));
    };
  const defaultval = "My Publicaitons";
  const onTableChange = (pagination, filters, sorter, defaultval) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getPublicationsListByStatus(pagination.current, pagination.pageSize,sorter.order, sorter.columnKey,'',filterVal));
    } else {
      dispatch(getPublicationsListByStatus(pagination.current, pagination.pageSize, '', '','',filterVal));
    }
  };
  

    return (
        <>
        <HeadingChip btnList={btnList} classes={`${isHDScreen ? 'optionsTabs' : 'mb-1-5'}`} />
      <Row gutter={[20, 30]}>

       <Col span={24}>
			  <GraphComponent 
			  data={myPublicationsGraph?.data}
        title={'Total Publications'}
        barColor={'#02A574'}
        countClass='c-success'
        count={myPublicationsGraph?.records?.total_count}
        text={'Publications In Total'}
			  />
			  </Col>

        <Col span={24}>
        <HeadingChip title="Publication List"/>
        </Col>
      
          <Col span={24} className='clickRow'>
          <ListCard
								onRow={onClickRow}
								Search={Search}
                filters={filters}
                filterValue={filterVal}
								onSearch={onSearch} 
                onFilter={onFilter}
								ListCol={ListCol}
								ListData={PublicationsList?.rows}
								class='mb-0'
								 pagination={{
								  total: PublicationsList?.count,
								  current: page,
								  pageSize: limit,
								}}
								onChange={onTableChange} 
							  />
          </Col>
        </Row>
        </>
    )
}