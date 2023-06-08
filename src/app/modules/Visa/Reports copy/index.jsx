import React, {useState, useEffect} from 'react';
import {Row, Col, Typography, Table, Card, Button } from 'antd';
import HeadingChip from '../../../molecules/HeadingChip';
import { useHistory } from 'react-router';
import { useTranslate } from 'Translate';
import { useDispatch, useSelector } from 'react-redux';
import Line from './components/LineChart';
import Pie from './components/PieChart';

const { Title } = Typography;

const dataSource = [
    {
        code: '00000',
        name: 'Student Name',
        Faculty: 'AAAAA',
        Programme: 'BBBBB',
        Graduation: '1st January 1999'
    },
    {
        code: '00000',
        name: 'Student Name',
        Faculty: 'AAAAA',
        Programme: 'BBBBB',
        Graduation: '1st January 1999'
    },
];
  
const columns = [
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
      title: 'Faculty',
      dataIndex: 'Faculty',
      key: 'Faculty',
    },
    {
      title: 'Programme',
      dataIndex: 'Programme',
      key: 'Programme',
    },
    {
        title: 'Graduation',
        dataIndex: 'Graduation',
        key: 'Graduation',
    },
];




export default (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const i18n = useTranslate();
    const { t } = i18n;
    const addNew = () => history.push('/registry/reports/addnew');
    const btnList = [
        {
            text: '+ New Report Template',
            action: () => addNew()
        }
    ]

    const onFilter = (e) => {
        setFilterVal(e.target.value)
    }


    return (
        <Row gutter={[20, 30]}>
            <Col span={24}>
                <HeadingChip title='Reports' btnList={btnList} />
            </Col>
            <Col span={24}>
                <Card>
                    <Row gutter={[20, 30]}>
                        <Col flex="auto">
                            <Title level={4} className="mb-0 mt-0">Graduating Students</Title>
                        </Col>
                        <Col>
                            <Button className="gray-btn c-white">Edit Report</Button>
                        </Col>
                        <Col>
                            <Button className="green-btn c-white">Download PDF</Button>
                        </Col>
                        <Col span={24}>
                            <Card className="black">
                                <Table dataSource={dataSource} columns={columns} />
                            </Card>
                        </Col>
                    </Row>
                </Card>
            </Col>

            <Col span={24}>
                <Line />
            </Col>

            <Col span={24}>
                <Pie />
            </Col>
        </Row>
    )
    
}