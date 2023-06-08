import { useSelector } from 'react-redux';
const warningLetterFilds = () => {
  const approverList = useSelector((state) => state.setup.allApprovers);
  const letterTemp = useSelector((state) => state.setup.letterTempList);
  return [
    {
      label: 'Warning Letter Name',
      name: 'writing_letter_name',
      type: 'input',
      placeholder: 'Type warning letter name',
      twocol: false,
      req: true,
      reqMessage: 'warning letter name required',
    },
    {
      label: 'Letter Template',
      name: 'letter_template',
      type: 'select',
      placeholder: 'Select template',
      twocol: false,
      colWidth: '1 0 200px',
      req: true,
      reqMessage: 'warning letter name required',
      options: letterTemp.map((value) => ({ label: value.template_name, value: value.name })),
    },
    {
      label: '',
      name: 'signiture',
      type: 'checkbox',
      placeholder: '',
      twocol: false,
      colWidth: '1 0 200px',
      req: false,
      reqMessage: '',
      class: { width: '0px' },
      options: [{ label: 'Require Signature', value: 1 }],
    },
    {
      label: 'Signee',
      name: 'signee',
      type: 'select',
      twocol: false,
      placeholder: 'Select approver',
      colWidth: '1 0 200px',
      options: approverList.map((value) => ({ label: value.name, value: value.name })),
    },
  ];
};
export { warningLetterFilds };
