import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Breadcrumb } from 'antd';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import moment from 'moment';
import ListCard from 'Molecules/ListCard';
import SearchAssess from '../components/SearchAssess';
import AssessmentDetails from '../components/AssessmentDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getModuleAssessmentPHD } from '../ducks/actions';
import { getCountryDrop } from '../../../Eligibility/Applications/ducks/actions';

const { Title } = Typography;

const colName = [
    {
      title: 'Name',
      dataIndex: 'student_name',
      key: 'student_name',
      sorter: true,
    },
    {
      title: 'Nationality',
      dataIndex: 'country',
      key: 'country',
      sorter: true,
    },
    {
      title: 'Faculty',
      dataIndex: 'faculty_code',
      key: 'faculty_code',
      sorter: true,
    },
    {
      title: 'Semester',
      dataIndex: 'semester_name',
      key: 'semester_name',
      sorter: true,
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
      sorter: true,
    },
    {
      title: 'Stage Assessment Date',
      dataIndex: 'assigned_date',
      key: 'assigned_date',
      sorter: true,
      render: text => <span className={'c-success'}>{text ? moment(text).format('Do MMMM YYYY') : ''}</span>
    },
];

export default (props) => {

    const history = useHistory();
    const {id} = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const [page, setPage]= useState(1);
    const [sID, setID] = useState(null);
    const [nationDrop, setNationDrop]= useState([]);
    const [search, setSearch]= useState(null);
    const [limit, setLimit]= useState(6);
    const data = useSelector(state => state.classroom.studentListPHD)
    const country = useSelector(state => state.applicationForm.countryData);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        updateAssessment();
        
        dispatch(getCountryDrop());
    }, []);
    
    const updateAssessment = () => {
        dispatch(getModuleAssessmentPHD(id, page, limit, "", "", search));
    }

    useEffect(() => {
        if (country && country.length > 0) {
          let temp = [];
          country.map((x, i) => {
            if (i == 0) {
              temp.push({ label: 'All Nationalities', value: '' });
              temp.push({ label: x.name, value: x.name });
            } else {
              temp.push({ label: x.name, value: x.name });
            }
          });
          setNationDrop(temp);
        }
      }, [country]);

    const onSearch = (val) => {
        if (val) {
          let searchVal = {
            student_name: val?.student_name,
            country: val?.nationality ? val.nationality.value : '',
          };
          setSearch(searchVal)
          dispatch(getModuleAssessmentPHD(id, page, limit, '', '', searchVal));
        }
    };

    const onClickRow = (record) => {
        return {
            onClick: () => {
                setID(record.assessment_name);
                setVisible(true)
            }
        };
    };
    
      const onTableChange = (pagination, filters, sorter) => {
        setPage(pagination.current);
        setLimit(pagination.pageSize);
        if (sorter.order) {
            dispatch(getModuleAssessmentPHD(id, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, search));
        } else {
            dispatch(getModuleAssessmentPHD(id, pagination.current, pagination.pageSize, '', '', search));
        }
      }

    return (
        <>
            <Breadcrumb separator=">" className="mb-1">
                <Breadcrumb.Item href="/faculty/classroom">Faculty</Breadcrumb.Item>
                <Breadcrumb.Item>Module Details</Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={[20,30]}>
                <Col span={24}>
                    <Title level={3} className='mb-0'>{location?.state?.module}</Title>
                </Col>
                <Col span={24}>
                {!visible ? 
                    <ListCard 
                    title='Module Students'
                    field1={nationDrop}
                    classes='clickRow'
                    onRow={onClickRow}
                    Search={SearchAssess}
                    onSearch={onSearch}
                    ListData={data?.rows}
                    ListCol={colName}
                    onChange={onTableChange}
                    pagination={{
                        total: data?.count,
                        current: page,
                        pageSize: limit
                    }}
                    />
                    :
                    <Card bordered={false} className='uni-card'>
                        <AssessmentDetails updateApi={updateAssessment} id={sID} type={1} setVisible={setVisible} />
                    </Card>
                }
                </Col>
            </Row>
        </>
    )
}