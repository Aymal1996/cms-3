import { useSelector } from 'react-redux';

const addEditClassroomForm = () => {
  const facultyLevel = useSelector((state) => state.setup.faculty_type);
  const blocks = useSelector((state) => state.setup.blocks);

  return [
    {
      label: 'Classroom Name',
      name: 'classroom_name',
      type: 'input',
      placeholder: 'Type classroom name',
      twocol: false,
      req: true,
      reqmessage: 'Classroom hall required',
    },
    {
      label: 'Classroom Type',
      name: 'classroom_type',
      type: 'select',
      placeholder: 'Select classroom type',
      twocol: false,
      req: true,
      reqmessage: 'Type required',
      options: [
        { label: 'Classroom', value: 'Classroom' },
        { label: 'Laboratory', value: 'Laboratory' },
        { label: 'Studio', value: 'Studio' },
        { label: 'Workshop', value: 'Workshop' },
        { label: 'Lecture Hall', value: 'Lecture Hall' },
      ],
    },
    {
      label: 'Classroom Capacity',
      name: 'classroom_capacity',
      type: 'input',
      placeholder: 'Type classroom capacity',
      number: true,
      twocol: false,
      req: true,
      arrow: false,
      reqmessage: 'Classroom capacity required',
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
export { addEditClassroomForm };
