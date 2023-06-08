import React, { useEffect } from 'react';
import { Row, Col, Card, Button, Space } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import SideDetails from 'Molecules/SideDetails';
import SideDetailResponsive from 'Molecules/SideDetailResponsive';
import UpdateSection from 'Molecules/UpdateSection';
import { useSelector, useDispatch } from 'react-redux';
import { emptyTeams, getMembers, getTeamsDetail } from '../ducks/action';
import { useParams, useHistory } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import ListComponent from 'Molecules/ListComponent';
import { LeftOutlined } from '@ant-design/icons';
import { getComments, emptyComments } from '../../../Application/ducks/actions';
import moment from 'moment';

const colName = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: true,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
  },
  {
    title: 'Job Title',
    dataIndex: 'job_title',
    key: 'job_title',
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
  },
];

export default (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const { id } = useParams();
  const members = useSelector((state) => state.employment.memberList);
  const commentsApi = useSelector((state) => state.global.comments);
  const teams = useSelector((state) => state.employment.teamDetails);

  useEffect(() => {
    dispatch(getMembers(id, 1, 5, '', ''));
    dispatch(getTeamsDetail(id));
    updateComment();
    return () => {
      dispatch(emptyComments());
      dispatch(emptyTeams());
    };
  }, []);

  const sideData = [
    {
      type: 'tag',
      title: 'Team',
      noDivider: true,
      highlight: true,
    },
    {
      type: 'mainTitle',
      title: teams?.team_name,
      highlight: true,
    },
    {
      type: 'titleValue',
      title: 'Company',
      value: teams?.company,
    },
    {
      type: 'titleValue',
      title: 'Created',
      value: teams?.creation ? moment(teams.creation).format('Do MMMM YYYY') : '',
      noDivider: true,
      highlight: true,
    },
    {
      type: 'users',
      title: '',
      count: 5,
      size: 80,
      value: teams?.members || [],
      noDivider: true,
    },
  ];

  const updateList = (page, limit, sort, sortby) => {
    dispatch(getMembers(id, page, limit, sort, sortby));
  };

  const updateComment = () => {
    dispatch(getComments('HRMS Team', id));
  };

  const listProps = {
    title: 'Member List',
    scrolling: 500,
  };

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <Space direction="vertical" size={18}>
          <Button type="link" className="c-gray-linkbtn p-0" onClick={() => history.goBack()} htmlType="button">
            <LeftOutlined /> Back
          </Button>
          <HeadingChip title="Team Details" />
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
                  <ListComponent
                    listProps={listProps}
                    link="/hrms/requests/"
                    linkKey="id"
                    data={members}
                    ListCol={colName}
                    defaultLimit={5}
                    updateList={updateList}
                  />
                </Col>
                <Col span={24}>
                  <UpdateSection data={commentsApi} module={'HRMS Teams'} updateComment={updateComment} />
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      </Col>
    </Row>
  );
};
