import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import ListCard from 'Molecules/ListCard';
import moment from "moment";

const colName = [
  {
    title: 'Application Date',
    dataIndex: 'visa_expiry',
    key: 'visa_expiry',
    render: text => text ? moment(text).format('Do MMMM YYYY') : ''
  },
  {
    title: 'Status',
    dataIndex: 'visa_status',
    key: 'visa_status',
  },
];

export default (props) => {

  const {data, setVisible, updateParent } = props;
  const [formVisible, setFormVisible] = useState(false);

    useEffect(() => {
    //   dispatch(getWarnLetter());
    }, []);

    const addNew = () => {}


    return (
        <Row gutter={[20,20]}>
            <Col span={24}>
                <ListCard
                scrolling={500}
                title="Visa Cancellation"
                ListCol={colName}
                ListData={
                  ((data?.passport_and_visa && data?.passport_and_visa.length) && data?.passport_and_visa?.filter(x => x?.visa_status?.includes("VisaCancel"))) ||
                  []
                }
                pagination={false}
                extraBtn={'Create Application'}
                extraAction={addNew}
                btnClass='green-btn'
                listClass="nospace-card"
                classes='clickRow'
                />
            </Col>
        </Row>

    )
}