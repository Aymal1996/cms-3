import React, { useState, useEffect } from 'react';
import { Tabs, Typography, Breadcrumb, Pagination } from 'antd';
import StudentStepCard from '../../../../atoms/StudentStepCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPendingEnrolled } from '../ducks/actions';

const { TabPane } = Tabs;
const { Title, Text } = Typography;

export default (props) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const enrolledList = useSelector((state) => state.students.enrolledList);

  useEffect(() => {
    dispatch(getAllPendingEnrolled(page, limit));
    return () => dispatch(emptrListRegistry());
  }, []);

  const onPageChange = (pgNo) => {
    setPage(pgNo);
    dispatch(getAllPendingEnrolled(pgNo, limit));
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/registry/students">Students</Breadcrumb.Item>
        <Breadcrumb.Item>Pending Student Registration</Breadcrumb.Item>
      </Breadcrumb>
      <Tabs defaultActiveKey="1" type="card" className="tab-bold">
        <TabPane tab="Pending Student Registration" key="1" forceRender={true}>
          <div className="flexibleRow">
            {enrolledList?.rows?.map((item, index) => (
              <div className="requestPanel" key={index}>
                <StudentStepCard
                  data={item}
                  stage={4}
                  link={`/registry/applications/pending-enrolment/${item.name}`}
                  type="app"
                  s3={true}
                />
              </div>
              
            ))}
          </div>
          <div className='w-100'>
              <Pagination
                pageSize={limit}
                current={page}
                hideOnSinglePage={true}
                showSizeChanger={false}
                onChange={onPageChange}
                total={enrolledList?.count}
              />
            </div>
        </TabPane>
        {/* <TabPane tab="Archives" key="2" forceRender={true}>
                    <div className='flexibleRow'>
                        {requests.map((item, index) => (
                            <div className='requestPanel' key={index}>
                                <StudentStepCard data={item} stage={4} link={`/registry/applications/pending-enrolment/${item.name}`} type='app' />
                            </div>
                        ))}
                    </div>
                </TabPane> */}
      </Tabs>
    </>
  );
};
