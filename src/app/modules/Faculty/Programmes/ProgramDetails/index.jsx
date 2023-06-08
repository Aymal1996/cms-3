import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, Breadcrumb } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslate } from 'Translate';

import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import { getComments } from '../../../Application/ducks/actions';
import {getProgramDetails, getStaffNames, getSemesterDropdown} from '../ducks/actions';
import UpdateSection from '../../../../molecules/UpdateSection';
import DeletePopup from '../../../../molecules/DeletePopup';
import HeadingChip from '../../../../molecules/HeadingChip';
import SideDetails from '../../../../molecules/SideDetails';
import { Popup } from '../../../../atoms/Popup';
import AddForm from '../components/AddForm';

export default () => {
  const dispatch = useDispatch();
  const { control, errors, setValue, getValues } = useForm();
  const i18n = useTranslate();
  const { t } = i18n;

  const [visible, setVisible] = useState(false);
  const [delSem, setDelSem] = useState([]);
  const { id } = useParams();

  const programDetail = useSelector((state) => state.facultyProgramme.programDetails);
  const coordinator = useSelector((state) => state.facultyProgramme.staffNames);
  const programApi = useSelector((state) => state.programme.program);
  const commentsApi = useSelector((state) => state.global.comments);
  
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

  const sideData = [
    {
      type: 'tag',
      title: 'Programme',
      noDivider: true,
      highlight: true,
    },
    {
      type: 'code',
      text:programDetail[0]?.program_code,
      level2: isHDScreen ? 4 : 5,
      highlight: true,
      noDivider: true,
    },
    {
      type: 'mainTitle',
      title: programDetail[0]?.program_name,
      subtitle: '',
      level: isHDScreen ? 4 : 5,
      highlight: true,
    },
    {
      type: 'single',
      title: `Version ${programDetail[0]?.version}`,
      level: isHDScreen ? 4 : 5,
      highlight: true,
      noLine: true,
    },
    {
      type: 'titleValue',
      space: isHDScreen ? 10 : 4,
      level: isHDScreen ? 4 : 5,
      title: 'Programme Coordinator',
      value: coordinator?.employee_name,
    },
    {
      type: 'titleValue',
      title: 'Credits',
      space: isHDScreen ? 10 : 4,
      level: isHDScreen ? 4 : 5,
      value: `${programDetail[0]?.credit_hours} Credits`,
    },
    {
      type: 'titleValue',
      title: 'Number of Lecturers',
      space: isHDScreen ? 10 : 4,
      level: isHDScreen ? 4 : 5,
      value: `${12} Lecturers`,
      noDivider: true,
    },

    {
      type: 'titleValue',
      title: 'Number of Students',
      space: isHDScreen ? 10 : 4,
      level: isHDScreen ? 4 : 5,
      value: `${232} Students`,
      noDivider: true,
    },
  ];

  const popup = {
    closable: false,
    visibility: visible,
    class: 'black-modal',
    content: <DeletePopup title="Programme" onClose={() => setVisible(false)} onDelete={() => onDelete()} />,
    width: 536,
    onCancel: () => setVisible(false),
  };

  useEffect(() => {
    dispatch(getProgramDetails(id));
    dispatch(getStaffNames(id));
    dispatch(getSemesterDropdown(id));
    updateComment();
  }, []);

  const updateComment = () => {
    dispatch(getComments('Program Licensing', `PL-${id}`));
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/faculty/programme">Programmes</Breadcrumb.Item>
        <Breadcrumb.Item>Programme Details</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title={'Programme Details'} />
        </Col>
        <Col span={24}>
          <div className="twocol-3070">
            <div className="side-detail">
              {isHDScreen ? (
                <SideDetails data={sideData} type="button" />
              ) : (
                <SideDetailResponsive data={sideData} type="button" />
              )}
            </div>
            <div className="side-form">
              <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
                <Row gutter={[20, 20]}>
                  <Col span={24}>
                    <AddForm
                      control={control}
                      errors={errors}
                      delSem={delSem}
                      setDelSem={setDelSem}
                      getValues={getValues}
                      heading={'Program Details'}
                      setValue={setValue}
                      mode="edit"
                      t={t}
                    />
                  </Col>
                  <Col span={24}>
                    <UpdateSection
                      data={commentsApi}
                      code={programApi[0]?.licenses[0]?.name}
                      module={'Program Licensing'}
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
