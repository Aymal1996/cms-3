import React, { useState, useEffect, Fragment} from 'react';
import { Row, Col, Typography, Button, Card, Space, Tag, Switch, Popover, message } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getModuleMaterial } from '../../../ducks/actions';
import { changeMatStatus } from '../../../ducks/services';

const { Title, Text } = Typography;

const checkMaterial = (key) => {
    switch(key) {
        case 'Lecture': return 'Lecture Notes';
        case 'Assignment': return 'Assignment';
        case 'Quiz': return 'Quiz';
        case 'Exam': return 'Exam Paper';
    }
}

export default (props) => {

    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [matData, setMatData] = useState(null);
    const materialMod = useSelector(state => state.classroom.material)
    
    useEffect(() => {
        dispatch(getModuleMaterial(id, props.semester));
    }, []);

    useEffect(() => {
        if (materialMod && materialMod.length > 0) {
            let temp = {
                Lecture: [],
                Assignment: [],
                Quiz: [],
                Exam: []
            };
            materialMod.map(x => {
                if (temp[`${x.material_type}`]) {
                    temp[`${x.material_type}`].push(x);
                }
            })
            setMatData(temp);
        }
    }, [materialMod]);

    const onChange = (key, mod) => {
        changeMatStatus(id, mod, key == true ? 1 : 0).then(res => {
            message.success('Material Status Updated');
            dispatch(getModuleMaterial(id));
        })
    }

    return (
        <Row gutter={[20,50]}>
            {matData && Object.entries(matData).map(([KEY, VAL], index) => (
                <Fragment key={index}>
                {VAL.length > 0 ?
              <Col span={24}>
                  <Row gutter={[20,30]}>
                      <Col flex='auto'><Title level={4} className='mb-0 c-default'>{checkMaterial(KEY)}</Title></Col>
                      <Col><Button type='primary' onClick={() => history.push({ pathname: '/faculty/materials/add', state: { type: KEY}})} className='green-btn' size='large'>{`+ New ${checkMaterial(KEY)}`}</Button></Col>
                      <Col span={24}>
                          <Space size={20} direction='vertical' className='w-100'>
                          {VAL.map((x,i) => (
                              <Card bordered={false} className='uni-card-small b-dark-gray'>
                                    <Row gutter={[20,20]}>
                                        <Col flex='auto'>
                                            <Space size={20}>
                                                <Tag className='tag-code c-default px-1'>{x.week}</Tag>
                                                <Link to={`/faculty/materials/${x.module_material}`}><Title level={5} className='mb-0 c-default'>{x.material_name}</Title></Link>
                                                <Text className='c-gray'>{`${(x.material_document_extension)} . ${x.file_size}`}</Text>
                                            </Space>
                                        </Col>
                                        <Col>
                                            <Space size={15}>
                                                <Text>Publish <Popover content={'26 students undertaking the module will gain access to the material'} trigger="click"><InfoCircleOutlined className='smallFont12 c-gray' /></Popover></Text>
                                                <Switch checked={x.publishing == 1 ? true : false} onChange={(e) => onChange(e, x.name)} />
                                            </Space>
                                        </Col>
                                    </Row>
                              </Card>
                          ))}
                          </Space>
                      </Col>
                  </Row>
              </Col>  
              :
              null}
              </Fragment>
            ))}
        </Row>
    )
}