import React, { useState, useEffect } from 'react';
import ListFormComp from 'Molecules/ListFormComp';
import { useFieldArray } from 'react-hook-form';
import { etypeList, ctypeList, staffCategory, positionList, workType, timelap, alternateSat } from '../../../../../../../../../../configs/constantData';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../../../../../../../../../services/axiosInterceptor';
import { apiMethod } from '../../../../../../../../../../configs/constants';
import moment from 'moment';
import Activations from '../Activations';
import { allowed } from '../../../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../../../routing/config/Roles';
import { getEmployCampus, getEmployFaculty, getEmployProgram } from '../../../../../../ducks/action';

  const custom = [
    {
      day: "Monday",
      work_hour_type: "Full Day",
      time_hour: 1,
      time_min: 0,
      time_type: "",
      work_hours: 8,
    },
    {
      day: "Tuesday",
      work_hour_type: "Full Day",
      time_hour: 1,
      time_min: 0,
      time_type: "",
      work_hours: 8,
    },
    {
      day: "Wednesday",
      work_hour_type: "Full Day",
      time_hour: 1,
      time_min: 0,
      time_type: "",
      work_hours: 8,
    },
    {
      day: "Thursday",
      work_hour_type: "Full Day",
      time_hour: 1,
      time_min: 0,
      time_type: "",
      work_hours: 8,
    },
    {
      day: "Friday",
      work_hour_type: "Full Day",
      time_hour: 1,
      time_min: 0,
      time_type: "",
      work_hours: 8,
    },
    {
      day: "Saturday",
      work_hour_type: "Half Day",
      time_hour: 1,
      time_min: 0,
      time_type: "",
      work_hours: 4,
    },
    {
      day: "Sunday",
      work_hour_type: "Rest Day",
      time_hour: 1,
      time_min: 0,
      time_type: "",
      work_hours: 0,
    },
  ]

  const init = {
    day: '',
    time_hour: 0,
    time_min: 0,
    time_type: '',
    work_hour_type: '',
    work_hours: 0,
  }

export default (props) => {

    const { control, errors, setValue, getValues, reset, mode, setVisible, recordData, setRecord, setFormVisible, refresh, id, setLoad, updateApi } = props;
    const [noEdit, setNoedit] = useState(true);
    const [templateList, setTemplateList] = useState([]);
    const [academicEnable, setAcademicEnable] = useState(false);
    const dispatch = useDispatch()
    const jobList = useSelector(state => state.global.jobslist);
    // const companyList = useSelector(state => state.global.companies);
    const facultyList = useSelector(state => state.employment.faculty);
    const programList = useSelector(state => state.employment.program);
    const campusList = useSelector(state => state.global.institutions);
    const teamList = useSelector(state => state.global.teams);
    const roleList = useSelector(state => state.global.roles);
    const staffList = useSelector(state => state.global.staff);
    const templates = useSelector(state => state.employment.tempData);
    const companyName = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company;

    useEffect(() => {
      if(templates) {
        let tmp = [];
        templates.map(x => {
          tmp.push({label: x.template_name, value: x.name})
        });
        tmp.push({label: 'Custom Template', value: 'Custom Template'})
        setTemplateList(tmp);
      }
    }, [templates]);

    useEffect(() => {
      if (recordData && recordData[16]?.value == 0) {
        onWHChnage(recordData[13]?.value);
      }
    }, [refresh]);

    const { fields, append, remove} = useFieldArray({
      control: control,
      name: 'work_hour_template_detail',
      defaultValue: init
    });

    useEffect(() => {
      if (recordData && recordData[16]?.value == 1) {
        setValue('work_hour_template', {label: 'Custom Template', value: 'Custom Template'});
        onWHChnage({label: 'Custom Template', value: 'Custom Template'});
        setValue('work_hour_template_detail', recordData[17].value);
      }
      if (recordData && recordData.length > 0) {
        let a = recordData.find(x => x.field == 'staff_category');
        onCategoryChange(a?.value, recordData);
      } else {
        setValue('company', companyName);
        onCompanyChange(companyName);
      }
    }, [recordData]);

    
    const onWHChnage = async (e) => {
      if(e.label == "Custom Template") {
        setNoedit(false);
        setValue('work_hour_template_detail', custom)
      } else {
        if (noEdit == false) {
          setNoedit(true);
        }
        try {
          const res = await axios.get(`${apiMethod}/hrms.api.get_work_hours_temp_data?tempid=${e.value}`);
          let temp = [];
          remove();
          res?.data?.message.map((x, i) => {
            temp.push({
              id: i,
              day: x.day,
              time_hour: x.start_time ? moment(x.start_time, 'hh:mm:ss').hour() : 0,
              time_min: x.start_time ? moment(x.start_time, 'hh:mm:ss').minute() : 0,
              time_type: x.time_type,
              work_hour_type: x.work_hour_type,
              work_hours: x.work_hours,
            })
          })
          setValue('work_hour_template_detail', temp);
        }catch(e) {
          console.log(e)
        }
      }
    }

    const onCompanyChange = (e, ac) => {
        // dispatch(getEmployCampus(e.label))
        setValue('faculty', "")
        setValue('program', null)
        dispatch(getEmployFaculty(e))
    }

    const onFacultyChange = (e) => {
        setValue('program', null)
      dispatch(getEmployProgram(getValues('company').value, e.value))
    }

    const onCategoryChange = (e, a) => {
      if (e.label == 'Academic') {
        setAcademicEnable(true);
        if (a) {
          if (a.find(x => x.field == 'company').value) {
            onCompanyChange(a.find(x => x.field == 'company').value, true)
          }
          if (a.find(x => x.field == 'faculty').value) {
            onFacultyChange(a.find(x => x.field == 'faculty').value)
          }
          setValue('faculty', a.find(x => x.field == 'faculty').value)
          setValue('program', a.find(x => x.field == 'program').value)
          setValue('campus', a.find(x => x.field == 'campus').value)
        }
      } else {
        setValue('faculty', "")
        setValue('program', null)
        setValue('campus', "")
        setAcademicEnable(false)
      }
    }

    

    const contractDetails = [
      {
        name: 'default_contract',
        label: '',
        req: false,
        placeholder: '',
        type: 'checkbox',
        class: 'graycheckbox',
        twocol: false,
        colWidth: '1 0 100%',
        reqmessage: '',
        options: [{label: 'Default Contract', value: 1}],
      },
      {
        type: 'select',
        name: 'contract_type',
        label: 'Contract Type',
        placeholder: 'Please Select',
        twocol: true,
        req: true,
        reqmessage: 'Please select',
        options: ctypeList,
      },
      {
        type: 'select',
        name: 'employement_type',
        label: 'Employment Type',
        placeholder: 'Please Select',
        req: true,
        reqmessage: 'Please select',
        twocol: true,
        options: etypeList,
      },
      {
        type: 'date',
        name: 'start_date',
        label: 'From Date',
        twocol: true,
        req: true,
        reqmessage: 'Please state'
      },
      {
        type: 'date',
        name: 'end_date',
        label: 'To Date',
        twocol: true,
        req: false,
        reqmessage: 'Please state'
      },

      // employment details
      {
        subheader: 'Employment Details',
        type: 'select',
        name: 'staff_category',
        label: 'Staff Category',
        placeholder: 'Please Select',
        twocol: false,
        onChange: onCategoryChange,
        options: staffCategory,
        req: true,
        reqmessage: 'Please state'
      },
      {
        type: 'input',
        name: 'company',
        label: 'Company',
        placeholder: 'Please state',
        twocol: true,
        static: true,
        onChange: onCompanyChange,
        // options: companyList.map(x => ({label: x.name, value: x.name})),
        req: true,
        reqmessage: 'Please state'
      },
      {
        type: 'select',
        name: 'campus',
        label: 'Campus',
        placeholder: 'Please Select',
        hidden: !academicEnable,
        twocol: true,
        options: campusList.map(x => ({label: x.institution, value: x.name})),
        req: false,
        reqmessage: 'Please state'
      },
      {
        type: 'select',
        name: 'faculty',
        label: 'Select Company to Select Faculty',
        placeholder: 'Please Select',
        twocol: true,
        hidden: !academicEnable,
        onChange: onFacultyChange,
        options: facultyList.map(x => ({label: x.faculty_name, value: x.name})),
        req: academicEnable,
        reqmessage: 'Please state'
      },
      {
        type: 'select',
        name: 'program',
        label: 'Select Faculty to Select Programme',
        placeholder: 'Please Select',
        twocol: true,
        multiple: true,
        hidden: !academicEnable,
        options: programList.map(x => ({label: x.program_name, value: x.name})),
        req: academicEnable,
        reqmessage: 'Please state'
      },
      {
        type: 'select',
        name: 'team',
        label: 'Team',
        placeholder: 'Please Select',
        twocol: true,
        options: teamList.map(x => ({label: x.team_name, value: x.name})),
        req: true,
        reqmessage: 'Please state'
      },
      {
        type: 'select',
        name: 'job_title',
        label: 'Job Title',
        placeholder: 'Please Select',
        twocol: true,
        options: jobList.map(x => ({label: x.job_position_name, value: x.name})),
        req: true,
        reqmessage: 'Please state'
      },
      {
        type: 'select',
        name: 'position_level',
        label: 'Position Level',
        placeholder: 'Please Select',
        twocol: true,
        options: positionList,
      },
      {
        type: 'select',
        name: 'supervisor',
        label: 'Supervisor',
        placeholder: 'Please Select',
        twocol: false,
        options: staffList.map(x => ({label: x.employee_name, value: x.name})),
        req: true
      },
      {
        type: 'select',
        name: 'employee_role',
        label: 'Roles',
        placeholder: 'Please Select',
        multiple: true,
        twocol: false,
        req: true,
        reqmessage: 'Please select role',
        options: roleList.map(x => ({label: x.role_name, value: x.name})),
      },
      {
        type: 'upload',
        name: 'contract_attachment',
        label: 'Attach Contract',
        placeholder: 'Upload Attachment',
        twocol: false,
      },
      // Work hours
      {
        subheader: 'Work Hours',
        type: 'select',
        name: 'work_hour_template',
        label: 'Template',
        placeholder: 'Please Select',
        twocol: false,
        colWidth: '1 0 100%',
        options: templateList,
        req: true,
        reqmessage: 'Please select',
        onChange: onWHChnage
      },
      {
        type: 'array',
        name: 'work_hour_template_detail',
        twocol: false,
        colWidth: '1 0 100%',
        field: fields,
        gap: [10, 10],
        single: false,
        noCard: true,
        child : [
          {
            type: 'input',
            name: 'day',
            label: '',
            static: true,
            req: false,
            twocol: false,
            colWidth: '1 0 100px'
          },    
          {
            type: 'select',
            name: 'work_hour_type',
            label: '',
            placeholder: 'Please Select',
            options: workType,
            static: noEdit,
            req: true,
            twocol: false,
            colWidth: '1 0 100px'
          },
          {
            type: 'input',
            name: 'time_hour',
            label: '',
            req: true,
            number: true,
            min: 1,
            max: 12,
            static: noEdit,
            arrow: false,
            twocol: false,
            colWidth: '0 1 70px'
          },
          {
            type: 'input',
            name: 'time_min',
            label: '',
            number: true,
            arrow: false,
            req: true,
            static: noEdit,
            min: 0,
            max: 59,
            twocol: false,
            colWidth: '0 1 70px'
          },
          {
            type: 'select',
            name: 'time_type',
            label: '',
            placeholder: 'Select',
            options: timelap,
            static: noEdit,
            req: true,
            twocol: false,
            colWidth: '0 1 100px'
          },
          {
            type: 'input',
            name: 'work_hours',
            label: '',
            req: true,
            static: noEdit,
            number:true,
            arrow: false,
            min: 0,
            max: 24,
            placeholder: 'Please state',
            twocol: false,
            colWidth: '1 0 70px'
          },
        ]
      },
      {
        type: 'switch',
        name: 'alternate_saturdays',
        label: 'Alternate Saturdays',
        req: false,
        twocol: false,
        colWidth: '1 0 100%'
      },
      {
        type: 'select',
        name: 'group',
        label: 'Group',
        placeholder: 'Select',
        options: alternateSat,
        req: false,
        twocol: false,
        colWidth: '1 0 100%'
      },
    ];

    const onBack = () => {
        reset();
        setFormVisible(false);
        setRecord(null)
        setVisible({
            set1: true,
            set2: true,
            set3: true,
            set4: true,
        });
    }

    return (
        <ListFormComp 
        control={control}
        errors={errors}
        record={recordData}
        onBack={onBack}
        setValue={setValue}
        mode={mode}
        noButton={mode == 'add' ? true : allowed([Roles.EMPLOYMENT], 'write') ? false : true}
        title={'Employment Contract'}
        fieldsList={contractDetails}
        backbtnTitle='Employment History'
        extraComp={allowed([Roles.EMPLOYMENT], 'write') ? <Activations id={id} data={recordData} setLoad={setLoad} onBack={onBack} updateApi={updateApi} /> : null}
        />
    )
}