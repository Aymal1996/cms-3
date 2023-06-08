import React, {useState, useEffect} from 'react';
import { Card, Tabs, Form, message } from 'antd';
import Timesheet from './tabList/Timesheet';
import Projects from './tabList/Projects';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { apiMethod } from '../../../../../../../configs/constants';
import axios from '../../../../../../../services/axiosInterceptor';

const { TabPane } = Tabs;
export default (props) => {
    const [tags, setTags] = useState([]);
    const [deleted, setDeleted] = useState([]);
    const {data} = props;
    const { id } = useParams();
    const { control, errors, handleSubmit, reset } = useForm();


    useEffect(() => {
        if (Object.keys(data).length > 0) {
          let projects = [];
          data?.projects.map((item) => {
            projects.push({
              name: item.name,
              project: item.project,
            });
          });
          setTags(projects);
        }
      }, [data]);

    const onFinish = async (val) => {
        let proj = [];
        tags.map((item) => {
            proj.push({
                employee_id: id,
                project_name: item.project,
            });
        });
        const json = {
            projects: proj
        };
        let url = `${apiMethod}/hrms.api.add_projects`;
        try {
          await axios.post(url, json);
          message.success('Project Successfully Updated');
        } catch (e) {
          const { response } = e;
          message.error(e);
        }
    };

    return (
    <Card bordered={false} className="uni-card h-auto w-100">
        <Tabs defaultActiveKey="1" type="card" className='custom-tabs -space30'>
            <TabPane tab="Timesheet" key="1">
                <Timesheet data={data} />
            </TabPane>
            <TabPane tab="Projects" key="2">
                <Form onFinish={handleSubmit(onFinish)} layout="vertical" scrollToFirstError={true}>
                    <Projects data={data} deleted={deleted} setDeleted={setDeleted} tags={tags} setTags={setTags} control={control}/>
                </Form>
            </TabPane>
        </Tabs>
    </Card>
    )
}