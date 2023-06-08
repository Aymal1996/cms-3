import React from 'react';
import PDFViewer from 'Molecules/PDFViewer';
import { Row, Col, Typography, Button, Space } from 'antd';

const { Text } = Typography;

export default ({ selectedDoc, onClose }) => {

    const {url, category, docname, btnText, text, onAction } = selectedDoc

    return (
        <Row gutter={[20,20]}>
            <Col span={24}>
            <div style={{height: '70vh', overflowX: 'hidden'}}>
                <PDFViewer pdf={url} />
            </div>
            </Col>
            <Col span={24}><Text>{text}</Text></Col>
            {btnText && <>
                <Col span={24}>
                    <Space size={10}>
                        <Button type='primary' htmlType='button' onClick={onAction} className='green-btn'>{btnText}</Button>
                        <Button type='primary' htmlType='button' onClick={onClose} className='black-btn'>Cancel</Button>
                    </Space>
                </Col>
            </>}
        </Row>
    )
}