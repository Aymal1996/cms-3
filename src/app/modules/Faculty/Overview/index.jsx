import React, { useEffect } from 'react';
import { Row, Col } from "antd";
import Dashboard from './Component/Dashboard';
import PendingRequests from './Component/PendingRequests';
//import StaffPerformance from './Component/StaffPerformance';
import OtherIssue from './Component/OtherIssue';
import { useDispatch, useSelector } from 'react-redux';
import { getOtherIssues} from './ducks/actions'
import { getPendingIssues, getUnassignedStaff } from '../Lecturers/ducks/actions';
import { getStudentsStatistics } from '../Students/ducks/actions';

export default (props) => {
    const dispatch = useDispatch();
    const other_issues = useSelector((state) => state.facultyOverview.other_issues);
    const pending_list = useSelector((state) => state.facultyStudent.pendingIssue);
    const pendingIssues = useSelector((state) => state.lecturers.pending_issues);
    const unassignedStaff = useSelector((state) => state.lecturers.unassigned_staff);

    useEffect(() => {
        dispatch(getPendingIssues());
        dispatch(getUnassignedStaff());
        dispatch(getStudentsStatistics())

        dispatch(getOtherIssues());
        // dispatch(getPendingList());
    }, []);
    return (
        <Row gutter={[20, 50]}>
            <Col span={24}>
                <Dashboard />
            </Col>
            {/* <Col span={24}>
                <StaffPerformance />
            </Col> */}
            <Col span={24}>
                <PendingRequests 
                staff_pending={pendingIssues} 
                staff_un={unassignedStaff} 
                pending_list={pending_list} 
                />
            </Col>
            <Col span={24}>
                <OtherIssue other_issues={other_issues} />
            </Col>
        </Row>
    )
}