import React, {useState} from 'react';
import { Table, Card, Descriptions, Typography } from 'antd';
const {Title} = Typography;

export default (props) => {
    const {ListCol, ListData, title} = props;
    const [rowDetail, setRowDetail] = useState(false)
    const [rowData, setRowData] = useState({})
  
    const onClickRow = (record) => {
      return {
        onClick: () => {
          setRowDetail(true)
          setRowData(record)
        },
      };
    }
  
    console.log('rowData', rowData)
  
    const backToList = () => {
      setRowDetail(false)
    }
    return (
      <Card bordered={false}>
        {
            rowDetail ? <div>
                <Title onClick={backToList}>Back</Title>
                <Descriptions>
                    <Descriptions.Item span={24} label="Department">{rowData?.date}</Descriptions.Item>
                    <Descriptions.Item span={24} label="Department">{rowData?.project}</Descriptions.Item>
                    <Descriptions.Item span={24} label="Department">{rowData?.hours}</Descriptions.Item>
                    <Descriptions.Item span={24} label="Department">{rowData?.tasks}</Descriptions.Item>
                    <Descriptions.Item span={24} label="Department">{rowData?.status}</Descriptions.Item>
                </Descriptions>
            </div> : (
            <>
              <Title level={4} style={{marginBottom:'20px'}}>{title}</Title>
              <Table onRow={onClickRow} className="custom-table table-header-highlight mb-1" bordered={false} columns={ListCol} dataSource={ListData} pagination={false} />
            </>
            )  
        }
      </Card>
    );
  };