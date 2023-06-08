import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import CardListSwitchLayout from 'Molecules/CardListSwitchLayout';
import MyMaterials from './components/MyMaterials';
import OverallMaterials from './components/OverallMaterials';
import AddNewMaterial from './AddMaterials';
import { useSelector, useDispatch } from 'react-redux';
import { showMaterialForm } from './ducks/actions';
import { allowed } from '../../../../routing/config/utils';
import AllRoles from '../../../../routing/config/AllRoles';

export default (props) => {

  const dispatch = useDispatch();
  const addMaterial = useSelector((state) => state.material.materialForm);
  let activeTab = 'MyMaterials';

  useEffect(() => {
    if (allowed([AllRoles.FACULTY.MANAGER], 'read') || allowed([AllRoles.FACULTY.DEAN], 'read')) {
      activeTab = 'OverallMaterials'
    }
  }, []);

  const tabs = [
    {
      visible: allowed([AllRoles.FACULTY.MANAGER], 'read') || allowed([AllRoles.FACULTY.DEAN], 'read'),
      title: 'OverAll Materials',
      key: 'OverallMaterials',
      Comp: OverallMaterials,
    },
    {
      visible: allowed([AllRoles.FACULTY.MATERIALS], 'read'),
      title: 'My Materials',
      key: 'MyMaterials',
      Comp: MyMaterials,
      iProps: {
        addbtn: '+ New Material',
        btnclass: 'green-btn w-100',
        btnAction: () => dispatch(showMaterialForm('add')),
      },
    },
  ];
  useEffect(() => {
    dispatch(showMaterialForm(''));
  }, []);
  return (
    <Row gutter={[24, 30]}>
      <Col span={24}>
        {!addMaterial.length ? <CardListSwitchLayout tabs={tabs} active={activeTab} /> : <AddNewMaterial />}
      </Col>
    </Row>
  );
};
