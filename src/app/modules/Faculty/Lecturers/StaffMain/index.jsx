import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Space, Card } from 'antd';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { LeftOutlined } from '@ant-design/icons';
import { BreakingPoint } from '../../../../../configs/constantData';
import SideDetails from '../../../../molecules/SideDetails';
import HeadingChip from '../../../../molecules/HeadingChip';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { getComments } from '../../../Application/ducks/actions';
import UpdateSection from '../../../../molecules/UpdateSection';
import EmployeeServices from '../components/EmployeeServices';
import RequestComponent from '../../../components/RequestComponent';
import { getStaffDetail } from '../ducks/services';
import { getStudentIntakes } from '../ducks/actions';

export default (props) => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const commentsApi = useSelector((state) => state.global.comments);
  const summary = useSelector((state) => state.facultyModules.moduleSummary);
  const [staffDetailData, setStaffDetailData] = useState();

  const sideData = [
    {
      type: 'image',
      url: process.env.REACT_APP_BASE_URL + staffDetailData?.image,
      size: 120,
      highlight: true,
    },
    {
      type: 'tag',
      title: 'staff',
      highlight: true,
      noDivider: true,
    },
    {
      type: 'mainTitle',
      title: staffDetailData?.employee_name,
      subtitle: staffDetailData?.employee_id,
      level: isHDScreen ? 4 : 5,
      highlight: true,
    },
    {
      type: 'single',
      title: staffDetailData?.nationality,
      highlight: true,
      noLine: true,
    },
    {
      type: 'simpletext',
      title: 'Job Title',
      noDivider: true,
    },
    {
      type: 'jobRole',
      role: staffDetailData?.job_title,
      title: staffDetailData?.role_name,
      space: 5,
    },

    {
      type: 'titleValue',
      title: 'Faculty',
      level: isHDScreen ? 4 : 5,
      value: staffDetailData?.select_faculty,
    },
    {
      type: 'titleValue',
      title: 'Programme',
      level: isHDScreen ? 4 : 5,
      value: staffDetailData?.program_list,
    },
  ];
  const updateComment = () => {
    dispatch(getComments('Employee', `${id}`));
  };

  useEffect(() => {
    getStaffDetail(id).then((response) => setStaffDetailData(response?.data?.message[0]));
    dispatch(getStudentIntakes());
    
    updateComment();
  }, []);

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <Space direction="vertical" size={18}>
          <Button type="link" className="c-gray-linkbtn p-0" onClick={() => history.goBack()} htmlType="button">
            <LeftOutlined /> Back
          </Button>
          <HeadingChip title="Staff Details" />
        </Space>
      </Col>
      <Col span={24}>
        <div className="twocol-3070">
          <div className="side-detail">
            {isHDScreen ? <SideDetails data={sideData} /> : <SideDetailResponsive data={sideData} />}
          </div>
          <div className="side-form">
            <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
              <Row gutter={[20, 20]}>
                <Col span={24}>
                
                  <RequestComponent id={id} type={'staff'} />
                </Col>
                <Col span={24}>
                  <EmployeeServices id={id} />
                </Col>
                <Col span={24}>
                  <UpdateSection
                    data={commentsApi}
                    code={summary.name}
                    module={'Employee'}
                    updateComment={updateComment}
                  />
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      </Col>
    </Row>
  );
};
