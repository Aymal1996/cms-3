import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, message, Breadcrumb } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useHistory, useParams } from 'react-router-dom';
import { useTranslate } from 'Translate';
import { useForm } from 'react-hook-form';
import Information from '../AddModule/Information';
import ActivationCard from '../../../../atoms/ActivationCard';
import ProgramCards from '../../../../molecules/ProgramCards';
import { getSingleModule, getExpiring } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Popup } from '../../../../atoms/Popup';
import DeletePopup from '../../../../molecules/DeletePopup';
import { apiresource } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import UpdateSection from '../../../../molecules/UpdateSection';
import { getComments, emptyComments } from '../../../Application/ducks/actions';
import SideDetails from '../../../../molecules/SideDetails';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';

export default (props) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();
  const { control, errors, getValues, setValue, handleSubmit } = useForm();
  const [tags, setTags] = useState([]); 

  const [status, setStatus] = useState();
  const [visible, setVisible] = useState(false);
  const moduleApi = useSelector((state) => state.modules.module);
  const commentsApi = useSelector((state) => state.global.comments);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

  const i18n = useTranslate();
  const { t } = i18n;



  const sideData = [
    {
      type: 'tag',
      title: 'Module',
      subChild: true,
      subChildText: moduleApi?.module_code,
      subChildTitle: moduleApi?.module_name,
      highlight: true,
      noLine: true
    },
    {
      type: 'titleValue',
      title: 'Credits',
      level: isHDScreen ? 4 : 5,
      value: `${moduleApi?.credit} Credits`,
    },
    {
      type: 'titleValue',
      level: isHDScreen ? 4 : 5,
      title: 'Hours',
      value: `${moduleApi?.hours} Hours`,
    },
	
	 {
      type: 'titleValue',
      level: isHDScreen ? 4 : 5,
      title: 'Class per Week',
      value: `${moduleApi?.class_per_week} Class per Week`,
    },
	
	 {
      type: 'titleValue',
      level: isHDScreen ? 4 : 5,
      title: 'Classroom Type',
      value: `${moduleApi?.class_room_type}`,
    },
	 
	  {
      type: 'titleValue',
      level: isHDScreen ? 4 : 5,
      title: 'Learning Mode',
      value: moduleApi?.learning_mode ? moduleApi?.learning_mode : '',
    },
    {
      type: 'titleValue',
      title: 'Module Fee',
      level: isHDScreen ? 4 : 5,
      value: `${moduleApi?.fee_currency ? moduleApi?.fee_currency : ''} ${moduleApi?.module_fee}`,
      noDivider: true,
    },
  ];

  const bottomList = [
    {
      title: 'Delete Module',
      type: 'button',
      class: 'black-btn',
      action: () => setVisible(true),
    },
  ];

  useEffect(() => {
      dispatch(getSingleModule(id));
      dispatch(getComments('AQA Module', `${id}`));
    return () => {
      dispatch(emptyComments());
    };
  }, []);

  useEffect(() => {
    if (Object.keys(moduleApi).length > 0) {
      setValue('name', moduleApi.module_name);
      setValue('code', moduleApi.module_code);
	    setValue('classperWeek', moduleApi.class_per_week);
      setValue('fee', moduleApi.module_fee);
      setValue('type', moduleApi.type ? { label: moduleApi.type, value: moduleApi.type } : '');
      setValue('credit', moduleApi.credit);
      setValue('hours', moduleApi.hours);  
	    setValue('learningMode', moduleApi.learning_mode ? { label: moduleApi.learning_mode, value: moduleApi.learning_mode }: '');
	    setValue('classroomType', moduleApi.class_room_type ? { label: moduleApi.class_room_type, value: moduleApi.class_room_type }: '');
      setValue('currency', moduleApi.fee_currency ? { label: moduleApi.fee_currency, value: moduleApi.fee_currency }: '');
      setStatus(moduleApi.status);
    
      let preq = [];
      moduleApi?.module_prerequisites.length > 0 && moduleApi?.module_prerequisites.map(x => {
        preq.push({
          label: x.module_name,
          value: x.name
        })
      })
      setValue('prequel', preq)
	  
	  let program = [];
      moduleApi?.programmes.map((item) => {
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
  }, [moduleApi]);

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
      if (moduleApi?.status == 'Draft') {
        setStatus('Draft');
      } else if (moduleApi?.status == 'Archive') {
        setStatus('Archive');
      } else {
        setStatus('Inactive');
      }
    }
  };

  const onDraft = () => {
    let val = getValues();
    if(val.name && val.code) {
      onFinish(val);
    } else {
      message.error('Please Enter Code and Module Name')
    }
  }

  const onFinish = async (val) => {
    console.log('check', val)
    props.setLoading(true);
    // Programmes
    let prog = [];
    tags.map((item) => {
      prog.push({
        program: item.program,
        status: item.status,
      });
    });
	
		// Module Outline 
    let outline = [];
    val.outlines && val.outlines.length > 0 && val.outlines?.map(item => {
      outline.push({
        type: item.outlineType.label,
				weight: item.weightage.label
      });
    }) 
		 
    // check weightage 100%
    let checkWeight = [];
    val.outlines && val.outlines.length > 0 && val.outlines?.map(item => {
      checkWeight.push({
        weight: Number(item.weightage.label.replace('%', '')),
        type: item.outlineType.label
      });
    });

    let sum = checkWeight.reduce((a, b) => +a + +b.weight, 0);
		 
    if(val.outlines && val.outlines.length > 0 && sum != 100){
      message.error('Total Weightage must be equal to 100%');
      props.setLoading(false);  
      return false;
    }
		 
		// materials 
    let material_data = [];
    val.materials && val.materials.length> 0 && val.materials?.map(item => {
        material_data.push({
        week: item.weeks.label,
        material_type: item.materialType.label,	
        week_name: item.week_name,
      })
    }) 

    // Prerequisite
    let preqreq = [];
    val?.prequel && val?.prequel.length > 0 && val?.prequel.map(x => {
        preqreq.push({
            module: x.value,
        })
    })

    const json = {
      module_code: val.code,
      module_name: val.name,
      type: val.type.label,
      credit: val.credit,
      hours: val.hours,
	    learning_mode: val.learningMode.label,
	    class_room_type: val.classroomType.label,
	    class_per_week: val.classperWeek,
      fee_currency: val.currency.label,
      module_fee: val.fee,
      status: status,
	    module_outline: outline,
	    add_module_materials: material_data,
      programmes: prog,
      module_prerequisites: preqreq
    };

    console.log('check', json)
	
    let url = `${apiresource}/AQA Module/${moduleApi?.name}`;

    try {
      await axios.put(url, json);
      props.setLoading(false);
      message.success('Module Successfully Updated');
      setTimeout(() => history.push('/aqa/modules'), 1000);
    } catch (e) {
      const { response } = e;
      message.error('Something went wrong');
      props.setLoading(false);
    }
  };

  const onDelete = async () => {
    props.setLoading(true);
    let url = `${apiresource}/AQA Module/${moduleApi?.name}`;
    try {
      await axios.delete(url);
      message.success('Module Successfully Deleted');
      setVisible(false);
      props.setLoading(false);
      setTimeout(() => history.push('/aqa/modules'), 1000);
    } catch (e) {
      const { response } = e;
      message.error('Something went wrong');
      props.setLoading(false);
    }
  };

  const updateComment = () => {
    dispatch(getComments('AQA Module', `${id}`));
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/aqa/modules">Module</Breadcrumb.Item>
        <Breadcrumb.Item>Module Details</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title={t('AQA.Module.title3')} />
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
                <ActivationCard t={t} title={moduleApi?.status} status={status} onChange={onStatusChange} />
              </Col>
              {moduleApi?.expired?.length > 0 && (
                <Col span={24}>
                  <ProgramCards data={moduleApi?.expired} title={t('Program.expired.title')} type={'expired'} />
                </Col>
              )}
              {moduleApi?.expiring?.length > 0 && (
                <Col span={24}>
                  <ProgramCards data={moduleApi?.expiring} title={t('Program.expiring.title')} type={'pending'} />
                </Col>
              )}
              <Col span={24}>
                <Form onFinish={handleSubmit(onFinish)} layout="vertical" scrollToFirstError={true}>
                  <Information
                    control={control}
                    errors={errors}
					          setValue={setValue}
					          moduleApi={moduleApi}
                    tags={tags}
                    status={status}
                    onDraft={onDraft}
                    setTags={setTags}
                    mode="edit"
                    t={t}
                  />
                </Form>
              </Col>
              <Col span={24}>
                <UpdateSection
                  data={commentsApi}
                  code={moduleApi.name}
                  module={'AQA Module'}
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
