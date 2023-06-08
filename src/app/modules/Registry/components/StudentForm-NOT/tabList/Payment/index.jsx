import React from 'react';
import { Row, Col, Card, Typography, Space, Table, Button } from 'antd';
import moment from 'moment';

const { Title, Text } = Typography;

export default (props) => {

    const ListCol = [
        {
            title: 'Invoice No',
            dataIndex: 'invoice_no',
            key: 'invoice_no',
        },
        {
            title: 'Invoice Date',
            dataIndex: 'invoice_date',
            key: 'invoice_date',
        },
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
            elipsis: true
        },
        {
            title: 'Due Date',
            dataIndex: 'due_date',
            key: 'due_date',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: text => <span className='c-error'>{text}</span>
        },
    ]

    const ListCol1 = [
        {
            title: 'Invoice No',
            dataIndex: 'invoice_no',
            key: 'invoice_no',
        },
        {
            title: 'Invoice Date',
            dataIndex: 'invoice_date',
            key: 'invoice_date',
        },
        {
            title: 'Item',
            dataIndex: 'item',
            key: 'item',
            elipsis: true
        },
        
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: text => <span className='c-error'>{text}</span>
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            key: 'balance',
            render: text => <span className='c-success'>{text}</span>
        },
    ]

    const ListData = [
        {
            invoice_no: 'A002934',
            invoice_date: '10th April 2021',
            item: 'Registration Fee',
            due_date: '15th April 2021',
            amount: 'RM 1,000.00'
        },
        {
            invoice_no: 'A002935',
            invoice_date: '10th April 2021',
            item: 'Visa Processing Fee',
            due_date: '15th April 2021',
            amount: 'RM 920.00'
        },
    ]

    const ListData1 = [
        {
            invoice_no: 'A002933',
            invoice_date: '9th April 2021',
            item: 'Resource Fee',
            amount: '- RM 500.00',
            balance: 'RM 2,000.00'
        },
    ]

    return (
        <Row gutter={[20, 30]} align='bottom'>
            <Col span={24}>
                <Title level={4} className='mb-0 c-default'>Payment Details</Title>
            </Col>

            <Col span={12}>
                <Card bordered={false} className='small-card8 b-error mb-1'>
                    <Space size={10} className='w-100' direction='vertical'>
                        <Title level={5} className='mb-0'>Outstanding Balance</Title>
                        <Space size={0} direction='vertical'>
                            <Title level={3} className='mb-0'>RM 1,920.00</Title>
                            <Text className='op-6'>Due: 15th April 2021</Text>
                        </Space>
                    </Space>

                </Card>
            </Col>

            <Col span={12}>
                <Card bordered={false} className='small-card8 b-black mb-1'>
                    <Space size={10} className='w-100' direction='vertical'>
                        <Title level={5} className='mb-0'>Over Payment Balance</Title>
                        <Space size={0} direction='vertical'>
                            <Title level={3} className='mb-0'>RM 2,000.00</Title>
                            <Text className='op-6'>Last deposit: 10th April 2021</Text>
                        </Space>
                    </Space>

                </Card>
            </Col>

            <Col span={24}>
                <Space direction='vertical' size={20} className='w-100'>
                    <Title level={4} className='mb-0 c-default'>Outstanding Balance Breakdown</Title>
                    <Table className="custom-table table-header-highlight mb-1" bordered={false} columns={ListCol} dataSource={ListData} pagination={false} />
                </Space>
            </Col>

            <Col span={24}>
                <Space direction='vertical' size={20} className='w-100'>
                    <Title level={4} className='mb-0 c-default'>Transaction History</Title>
                    <Table className="custom-table table-header-highlight" bordered={false} columns={ListCol1} dataSource={ListData1} pagination={false} />
                </Space>
            </Col>

            <Col span={24} align='center'>
                <Button type='link' className='white-link'>View more</Button>
            </Col>
            
        </Row>
    )
}