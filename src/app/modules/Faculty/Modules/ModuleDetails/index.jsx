import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Breadcrumb } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UpdateSection from '../../../../molecules/UpdateSection';
import { getComments, emptyComments } from '../../../Application/ducks/actions';
import SideDetails from '../../../../molecules/SideDetails';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import ModuleTabs from '../components/ModuleTabs';
import { getModuleSummary } from '../ducks/actions';

export default (props) => {
  
  const dispatch = useDispatch();
  const { id } = useParams();
  const commentsApi = useSelector((state) => state.global.comments);
  const summary = useSelector(state => state.facultyModules.moduleSummary);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

  const sideData = [
    {
      type: 'tag',
      title: 'Module',
      subChild: true,
      subChildText: summary?.module_code,
      subChildTitle: summary?.module_name,
      highlight: true,
    },
    {
        type: 'titleValue',
        title: 'Programme',
        level: isHDScreen ? 4 : 5,
        value: summary?.program_var,
        highlight: true,
        noLine: true
      },
    {
      type: 'titleValue',
      title: 'Credits',
      level: isHDScreen ? 4 : 5,
      value: `${summary?.credit} Credits`,
    },
    {
      type: 'titleValue',
      level: isHDScreen ? 4 : 5,
      title: 'Hours',
      value: `${summary?.hours} Hours`,
    },
    {
        type: 'titleValue',
        level: isHDScreen ? 4 : 5,
        title: 'Learning Type',
        value: summary?.learning_mode,
      },
      {
        type: 'titleValue',
        level: isHDScreen ? 4 : 5,
        title: 'Class Per Week',
        value: `${summary?.class_per_week} Classes`,
      },
    {
      type: 'titleValue',
      title: 'Module Fee',
      level: isHDScreen ? 4 : 5,
      value: `${summary?.fee_currency} ${summary?.module_fee}`,
      noDivider: true,
    },
  ];

  useEffect(() => {
      dispatch(getModuleSummary(id));
      dispatch(getComments('Faculty Module', `${id}`));
    return () => {
      dispatch(emptyComments());
    };
  }, []);

  const updateComment = () => {
    dispatch(getComments('Faculty Module', `${id}`));
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/faculty/modules">Module</Breadcrumb.Item>
        <Breadcrumb.Item>Module Details</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title='Module Details' />
        </Col>
        <Col span={24}>
        <div className='twocol-3070'>
          <div className='side-detail'>
              {isHDScreen ?
              <SideDetails data={sideData} />
              :
              <SideDetailResponsive data={sideData} />
              }
          </div>
          <div className='side-form'>
            <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <Card bordered={false} className="uni-card h-auto w-100">
                    <ModuleTabs id={id} />
                </Card>
              </Col>
              <Col span={24}>
                <UpdateSection
                  data={commentsApi}
                  code={summary.name}
                  module={'Faculty Module'}
                  updateComment={updateComment}
                />
              </Col>
            </Row>
          </Card>
          </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
