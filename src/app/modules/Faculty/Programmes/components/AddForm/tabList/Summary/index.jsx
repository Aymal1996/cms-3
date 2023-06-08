import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'antd';
import DetailsComponent from '../../../../../../../molecules/DetailsComponent';
import { SelectField } from '../../../../../../../atoms/FormElement';
import { getDetailsColumn } from '../../../utils';
import { useForm } from 'react-hook-form';
import {getModuleList} from '../../../../ducks/actions';



export default (props) => {
  const [selectedRecord, setRecord] = useState([]);
  const [rowDetails, setRowDetail] = useState(false);
  const { control, setValue } = useForm()
  const { id } = useParams();
  const dispatch = useDispatch();
  const programDetail = useSelector((state) => state.facultyProgramme.programDetails);
  const semesterDropdown = useSelector((state) => state.facultyProgramme.semesterDropdown);
  const moduleList = useSelector((state) => state.facultyProgramme.moduleList);
  const [rowData, setRowData] = useState(null);

  let modulesDetails = [];
  moduleList?.map((e,ind) => {
    modulesDetails.push({
      label: 'Module ' + (ind+1),
      value: e?.module_name,
    })
  })

  useEffect(() => {
    if (Array.isArray(programDetail)) {
      const data = programDetail[0] ? getDetailsColumn(programDetail[0]) : null;
      data && setRowData(data);
    }
  }, [programDetail]);

  const getList = (res) => {
    dispatch(getModuleList(id, res.value));
  };

  useEffect(() => {
    if (Object.keys(semesterDropdown).length > 0) {
      if (semesterDropdown?.length > 0) {
        setValue('semester_dropdown', {
          value: semesterDropdown[0].structure_code, 
          label: semesterDropdown[0].structure_name
        });
      }
      dispatch(getModuleList(id, semesterDropdown[0].structure_code));
    }
  }, [semesterDropdown]);

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <DetailsComponent
          setRecord={setRecord}
          setRowDetail={setRowDetail}
          mainTitle="Programme Summary"
          data={rowData}
          detailClass={'detailAlignment'}
        />
      </Col>

      <Col span={24}>
        <SelectField
          fieldname='semester_dropdown'
          label=''
          class='mb-0 w-100'
          initValue=''
          control={control}
          iProps={{ placeholder: 'Select Semester' }}
          onChange={getList}
          selectOption={
            semesterDropdown &&
            semesterDropdown?.map((e) => {
              return { value: e.structure_code, label: e.structure_name };
            })
          }
        />
      </Col>

      <Col span={24}>
        <DetailsComponent
          setRecord={setRecord}
          setRowDetail={setRowDetail}
          mainTitle="Programme Modules"
          data={modulesDetails}
          detailClass={'detailAlignment'}
        />
      </Col>
    </Row>
  );
};
