import { timelap } from '../../../../../configs/constantData';
const formFields = [
  {
    type: 'select',
    name: 'type',
    label: 'Type',
    placeholder: 'Select',
    options: [
      { label: 'Contract', value: 'Contract' },
      { label: 'Job application form', value: 'Job application form' },
      { label: 'Staff particulars form', value: 'Staff particulars form' },
      { label: 'Resume/CV', value: 'Resume/CV' },
      { label: 'Letter of confirmation', value: 'Letter of confirmation' },
      { label: 'Letter of increment', value: 'Letter of increment' },
      { label: 'Letter of promotion', value: 'Letter of promotion' },
      { label: 'Others', value: 'Others' },
    ],
    req: true,
    twocol: false,
  },
  {
    type: 'upload',
    name: 'document',
    label: 'Upload Document',
    placeholder: 'Upload',
    twocol: false,
    req: true,
    reqmessage: 'Please upload document',
  },
];

export { formFields };
