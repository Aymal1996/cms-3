export const holidayInputFields = [
  {
    name: 'holiday_name',
    label: 'Holiday Name',
    req: true,
    placeholder: 'Type holiday name',
    type: 'input',
    twocol: false,
    reqmessage: 'holiday name required',
  },
  {
    name: 'holiday_date',
    label: 'Holiday Date',
    req: true,
    placeholder: 'Holiday date',
    type: 'date',
    format: 'Do MMMM YYYY',
    twocol: false,
    reqmessage: 'holiday date required',
  },
  {
    name: 'note',
    label: 'Note',
    placeholder: 'Please state remark..,',
    type: 'textarea',
    twocol: false,
  },
];
