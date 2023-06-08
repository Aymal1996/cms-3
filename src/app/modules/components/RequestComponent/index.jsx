import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Tabs, Typography, message } from 'antd';
import Request from '../../Registry/Students/components/Request';
import Complaint from '../../Registry/Students/components/Complaint';
import { complaintData, emptyStudentRequest, registryData } from '../../Registry/Students/ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { emptyOtherRequest, getGrantRequest, getScholarshipRequest } from '../../Finance/ducks/actions';
import { getRequestDetails } from '../../HRMS/Requests/ducks/actions';
import  {Request as Request2} from '../../HRMS/Requests/components/Request';


const { TabPane } = Tabs;
const { Title } = Typography;

export default (props) => {

    const dispatch = useDispatch();  
    const { type, id } = props;
    const location = useLocation();
    const dataRequest = useSelector((state) => state.students.requestData);
    const grantRequest = useSelector((state) => state.finance.grantRequests);
    const scholarRequest = useSelector((state) => state.finance.scholarRequests);
    const dataComplaint = useSelector((state) => state.students.complaintData);
    const dataRequest1 = useSelector((state) => state.hrmsrequests.requestData);
    const [activeTab, setActiveTab] = useState('Requests');
    const [requests, setRequests] = useState({});
    const [complaint, setComplaint] = useState({});
    const department = location.pathname.split('/')[1];
    const uid = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;


    useEffect(() => {
      if (type == 'student') {
          dispatch(registryData(id));
          dispatch(complaintData(id));
        } else if (type=='grant') {
          dispatch(getGrantRequest(id))
        } else if(type=='scholarship') {
          dispatch(getScholarshipRequest(id));
        } else if (type=='staff') {
          dispatch(getRequestDetails(id, uid));
        }
        return () => {
          dispatch(emptyStudentRequest());
          dispatch(emptyOtherRequest());
        };
    }, []);

    useEffect(() => {
      if(dataRequest.success == false) {
        message.error(dataRequest.message);
      } else {
        if (dataRequest.length > 0) {
          setRequests({
            pending: dataRequest.filter((value) => value.status == 'Pending'),
            yourrequests: dataRequest.filter((value) => value.status == 'Pending' && value.department == caseDepart(department)?.department),
            archive: dataRequest.filter((value) => value.status != 'Pending')
          })
        }
      }
    }, [dataRequest]);

    useEffect(() => {
      if (dataRequest1.length > 0) {
        setRequests({
          pending: dataRequest1.filter((value) => value.status == 'Pending' && value.requester_id != uid),
          yourrequests: dataRequest1.filter((value) => value.status == 'Pending' && value.requester_id == uid),
          archive: dataRequest1.filter((value) => value.status != 'Pending'),
        });
      } else {
        setRequests({});
      }
    }, [dataRequest1]);

    useEffect(() => {
      if(grantRequest.success == false) {
        message.error(grantRequest.message);
      } else {
        if(grantRequest.length > 0) {
          setRequests({
            pending: grantRequest.filter((value) => value.status == 'Pending'),
            archive: grantRequest.filter((value) => value.status != 'Pending')
          })
        }
      }
    }, [grantRequest]);

    useEffect(() => {
      if(scholarRequest.success == false) {
        message.error(scholarRequest.message);
      } else {
        if(scholarRequest.length > 0) {
          setRequests({
            pending: scholarRequest.filter((value) => value.status == 'Pending'),
            archive: scholarRequest.filter((value) => value.status != 'Pending')
          })
        }
      }
    }, [scholarRequest]);


    useEffect(() => {
      if (dataComplaint.length > 0) {
        setComplaint({
          pending: dataComplaint.filter((value) => value.status == 'Pending'),
          archive: dataComplaint.filter((value) => value.status == 'Closed')
        })
      }
    }, [dataComplaint]);

    const updateReqApi = () => {
      dispatch(registryData(id));
    }

    const updateReqApi1 = () => {
      dispatch(complaintData(id));
    }
    
    const caseDepart = (dept) => {
        switch(dept) {
          case 'aqa' :
            return { department: 'AQA', link:'/aqa' };
    
          case 'registry' :
            return { department: 'Registry', link:'/registry' };
    
          case 'faculty' :
            return { department: 'Faculty', link:'/faculty' };
          
          case 'finance' :
            return { department: 'Finance', link:'/finance' };
          
          case 'marketing' :
            return { department: 'Marketing', link:'/marketing' };
          
          default:
            break;
        }
    }

    return (
      <Card bordered={false} className="uni-card">
        <Row gutter={[20, 20]}>
          <Col span={24}><Title level={4} className='mb-0 c-default'>{`Requests${type == 'student' ? ' & Complaints' : ''}`}</Title></Col>
          <Col span={24}>
            {type == 'student' ?
            <Tabs activeKey={activeTab} type="card" className="custom-tabs" onChange={(e) => setActiveTab(e)}>
              <TabPane tab="Requests" key="Requests">
                {type == 'staff' ?
                <Request
                id={uid}
                updateReqApi={updateReqApi}
                data={requests}
                selectedTab={location?.state?.rstatus || 'Pending'}
                selectedPanel={location?.state?.rid || ''}
              /> 
                :  
                <Request updateReqApi={updateReqApi} currentDept={caseDepart(department)} data={requests} selectedTab={location?.state?.rstatus || 'pending'} selectedPanel={location?.state?.rid || ''} />
                }
              </TabPane>
              <TabPane tab="Complaints" key="Complaints">
                <Complaint updateComApi={updateReqApi1} data={complaint} selectedTab={location?.state?.cstatus || 'pending'} selectedPanel={location?.state?.cid || ''} />
              </TabPane>
            </Tabs>
            :
            <Request updateReqApi={updateReqApi} currentDept={caseDepart(department)} data={requests} selectedTab={location?.state?.rstatus || 'pending'} selectedPanel={location?.state?.rid || ''} />
            }
          </Col>
        </Row>
      </Card>
    )
}