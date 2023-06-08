import { useSelector } from 'react-redux';

const addEditExamHallForm = () => {
  const facultyLevel = useSelector((state) => state.setup.faculty_type);
  const blocks = useSelector((state) => state.setup.blocks);
  return [
    {
      label: 'Exam Hall Name',
      name: 'exam_hall_name',
      type: 'input',
      placeholder: 'Type exam hall name',
      twocol: false,
      req: true,
      reqmessage: 'Exam hall required',
    },

    {
      label: 'Exam Hall Capacity',
      name: 'exam_hall_capacity',
      type: 'input',
      placeholder: 'Type exam hall capacity',
      number: true,
      twocol: false,
      req: true,
      arrow: false,
      reqmessage: 'Exam hall capacity required',
    },
    {
      label: 'Level',
      name: 'level',
      type: 'input',
      placeholder: 'Type building level',
      twocol: false,
      req: true,
      reqmessage: 'Building level required',
    },
    {
      label: 'Block',
      name: 'block',
      type: 'input',
      placeholder: 'Type building block',
      twocol: false,
      req: true,
      reqmessage: 'Building block required',
    },
  ];
};
export { addEditExamHallForm };
