const opt = [
  {
    label: 'Contract',
    value: 'contract',
  },
  {
    label: 'Permenant',
    value: 'permenant',
  },
];
const hType = [
  {
    label: 'Full Day',
    value: 'full_day',
  },
  {
    label: 'Half Day',
    value: 'half_day',
  },
  {
    label: 'Rest Day',
    value: 'rest_day',
  },
];

const ttype = [
  {
    value: 'AM',
    label: 'am',
  },
  {
    value: 'PM',
    label: 'pm',
  },
];

const totalHour = [
  {
    value: 8,
    label: 8,
  },
  {
    value: 5,
    label: 5,
  },
  {
    value: 0,
    label: 0,
  },
];

const contractDetails = [
  {
    type: 'select',
    name: 'contract_type',
    label: 'Contract Type',
    placeholder: 'Please Select',
    twocol: true,
    options: opt,
  },
  {
    type: 'select',
    name: 'employment_type',
    label: 'Employment Type',
    placeholder: 'Please Select',
    twocol: true,
    options: opt,
  },
  {
    type: 'date',
    name: 'start_date',
    label: 'From Date',
    placeholder: 'Please Select',
    twocol: true,
  },
  {
    type: 'date',
    name: 'end_date',
    label: 'To Date',
    placeholder: 'Please Select',
    twocol: true,
  },
  {
    type: 'input',
    name: 'endorser',
    label: 'Endorser',
    placeholder: 'Please Select',
    twocol: false,
  },
];
const employmentDetails = [
  {
    type: 'select',
    name: 'staff_category',
    label: 'Staff Category',
    placeholder: 'Please Select',
    twocol: false,
    options: opt,
  },
  {
    type: 'select',
    name: 'company',
    label: 'Company',
    placeholder: 'Please Select',
    twocol: true,
    options: opt,
  },
  {
    type: 'select',
    name: 'team',
    label: 'Team',
    placeholder: 'Please Select',
    twocol: true,
    options: opt,
  },
  {
    type: 'select',
    name: 'job_title',
    label: 'Job Title',
    placeholder: 'Please Select',
    twocol: true,
    options: opt,
  },
  {
    type: 'select',
    name: 'position_level',
    label: 'Position Level',
    placeholder: 'Please Select',
    twocol: true,
    options: opt,
  },
  {
    type: 'select',
    name: 'supervisor',
    label: 'Supervisor',
    placeholder: 'Please Select',
    twocol: false,
    options: opt,
  },
  {
    type: 'select',
    name: 'employee_role',
    label: 'Roles',
    placeholder: 'Please Select',
    multi: true,
    twocol: false,
    options: opt,
  },
  {
    type: 'upload',
    name: 'contract_attachment',
    label: 'Attach Contract',
    placeholder: 'Please Select',
    twocol: false,
  },
];
const workHours = [
  {
    type: 'select',
    name: 'company_name',
    label: 'Company',
    placeholder: 'Please Select',
    twocol: true,
    options: opt,
  },
  {
    type: 'select',
    name: 'work_hour_template',
    label: 'Template',
    placeholder: 'Please Select',
    twocol: true,
    options: opt,
  },
  {
    type: 'array',
    name: 'program_requirements',
    twocol: false,
    child: [
      {
        type: 'input',
        name: 'day',
        placeholder: '',
        fourcol: true,
      },
      {
        type: 'select',
        name: 'work_type',
        placeholder: '',
        fourcol: true,
        options: hType,
      },
      {
        type: 'time',
        name: 'time',
        placeholder: 'Time',
        fourcol: true,
      },
      {
        type: 'select',
        name: 'total_hours',
        placeholder: 'Select',
        fourcol: true,
        options: totalHour,
      },
    ],
  },
];

const workingDays = [
  {
    day: 'Monday',
    work_type: 'Full Day',
    time: '',
    total_hours: 8,
  },
  {
    day: 'Tuesday',
    work_type: 'Full Day',
    time: '',
    total_hours: 8,
  },
  {
    day: 'Wednesday',
    work_type: 'Full Day',
    time: '',
    total_hours: 8,
  },
  {
    day: 'Thursday',
    work_type: 'Full Day',
    time: '',
    total_hours: 8,
  },
  {
    day: 'Friday',
    work_type: 'Full Day',
    time: '',
    total_hours: 8,
  },
  {
    day: 'Saturday',
    work_type: 'Half Day',
    time: '',
    total_hours: 4,
  },
  {
    day: 'Sunday',
    work_type: 'Rest Day',
    time: '',
    total_hours: 0,
  },
];

const alternateSaturday = [
  {
    subheader: 'Alternate Saturdays',
    name: 'aternate_address',
    type: 'switch',
    twocol: false,
  },
  {
    type: 'select',
    label: 'Group',
    name: 'group',
    placeholder: 'Select',
    twocol: false,
    options: totalHour,
  },
];

export { contractDetails, employmentDetails, workHours, workingDays, alternateSaturday };
