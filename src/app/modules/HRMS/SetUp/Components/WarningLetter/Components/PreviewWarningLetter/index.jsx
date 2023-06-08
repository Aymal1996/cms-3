import React, { useEffect, useState } from 'react';
import { Row, Col, Space, Image, Typography, Divider } from 'antd';
import { getSingleWarningLetter, getLetterTempDetail } from '../../../../ducks/services';
import moment from 'moment';
import { baseUrl } from '../../../../../../../../configs/constants';
const PreviewWarningLetter = (props) => {
  const { letterID } = props;
  const { Title, Text } = Typography;
  const [letterContent, setLetterContent] = useState({ title: '', description: '' });
  const [letterImages, setLetterImages] = useState({ header: '', footer: '', signature: '', signee: '' });
  console.log({ letterID });
  useEffect(() => {
    getSingleWarningLetter(letterID).then((response) => {
      let letterData = response?.data.data;
      setLetterContent({ title: letterData.writing_letter_name, description: letterData.detail });
      setLetterImages({
        header: letterData.letter_head,
        footer: letterData.letter_footer,
        signature: letterData.signature_image,
        signee: letterData.signee,
      });
    });
  }, [letterID]);
  return (
    <Row gutter={[24, 50]}>
      <Col span={24}>
        <Image preview={false} width="100%" height={110} src={`${baseUrl}${letterImages.header}`} />
      </Col>
      <Col span={[24, 10]}>
        <Row gutter={[24, 10]}>
          <Col span={24}>
            <Title level={4} className="mb-0 font-500" style={{ color: 'black' }}>
              {letterContent.writing_letter_name}
            </Title>
          </Col>
          <Col span={24}>
            <Divider className="m-0" style={{ background: 'black' }} />
          </Col>
          <Col span={24}>
            <Text className="mb-0" style={{ color: 'black' }}>
              {letterContent.description}
            </Text>
          </Col>
        </Row>
      </Col>
      {letterImages.signature && (
        <Col span={24}>
          <Row gutter={24} justify="start" align="middle">
            <Col>
              <Image preview={false} width="100%" height={110} src={`${baseUrl}${letterImages.signature}`} />
            </Col>
            <Col span={24}>
              <Title level={5} className="mb-0 font-500" style={{ color: 'black' }}>
                {letterImages.signee}
              </Title>
            </Col>
            {/* <Col></Col> */}
            <Col span={24}>
              <Text className="mb-0" style={{ color: 'black' }}>
                {JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company}
              </Text>
            </Col>
            <Col span={24}>
              <Text className="mb-0" style={{ color: 'black' }}>
                {moment(new Date()).format('Do MMMM YYYY')}
              </Text>
            </Col>
          </Row>
        </Col>
      )}

      <Col span={24}>
        <Divider className="m-0" style={{ background: 'black' }} />
      </Col>
      <Col span={24}>
        <Image preview={false} width="100%" height={110} src={`${baseUrl}${letterImages.footer}`} />
      </Col>
    </Row>
  );
};

export default PreviewWarningLetter;
