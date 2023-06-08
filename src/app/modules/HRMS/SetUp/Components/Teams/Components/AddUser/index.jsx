import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Descriptions, Button, Input, Radio } from 'antd';
import { SearchOutlined, PlusCircleFilled, CloseCircleFilled } from '@ant-design/icons';

const tabVals = [
  { label: 'All', value: 'All' },
  { label: 'Current', value: 'Current' },
];

const AddUser = (props) => {
  const { userData, setUserData, title, department, allListing } = props;
  console.log({ allListing });
  const { Title, Text } = Typography;
  const [tabVal, setTabVal] = useState(tabVals[0]?.value);
  const [allUsers, setAllUsers] = useState([]);
  const [onSearhUser, setOnSearchUser] = useState('');

  const onTabClickHandler = (e) => {
    setTabVal(e.target.value);
  };

  const AddUsers = (user) => {
    let users = userData;
    users.push(user);
    setAllUsers(allUsers.filter((value) => value.name !== user.name));
    setUserData(users);
  };

  const removeUserSelectUser = (user) => {
    let alluser = allUsers;
    alluser.push(user);
    setUserData(userData.filter((value) => value.name !== user.name));
    setAllUsers(alluser);
  };

  const onSearchUserHnadler = () => {
    if (onSearhUser.length) {
      setAllUsers(allUsers.filter((value) => value.employee_name.toLowerCase().includes(onSearhUser.toLowerCase())));
    } else {
      setOnSearchUser('');
      setAllUsers(
        allListing.filter(
          (value) => !userData.find((val) => val.employee_name === value.employee_name && val.name === value.name),
        ),
      );
    }
  };

  useEffect(() => {
    if (userData.length) {
      setAllUsers(
        allListing.filter(
          (value) => !userData.find((val) => val.employee_name === value.employee_name && val.name === value.name),
        ),
      );
    } else setAllUsers(allListing);
  }, [userData]);

  return (
    <Card bordered={false} className="uni-card b-black">
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Radio.Group
            size="large"
            className="radio-tabs"
            buttonStyle="solid"
            options={tabVals}
            onChange={onTabClickHandler}
            value={tabVal}
            optionType="button"
          />
        </Col>
        {tabVal === 'All' ? (
          <>
            <Col span={24}>
              <Row gutter={20} justify="start">
                <Col span={24}>
                  <Title className="mb-0" level={3}>
                    {allUsers.length}
                  </Title>
                </Col>
                <Col span={24}>
                  <Text className="c-gray">{title}</Text>
                </Col>
              </Row>
            </Col>
            <Col flex="auto">
              <Input
                placeholder="Search team member"
                value={onSearhUser}
                onChange={(e) => setOnSearchUser(e.target.value)}
              />
            </Col>
            <Col flex="20px">
              <Button
                size="large"
                type="primary"
                htmlType="button"
                icon={<SearchOutlined />}
                onClick={onSearchUserHnadler}
              />
            </Col>
            <Col span={24}>
              <Card bordered={false} className="scrolling-card ultra-550 b-black">
                <Row gutter={[20, 20]} justify="center" align="middle">
                  <Col span={24}>
                    <Descriptions bordered column={1} colon={false} className="add-user">
                      {allUsers.map((value, index) => {
                        return (
                          <Descriptions.Item key={index} label={value.employee_name}>
                            <PlusCircleFilled onClick={() => AddUsers(value)} />
                          </Descriptions.Item>
                        );
                      })}
                    </Descriptions>
                  </Col>
                </Row>
              </Card>
            </Col>
          </>
        ) : (
          <>
            <Col span={24}>
              <Row gutter={20} justify="start">
                <Col span={24}>
                  <Title className="mb-0" level={3}>
                    {userData.length}
                  </Title>
                </Col>
                <Col span={24}>
                  <Text className="c-gray">{title}</Text>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Card bordered={false} className="scrolling-card ultra-550 b-black">
                <Row gutter={[20, 20]} justify="center" align="middle">
                  <Col span={24}>
                    <Descriptions bordered column={1} colon={false} className="add-user">
                      {userData.map((value, index) => {
                        return (
                          <Descriptions.Item key={index} label={value.employee_name}>
                            <CloseCircleFilled onClick={() => removeUserSelectUser(value)} />
                          </Descriptions.Item>
                        );
                      })}
                    </Descriptions>
                  </Col>
                </Row>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Card>
  );
};
export default AddUser;
