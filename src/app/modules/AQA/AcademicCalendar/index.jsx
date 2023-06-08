import React, {useEffect, useState} from 'react';
import { Row, Col } from 'antd';
import RequestCard from '../../../atoms/RequestCard';
import Search from './components/Search';
import ListCard from '../../../molecules/ListCard';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTermList, getCalendarCoursesList } from './ducks/actions';
import AcademicCalendar from '../../../molecules/AcademicCalendar';
import HeadingChip from '../../../molecules/HeadingChip';

const data = [
    {
        form_name: "Change BOE Date",
        name: "RF00001",
        status: "Pending Request",
        student: 'Rose Chavez',
        department: 'Faculty Department'
    },
    {
        form_name: "Change BOE Date",
        name: "RF00002",
        status: "Pending Request",
        student: 'Rose Chavez',
        department: 'Faculty Department'
    },
    {
        form_name: "Change BOE Date",
        name: "RF00003",
        status: "Pending Request",
        student: 'Rose Chavez',
        department: 'Faculty Department'
    }
]

export default () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const termListData = useSelector(state => state.calendar.termList);
    const calendarListData = useSelector(state => state.calendar.calendarCourseList);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const addNew = () => history.push('/aqa/academic-calendar/addterms');
    const btnList = [
        {
            text: '+ New Term',
            action: () => addNew()
        }
    ]
    
    const onSearch = (value) => {
        console.log('check values', value);
    }

    useEffect(() => {
        dispatch(getTermList(1, 10,'', ''));
    }, [])

    useEffect(() => {
        dispatch(getCalendarCoursesList());
    }, [])

    const onClickRow = (record) => {
        return {
          onClick: () => {
            history.push(`/aqa/academic-calendar/terms-detail/${record.name}`)
          },
        };
    }

    const ListCol = [
        {
            title: 'Term Name',
            dataIndex: 'term_name',
            key: 'term_name',
            sorter: (a, b) => a.term_name.length - b.term_name.length,
            width: 290,
            //render: (text, record) => <Button type="link" className="list-links" onClick={() => history.push(`/aqa/academic-calendar/terms-detail/${text}`)}>{text}</Button>
        },
        {
            title: 'Term Start',
            dataIndex: 'term_start',
            key: 'term_start',
            sorter: (a, b) => a.term_start.length - b.term_start.length,
            render: (text, record) => moment(text).format('LL')
        },
        {
            title: 'Term End',
            dataIndex: 'term_end',
            key: 'term_end',
            sorter: (a, b) => a.term_end - b.term_end,
            render: (text, record) => moment(text).format('LL')
        },
        {
            title: 'Course Group Offered',
            dataIndex: 'course_group_type',
            key: 'course_group_type',
            sorter: (a, b) => a.course_group_type - b.course_group_type,
        }
    ]
    
    const modules = [
        {
            term_name: 'F3 April 2020',
            term_start: new Date('Sep 1, 2021'),
            term_end: new Date('Dec 31, 2021'),
            course_group_type: "Foundation",
        }
    ]

    const onTableChange = (pagination, filters, sorter) => {
        setPage(pagination.current);
        setLimit(pagination.pageSize);
        if (sorter.order) {
          dispatch(getTermList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
        } else {
          dispatch(getTermList(pagination.current, pagination.pageSize, '', ''));
        }
      }

    return (
        <>
            <Row gutter={[20, 20]}>
                {/* <Col span={24}>
                    <div className='flexibleRow'>
                        {data && (
                            <>
                                {data.map((resp) => (
                                    <div className='requestPanel'>
                                        <RequestCard data={resp} link={`/aqa/academic-calendar/request-detail/${resp?.name}`} />
                                    </div>
                                ))}
                            </>
                        )}
                    </div>
                </Col> */}

                <Col span={24}>
                    <HeadingChip title="Academic Calendar" btnList={btnList}  />
                </Col>

                <Col span={24}>
                    <AcademicCalendar data={calendarListData} />
                </Col>

                <Col span={24} className="clickRow">
                    <ListCard 
                    title='Past Term' 
                    onRow={onClickRow} 
                    Search={Search} 
                    onSearch={onSearch} 
                    ListCol={ListCol} 
                    ListData={termListData?.rows} 
                    onChange={onTableChange}
                    pagination={{
                        total: termListData?.count,
                        current: page,
                        pageSize: limit
                    }}
                    /> 
                </Col>
            </Row>
        </>
    )   
}