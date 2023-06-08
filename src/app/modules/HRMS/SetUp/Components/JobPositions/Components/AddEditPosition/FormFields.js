import { useSelector } from 'react-redux';
const jobFields = () => {
  const skills = useSelector((state) => state.setup.skillsList);
  return [
    {
      label: 'Job Position Name',
      name: 'job_position_name',
      type: 'input',
      twocol: false,
      placeholder: 'Type project name',
      req: true,
      reqmessage: 'Project Name required',
    },
    {
      type: 'select',
      name: 'skills',
      label: 'Skills',
      placeholder: 'Please Select',
      multiple: true,
      req: true,
      reqMessage: 'skills required',
      twocol: false,
      options: skills?.map((value) => ({ label: value.skill_name, value: value.name })),
    },
  ];
};
export { jobFields };
