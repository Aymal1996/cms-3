import React, { useState, useEffect, Fragment } from 'react';
import { Typography, Col, Button, Row, Descriptions, Space, Upload, message } from 'antd';
import { DownloadIcon } from 'Atoms/CustomIcons';
import { baseUrl } from '../../../../../../configs/constants';
import { uniquiFileName, getSingleUpload, dummyRequest, getFileName } from '../../../../../../features/utility';
import { employApi, employUpdateImage } from '../../../Employment/ducks/services';
import { getEmployeeProfile } from '../../ducks/actions';
import { useDispatch } from 'react-redux';

const { Title, Text } = Typography;

export default (props) => {
  const dispatch = useDispatch();
  const { data, nochange } = props;
  const [fileList, setFileList] = useState([]);
  const onView = async (data) => {
    data && window.open(`${baseUrl}${data}`, '_blank');
  };

  useEffect(() => {
    if (data) {
      setFileList([{ uid: '-1', name: getFileName(data?.image), status: 'done', url: `${baseUrl}${data?.image}` }]);
    }
  }, [data]);

  const handleUpload = async (e) => {
    const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
    const userEmail = JSON.parse(localStorage.getItem('userdetails')).email;
    let modifiedName = uniquiFileName(e.file?.name);
    let res = await getSingleUpload(modifiedName, 'image', e.file.originFileObj, 'Employee', id);
    let profileImg = res?.file_url;
    let body = {
      image: profileImg.replace(`${baseUrl}`, ''),
    };
    await employUpdateImage(userEmail, {
      user_image: profileImg.replace(`${baseUrl}`, ''),
    });
    employApi(body, id).then((res) => {
      localStorage.setItem('userImage', res.data.data.image);
      message.success('Profile Image Updated');
      window.location.reload(false);
    });
  };

  return (
    <>
      <Row gutter={[20, 30]} className="personalData">
        <Col span={24}>
          <Space direction="vertical" size={20}>
            <Title level={4} className="c-default mb-0">
              Contract Details
            </Title>
          </Space>
        </Col>
        <Col span={24}>
          <Descriptions className="reqData" bordered colon={false} column={1}>
            <Descriptions.Item label="Title">{data?.salutation}</Descriptions.Item>
            <Descriptions.Item label="Name as per IC/Passport">
              <div style={{ textTransform: 'capitalize' }}>{data?.first_name}</div>
            </Descriptions.Item>
            {!nochange && <Descriptions.Item label="Profile Picture">
              <Upload
                className="uploadWithbtn"
                showUploadList={false}
                accept="image/*"
                maxCount={1}
                fileList={fileList}
                customRequest={dummyRequest}
                onChange={(e) => handleUpload(e)}
              >
                <Space size={4}>
                  {fileList.length > 0 ? <Text>{fileList[0].name}</Text> : null}
                  <Button type="link" className="p-0">
                    Change
                  </Button>
                </Space>
              </Upload>
            </Descriptions.Item>}
            <Descriptions.Item label="Gender">{data?.gender}</Descriptions.Item>
            <Descriptions.Item label="Marital Status">{data?.marital_status}</Descriptions.Item>
            <Descriptions.Item label="Nationality">{data?.nationality}</Descriptions.Item>
            <Descriptions.Item label="Identification Type">{data?.identification_type}</Descriptions.Item>
            <Descriptions.Item label="Identification No.">{data?.identification_no}</Descriptions.Item>
            <Descriptions.Item label="Date of Birth">{data?.date_of_birth}</Descriptions.Item>
            <Descriptions.Item label="Race">{data?.race}</Descriptions.Item>
            <Descriptions.Item label="Religion">{data?.religious}</Descriptions.Item>
          </Descriptions>
        </Col>

        <Col span={24}>
          <Space direction="vertical" size={20}>
            <Title level={4} className="c-default mb-0">
              Contact Details
            </Title>
          </Space>
        </Col>
        <Col span={24}>
          <Descriptions className="reqData" bordered colon={false} column={1}>
            <Descriptions.Item label="Phone No.">
              {data?.primary_phone_no}
              {data?.primary_phone_no && data?.secondary_phone_no && ', '}
              {data?.secondary_phone_no}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {data?.primary_email}
              {data?.primary_email && data?.secondary_email && ', '}
              {data?.secondary_email}
            </Descriptions.Item>
            <Descriptions.Item label="Work Email">{data?.work_email}</Descriptions.Item>
          </Descriptions>
        </Col>

        <Col span={24}>
          <Space direction="vertical" size={20}>
            <Title level={4} className="c-default mb-0">
              Current Address
            </Title>
          </Space>
        </Col>
        <Col span={24}>
          <Descriptions className="reqData" bordered colon={false} column={1}>
            <Descriptions.Item label="Address">
              {data?.current_permanent_address?.length > 0 && data?.current_permanent_address[0].current_address_1}
            </Descriptions.Item>
            <Descriptions.Item label="State">
              {data?.current_permanent_address?.length > 0 && data?.current_permanent_address[0].permanent_state}
            </Descriptions.Item>
            <Descriptions.Item label="City">
              {data?.current_permanent_address?.length > 0 && data?.current_permanent_address[0].current_city}
            </Descriptions.Item>
            <Descriptions.Item label="Postcode">
              {data?.current_permanent_address?.length > 0 && data?.current_permanent_address[0].current_post_code}
            </Descriptions.Item>
            <Descriptions.Item label="Country">
              {data?.current_permanent_address?.length > 0 && data?.current_permanent_address[0].current_country}
            </Descriptions.Item>
          </Descriptions>
        </Col>

        <Col span={24}>
          <Space direction="vertical" size={20}>
            <Title level={4} className="c-default mb-0">
              Permanent Address
            </Title>
          </Space>
        </Col>
        <Col span={24}>
          <Descriptions className="reqData" bordered colon={false} column={1}>
            <Descriptions.Item label="Address">
              {data?.current_permanent_address?.length > 1 && data?.current_permanent_address[1].current_address_1}
            </Descriptions.Item>
            <Descriptions.Item label="State">
              {data?.current_permanent_address?.length > 1 && data?.current_permanent_address[1].permanent_state}
            </Descriptions.Item>
            <Descriptions.Item label="City">
              {data?.current_permanent_address?.length > 1 && data?.current_permanent_address[1].current_city}
            </Descriptions.Item>
            <Descriptions.Item label="Postcode">
              {data?.current_permanent_address?.length > 1 && data?.current_permanent_address[1].current_post_code}
            </Descriptions.Item>
            <Descriptions.Item label="Country">
              {data?.current_permanent_address?.length > 1 && data?.current_permanent_address[1].current_country}
            </Descriptions.Item>
          </Descriptions>
        </Col>

        <Col span={24}>
          <Space direction="vertical" size={20}>
            <Title level={4} className="c-default mb-0">
              Spouse Details
            </Title>
          </Space>
        </Col>
        <Col span={24}>
          <Descriptions className="reqData" bordered colon={false} column={1}>
            <Descriptions.Item label="Title">{data?.spouse_salutation}</Descriptions.Item>
            <Descriptions.Item label="Name as per IC/Passport">{data?.spouse_name}</Descriptions.Item>
            <Descriptions.Item label="Gender">{data?.spouse_gender}</Descriptions.Item>
            <Descriptions.Item label="Marital Status">{data?.spouse_martial_status}</Descriptions.Item>
            <Descriptions.Item label="Nationality">{data?.spouse_nationality}</Descriptions.Item>
            <Descriptions.Item label="Identification Type">{data?.spouse_identification_type}</Descriptions.Item>
            <Descriptions.Item label="Identification No.">{data?.spouse_identification_no}</Descriptions.Item>
            <Descriptions.Item label="Date of Birth">{data?.spouse_dob}</Descriptions.Item>
            <Descriptions.Item label="Race">{data?.spouse_race}</Descriptions.Item>
            <Descriptions.Item label="Religion">{data?.spouse_religious}</Descriptions.Item>
            <Descriptions.Item label="Employer Name">{data?.spouse_employee_name}</Descriptions.Item>
            <Descriptions.Item label="Employer Email">{data?.spouse_employee_email}</Descriptions.Item>
            <Descriptions.Item label="Phone No.">{data?.spouse_phone_no}</Descriptions.Item>
            <Descriptions.Item label="Income Tax No.">{data?.spouse_income_tax_no}</Descriptions.Item>
          </Descriptions>
        </Col>

        {data?.employee_children?.length > 0 &&
          data?.employee_children?.map((resp, ind) => (
            <Fragment key={ind}>
              <Col span={24}>
                <Space direction="vertical" size={20}>
                  <Title level={4} className="c-default mb-0">
                    Children Details
                  </Title>
                </Space>
              </Col>
              <Col span={24}>
                <Space direction="vertical" size={20}>
                  <Title level={5} className="c-default mb-0">
                    Child {ind + 1}
                  </Title>
                </Space>
              </Col>
              <Col span={24}>
                <Descriptions className="reqData" bordered colon={false} column={1}>
                  <Descriptions.Item label="Title">{resp?.salutation}</Descriptions.Item>
                  <Descriptions.Item label="Name as per IC/Passport">{resp?.full_name}</Descriptions.Item>
                  <Descriptions.Item label="Gender">{resp?.gender}</Descriptions.Item>
                  <Descriptions.Item label="Date of Birth">{resp?.dob}</Descriptions.Item>
                  <Descriptions.Item label="Email">{resp?.email}</Descriptions.Item>
                  <Descriptions.Item label="Occupation">{resp?.occupation}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Fragment>
          ))}

        {data?.emergency_contact?.length > 0 &&
          data?.emergency_contact?.map((resp, ind) => (
            <Fragment key={ind}>
              <Col span={24}>
                <Space direction="vertical" size={20}>
                  <Title level={4} className="c-default mb-0">
                    Emergency Details
                  </Title>
                </Space>
              </Col>
              <Col span={24}>
                <Space direction="vertical" size={20}>
                  <Title level={5} className="c-default mb-0">
                    Emergency Contact {ind + 1}
                  </Title>
                </Space>
              </Col>
              <Col span={24}>
                <Descriptions className="reqData" bordered colon={false} column={1}>
                  <Descriptions.Item label="Title">{resp?.title}</Descriptions.Item>
                  <Descriptions.Item label="Name as per IC/Passport">{resp?.relation_name}</Descriptions.Item>
                  <Descriptions.Item label="Relationship">{resp?.relation}</Descriptions.Item>
                  <Descriptions.Item label="Email">{resp?.email}</Descriptions.Item>
                  <Descriptions.Item label="Phone No.">{resp?.phone}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Fragment>
          ))}

        {data?.education?.length > 0 &&
          data?.education?.map((resp, ind) => (
            <Fragment key={ind}>
              <Col span={24}>
                <Space direction="vertical" size={20}>
                  <Title level={4} className="c-default mb-0">
                    Education Level
                  </Title>
                </Space>
              </Col>
              <Col span={24}>
                <Space direction="vertical" size={20}>
                  <Title level={5} className="c-default mb-0">
                    Education Level {ind + 1}
                  </Title>
                </Space>
              </Col>
              <Col span={24}>
                <Descriptions className="reqData" bordered colon={false} column={1}>
                  <Descriptions.Item label="Institution">{resp?.school_univ}</Descriptions.Item>
                  <Descriptions.Item label="Field">{resp?.fields}</Descriptions.Item>
                  <Descriptions.Item label="Graduation Year">{resp?.year_of_passing}</Descriptions.Item>
                  <Descriptions.Item label="From Date">{resp?.from_date}</Descriptions.Item>
                  <Descriptions.Item label="To Date">{resp?.to_date}</Descriptions.Item>
                  <Descriptions.Item label="CGPA">{resp?.cgpa}</Descriptions.Item>
                  <Descriptions.Item label="Education Type">{resp?.level}</Descriptions.Item>
                  <Descriptions.Item label="Country of Graduation">{resp?.country}</Descriptions.Item>
                  <Descriptions.Item label="Transcript">
                    <Button
                      type="link"
                      onClick={() => onView(resp?.transcript)}
                      htmlType="button"
                      className="p-0"
                      icon={<DownloadIcon className="c-success" />}
                    />
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Fragment>
          ))}

        {data?.external_work_history?.length > 0 &&
          data?.external_work_history?.map((resp, ind) => (
            <Fragment key={ind}>
              <Col span={24}>
                <Space direction="vertical" size={20}>
                  <Title level={4} className="c-default mb-0">
                    Work Experience
                  </Title>
                </Space>
              </Col>
              <Col span={24}>
                <Space direction="vertical" size={20}>
                  <Title level={5} className="c-default mb-0">
                    Work Experience {ind + 1}
                  </Title>
                </Space>
              </Col>
              <Col span={24}>
                <Descriptions className="reqData" bordered colon={false} column={1}>
                  <Descriptions.Item label="Employer">{resp?.company_name}</Descriptions.Item>
                  <Descriptions.Item label="Position">{resp?.designation}</Descriptions.Item>
                  <Descriptions.Item label="From Date">{resp?.from_date}</Descriptions.Item>
                  <Descriptions.Item label="To Date">{resp?.to_date}</Descriptions.Item>
                  <Descriptions.Item label="Description">{resp?.description}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Fragment>
          ))}

        <Col span={24}>
          {/* <Row gutter={[20, 20]} justify="end">
                      {onAction1 && <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='button' className={`w-100 ${btnClass1 ? btnClass1 : ''}`} onClick={() => {onAction1(data[0].value); setRowDetail(false)}}>{btn1title}</Button></Col>}
                      {onAction2 && <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='submit' className={`w-100 ${btnClass2 ? btnClass2 : ''}`} onClick={() => {onAction2(data[0].value); setRowDetail(false)}}>{btn2title}</Button></Col>}
                    </Row> */}
        </Col>
      </Row>
    </>
  );
};
