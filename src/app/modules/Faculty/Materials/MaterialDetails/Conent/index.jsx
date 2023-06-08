import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { ArrowDownOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import PDFViewer from '../../../../../molecules/PDFViewer';
import dummy from '../../../../../../assets/img/dummy.pdf';
import { Popup } from '../../../../../atoms/Popup';
import { getMaterialName } from '../../ducks/actions';
import { getMaterilContent } from '../../ducks/services';
export default () => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const { id } = useParams();
  const [visible, setVisible] = useState(false);
  const [materialContent, setMaterialContent] = useState('');

  const popup = {
    closable: true,
    visibility: visible,
    class: 'white-modal',
    content: <PDFViewer pdf={materialContent} />,
    width: 950,
    onCancel: () => setVisible(false),
  };

  useEffect(() => {
    if (id) {
      getMaterilContent(id).then((response) => {
        if (response?.data?.message) {
          setMaterialContent(`${process.env.DOC_URL}${response?.data?.message?.material_document}`);
          dispatch(getMaterialName(response?.data?.message?.material_name));
        }
      });
    }
  }, [id]);
  return (
    <>
      <Row gutter={[24, 30]}>
        <Col span={24}>
          <Row gutter={24} align="middle" justify="space-between">
            <Col>
              <Title className="mb-0" level={4}>
                Material Content
              </Title>
            </Col>
            <Col>
              <Row gutter={24} align="middle">
                <Col>
                  <Button
                    size="large"
                    type="primary"
                    htmlType="button"
                    className="black-btn w-100"
                    onClick={() => setVisible(true)}
                  >
                    Full Preview
                  </Button>
                </Col>
                <Col>
                  <Button size="middle" type="primary" icon={<ArrowDownOutlined />} className="green-btn"></Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Card hoverable={true} className="uni-card b-black nospace-card">
            <PDFViewer pdf={materialContent} />
          </Card>
        </Col>
      </Row>
      <Popup {...popup} />
    </>
  );
};
