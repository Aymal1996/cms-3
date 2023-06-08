import React, { useState, useEffect, Fragment } from 'react';
import HeadingChip from '../../../../molecules/HeadingChip';
import { LeftOutlined } from '@ant-design/icons';
import { Typography, Col,Badge, Button, Form,Upload, Input,Pagination, Row,Card,message, Space, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory,Link } from 'react-router-dom';
import { getUnassignModules } from '../ducks/actions';

export default (props) => {
   const {link} = props;
   const {Title,Text} = Typography;
   const dispatch = useDispatch();
   const history = useHistory();
   const UnassignModulesList = useSelector((state) => state.timetable.unassignModules);

   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(10);
   const count = UnassignModulesList?.count;
   let heading = `Unassigned Module(${UnassignModulesList?.count})`;

    const param = {
      "page_number":page,
      "limit":limit,
      "orderby":"name",
      "order":"asc"
    }

   useEffect(() => {
    dispatch(getUnassignModules(param));
  }, []);

  const onPageChange = (pg) => {
    setPage(pg);
    dispatch(getUnassignModules(param));

  }

    return (
      <>

        <Row gutter={[20, 30]} style={{ marginBottom: "15px" }}>

        <Col span={24}>
          <Space direction='vertical' size={20}>
        <Button type="link" className="c-gray-linkbtn p-0 mt-1" onClick={() => history.goBack()} htmlType="button">
                <LeftOutlined /> Back
              </Button>		
          </Space>
        </Col>

        </Row>

         <Row gutter={[20,30]} style={{marginBottom:'20px'}}>
          <Col span={24}>
            <HeadingChip title={heading}/>
          </Col>
        </Row>

      <Row gutter={[20,30]}>
        <Col span={24}>

            <div className="flexibleRow">
              
              {UnassignModulesList?.rows?.map((item,index) => (
               
               <Fragment key={index}>
                
                 <div className="requestPanel">
                 
                 <Link to={{pathname:`/faculty/timetable/editTimetable/${item.name}`}}>

                    <Card bordered={false} className="uni-card">
                      <Row gutter={[20, 30]}>
                        
                        <Col span={24}>
                          <Space size={17}>
                            <Space direction="vertical" size={0}>
                              <Title level={5} className="c-default mb-0">
                                {item.program_name}
                              </Title>
                              <Text className="c-gray lineHeight20">{item.faculty_name}</Text>
                            </Space>
                          </Space>
                        </Col>

                        <Col span={24}>
                          <Card bordered={false} className="uni-card red-card">
                            <Row gutter={24} wrap={false} align="middle">
                              <Col span={24}>
                                <Space direction="vertical" size={2}>
                                  <Title level={5} className="mb-0">
                                      {item.module_name}
                                  </Title>
                              
                                </Space>
                              </Col>
                            </Row>
                          </Card>
                        </Col>

                      </Row>
                    </Card>
                    </Link>
                  </div>

                </Fragment>

              ))}

              </div>
        
            <div className="w-100 text-right mt-2">
              <Pagination
                pageSize={limit}
                current={page}
                hideOnSinglePage={true}
                showSizeChanger={false}
                onChange={onPageChange}
                total={count}
              />
            </div>

         </Col>
      </Row>
      </>
    )
};