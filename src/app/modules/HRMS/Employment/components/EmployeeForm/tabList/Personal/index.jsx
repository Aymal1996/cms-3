import React, { useEffect } from 'react';
import { Form, message } from 'antd';
import { useForm } from 'react-hook-form';
import {
  getCountry,
  getNationality,
  getRace,
  getReligion,
  getMarital,
  getGender,
  getInstitution,
  getEducationType,
} from '../../../../../../Application/ducks/actions';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import MainForm from './MainForm';
import { getFileName, uniquiFileName, getSingleUpload } from '../../../../../../../../features/utility';
import { employApi, employUpdateImage } from '../../../../ducks/services';
import { baseUrl } from '../../../../../../../../configs/constants';

export default (props) => {
  const { mode, data, updateApi, id, setLoad, controlOut, errorsOut, setValueOut, getValuesOut, idState, setidState } =
    props;
  const dispatch = useDispatch();
  const {
    control: controlIn,
    errors: errorsIn,
    setValue: setValueIn,
    getValues: getValuesIn,
    handleSubmit: handleSubmitIn,
  } = useForm();

  useEffect(() => {
    dispatch(getCountry());
    dispatch(getNationality());
    dispatch(getRace());
    dispatch(getReligion());
    dispatch(getMarital());
    dispatch(getGender());
    dispatch(getInstitution());
    dispatch(getEducationType());
  }, []);

  useEffect(() => {
    if (mode == 'edit' && data && Object.keys(data).length > 0) {
      console.log('checking', data);
      setValueIn('salutation', data?.salutation ? { label: data?.salutation, value: data?.salutation } : '');
      setValueIn('first_name', data?.first_name + ' ' + data?.last_name);
      setValueIn(
        'image',
        data?.image
          ? {
              fileList: [
                { uid: '-1', name: getFileName(data?.image), status: 'done', url: `${baseUrl}${data?.image}` },
              ],
            }
          : '',
      );
      setValueIn('gender', data?.gender ? { label: data?.gender, value: data?.gender } : '');
      setValueIn(
        'marital_status',
        data?.marital_status ? { label: data?.marital_status, value: data?.marital_status } : '',
      );
      setValueIn('nationality', data?.nationality ? { label: data?.nationality, value: data?.nationality } : '');
      if (data?.identification_type) {
        setValueIn(
          'identification_type',
          data?.identification_type ? { label: data?.identification_type, value: data?.identification_type } : '',
        );
        data?.identification_type == 'IC' ? setidState(false) : setidState(true);
      }
      setValueIn('identification_no', data?.identification_no);
      setValueIn('date_of_birth', data?.date_of_birth ? moment(data?.date_of_birth, 'YYYY MM DD') : '');
      setValueIn('date_of_joining', data?.date_of_joining ? moment(data?.date_of_joining, 'YYYY MM DD') : '');
      setValueIn('race', data?.race ? { label: data?.race_name, value: data?.race } : '');
      setValueIn('religious', data?.religious ? { label: data?.religion_name, value: data?.religious } : '');

      if (data?.current_permanent_address && data?.current_permanent_address.length > 0) {
        if (data?.current_permanent_address[0]?.current_address == 1) {
          setValueIn('current_address_1', data?.current_permanent_address[0].current_address_1);
          setValueIn('current_state', data?.current_permanent_address[0].permanent_state);
          setValueIn('current_post_code', data?.current_permanent_address[0].current_post_code);
          setValueIn(
            'current_country',
            data?.current_permanent_address[0]?.current_country
              ? {
                  label: data?.current_permanent_address[0].current_country,
                  value: data?.current_permanent_address[0].current_country,
                }
              : '',
          );
          setValueIn('current_city', data?.current_permanent_address[0].current_city);
        }
        if (data?.current_permanent_address[1]?.permanent_address == 1) {
          setValueIn('permanent_address_1', data?.current_permanent_address[1].current_address_1);
          setValueIn('permanent_state', data?.current_permanent_address[1].permanent_state);
          setValueIn('permanent_post_code', data?.current_permanent_address[1].current_post_code);
          setValueIn(
            'permanent_country',
            data?.current_permanent_address[1]?.current_country
              ? {
                  label: data?.current_permanent_address[1].current_country,
                  value: data?.current_permanent_address[1].current_country,
                }
              : '',
          );
          setValueIn('permanent_city', data?.current_permanent_address[1].current_city);
        }
      }

      setValueIn(
        'spouse_salutation',
        data?.spouse_salutation ? { label: data?.spouse_salutation, value: data?.spouse_salutation } : '',
      );
      setValueIn('spouse_name', data?.spouse_name);
      setValueIn(
        'spouse_gender',
        data?.spouse_gender ? { label: data?.spouse_gender, value: data?.spouse_gender } : '',
      );
      setValueIn(
        'spouse_martial_status',
        data?.spouse_martial_status ? { label: data?.spouse_martial_status, value: data?.spouse_martial_status } : '',
      );
      setValueIn(
        'spouse_nationality',
        data?.spouse_nationality ? { label: data?.spouse_nationality, value: data?.spouse_nationality } : '',
      );
      setValueIn(
        'spouse_identification_type',
        data?.spouse_identification_type
          ? { label: data?.spouse_identification_type, value: data?.spouse_identification_type }
          : '',
      );
      setValueIn('spouse_identification_no', data?.spouse_identification_no);
      setValueIn('spouse_dob', data?.spouse_dob ? moment(data?.spouse_dob, 'YYYY MM DD') : '');
      setValueIn('spouse_race', data?.spouse_race ? { label: data?.spouse_race_name, value: data?.spouse_race } : '');
      setValueIn(
        'spouse_religious',
        data?.spouse_religious ? { label: data?.spouse_religious_name, value: data?.spouse_religious } : '',
      );
      setValueIn('spouse_employee_name', data?.spouse_employee_name);
      setValueIn('spouse_employee_email', data?.spouse_employee_email);
      setValueIn('spouse_phone_no', data?.spouse_phone_no);
      setValueIn('spouse_income_tax_no', data?.spouse_income_tax_no);

      setValueIn('primary_phone_no', data?.primary_phone_no);
      setValueIn('secondary_phone_no', data?.secondary_phone_no);
      setValueIn('primary_email', data?.primary_email);
      setValueIn('secondary_email', data?.secondary_email);

      setValueIn('education', data?.education);
      setValueIn('external_work_history', data?.external_work_history);
      setValueIn('emergency_contact', data?.emergency_contact);
      setValueIn('employee_children', data?.employee_children);
    }
  }, [data]);

  const onFinish = async (val) => {
    if (data.status == 'Draft') {
      message.warning('Please Add Contract to Activate your account');
    }
    setLoad(true);

    let profileImg = '';
    if (val.image) {
      if (val.image.fileList[0].uid != '-1') {
        let modifiedName = uniquiFileName(val.image?.file?.originFileObj.name);
        let res = await getSingleUpload(modifiedName, 'image', val.image?.file?.originFileObj, 'Employee', id);
        profileImg = res?.file_url;
      } else {
        profileImg = val.image.fileList[0].url;
      }
    }

    let educate = [];
    let children = [];
    let work = [];
    let emergency = [];

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
          title: x.title.value,
          relation_name: x.relation_name,
          relation: x.relation.value,
          email: x.email,
          phone: x.phone,
        });
      });
    }

    if (val.education && val.education.length > 0) {
      await Promise.all(
        val.education.map(async (x) => {
          let url = '';
          if (x.transcript) {
            if (x.transcript.fileList[0].uid != '-1') {
              let modifiedName = uniquiFileName(x.transcript?.file?.originFileObj.name);
              let res = await getSingleUpload(modifiedName, 'image', x.transcript?.file?.originFileObj, 'Employee', id);
              url = res?.file_url;
            } else {
              url = x.transcript.fileList[0].url;
            }
          }
          educate.push({
            cgpa: x.cgpa,
            country: x.country?.value,
            fields: x.fields.value,
            year_of_passing: x.year_of_passing,
            from_date: x.from_date,
            level: x.level?.value,
            school_univ: x.school_univ?.value,
            to_date: x.to_date,
            transcript: url ? url.replace(`${baseUrl}`, '') : '',
          });
        }),
      );
    }

    if (val.employee_children && val.employee_children.length > 0) {
      val.employee_children.map((x) => {
        children.push({
          salutation: x.salutation.value,
          dob: x.dob,
          email: x.email,
          full_name: x.full_name,
          gender: x.gender.value,
          occupation: x.occupation,
        });
      });
    }

    const body = {
      salutation: val.salutation?.value,
      first_name: val.first_name,
      image: profileImg ? profileImg.replace(`${baseUrl}`, '') : '',
      gender: val.gender ? val.gender.value : '',
      marital_status: val.marital_status?.value,
      nationality: val.nationality?.value,
      identification_type: val.identification_type?.value,
      identification_no: val.identification_no,
      date_of_birth: val.date_of_birth,
      date_of_joining: val.date_of_joining,
      race: val.race?.value,
      religious: val.religious?.value,
      primary_phone_no: val.primary_phone_no,
      secondary_phone_no: val.secondary_phone_no,
      primary_email: val.primary_email,
      secondary_email: val.secondary_email,

      current_permanent_address: [
        {
          current_address_1: val.current_address_1,
          current_city: val.current_city,
          current_post_code: val.current_post_code,
          current_country: val.current_country.value,
          permanent_state: val.current_state,
          current_address: 1,
        },
        {
          current_address_1: val.permanent_address_1,
          current_city: val.permanent_city,
          current_post_code: val.permanent_post_code,
          current_country: val.permanent_country.value,
          permanent_state: val.permanent_state,
          permanent_address: 1,
        },
      ],

      spouse_salutation: val.spouse_salutation?.value,
      spouse_name: val.spouse_name,
      spouse_gender: val.spouse_gender?.value,
      spouse_martial_status: val.spouse_martial_status?.value,
      spouse_nationality: val.spouse_nationality?.value,
      spouse_identification_type: val.spouse_identification_type?.value,
      spouse_identification_no: val.spouse_identification_no,
      spouse_dob: val.spouse_dob,
      spouse_race: val.spouse_race?.value,
      spouse_religious: val.spouse_religious?.value,
      spouse_employee_name: val.spouse_employee_name,
      spouse_employee_email: val.spouse_employee_email?.value,
      spouse_phone_no: val.spouse_phone_no,
      spouse_income_tax_no: val.spouse_income_tax_no,

      emergency_contact: emergency,
      employee_children: children,
      education: educate,
      external_work_history: work,
    };
    await employUpdateImage(val.primary_email, {
      user_image: profileImg ? profileImg.replace(`${baseUrl}`, '') : '',
    });
    employApi(body, id)
      .then((res) => {
        setLoad(false);
        updateApi();
        message.success('Detail Successfully Saved');
      })
      .catch((e) => {
        console.log(e);
        setLoad(false);
        message.error(e);
      });
  };

  return (
    <>
      {mode == 'edit' ? (
        <Form layout="vertical" onFinish={handleSubmitIn(onFinish)} scrollToFirstError>
          <MainForm
            control={controlIn}
            errors={errorsIn}
            mode={mode}
            setValue={setValueIn}
            getValues={getValuesIn}
            idState={idState}
            setidState={setidState}
          />
        </Form>
      ) : (
        <MainForm
          control={controlOut}
          errors={errorsOut}
          mode={mode}
          setValue={setValueOut}
          getValues={getValuesOut}
          idState={idState}
          setidState={setidState}
        />
      )}
    </>
  );
};
