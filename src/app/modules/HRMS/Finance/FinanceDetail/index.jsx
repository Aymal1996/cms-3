import React, { useEffect } from 'react';
import { Row, Col, Card, Typography, Tabs, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { closeAllOpenForms, getFinanceDetail } from '../ducks/actions';

import { LeftOutlined } from '@ant-design/icons';
import AccountSalary from './AddEditAccountSalary';
import Assets from './AddEditAssets';
import Loans from './AddEditLoans';
import SalaryAdvance from './AddEditSalaryAdvance';
import { getAdvancementdetails, emptyStaffDetails } from '../../Advancement/dcuks/actions';
import StaffDetails from '../../../components/StaffDetails';

const { Title } = Typography;
const { TabPane } = Tabs;

export default (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const financeDetails = useSelector((state) => state.hrmsfinance.financeDetailData);

  useEffect(() => {
    dispatch(getFinanceDetail(id));
    dispatch(getAdvancementdetails(id));
    return () => {
      dispatch(emptyStaffDetails());
    };
  }, []);

  const onTabChangeHandler = (e) => {
    dispatch(closeAllOpenForms(false));
  };

  return (
    <StaffDetails id={id} section="HRMS EMP Finance" title={'Finance'} myProfile={true}>
      <Card bordered={false} className="uni-card h-auto">
        <Row gutter={[20, 30]}>
          <Col flex="auto">
            <Title level={4} className="mb-0">
              Finance
            </Title>
          </Col>
          <Col>
            <Button
              icon={<LeftOutlined />}
              size="middle"
              className="c-graybtn small-btn"
              onClick={() => history.push(`/hrms/requests/${id}`)}
            >
              Categories
            </Button>
          </Col>
          <Col span={24}>
            <Tabs defaultActiveKey="2" type="card" className="custom-tabs" onChange={onTabChangeHandler}>
              <TabPane tab={'Account & Salary'} key={'1'}>
                <AccountSalary
                  id={id}
                  salaryInfo={financeDetails}
                  accountData={financeDetails?.account}
                  allowanceData={financeDetails?.allowance}
                />
              </TabPane>
              <TabPane tab={'Assets'} key={'2'}>
                <Assets id={id} assetData={financeDetails?.assets} />
              </TabPane>
              <TabPane tab={'Loans'} key={'3'}>
                <Loans id={id} loanData={financeDetails?.loan} />
              </TabPane>
              <TabPane tab={'Salary Advance'} key={'4'}>
                <SalaryAdvance id={id} advanceSalaryData={financeDetails?.salary_advance} />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </StaffDetails>
  );
};
