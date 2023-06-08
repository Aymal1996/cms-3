const addSalaryAdvance = [
  {
    type: 'date',
    label: 'Date Applied',
    name: 'date_applied',
    req: true,
    reqmessage: 'date required',
    twocol: true,
  },
  {
    type: 'date',
    label: 'Deduction Date',
    name: 'deduction_date',
    req: true,
    reqmessage: 'date required',
    twocol: true,
  },
  {
    type: 'input',
    label: 'Description',
    name: 'description',
    placeholder: 'Description',
    req: true,
    reqmessage: 'Account Number required',
    twocol: false,
  },
];
export { addSalaryAdvance };
