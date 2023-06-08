import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, message, Breadcrumb } from 'antd';
import { useTranslate } from 'Translate';
import PlaceHolderImage from '../../../../../assets/img/scholarship-icon.svg';
import HeadingChip from '../../../../molecules/HeadingChip';
import ScholarshipForm from '../components/ScholarshipForm';
import { useForm } from 'react-hook-form';
import { apiMethod } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import { useHistory } from 'react-router';
import SideDetails from '../../../../molecules/SideDetails';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import { addScholarship } from '../ducks/services';

export default (props) => {
  const { control, errors, setValue, handleSubmit, reset } = useForm();
  const history = useHistory();
  const [status, setStatus] = useState('Active');
  const i18n = useTranslate();
  const { t } = i18n;
  const [deleted, setDeleted] = useState([]);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

  const saveDraft = () => {};

  const sideData = {
    image: PlaceHolderImage,
    text: "Please fill up the details on the right. Once finished, click 'Save Draft' or 'Add Scholarship' to proceed."
  }

  const bottomList = [
      {
          title: 'Save Draft',
          type: 'submit',
          class: 'black-btn',
      },
      {
          title: 'Add Scholarship',
          type: 'submit',
          class: 'green-btn',
      }
  ]

  const onFinish = async (val) => {
    props.setLoading(true);
    let schemes_array = [];
    val?.schemes_structure?.map((resp) => {

      schemes_array.push({
        scheme_name: resp?.scheme_name,
        scholarship_type: resp?.scholarship_type?.value,
        renewal_condition: resp?.renewal_condition.value,
        waive_registration_fee: resp?.wave ? resp?.wave.find(x => x == 'waive_registration_fee') ? 1 : 0 : 0,
        waive_resource_fee: resp?.wave ? resp?.wave.find(x => x == 'waive_resource_fee') ? 1 : 0 : 0,
        waive_administration_fee: resp?.wave ? resp?.wave.find(x => x == 'waive_administration_fee') ? 1 : 0 : 0,
        waive_security_deposit_fee: resp?.wave ? resp?.wave.find(x => x == 'waive_security_deposit_fee') ? 1 : 0 : 0,
        waive_woc_fee: resp?.wave ? resp?.wave.find(x => x == 'waive_woc_fee') ? 1 : 0 : 0,
      });
    });

    const payload = {
      scholarship_code: val?.scholarship_code,
      scholarship_name: val?.scholarship_name,
      contact_person: val?.contact_person,
      address: val?.address,
      state: val?.state,
      postcode: val?.postcode,
      country: val?.country?.value,
      city: val?.city,
      email: val?.email,
      contact_number: val?.contact_number,
      status: status,
      schemes: schemes_array,
      scholarship_student_list: [],
    };

    addScholarship(payload).then(res => {
      props.setLoading(false);
      message.success('Scholorship Successfully Added');
      setTimeout(() => history.push('/registry/scholarships'), 1000);
    }).catch(e => {
      const { response } = e;
      message.error('Something went wrong');
      props.setLoading(false);
    })
  };

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item href="/registry/scholarships">Scholarships</Breadcrumb.Item>
        <Breadcrumb.Item>Add New Scholarship</Breadcrumb.Item>
      </Breadcrumb>
      <Form layout="vertical" scrollToFirstError={true} onFinish={handleSubmit(onFinish)}>
        <Row gutter={[30, 24]}>
          <Col span={24}>
            <HeadingChip title="Add New Scholarship" />
          </Col>
          <Col span={24}>
            <div className='twocol-3070'>
                <div className='side-detail'>
                    {isHDScreen ?
                    <SideDetails data={sideData} cardType='empty' type="button" bottom={bottomList} />
                    :
                    <SideDetailResponsive data={sideData} cardType='empty' type='button' bottom={bottomList} />
                    }
                </div>
                <div className='side-form'>
                    <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
                      <ScholarshipForm
                        heading='Scholarship Information'
                        control={control}
                        errors={errors}
                        setValue={setValue}
                        mode="add"
                        deleted={deleted}
                        setDeleted={setDeleted}
                        t={t}
                      />
                    </Card>
                  </div>
                </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};
