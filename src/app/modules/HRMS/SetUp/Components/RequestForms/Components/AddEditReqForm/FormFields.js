import { useSelector } from 'react-redux';
const reqFormFields = () => {
  return [
    {
      name: 'form_name',
      label: 'Type Form Name',
      req: true,
      placeholder: 'Type form name',
      type: 'input',
      twocol: false,
      reqmessage: 'Please enter name',
    },
    {
      title: 'Sender & Approver',
      name: 'sender',
      label: 'Sender',
      req: true,
      placeholder: 'Select job position',
      type: 'select',
      twocol: false,
      reqmessage: 'Please select',
      options: [
        { label: 'Staff', value: 'Staff' },
        { label: 'HR Admin', value: 'HR Admin' },
        { label: 'IT Technician', value: 'IT Technician' },
        { label: 'Supervisor', value: 'Supervisor' },
      ],
    },
    {
      name: 'category',
      label: 'Category',
      req: false,
      placeholder: 'Select category',
      type: 'select',
      twocol: false,
      options: [
        { label: 'Carry Forward Leave Extension', value: 'Carry Forward Leave Extension' },
        { label: 'Email Activation', value: 'Email Activation' },
        { label: 'Card Activation', value: 'Card Activation' },
        { label: 'Warning Letter Approval', value: 'Warning Letter Approval' },
        { label: 'Show Cause Letter', value: 'Show Cause Letter' },
      ],
    },
    {
      type: 'array',
      name: 'approvers_fields',
      subheader: 'Approvers',
      twocol: false,
      child: [
        {
          type: 'select',
          name: 'approvers',
          req: true,
          placeholder: 'Please Select',
          twocol: false,
          colWidth: '1 0 100%',
          options: [
            { label: 'Individual', value: 'Individual' },
            { label: 'Manager', value: 'Manager' },
            { label: 'Team Leader', value: 'Team Leader',
              id: 'HR-EMP-00001a',
              doctp: 'HRMS Leave Type Approvers',
            },
          ],
        },
      ],
    },
    {
      type: 'array',
      name: 'form_fields',
      title: 'Form Fields',
      subheader: 'The fields can be reordered by dragging and dropping the fields ato the desired order.',
      twocol: false,
      child: [
        {
          type: 'select',
          name: 'approver_select',
          req: false,
          placeholder: 'Please Select',
          twocol: false,
          colWidth: '1 0 200px',
          subheader: 'Field',
          options: [
            { label: 'Zain Kafeel', value: 'Zain Kafeel', id: 'HR-EMP-00004', doctp: 'HRMS Leave Type Approvers' },
            {
              label: 'Muhammad Waqas Baig',
              value: 'Muhammad Waqas Baig',
              id: 'HR-EMP-00005',
              doctp: 'HRMS Leave Type Approvers',
            },
            {
              label: 'sheeraz kaleem',
              value: 'sheeraz kaleem',
              id: 'HR-EMP-00001a',
              doctp: 'HRMS Leave Type Approvers',
            },
          ],
        },
      ],
    },
  ];
};
export { reqFormFields };
