import React, {useState, useEffect} from 'react';
import { Row, Col, Typography, Card, message, Button, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import ListCard from '../../../../../../../molecules/ListCard';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import StaffFilter from '../../../StaffFilter';
import { getModuleLecturer } from '../../../../ducks/actions';
import { addLecturer, delLecturer } from '../../../../ducks/services';
import { CloseCircleFilled } from '@ant-design/icons';

const { Title } = Typography;

export default (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const {id} = useParams();
    const [page, setPage]= useState(1);
    const [limit, setLimit] = useState(6);
    const data = useSelector(state => state.facultyModules.moduleLecturer);

    useEffect(() => {
        dispatch(getModuleLecturer(id, page, limit, '', '', null, location.state.key1))
    }, []);

    const colName = [
        {
          title: 'Staff Name',
          dataIndex: 'lecturer_name',
          key: 'lecturer_name',
          sorter: true,
          render: (text, record) => <Button type="link" className="list-links" onClick={() => history.push(`/faculty/staff/${record['staff_id']}`)}>{text}</Button> 
        },
        {
          title: 'Faculty',
          dataIndex: 'faculty',
          key: 'faculty',
          sorter: true,
        },
        {
          title: 'Action',
          dataIndex: 'action',
          key: 'action',
          sorter: false,
          render: (text, record) => <Button type="link" className="list-links" onClick={() => onDelete(record.name)}><CloseCircleFilled /></Button>
        },
    ];

    const onTableChange = (pagination, filters, sorter) => {
        setPage(pagination.current);
        if (sorter.order) {
            dispatch(getModuleLecturer(id, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, null, location.state.key1))
        } else {
            dispatch(getModuleLecturer(id, pagination.current, pagination.pageSize, '', '', null, location.state.key1))
        }
    }

    const onDelete = (mid) => {
        delLecturer(mid).then(res => {
            message.success('Lecturer Deleted Successfully')
            dispatch(getModuleLecturer(id, page, limit, '', '', location.state.key1))
        }).catch(e => {
            const {response} = e;
            message.error(response.statusText)
            console.log('error', response.statusText);
        })
    }

    const onSubmit = (val) => {
        let str = val.search.split(',')
        if (val) {
            const body = {
                module_id: id,
                lecturer_id: str[0],
                faculty: str[2]
            }
            addLecturer(body).then(res => {
                message.success('Lecturer Added Successfully')
                dispatch(getModuleLecturer(id, page, limit, '', '', location.state.key1))
            }).catch(e => {
                const {response} = e;
                message.error(response.statusText)
                console.log('error', response);
            })
        }
    }

    return (
        <Card bordered={false} className="uni-card nospace-card cardinTab">
        <Row gutter={[20,20]}>
            <Col span={24}>
                <Title level={4} className='c-default mb-0'>Module Lecturers</Title>
            </Col>
            <Col span={24}>
                <Form onFinish={onSubmit} layout='vertical'>
                    <Row gutter={20} align='bottom'>
                        <Col flex='auto'>
                            <StaffFilter 
                            title='Lecturer Name' 
                            api={'method'} 
                            endpoint='faculty.modules_api.get_lecturers?str=' 
                            key1='name'
                            key2='employee_name'
                            key3='select_faculty'
                            />
                        </Col>
                        <Col><Button size='large' htmlType='submit' type='primary' className='green-btn'>Add</Button></Col>
                    </Row>
                </Form>
            </Col>
            <Col span={24}>
                <ListCard 
                scrolling={500}
                listClass="nospace-card"
                ListData={data?.rows}
                ListCol={colName}
                onChange={onTableChange}
                pagination={{
                    total: data?.count,
                    current: page,
                    pageSize: 5
                }}
                />
            </Col>
        </Row>
        </Card>
    )
}