import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Card, Typography, Badge, Space, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getModuleMaterial } from '../../../../ducks/actions';
import { addMaterialMod } from '../../../../ducks/services';
import MaterialAddedForm from './MaterialAddedForm';

const { Title } = Typography;
const sortAlphaNum = (a, b) => a['week'].localeCompare(b.week, 'en', { numeric: true })

export default (props) => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const [added, setAdded] = useState([]);
    const mat = useSelector(state => state.facultyModules.moduleMaterial);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        dispatch(getModuleMaterial(id))
    }, []);

    useEffect(() => {
        if(Object.entries(mat).length > 0) {
            let temp = [];
            console.log('start', mat.materials);
            mat.materials.map(x => {
                temp.push(x)
            })
            temp.sort(sortAlphaNum);
            setData(temp);
        }
    }, [mat]);


    const onFinish = () => {
        let matTemp = []
        let deleted = []
        // data.map(x => {
        //     let a = mat.materials.find(y => y.name == x.name)
        //     if (a.material_id != x.material_id) {
        //         if (a.material_id == '') {
        //             matTemp.push({
        //                 name: x.name, 
        //                 material_id: x.material_id,
        //             })
        //         } else {
        //             deleted.push({ name: x.name, material_id: a.material_id })
        //             matTemp.push({
        //                 name: x.name, 
        //                 material_id: x.material_id,
        //             })    
        //         }
        //     } else {
        //         matTemp.push({
        //             name: x.name, 
        //             material_id: x.material_id ? x.material_id : "",
        //         })
        //     }
        // })
        
        data.map(x => {
            matTemp.push({
                name: x.name, 
                material_id: x.material_id ? x.material_id : "",
            })
        })

        const body = {
            module_id: id,
            material: matTemp
        }

        console.log('body', body)

        addMaterialMod(body).then(res => {
            message.success('Material Updated Successfully')
            dispatch(getModuleMaterial(id))
        }).catch(e => {
            const {response} = e;
            message.error(response.statusText)
            console.log('error', response.statusText);
        })
    }

    return (
        <Card bordered={false} className='uni-card cardinTab'>
            <Row gutter={[20,30]}>
                <Col span={24}>
                    <Title level={4} className='c-default mb-0'>Module Materials</Title>
                </Col>
                <Col span={24}>
                    <Space size={20}>
                        <Badge className='bgDot' status='processing' text="Lecture" />
                        <Badge className='bgDot' status="warning" text="Assignment" />
                        <Badge className='bgDot' status="success" text="Quiz" />
                        <Badge className='bgDot' status="error" text="Exam" />
                    </Space>
                </Col>
                <Col span={24}>
                    <Space direction='vertical' size={20} className='w-100'>
                        {data.map((tag, index) => (
                            <Fragment key={index}>
                                <MaterialAddedForm tag={tag} data={data} setData={setData} added={added} setAdded={setAdded} index={index} />
                            </Fragment>
                        ))}
                    </Space>
                </Col>
                <Col span={24}>
                    <Row gutter={20} justify='end'>
                        <Col><Button type='primary' size='large' className='green-btn' onClick={onFinish}>Save Changes</Button></Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
}
