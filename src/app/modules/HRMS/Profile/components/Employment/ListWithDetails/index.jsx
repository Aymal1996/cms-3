import React, { useState, Fragment } from 'react';
import ListCard from '../../../../../../molecules/ListCard';
import { Typography, Col, Button, Row, Descriptions, Space } from 'antd';
import moment from 'moment';
import { LeftOutlined } from '@ant-design/icons';
import { DownloadIcon } from '../../../../../../atoms/CustomIcons';
import { baseUrl } from '../../../../../../../configs/constants';

const { Title } = Typography;

export default ({ details, updateApi }) => {

  const {employmentHeading, terminationHeading, warningHeading, data, column, warningColumg} = details;
  const [rowDetails, setRowDetail] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  console.log('rowData', rowData)

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setRowDetail(true)
        setRowData(record)
      },
    };
  }

  const onView = async (data) => {
    data && window.open(`${baseUrl}${data}`, "_blank");
  }

  return (
    <>
      {!rowDetails ?
        <>
          <Row gutter={[0, 40]}>
            <ListCard
              title={employmentHeading}
              onRow={onClickRow}
              ListCol={column}
              ListData={data?.contracts}
              pagination={{
                total: data?.contracts?.count,
                current: page,
                pageSize: limit
              }}
              classes="clickRow"
              scrolling={500}
              listClass="nospace-card"
            />
            <Col span={24}>
              <Title level={4} className={`c-default mb-0`}>
                {terminationHeading}
              </Title>
              <Title level={5} className={`c-default mb-0`}>
                <i>No Data</i>
              </Title>
            </Col>
            <Col span={24}>
              <ListCard
                title={warningHeading}
                ListCol={warningColumg}
                ListData={data?.warningLetter}
                scrolling={500}
                listClass="nospace-card"
              />
            </Col>
          </Row>
        </>
        :
        <>
          <Row gutter={[20, 30]} className="personalData">
            <Col span={24}>
              <Space direction='vertical' size={20}>
                <Button type="link" className='c-gray-linkbtn p-0 mt-1' onClick={() => { setRowDetail(false); props?.setRecord(null) }} htmlType="button"><LeftOutlined />Employment History</Button>
                <Title level={4} className='c-default mb-0'>Contract Details</Title>
              </Space>
            </Col>
            <Col span={24}>
              <Descriptions className='reqData' bordered colon={false} column={1}>
                <Descriptions.Item label="Contract Type">{rowData?.contract_type}</Descriptions.Item>
                <Descriptions.Item label="Employment Type">{rowData?.employement_type}</Descriptions.Item>
                <Descriptions.Item label="From Date">{rowData?.start_date}</Descriptions.Item>
                <Descriptions.Item label="To Date">{rowData?.end_date}</Descriptions.Item>
                <Descriptions.Item label="Endorser">{rowData?.supervisor}</Descriptions.Item>
              </Descriptions>
            </Col>


            <Col span={24}>
              <Space direction='vertical' size={20}>
                <Title level={4} className='c-default mb-0'>Employment Details</Title>
              </Space>
            </Col>
            <Col span={24}>
              <Descriptions className='reqData' bordered colon={false} column={1}>
                <Descriptions.Item label="Staff Category">{rowData?.staff_category}</Descriptions.Item>
                <Descriptions.Item label="Company">{rowData?.company}</Descriptions.Item>
                <Descriptions.Item label="Team">{rowData?.team_name}</Descriptions.Item>
                <Descriptions.Item label="Job Title">{rowData?.job_title}</Descriptions.Item>
                <Descriptions.Item label="Position Level">{rowData?.position_level}</Descriptions.Item>
                <Descriptions.Item label="Supervisor">{rowData?.supervisor}</Descriptions.Item>
                <Descriptions.Item label="Download Contract"><Button type="link" onClick={() => onView(rowData?.contract_attachment)} htmlType="button" className="p-0" icon={<DownloadIcon className="c-success" />} /></Descriptions.Item>
              </Descriptions>
            </Col>

            {rowData?.work_hour_template_detail?.length > 0 && (
              <>
                <Col span={24}>
                  <Space direction='vertical' size={20}>
                    <Title level={4} className='c-default mb-0'>Work Hours</Title>
                  </Space>
                </Col>
                <Col span={24}>
                  <Descriptions className='reqData' bordered colon={false} column={1}>
                    {rowData?.work_hour_template_detail?.map((resp,ind) => (
                      <Fragment key={ind}>
                        {resp?.work_hours > 0 && (
                          <Descriptions.Item label={resp?.day}>{resp?.start_time} {resp?.time_type}</Descriptions.Item>
                        )}
                      </Fragment>
                    ))}
                  </Descriptions>
                </Col>
              </>
            )}
            <Col span={24}>
              {/* <Row gutter={[20, 20]} justify="end">
                      {onAction1 && <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='button' className={`w-100 ${btnClass1 ? btnClass1 : ''}`} onClick={() => {onAction1(data[0].value); setRowDetail(false)}}>{btn1title}</Button></Col>}
                      {onAction2 && <Col flex='0 1 200px'><Button type='primary' size='large' htmlType='submit' className={`w-100 ${btnClass2 ? btnClass2 : ''}`} onClick={() => {onAction2(data[0].value); setRowDetail(false)}}>{btn2title}</Button></Col>}
                    </Row> */}
            </Col>
          </Row>
        </>
      }
    </>
  )
}