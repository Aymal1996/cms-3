import React, { useState } from 'react';
import { Row, Col, Card, Typography, Radio, Space, Empty, Table } from 'antd';
import { useDispatch } from 'react-redux';
import { typeList } from '../../../../../../configs/constantData';
import { InputField, SelectField } from '../../../../../atoms/FormElement';
import { ListIcon, ValueIcon, MatrixIcon, LineChartIcon, BarIcon, PieIcon } from '../../../../../atoms/CustomIcons';
import Line from '../../components/LineChart';
import Pie from '../../components/PieChart';

const { Title } = Typography;

const listData = [
  {
    code: '00000',
    name: 'Student Name',
    Faculty: 'AAAAA',
    Programme: 'BBBBB',
    Graduation: '1st January 1999',
  },
  {
    code: '00000',
    name: 'Student Name',
    Faculty: 'AAAAA',
    Programme: 'BBBBB',
    Graduation: '1st January 1999',
  },
];

const listColumns = [
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

const matrixData = [
  {
    code: 'Faculty A',
    Foundation: '0',
    Diploma: '0',
    Degree: '0',
    Postgrad: '0',
    Total: '0',
  },
  {
    code: 'Faculty A',
    Foundation: '0',
    Diploma: '0',
    Degree: '0',
    Postgrad: '0',
    Total: '0',
  },
];

const matrixColumns = [
  {
    title: '',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Foundation',
    dataIndex: 'Foundation',
    key: 'Foundation',
  },
  {
    title: 'Diploma',
    dataIndex: 'Diploma',
    key: 'Diploma',
  },
  {
    title: 'Degree',
    dataIndex: 'Degree',
    key: 'Degree',
  },
  {
    title: 'Postgrad',
    dataIndex: 'Postgrad',
    key: 'Postgrad',
  },
  {
    title: 'Total',
    dataIndex: 'Total',
    key: 'Total',
  },
];

export default (props) => {
  const [myvalue, setMyvalue] = useState(1);
  const [structure, setStructure] = useState(1);
  const dispatch = useDispatch();
  const { control, errors, setValue, mode, t } = props;

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setMyvalue(e.target.value);
  };

  const reportStructure = (e) => {
    setStructure(e.target.value);
  };

  return (
    <Card bordered={false} className="uni-card h-auto">
      <Row gutter={[30, 20]}>
        <Col span={24}>
          <Title level={5} className="mb-0 c-link">
            step 1
          </Title>
          <Title level={4} className="mb-0 mt-0">
            Report Data
          </Title>
          <Title level={5} className="mt-0 c-gray">
            Please fill out the report data and duration below.
          </Title>
        </Col>
        <Col span={24}>
          <SelectField
            fieldname="reportType"
            label="Report Type"
            control={control}
            class="mb-0"
            iProps={{ placeholder: 'Please select report type' }}
            initValue=""
            selectOption={typeList}
          />
        </Col>
        <Col span={24}>
          <InputField
            fieldname="reportName"
            label="Report Name"
            control={control}
            class="mb-0"
            iProps={{ placeholder: 'Please type report name', size: 'large' }}
            initValue=""
          />
        </Col>

        <Col span={24}>
          <Title level={5} className="mb-0 c-link">
            step 2
          </Title>
          <Title level={4} className="mb-0 mt-0">
            Report Filter
          </Title>
          <Title level={5} className="mt-0 c-gray">
            Please fill the report based on the categories available below.
          </Title>
        </Col>
        <Col span={24}>
          <Radio.Group onChange={onChange} value={myvalue}>
            <Space direction="vertical">
              <Radio value={1}>Yes</Radio>
              <Radio value={2}>No</Radio>
            </Space>
          </Radio.Group>
        </Col>

        {myvalue === 2 && (
          <>
            <Col span={12}>
              <SelectField
                fieldname="nationality"
                label="Nationality"
                control={control}
                class="mb-0"
                iProps={{ placeholder: 'Please select' }}
                initValue=""
                selectOption={typeList}
              />
            </Col>

            <Col span={12}>
              <SelectField
                fieldname="campus"
                label="Campus"
                control={control}
                class="mb-0"
                iProps={{ placeholder: 'Please select' }}
                initValue=""
                selectOption={typeList}
              />
            </Col>

            <Col span={12}>
              <SelectField
                fieldname="faculty"
                label="Faculty"
                control={control}
                class="mb-0"
                iProps={{ placeholder: 'Please select' }}
                initValue=""
                selectOption={typeList}
              />
            </Col>

            <Col span={12}>
              <SelectField
                fieldname="level"
                label="Level"
                control={control}
                class="mb-0"
                iProps={{ placeholder: 'Please select' }}
                initValue=""
                selectOption={typeList}
              />
            </Col>

            <Col span={12}>
              <SelectField
                fieldname="programmes"
                label="Programmes"
                control={control}
                class="mb-0"
                iProps={{ placeholder: 'Please select' }}
                initValue=""
                selectOption={typeList}
              />
            </Col>

            <Col span={12}>
              <SelectField
                fieldname="attendance"
                label="Attendance"
                control={control}
                class="mb-0"
                iProps={{ placeholder: 'Please select' }}
                initValue=""
                selectOption={typeList}
              />
            </Col>

            <Col span={12}>
              <SelectField
                fieldname="cgpa"
                label="CGPA"
                control={control}
                class="mb-0"
                iProps={{ placeholder: 'Please select' }}
                initValue=""
                selectOption={typeList}
              />
            </Col>

            <Col span={12}>
              <SelectField
                fieldname="gpa"
                label="GPA"
                control={control}
                class="mb-0"
                iProps={{ placeholder: 'Please select' }}
                initValue=""
                selectOption={typeList}
              />
            </Col>

            <Col span={12}>
              <SelectField
                fieldname="outstanding"
                label="Outstanding"
                control={control}
                class="mb-0"
                iProps={{ placeholder: 'Please select' }}
                initValue=""
                selectOption={typeList}
              />
            </Col>

            <Col span={12}>
              <SelectField
                fieldname="scholorship"
                label="Scholorship"
                control={control}
                class="mb-0"
                iProps={{ placeholder: 'Please select' }}
                initValue=""
                selectOption={typeList}
              />
            </Col>
          </>
        )}

        <Col span={24}>
          <Radio.Group className="reportsRadio" onChange={reportStructure}>
            <Row gutter={[30, 20]}>
              <Col span={8}>
                <Radio.Button value="a">
                  <Card>
                    <ListIcon />
                    <Title level={4} className="mb-0 mt-0">
                      List
                    </Title>
                  </Card>
                </Radio.Button>
              </Col>

              <Col span={8}>
                <Radio.Button value="b">
                  <Card>
                    <ValueIcon />
                    <Title level={4} className="mb-0 mt-0">
                      Value
                    </Title>
                  </Card>
                </Radio.Button>
              </Col>

              <Col span={8}>
                <Radio.Button value="c">
                  <Card>
                    <MatrixIcon />
                    <Title level={4} className="mb-0 mt-0">
                      Matrix
                    </Title>
                  </Card>
                </Radio.Button>
              </Col>

              <Col span={8}>
                <Radio.Button value="d">
                  <Card>
                    <LineChartIcon />
                    <Title level={4} className="mb-0 mt-0">
                      Line Chart
                    </Title>
                  </Card>
                </Radio.Button>
              </Col>

              <Col span={8}>
                <Radio.Button value="e">
                  <Card>
                    <BarIcon />
                    <Title level={4} className="mb-0 mt-0">
                      Bar Chart
                    </Title>
                  </Card>
                </Radio.Button>
              </Col>

              <Col span={8}>
                <Radio.Button value="f">
                  <Card>
                    <PieIcon />
                    <Title level={4} className="mb-0 mt-0">
                      Pie Chart
                    </Title>
                  </Card>
                </Radio.Button>
              </Col>
            </Row>
          </Radio.Group>
        </Col>

        {structure != 'a' &&
          structure != 'b' &&
          structure != 'c' &&
          structure != 'd' &&
          structure != 'e' &&
          structure != 'f' && (
            <>
              <Col span={24}>
                <Title level={4} className="mt-0">
                  Preview
                </Title>
                <Card>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </Card>
              </Col>
            </>
          )}

        {structure === 'a' && (
          <>
            <Col span={24}>
              <Title level={4} className="mt-0">
                Preview
              </Title>
              <Card>
                <Table dataSource={listData} columns={listColumns} pagination={false} />
              </Card>
            </Col>
          </>
        )}

        {structure === 'b' && (
          <>
            <Col span={24}>
              <Title level={4} className="mt-0">
                Preview
              </Title>
              <Card className="black-card">
                <Title level={5} className="mt-0 mb-0 c-default">
                  Graduating
                </Title>
                <Title level={4} className="mt-0 mb-0">
                  000 Students
                </Title>
              </Card>
            </Col>
          </>
        )}

        {structure === 'c' && (
          <>
            <Col span={24}>
              <Title level={4} className="mt-0">
                Preview
              </Title>
              <Card>
                <Table dataSource={matrixData} columns={matrixColumns} pagination={false} />
              </Card>
            </Col>
          </>
        )}

        {structure === 'd' && (
          <>
            <Col span={24}>
              <Title level={4} className="mt-0">
                Preview
              </Title>
              <Line />
            </Col>
          </>
        )}

        {structure === 'e' && (
          <>
            <Col span={24}>
              <Title level={4} className="mt-0">
                Preview
              </Title>
              <Card>
                <Table dataSource={matrixData} columns={matrixColumns} pagination={false} />
              </Card>
            </Col>
          </>
        )}

        {structure === 'f' && (
          <>
            <Col span={24}>
              <Title level={4} className="mt-0">
                Preview
              </Title>
              <Pie />
            </Col>
          </>
        )}
      </Row>
    </Card>
  );
};
