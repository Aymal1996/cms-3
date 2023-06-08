import React, { useState, useEffect } from 'react';
import { Row, Col, Empty, Pagination, message } from 'antd';
import { getSearchData } from './ducks/services';
import { useLocation } from 'react-router';
import RequestCard from '../../atoms/RequestCard';
import MainStatusCard from '../../atoms/MainStatusCard';

export default (props) => {
  const location = useLocation();
  const [searchList, setSearchList] = useState();
  const searchQuerry = location?.state;

  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  console.log('search', props, searchList);

  useEffect(() => {
    props?.setLoading(true);
    // dispatch(getSearchData(page, limit, searchQuerry?.search, searchQuerry?.department));

    getSearchData(page, limit, searchQuerry?.search, searchQuerry?.department)
      .then((res) => {
        console.log('res', res);
        props?.setLoading(false);
        setSearchList(res.data.message);
      })
      .catch((error) => {
        props?.setLoading(false);
        message.error(error?.response?.data?.status?.message ?? 'Something Went Wrong');
      });
  }, [searchQuerry]);

  const onPageChange = (pgNo) => {
    setPage(pgNo);
    props?.setLoading(true);
    getSearchData(pgNo, limit, searchQuerry?.search, searchQuerry?.department)
      .then((res) => {
        props?.setLoading(false);
        setSearchList(res.data.message);
      })
      .catch((error) => {
        props?.setLoading(false);
        message.error(error?.response?.data?.status?.message ?? 'Something Went Wrong');
      });
  };

  const getAppLink = (e) => {
    switch (e?.workflow_state) {
      case 'Incomplete document':
        return '/marketing/applications/incomplete-documents/';

      case 'Eligibility assessment':
        return '/marketing/applications/eligibility-assessments/';

      case 'Incomplete registration visa':
        return '/marketing/applications/pending-registration-visa/';

      case 'Pending accomodation':
        return '/marketing/applications/pending-accommodations/';

      case 'Pending enrollment':
        return '/marketing/applications/pending-enrolment/';

      case 'Approved':
        return '/marketing/applications/approved/';
    }
  };

  return (
    <Row gutter={[20, 30]}>
      {searchList && searchList?.rows?.length > 0 ? (
        searchList?.rows?.map((e) => (
          <>
            {e?.card_type == 'advancement' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  cardType={e?.card_type}
                  link="/hrms/advancement/"
                  statusKey="contract_type"
                  statData={{
                    id: 'employee_id',
                    name: 'employee_name',
                  }}
                />
              </Col>
            )}

            {e?.card_type == 'finance' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  cardType={e?.card_type}
                  link="/hrms/finance/"
                  topKey={{
                    status1: e?.name || e?.job_title,
                    status2: e?.transaction_category,
                  }}
                  cardOn={true}
                  statData={{
                    id: 'employee_id',
                    name: 'employee_name',
                    class: 'b-pending',
                  }}
                />
              </Col>
            )}

            {e?.card_type == 'policy' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  cardType={e?.card_type}
                  link="/hrms/policy/"
                  topKey={{
                    id: e?.policy_status,
                    name: e?.policy_title,
                  }}
                  noID={true}
                  cardOn={true}
                  statData={{
                    id: 'employee_id',
                    name: 'employee_name',
                    class: 'b-pending',
                  }}
                />
              </Col>
            )}

            {e?.card_type == 'employment' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  cardType={e?.card_type}
                  link="/hrms/employment/"
                  statusKey="contract_type"
                  statData={{
                    id: 'employee_id',
                    name: 'employee_name',
                  }}
                />
              </Col>
            )}

            {e?.card_type == 'requests' && (
              <Col span={8} className="search_request">
                <RequestCard
                  cardType={e?.card_type}
                  data={e}
                  link={`/hrms/requests/${e?.employee_id}`}
                  stateKey="pending"
                />
              </Col>
            )}

            {e?.card_type == 'task' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  cardType={e?.card_type}
                  link="/hrms/tasks/"
                  noID={e?.my_card == 'True' ? true : false}
                  statusKey="status"
                  addon="Timesheet"
                  statData={{
                    id: 'employee_id',
                    name: 'employee_name',
                  }}
                />
              </Col>
            )}

            {e?.card_type == 'leaves' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  cardType={e?.card_type}
                  link="/hrms/leaves/"
                  noID={e?.my_card == 'True' ? true : false}
                  statusKey="application_status"
                  addon="Leave Application"
                  statData={{
                    id: 'employee_id',
                    name: 'employee_name',
                  }}
                />
              </Col>
            )}

            {e?.card_type == 'attendance' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  cardType={e?.card_type}
                  link="/hrms/attendance/"
                  statusKey="status"
                  statData={{
                    id: 'employee_id',
                    name: 'employee_name',
                  }}
                />
              </Col>
            )}

            {e?.card_type == 'applications' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  topKey={{
                    name: e?.applicant_name,
                    id: e?.name,
                    status1: e?.email,
                  }}
                  cardType={e?.card_type}
                  link={getAppLink(e)}
                  cardOn={true}
                  s3={true}
                  statData={{ class: 'b-pending' }}
                />
              </Col>
            )}

            {e?.card_type == 'students' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  cardType={e?.card_type}
                  link="/marketing/students/"
                  cardOn={true}
                  statData={{ class: 'b-pending' }}
                />
              </Col>
            )}

            {e?.card_type == 'incentive' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  topKey={{
                    name: e?.incentive_name,
                    id: e?.status,
                  }}
                  cardType={e?.card_type}
                  link="/aqa/incentives/edit/"
                  cardOn={true}
                  statData={{ class: 'b-pending' }}
                />
              </Col>
            )}

            {e?.card_type == 'AQA Module' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  topKey={{
                    name: e?.name,
                    id: e?.module_code,
                    status1: e?.module_name,
                    status2: e?.module_version,
                  }}
                  cardType={e?.card_type}
                  link="/aqa/modules/edit/"
                  cardOn={true}
                  statData={{ class: 'b-pending' }}
                />
              </Col>
            )}

            {e?.card_type == 'Programs' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  topKey={{
                    name: e?.name,
                    id: e?.program_code,
                    status1: e?.program_name,
                    status2: e?.effective_date,
                  }}
                  cardType={e?.card_type}
                  link="/aqa/programme/edit/"
                  cardOn={true}
                  statData={{
                    id: 'program',
                    name: 'program_code',
                    class: 'b-pending',
                  }}
                />
              </Col>
            )}

            {e?.card_type == 'Academic Calendar' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  topKey={{
                    name: e?.name,
                    id: e?.program_code,
                    status1: e?.program_name,
                    status2: e?.effective_date,
                  }}
                  cardType={e?.card_type}
                  link="/aqa/academic-calendar/terms-detail/"
                  cardOn={true}
                  statData={{ class: 'b-pending' }}
                />
              </Col>
            )}

            {e?.card_type == 'publications' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  cardType={e?.card_type}
                  topKey={{
                    name: e?.author_name,
                    id: e?.name,
                    status1: e?.publisher,
                    status2: e?.publication_name,
                  }}
                  link="/faculty/publications/"
                  cardOn={true}
                  statData={{ class: 'b-pending' }}
                />
              </Col>
            )}

            {e?.card_type == 'grants' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  cardType={e?.card_type}
                  topKey={{
                    name: e?.lecturer_name,
                    id: e?.lecturer_id,
                    status1: e?.grant_name,
                    status2: e?.name,
                  }}
                  link="/faculty/grants/"
                  cardOn={true}
                  statData={{ class: 'b-pending' }}
                />
              </Col>
            )}

            {e?.card_type == 'materials' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  cardType={e?.card_type}
                  topKey={{
                    name: e?.author,
                    id: e?.author_id,
                    status1: e?.material_type,
                    status2: e?.name,
                  }}
                  link="/faculty/materials/"
                  cardOn={true}
                  statData={{ class: 'b-pending' }}
                />
              </Col>
            )}

            {e?.card_type == 'timetable' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  cardType={e?.card_type}
                  topKey={{
                    name: e?.classroom_name,
                    id: e?.name,
                    status1: e?.faculty_code,
                    status2: e?.faculty_name,
                  }}
                  link="/faculty/timetable/editTimetable/"
                  cardOn={true}
                  statData={{ class: 'b-pending' }}
                />
              </Col>
            )}

            {e?.card_type == 'lecturer' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  topKey={{
                    name: e?.employee_name,
                    id: e?.employee_id,
                    status1: e?.faculty,
                    status2: e?.position_level,
                  }}
                  cardType={e?.card_type}
                  link="/faculty/staff/"
                  cardOn={true}
                  statData={{
                    id: 'employee_id',
                    name: 'employee_name',
                    class: 'b-pending',
                  }}
                />
              </Col>
            )}

            {e?.card_type == 'program' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  topKey={{
                    name: e?.faculty_name,
                    id: e?.faculty_code,
                    status1: e?.program,
                    status2: e?.program_name,
                  }}
                  cardType={e?.card_type}
                  link="/faculty/programmes/"
                  cardOn={true}
                  statData={{ class: 'b-pending' }}
                />
              </Col>
            )}

            {e?.card_type == 'exam' && (
              <Col span={8}>
                <MainStatusCard
                  data={e}
                  topKey={{
                    name: e?.intake_name,
                    id: e?.name,
                    status1: e?.category,
                    status2: e?.faculty_name,
                  }}
                  cardType={e?.card_type}
                  link="/faculty/exams/editExam/"
                  cardOn={true}
                  statData={{ class: 'b-pending' }}
                />
              </Col>
            )}
          </>
        ))
      ) : (
        <Col span={24}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Col>
      )}

      <Col span={24}>
        <Pagination
          pageSize={limit}
          current={page}
          hideOnSinglePage={true}
          showSizeChanger={false}
          onChange={onPageChange}
          total={searchList?.count}
        />
      </Col>
    </Row>
  );
};
