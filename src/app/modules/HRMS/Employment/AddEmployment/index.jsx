import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Button, Spin, Space, Form, message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import HeadingChip from 'Molecules/HeadingChip';
import { useHistory } from 'react-router-dom';
import EmployeeForm from '../components/EmployeeForm';
import { LoadingOutlined } from '@ant-design/icons';
import SideDetails from 'Molecules/SideDetails';
import SideDetailResponsive from 'Molecules/SideDetailResponsive';
import { useMediaQuery } from 'react-responsive';
import { useForm } from 'react-hook-form';
import { BreakingPoint } from '../../../../../configs/constantData';
import PlaceHolderImage from '../../../../../assets/img/scholarship-icon.svg';
import { getSingleUpload, uniquiFileName } from '../../../../../features/utility';
import { employApi, employAddApi, contractApi, leaveApi, employDraftApi } from '../ducks/services';
import { baseUrl } from '../../../../../configs/constants';

const { Title } = Typography;
const antIcon = <LoadingOutlined spin />;

export default (props) => {
  const [load, setLoad] = useState(false);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const { control, errors, setValue, getValues, reset, handleSubmit } = useForm();
  const history = useHistory();

  const onDraft = () => {
    const val = getValues();
    if (val.first_name && val.primary_email) {
      onFinish(val, 'Draft');
    } else {
      message.error('Please Enter Name and Primary Email');
    }
  };

  const onFinish = async (val, vstatus) => {
    // console.log('value', val);
    setLoad(true);

    let profileImg = '';
    let educate = [];
    let children = [];
    let work = [];
    let emergency = [];
    let status = 'Active';

    if (val.external_work_history && val.external_work_history.length > 0) {
      val.external_work_history.map((x) => {
        work.push({
          company_name: x.company_name,
          description: x.description,
          designation: x.designation.value,
          from_date: x.from_date,
          to_date: x.to_date,
        });
      });
    }

    if (val.emergency_contact && val.emergency_contact.length > 0) {
      val.emergency_contact.map((x) => {
        emergency.push({
          title: x.title ? x.title.value : '',
          relation_name: x.relation_name,
          relation: x.relation ? x.relation.value : '',
          email: x.email,
          phone: x.phone,
        });
      });
    }

    if (val.employee_children && val.employee_children.length > 0) {
      val.employee_children.map((x) => {
        children.push({
          salutation: x.salutation ? x.salutation.value : '',
          dob: x.dob,
          email: x.email,
          full_name: x.full_name,
          gender: x.gender ? x.gender.value : '',
          occupation: x.occupation,
        });
      });
    }

    let body = {
      //personal

      salutation: val?.salutation ? val.salutation?.value : '',
      first_name: val.first_name,
      image: '',
      gender: val.gender ? val.gender.value : '',
      marital_status: val.marital_status ? val.marital_status?.value : '',
      nationality: val.nationality ? val.nationality?.value : '',
      identification_type: val.identification_type ? val.identification_type?.value : '',
      identification_no: val.identification_no,
      date_of_birth: val.date_of_birth,
      date_of_joining: val.date_of_joining,
      race: val.race ? val.race?.value : '',
      religious: val.religious ? val.religious?.value : '',
      primary_phone_no: val.primary_phone_no,
      secondary_phone_no: val.secondary_phone_no,
      primary_email: val.primary_email,
      secondary_email: val.secondary_email,

      current_permanent_address: [
        {
          current_address_1: val.current_address_1,
          current_city: val.current_city,
          current_post_code: val.current_post_code,
          current_country: val.current_country ? val.current_country.value : '',
          permanent_state: val.current_state,
          current_address: 1,
        },
        {
          current_address_1: val.permanent_address_1,
          current_city: val.permanent_city,
          current_post_code: val.permanent_post_code,
          current_country: val.permanent_country ? val.permanent_country.value : '',
          permanent_state: val.permanent_state,
          permanent_address: 1,
        },
      ],

      spouse_salutation: val.spouse_salutation ? val.spouse_salutation?.value : '',
      spouse_name: val.spouse_name,
      spouse_gender: val.spouse_gender ? val.spouse_gender?.value : '',
      spouse_martial_status: val.spouse_martial_status ? val.spouse_martial_status?.value : '',
      spouse_nationality: val.spouse_nationality ? val.spouse_nationality?.value : '',
      spouse_identification_type: val.spouse_identification_type ? val.spouse_identification_type?.value : '',
      spouse_identification_no: val.spouse_identification_no,
      spouse_dob: val.spouse_dob,
      spouse_race: val.spouse_race ? val.spouse_race?.value : '',
      spouse_religious: val.spouse_religious ? val.spouse_religious?.value : '',
      spouse_employee_name: val.spouse_employee_name,
      spouse_employee_email: val.spouse_employee_email,
      spouse_phone_no: val.spouse_phone_no,
      spouse_income_tax_no: val.spouse_income_tax_no,

      emergency_contact: emergency,
      employee_children: children,
      education: [],
      external_work_history: work,

      // passport
      passport_number: val.passport_number,
      passport_status: val.passport_status ? val.passport_status.value : '',
      date_of_issue: val.date_of_issue,
      valid_upto: val.valid_upto,
      employment_pass_no: val.employment_pass_no,
      emp_pass_expiration_date: val.emp_pass_expiration_date != 'Invalid date' ? val.emp_pass_expiration_date : '',

      // medical
      blood_group: val.blood_group.value,
      height: val.height,
      weight: val.weight,
      health_details: val.health_details,
      status: 'Draft',
    };

    await employDraftApi(body).then(async (resname) => {

      let id = resname.data.message.name;

        if (val.image) {
          let modifiedName = uniquiFileName(val.image?.file?.originFileObj.name);
          let res = await getSingleUpload(modifiedName, 'image', val.image?.file?.originFileObj, 'Employee', id);
          profileImg = res?.file_url;
        }

        if (val.education && val.education.length > 0) {
          await Promise.all(
            val.education.map(async (x) => {
              let url = '';
              if (x.transcript) {
                let modifiedName = uniquiFileName(x.transcript?.file?.originFileObj.name);
                let res = await getSingleUpload(
                  modifiedName,
                  'image',
                  x.transcript?.file?.originFileObj,
                  'Employee',
                  id,
                );
                url = res?.file_url;
              }

              educate.push({
                cgpa: x.cgpa,
                country: x.country ? x.country?.value : '',
                fields: x.fields ? x.fields.value : '',
                year_of_passing: x.year_of_passing,
                from_date: x.from_date,
                level: x.level ? x.level?.value : '',
                school_univ: x.school_univ ? x.school_univ?.value : '',
                to_date: x.to_date,
                transcript: url ? url.replace(`${baseUrl}`, '') : '',
              });
            }),
          );
        }

        let passportImg = '';
        if (val?.attach_passport) {
          let modifiedName = uniquiFileName(val?.attach_passport?.file?.originFileObj.name);
          let res = await getSingleUpload(
            modifiedName,
            'image',
            val.attach_passport?.file?.originFileObj,
            'Employee',
            id,
          );
          passportImg = res?.file_url;
        }

        if (typeof vstatus == 'string') {
          status = 'Draft'
        }

        body["image"] = profileImg ? profileImg.replace(`${baseUrl}`, '') : '', 
        body["education"] = educate,
        body["attach_passport"] = passportImg,
        body["status"] = status,
        
        await employApi(body, id).then(async (res) => {

          if(status != 'Draft') {

            let empRole = [];
            let programlisting = [];
            let workhours = [];
            let contactPDF = '';

            if (val?.work_hour_template?.value == 'Custom Template') {
              val.work_hour_template_detail.map((x) => {
                workhours.push({
                  day: x.day,
                  work_hour_type: x.work_hour_type ? x.work_hour_type.value : '',
                  start_time: `${x.time_hour}:${x.time_min}:00`,
                  time_type: x.time_type ? x.time_type.value : '',
                  work_hours: x.work_hours,
                });
              });
            }

            if (val.employee_role.length > 0) {
              val.employee_role.map((x) => {
                empRole.push({
                  role: x.value,
                  role_name: x.label,
                });
              });
            }

            if (val?.program && val?.program.length > 0) {
              val.program.map((x) => {
                programlisting.push({
                  program: x.value,
                  program_name: x.label,
                });
              });
            }

            if (val.contract_attachment) {
              let modifiedName = uniquiFileName(val.contract_attachment?.file?.originFileObj.name);
              let res = await getSingleUpload(
                modifiedName,
                'image',
                val.contract_attachment?.file?.originFileObj,
                'Employee',
                id,
              );
              contactPDF = res?.file_url;
            }

            let body3 = {
              party_name: id,
              default_contract: 1,
              contract_type: val?.contract_type ? val?.contract_type?.value : '',
              employement_type: val?.employement_type ? val?.employement_type?.value : '',
              start_date: val.start_date ? val.start_date : '',
              end_date: val.end_date ? val.end_date : '',
              staff_category: val?.staff_category ? val?.staff_category?.value : '',
              company: val?.company,
              select_campus: val?.campus ? val?.campus?.value : '',
              select_faculty: val?.faculty ? val?.faculty?.value : '',
              program_list: programlisting,
              team: val?.team ? val?.team?.value : '',
              job_title: val?.job_title ? val?.job_title?.value : '',
              position_level: val?.position_level ? val?.position_level?.value : '',
              supervisor_id: val?.supervisor ? val?.supervisor?.value : '',
              employee_role: empRole,
              contract_attachment: contactPDF,
              work_hour_template:
                val?.work_hour_template?.value != 'Custom Template' ? val?.work_hour_template?.value : '',
              custom_work_hour_template: val?.work_hour_template?.value == 'Custom Template' ? 1 : 0,
              alternate_saturdays: val.alternate_saturdays == true ? 1 : 0,
              group: val.alternate_saturdays == true ? val?.group.value : '',
            };
            if (workhours.length > 0) {
              body['work_hour_template_detail'] = workhours;
            }
          
            contractApi(body3, null)
              .then((xe) => {
                setLoad(false);
                message.success('Employee Successfully Created');
                leaveApi(id);
                setTimeout(() => history.push('/hrms/employment'), 2000);
              })
              .catch((e) => {
                console.log(e);
                setLoad(false);
                message.error('Something went wrong');
              });
          } else {
            setLoad(false);
            message.success('Details Successfully Saved');
            setTimeout(() => history.push('/hrms/employment'), 2000);
          }
        })
        .catch((e) => {
          console.log(e);
          setLoad(false);
          message.error(e);
        });
    }).catch(err => {
      setLoad(false);
      message.error('Something went wrong');
    })
  };

  const sideData = {
    image: PlaceHolderImage,
    text: "Please fill up the details on the right. Once finished, click 'Save Draft' or 'Add Faculty' to proceed.",
  };

  const bottomList = [
    {
      title: 'Save Draft',
      type: 'button',
      class: 'black-btn',
      action: onDraft,
    },
    {
      title: 'Add Employee',
      type: 'submit',
      class: 'green-btn',
    },
  ];

  return (
    <Form layout="vertical" onFinish={handleSubmit(onFinish)} scrollToFirstError>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <Space direction="vertical" size={18}>
            <Button type="link" className="c-gray-linkbtn p-0" onClick={() => history.goBack()} htmlType="button">
              <LeftOutlined /> Back
            </Button>
            <HeadingChip title="Add Employee" />
          </Space>
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
                <Card bordered={false} className="uni-card h-auto w-100">
                  <Row gutter={[20, 30]}>
                    <Col flex="auto">
                      <Title level={4} className="mb-0">
                        Employment
                      </Title>
                    </Col>
                    <Col>
                      <Button
                        icon={<LeftOutlined />}
                        size="middle"
                        className="c-graybtn small-btn"
                        onClick={() => history.push('/hrms/requests')}
                      >
                        Categories
                      </Button>
                    </Col>
                    <Col span={24}>
                      <Spin indicator={antIcon} size="large" spinning={load}>
                        <EmployeeForm
                          mode="add"
                          setLoad={setLoad}
                          controlOut={control}
                          errorsOut={errors}
                          resetOut={reset}
                          setValueOut={setValue}
                          getValuesOut={getValues}
                        />
                      </Spin>
                    </Col>
                  </Row>
                </Card>
              </Card>
            </div>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
