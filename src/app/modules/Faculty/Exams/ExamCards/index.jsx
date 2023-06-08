import React, { useState, useEffect, Fragment } from 'react';
import HeadingChip from '../../../../molecules/HeadingChip';
import { Typography, Col,Pagination, Row,Card, Button,Space} from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory,Link } from 'react-router-dom';
import { getUnassignExams,getUnassignInvigilators } from '../ducks/actions';

export default (props) => {
	
  const {link} = props;
  const {Title,Text} = Typography;
  const dispatch = useDispatch();
  const history = useHistory();

  const unassignexams = useSelector((state) => state.exams.getunassignexams);
  const unassigninvigilators = useSelector((state) => state.exams.getunassignInvigilators);

  const [page, setPage] = useState(1);
  const [page2, setPage2] = useState(1);
  const [limit, setLimit] = useState(6);
  const count = unassignexams?.count;

  const param = {"page_number":page,"limit":limit,"orderby":"name","order":"asc"};

    useEffect(() => {
      dispatch(getUnassignExams(param));
      dispatch(getUnassignInvigilators(param));
  }, []);

  
    const onPageChange = (pgNo) => {
     setPage(pgNo);
     dispatch(getUnassignExams({"page_number":pgNo,"limit":limit,"orderby":"name","order":"asc"}));
  }
  
  const invPageChange = (pgNo) => {
     setPage2(pgNo);
   dispatch(getUnassignInvigilators({"page_number":pgNo,"limit":limit,"orderby":"name","order":"asc"}));
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
         <HeadingChip title="Unassigned Exams Date"/>
       </Col>
     </Row>

    <Row gutter={[20,30]}>
           <Col span={24}>

         <div className="flexibleRow">
           
           {unassignexams?.rows?.map((item,index) => (
            
            <Fragment key={index}>
             
              <div className="requestPanel">
             
              <Link to={{pathname:`/faculty/exams/editExam/${item.name}`}}>

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

   <Row gutter={[20,30]} style={{marginBottom:'20px'}}>
       <Col span={24}>
         <HeadingChip title="Unassigned Exams Invigilators"/>
       </Col>
     </Row>

   <Row gutter={[20,30]}>
     <Col span={24}>

         <div className="flexibleRow">
           
           {unassigninvigilators?.rows?.map((item,index) => (
            
            <Fragment key={index}>
             
              <div className="requestPanel">
             
              <Link to={{pathname:`/faculty/exams/editExam/${item.name}`}}>

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
             current={page2}
             hideOnSinglePage={true}
             showSizeChanger={false}
             onChange={invPageChange}
             total={count}
           />
         </div>

      </Col>
   </Row>


   </>


    )
}