import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, message, Breadcrumb } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslate } from 'Translate';
import { useForm } from 'react-hook-form';
import Information from '../AddFaculty/Information';
import ActivationCard from '../../../../atoms/ActivationCard';
import ProgramCards from '../../../../molecules/ProgramCards';
import { getSingleFaculty } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Popup } from '../../../../atoms/Popup';
import DeletePopup from '../../../../molecules/DeletePopup';
import { apiMethod, apiresource } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import moment from 'moment';
import { getComments, emptyComments } from '../../../Application/ducks/actions';
import UpdateSection from '../../../../molecules/UpdateSection';
import SideDetails from '../../../../molecules/SideDetails';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { BreakingPoint } from '../../../../../configs/constantData';

export default (props) => {
  let location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { control, errors, setValue, handleSubmit } = useForm();
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState();
  const [visible, setVisible] = useState(false);
  const [deleted, setDeleted] = useState([]);
  const { id } = useParams();
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

  const facultyApi = useSelector((state) => state.faculty.faculty);
  const commentsApi = useSelector((state) => state.global.comments);

  const i18n = useTranslate();
  const { t } = i18n;

  const sideData = [
    {
      type: 'code',
      text: facultyApi?.faculty_code,
      title: facultyApi?.faculty_name,
      highlight: true,
    },
    {
      type: 'reversetitleValue',
      title: 'Programmes',
      level1: isHDScreen ? 3 : 4,
      level2: isHDScreen ? 4 : 5,
      value: facultyApi?.programs?.length,
      
    },
    {
      type: 'reversetitleValue',
      title: 'Active Students',
      level1: isHDScreen ? 3 : 4,
      level2: isHDScreen ? 4 : 5,
      value: location.state?.students || 0,
    },
    {
      type: 'titleValue',
      title: 'Created',
      space: isHDScreen ? 10 : 4,
      level: isHDScreen ? 4 : 5,
      value: facultyApi?.creation ? moment(facultyApi?.creation).format('Do MMMM YYYY') : '',
      noDivider: true,
      highlight: true,
      noLine: true,
    },
  ];



	console.log('sadsadsa222',sideData);


  const bottomList = [
    {
      title: 'Delete Faculty',
      type: 'button',
      class: 'black-btn',
      action: () => setVisible(true),
    },
  ];

  useEffect(() => {
      dispatch(getSingleFaculty(id));
      dispatch(getComments('Institution Faculty', `${id}`));
    return () => {
      dispatch(emptyComments());
    };
  }, []);

  useEffect(() => {
    if (Object.keys(facultyApi).length > 0) {
      setValue('name', facultyApi.faculty_name);
      setValue('code', facultyApi.faculty_code);
      setStatus(facultyApi.status);
      let program = [];

      facultyApi?.programs.map((item) => {
        program.push({
          name: item.program_name,
          program: item.program,
          ineffective_date: item.ineffective_date,
          status: item.status,
          doctype: 'AQA Attached Programs',
        });
      });
      setTags(program);
    }
  }, [facultyApi]);

  const popup = {
    closable: false,
    visibility: visible,
    class: 'black-modal',
    content: <DeletePopup title="Faculty" x onClose={() => setVisible(false)} onDelete={() => onDelete()} />,
    width: 536,
    onCancel: () => setVisible(false),
  };

  const onStatusChange = (e) => {
    if (e == true) {
      setStatus('Active');
    } else {
      if (facultyApi?.status == 'Draft') {
        setStatus('Draft');
      } else if (facultyApi?.status == 'Archive') {
        setStatus('Archive');
      } else {
        setStatus('Inactive');
      }
    }
  };

  const onFinish = async (val) => {
    props.setLoading(true);
    let delurl = `${apiresource}/aqa.api.multple_reocrd_delete?
        doctype_name=Institution Faculty&delete_list=${deleted}`;
    if (deleted.length > 0) {
      try {
        await axios.Delete(delurl);
      } catch (e) {
        const { response } = e;
        props.setLoading(false);
        message.error('Something went wrong while deleting');
      }
    }
    let prog = [];
    tags.map((item) => {
      prog.push({
        program: item.program,
        status: item.status ? item.status : 'Active',
      });
    });
    const json = {
      name: facultyApi?.name,
      faculty_name: val.name,
      faculty_code: val.code,
      status: status,
      programms: prog,
    };

    let url = `${apiMethod}/aqa.api.add_update_faculty/${facultyApi.name}`;
    try {
      await axios.put(url, json);
      message.success('Faculty Successfully Updated');
      props.setLoading(false);
      setTimeout(() => history.push('/aqa/faculty'), 1000);
    } catch (e) {
      props.setLoading(false);
      const { response } = e;
      message.error('Something went wrong');
    }
  };

  const onDelete = async () => {
    props.setLoading(true);
    let url = `${apiresource}/Institution Faculty/${facultyApi.name}`;
    try {
      await axios.delete(url);
      message.success('Faculty Successfully Deleted');
      setVisible(false);
      props.setLoading(false);
      setTimeout(() => history.push('/aqa/faculty'), 1000);
    } catch (e) {
      props.setLoading(false);
      const { response } = e;
      message.error('Something went wrong');
    }
  };

  const updateComment = () => {
    dispatch(getComments('Institution Faculty', `${id}`));
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/aqa/faculty">Faculty</Breadcrumb.Item>
        <Breadcrumb.Item>Faculty Details</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title={t('AQA.Faculty.title3')} />
        </Col>
        <Col span={24}>
        <div className='twocol-3070'>
          <div className='side-detail'>
              {isHDScreen ?
              <SideDetails data={sideData} type="button" bottom={bottomList} />
              :
              <SideDetailResponsive data={sideData} type='button' bottom={bottomList} />
              }
          </div>
          <div className='side-form'>
            <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
              <Row gutter={[20, 20]}>
                <Col span={24}>
                  <ActivationCard t={t} title={facultyApi?.status} status={status} onChange={onStatusChange} />
                </Col>
                {facultyApi?.expired?.length > 0 && (
                  <Col span={24}>
                    <ProgramCards data={facultyApi?.expired} title={t('Program.expired.title')} type={'expired'} />
                  </Col>
                )}
                {facultyApi?.expiring?.length > 0 && (
                  <Col span={24}>
                    <ProgramCards data={facultyApi?.expiring} title={t('Program.expiring.title')} type={'pending'} />
                  </Col>
                )}
                <Col span={24}>
                  <Form onFinish={handleSubmit(onFinish)} layout="vertical" scrollToFirstError={true}>
                    <Information
                      control={control}
                      errors={errors}
                      tags={tags}
                      deleted={deleted}
                      setDeleted={setDeleted}
                      setTags={setTags}
                      mode="edit"
                      t={t}
                    />
                  </Form>
                </Col>
                <Col span={24}>
                  <UpdateSection
                    data={commentsApi}
                    code={facultyApi.name}
                    module={'Institution Faculty'}
                    updateComment={updateComment}
                  />
                </Col>
              </Row>
            </Card>
          </div>
          </div>
        </Col>
      </Row>

      <Popup {...popup} />
    </>
  );
};
