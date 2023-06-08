import React from "react";
import {
  Row,
  Col,
  Typography,
  Card,
  Switch,
} from "antd";
const { Title, Text } = Typography;

const FormsActiveCard = (props) => {
  return (
    <Card 
        className="ag-stats-card"
        bordered={false}
    >
        <Row align="middle">
            <Col>
                <Title level={5} className="text-offwhite mt-0 mb-0 fontSize18Medium">{props?.data?.name}</Title>
                <Title level={5} className="text-gray mt-0 mb-0 font-400">{`${props?.data?.field_count} Fields`}</Title>
            </Col>
            <Col style={{marginLeft:'auto'}}>
                <Switch className="mr-auto" defaultChecked={props.status} />
            </Col>
        </Row>
    </Card>   
  );
};

export default FormsActiveCard;