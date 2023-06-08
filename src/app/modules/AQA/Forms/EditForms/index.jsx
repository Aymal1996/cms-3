import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, message, Breadcrumb } from 'antd';
import { useTranslate } from 'Translate';
import AddFormsComp from '../components/AddFormsComp';
import HeadingChip from '../../../../molecules/HeadingChip';

import { useForm } from 'react-hook-form';
import { apiresource } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleForm, emptyForms } from '../ducks/actions';
import { Popup } from '../../../../atoms/Popup';
import DeletePopup from '../../../../molecules/DeletePopup';
import moment from 'moment';
import SideDetails from '../../../../molecules/SideDetails';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import ActivationCard from '../../../../atoms/ActivationCard';
import { useParams, useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';

export default (props) => {
  const i18n = useTranslate();
  const { t } = i18n;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState([]);
  const [tags, setTags] = useState([]);
  const [deletedF, setDeletedF] = useState([]);
  const history = useHistory();
  const [status, setStatus] = useState();
  const [visible, setVisible] = useState(false);
  const { control, errors, setValue, handleSubmit } = useForm();
  const formApi = useSelector((state) => state.forms.formdetail);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

  const sideData = [
    {
      type: 'tag',
      title: 'Forms',
      subChild: true,
      subChildTitle: formApi?.form_name,
      highlight: true,
      noLine: true
    },
    {
      type: 'reversetitleValue',
      title: 'Fields',
      level1: isHDScreen ? 3 : 4,
      level2: isHDScreen ? 4 : 5,
      value: formApi?.form_fields?.length,
    },
    {
      type: 'titleValue',
      title: 'Last Used',
      level: isHDScreen ? 4 : 5,
      space: isHDScreen ? 10 : 4,
      value: formApi?.modified ? moment(formApi.modified).format('Do MMMM YYYY') : '',
      noDivider: true,
    },
  ];

  const bottomList = [
    {
      title: 'Delete Form',
      type: 'button',
      class: 'black-btn',
      action: () => setVisible(true),
    },
  ];

  useEffect(() => {
    dispatch(getSingleForm(id));
    return () => dispatch(emptyForms())
  }, []);

  useEffect(() => {
    if (formApi) {
      setValue('form_name', formApi.form_name);
      setValue('form_fields', formApi.form_fields);
      
      let field = [];
      formApi?.form_fields?.map((item) => {
        field.push({
          field_name: { name: item.field_name, type: item.type }
        });
      });
      setValue('form_fields', field);

      let dept = [];
      formApi?.departments?.map((item) => {
        dept.push({
          department: item.department,
          doctype: item.doctype,
        });
      });
      setStatus(formApi.status);
      setTags(dept);
    }
  }, [formApi]);

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
      setStatus('Inactive');
    }
  };

  const onFinish = async (val) => {
    props.setLoading(true);

    if (tags.length < 1) {
      props.setLoading(false);
      message.error('Please Add Department')
      return false;
    }

    let seen = new Set();
    var hasDuplicates = val.form_fields.some((currentObject) => {
        return seen.size === seen.add(currentObject.field_name.value).size;
    });

    if (hasDuplicates) {
        props.setLoading(false);
        message.error('Remove duplicate fields')
        return false;
    }
    
    let allfields = [];
    val.form_fields.map((x) => {
      allfields.push({
        field_name: x.field_name.value,
        field_type: x.field_name.type,
      });
    });

    const payLoad = {
      form_name: val.form_name,
      status: status,
      form_fields: allfields,
      departments: tags,
    };

    let url = `${apiresource}/AQA Form Listing/${formApi?.name}`;
    try {
      await axios.put(url, payLoad);
      props.setLoading(false);
      message.success('Form Successfully Updated');
      setTimeout(() => history.push('/aqa/forms'));
    } catch (e) {
      const { response } = e;
      console.log('error', response.data.message);
      message.error('Something went wrong');
      props.setLoading(false);
    }
  };

  const onDelete = async () => {
    props.setLoading(true);
    let url = `${apiresource}/AQA Form Listing/${formApi?.name}`;
    try {
      await axios.delete(url);
      props.setLoading(false);
      message.success('Module Successfully Deleted');
      setVisible(false);
      setTimeout(() => history.push('/aqa/modules'), 1000);
    } catch (e) {
      const { response } = e;
      message.error('Something went wrong');
      props.setLoading(false);
    }
  };

  return (
    <>
      <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onFinish)}>
        <Breadcrumb separator=">" className="mb-1">
          <Breadcrumb.Item href="/aqa/forms">Forms</Breadcrumb.Item>
          <Breadcrumb.Item>Form Details</Breadcrumb.Item>
        </Breadcrumb>
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <HeadingChip title={'Form Details'} />
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
                    <ActivationCard t={t} title={formApi?.status} status={status} onChange={onStatusChange} />
                  </Col>
                  <Col span={24}>
                    <AddFormsComp
                      control={control}
                      errors={errors}
                      deleted={deleted}
                      setDeleted={setDeleted}
                      deletedF={deletedF}
                      tags={tags}
                      setTags={setTags}
                      setDeletedF={setDeletedF}
                      mode="edit"
                      t={t}
                    />
                  </Col>
                </Row>
              </Card>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
      <Popup {...popup} />
    </>
  );
};
