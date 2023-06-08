import React, { useState, useEffect } from 'react';
import { Col, Row, Card, Tabs, Space, Button, Breadcrumb, message } from 'antd';
import SideDetails from '../../../../molecules/SideDetails';
import { useSelector, useDispatch } from 'react-redux';
import Content from './Conent';
import Summary from './Summary';
import Revisions from './Revisions';
import Students from './Students';
import AddNewMaterial from '../AddMaterials';
import Modules from './Modules';
import { apiMethod } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import { useParams } from 'react-router-dom';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { showMaterialForm } from '../ducks/actions';
import { addAppreciation } from '../ducks/services';

export default () => {
  const { id } = useParams();
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const [sideDetail, setSiteDetail] = useState();
  const [appreciation, setAppreciation] = useState('');
  const addMaterial = useSelector((state) => state.material.materialForm);
  const revButton = useSelector((state) => state.material.materialEdit);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

  const onAddAppreaction = () => {
    const payload = {
      rating: appreciation,
      name: id,
    };
    addAppreciation(payload).then((response) => {
      if (response?.data?.message.success) {
        message.success(response?.data?.message.message);
      } else {
        message.error('Something went wrong');
      }
    });
  };

  useEffect(() => {
    if (id) {
      axios.get(`${apiMethod}/faculty.materials.material_card?name=${id}`).then((response) => {
        if (response?.data?.message) {
          console.log(response?.data?.message);
          setSiteDetail(response.data.message);
          setAppreciation(response?.data?.message?.rating);
        }
      });
    }
  }, [id]);
  const sideData = [
    {
      type: 'tag',
      title: 'Material',
      noDivider: true,
      highlight: true,
    },

    {
      type: 'mainTitle',
      title: sideDetail?.material_name,
      highlight: true,
    },
    {
      type: 'rate',
      highlight: true,
      rating: appreciation,
      onSetAppreaction: setAppreciation,
      onAddAppreciation: onAddAppreaction,
    },
    {
      type: 'titleValue',
      title: 'Author',
      space: isHDScreen ? 10 : 4,
      level: isHDScreen ? 4 : 5,
      value: sideDetail?.author,
    },
    {
      type: 'titleValue',
      title: 'Material Type',
      space: isHDScreen ? 10 : 4,
      level: isHDScreen ? 4 : 5,
      value: sideDetail?.material_type,
    },
    {
      type: 'titleValue',
      title: 'Univeristy',
      space: isHDScreen ? 10 : 4,
      level: isHDScreen ? 4 : 5,
      value: sideDetail?.university,
    },

    ,
  ];

  const bottomList = [
    {
      title: `${revButton == 'rev' ? 'Revise' : 'Edit'} Material`,
      type: 'button',
      class: 'green-btn',
      action: () => dispatch(showMaterialForm(revButton == 'rev' ? 'revised' : 'edit')),
    },
  ];
  return (
    <>
      {addMaterial.length == 0 && (
        <Breadcrumb separator=">" className="mb-1">
          <Breadcrumb.Item href="/faculty/materials">Materials</Breadcrumb.Item>
          <Breadcrumb.Item>{'Material Detail'}</Breadcrumb.Item>
        </Breadcrumb>
      )}

      <Row gutter={[20, 30]}>
        {!addMaterial.length ? (
          <>
            <Col span={24}>
              <HeadingChip title={'Material Detail'} />
            </Col>
            <Col span={24}>
              <div className="twocol-3070">
                <div className="side-detail">
                  {isHDScreen ? (
                    <SideDetails data={sideData} type="button" bottom={bottomList} />
                  ) : (
                    <SideDetailResponsive data={sideData} type="button" bottom={bottomList} />
                  )}
                </div>
                <div className="side-form">
                  <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
                    <Row gutter={[20, 20]}>
                      <Col span={24}>
                        <Card bordered={false} className="uni-card h-auto w-100">
                          <Tabs defaultActiveKey="1" type="card" className="custom-tabs custom-tabs2 -space30">
                            <TabPane tab="Content" key="1">
                              <Content />
                            </TabPane>
                            <TabPane tab="Summary" key="2">
                              <Summary />
                            </TabPane>
                            <TabPane tab="Modules" key="3">
                              <Modules />
                            </TabPane>
                            <TabPane tab="Revisions" key="4">
                              <Revisions />
                            </TabPane>
                            <TabPane tab="Students" key="5">
                              <Students />
                            </TabPane>
                          </Tabs>
                        </Card>
                      </Col>
                    </Row>
                  </Card>
                </div>
              </div>
            </Col>
          </>
        ) : (
          <Col span={24}>
            <AddNewMaterial />
          </Col>
        )}
      </Row>
    </>
  );
};
