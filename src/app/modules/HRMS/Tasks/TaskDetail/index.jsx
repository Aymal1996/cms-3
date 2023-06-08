import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Typography, Card, Tabs, Form, Spin, message } from 'antd';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleTaskDetail, getAddProjectName, getTimesheet } from '../ducks/actions';
import StaffDetails from '../../../components/StaffDetails';
import Timesheet from './components/Timesheet';
import Projects from './components/Projects';
import axios from '../../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../../configs/constants';
import { useForm } from 'react-hook-form';
import { LeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { emptyStaffDetails, getAdvancementdetails } from '../../Advancement/dcuks/actions';

const { TabPane } = Tabs;
const { Title } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const [tags, setTags] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [options, setOptions] = useState([]);
  const [load, setLoad] = useState(false);
  const singleTaskDetail = useSelector((state) => state.tasks.singleTaskData);
  const projectName = useSelector((state) => state.tasks.myAddProjectData);
  const timesheetData = useSelector((state) => state.tasks.timesheetData);
  const { control, errors, handleSubmit, reset } = useForm();

  useEffect(() => {
    dispatch(getSingleTaskDetail(id));
    dispatch(getAdvancementdetails(id));
    if (location?.state?.tab) {
      if (location.state.tab == 'Missed') {
        dispatch(getTimesheet(id, 'Issues', 1, 10, '', ''));
      } else {
        dispatch(getTimesheet(id, location?.state?.tab, 1, 10, '', ''));
      }
    } else {
      dispatch(getTimesheet(id, 'Pending', 1, 10, '', ''));
    }
    dispatch(getAddProjectName());
    return () => {
      dispatch(emptyStaffDetails());
    };
  }, []);

  const updateApi = () => {
    dispatch(getSingleTaskDetail(id));
  };

  const updateTimesheet = (status, page, limit, sort, sortby) => {
    dispatch(getTimesheet(id, status, page, limit, sort, sortby));
  };

  useEffect(() => {
    if (projectName) {
      let temp = [];
      projectName.map((item) => temp.push({ label: item.project, value: item.project_code }));
      setOptions(temp);
    }
  }, [projectName]);

  useEffect(() => {
    if (singleTaskDetail.length > 0) {
      let projects = [];
      singleTaskDetail.map((item) => {
        projects.push({
          name: item.row_name,
          project_code: item.name,
          project: item.project,
        });
      });
      setTags(projects);
    }
  }, [singleTaskDetail]);

  const onFinish = async (val) => {
    setLoad(true);
    if (deleted.length > 0) {
      let url = `${apiMethod}/hrms.tasks_api.delete_projects`;
      try {
        await axios.post(url, { projects: deleted });
        if (val.form_projects.length == 0) {
          message.success('Projects Successfully Updated');
          updateApi();
          setLoad(false);
          reset();
        }
      } catch (e) {
        setLoad(false);
        const { response } = e;
        message.error(e);
      }
    }
    if (val.form_projects.length > 0) {
      let proj = [];
      val.form_projects.map((item) => {
        proj.push({
          employee_id: id,
          project_name: item.project.label,
        });
      });
      const json = {
        projects: proj,
      };
      let url = `${apiMethod}/hrms.tasks_api.add_projects`;
      try {
        const res = await axios.post(url, json);
        if (res.data.status.success == false) {
          message.error(res.data.status.message);
        } else {
          message.success(res.data.status.message);
          updateApi();
          reset();
        }
        setLoad(false);
      } catch (e) {
        setLoad(false);
        const { response } = e;
        message.error(e);
      }
    } else {
      setLoad(false);
    }
  };

  return (
    <StaffDetails id={id} section="HRMS Tasks" title={'Tasks'} specifies={true} myProfile={true}>
      <Card bordered={false} className="uni-card h-auto w-100">
        <Row gutter={[20, 30]}>
          <Col flex="auto">
            <Title level={4} className="mb-0">
              Tasks
            </Title>
          </Col>
          <Col>
            <Button
              icon={<LeftOutlined />}
              size="middle"
              className="c-graybtn small-btn"
              onClick={() => history.push(`/hrms/requests/${id}`)}
            >
              Categories
            </Button>
          </Col>
          <Col span={24}>
            <Tabs defaultActiveKey="1" type="card" className="custom-tabs">
              <TabPane tab="Timesheet" key="1">
                <Timesheet
                  id={id}
                  updateApi={updateTimesheet}
                  data={timesheetData}
                  tabSelected={location?.state?.tab == 'Missed' ? 'Issues' : location?.state?.tab}
                />
              </TabPane>
              <TabPane tab="Projects" key="2">
                <Form onFinish={handleSubmit(onFinish)} layout="vertical" scrollToFirstError={true}>
                  <Spin indicator={antIcon} size="large" spinning={load}>
                    <Projects
                      title="Projects in Hand"
                      btnTitle="+ Add other project"
                      data={options}
                      deleted={deleted}
                      setDeleted={setDeleted}
                      tags={tags}
                      setTags={setTags}
                      control={control}
                      errors={errors}
                    />
                  </Spin>
                </Form>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </StaffDetails>
  );
};
