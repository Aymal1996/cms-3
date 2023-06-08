import React from 'react';
import { Row, Col, Card, Form, Space, Button, Layout, message, Breadcrumb } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useForm } from 'react-hook-form';
import Information from '../AddNewTerm/Information';
import { useTranslate } from 'Translate';
import PlaceHolderImage from '../../../../../assets/img/empty_calendar.png';
import moment from 'moment';
import { apiMethod } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import { useHistory } from 'react-router';
import SideDetails from '../../../../molecules/SideDetails';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';

export default (props) => {
  const { control, errors, handleSubmit, reset } = useForm();
  const history = useHistory();
  const i18n = useTranslate();
  const { t } = i18n;
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

  const sideData = {
    image: PlaceHolderImage,
    text: "Please fill up the details on the right. Once finished, click 'Add Term' to proceed.",
  };

  const bottomList = [
    {
      title: 'Add Terms',
      type: 'submit',
      class: 'green-btn',
    },
  ];

  const onFinish = async (val) => {
    props.setLoading(true);
    let progArray = [];
    val?.offered_program?.map((resp) => {
      progArray.push({
        include_exclude: resp.include_exclude.value,
        program: resp.program.value,
        program_name: resp.program.label,
      });
    });

    const json = {
      term: {
        term_tag: val.termTag,
        term_name: val.termName,
        term_year: val.termYear ? moment(val.termYear).format('YYYY') : '',
        term_start: val.termStart ? moment(val.termStart).format('YYYY-MM-DD') : '',
        term_end: val.termEnd ? moment(val.termEnd).format('YYYY-MM-DD') : '',
        registration_start: val.registrationStart ? moment(val.registrationStart).format('YYYY-MM-DD') : '',
        registration_end: val.registrationEnd ? moment(val.registrationEnd).format('YYYY-MM-DD') : '',
        class_start: val.classStart ? moment(val.classStart).format('YYYY-MM-DD') : '',
        class_end: val.classEnd ? moment(val.classEnd).format('YYYY-MM-DD') : '',
      },
      courses: {
        course_group_type: val.course_group.value,
        new_intake_only: '',
        boe_date: val.boe_start ? moment(val.boe_start).format('YYYY-MM-DD') : '',
        graduating_boe_date: val.boe_end ? moment(val.boe_end).format('YYYY-MM-DD') : '',
      },
      programs: progArray,
      delete_academic_program: [],
    };
    console.log('json', json);
    let url = `${apiMethod}/aqa.api.add_term_detail`;
    try {
      await axios.post(url, json);
      props.setLoading(false);
      message.success('Term Successfully Added');
      setTimeout(() => history.push('/aqa/academic-calendar'), 1000);
    } catch (e) {
      const { response } = e;
      console.log('response', response);
      message.error(response?.data?.status?.message ?? 'Something went wrong');
      props.setLoading(false);
    }
  };

  return (
    <>
      <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onFinish)}>
        <Breadcrumb separator=">" className="mb-1">
          <Breadcrumb.Item href="/aqa/academic-calendar">Academic Calendar</Breadcrumb.Item>
          <Breadcrumb.Item>Add New Term</Breadcrumb.Item>
        </Breadcrumb>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <HeadingChip title="Add New Term" />
          </Col>
          <Col span={24}>
            <div className="twocol-3070">
              <div className="side-detail">
                {isHDScreen ? (
                  <SideDetails data={sideData} cardType="empty" type="button" bottom={bottomList} />
                ) : (
                  <SideDetailResponsive data={sideData} cardType="empty" type="button" bottom={bottomList} />
                )}
              </div>
              <div className="side-form">
                <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
                  <Information control={control} errors={errors} mode="add" t={t} />
                </Card>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};
