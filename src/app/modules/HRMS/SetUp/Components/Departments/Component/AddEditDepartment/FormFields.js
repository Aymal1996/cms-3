import { useSelector } from 'react-redux';
const departmentFields = () => {
  const employeeList = useSelector((state) => state.setup.employeeList);
  console.log({ employeeList });
  return [
    {
      name: 'department_name',
      label: 'Department Name',
      req: true,
      placeholder: 'Type department name',
      type: 'input',
      twocol: false,
      reqmessage: 'department name required',
    },
    {
      name: 'employee_name',
      label: 'Employee Name',
      req: false,
      placeholder: 'Select employee name',
      type: 'select',
      twocol: false,
      reqmessage: 'employee name required',
      options: employeeList.map((value) => ({
        label: value.employee_name,
        value: value.employee_name,
        id: value.name,
      })),
    },
  ];
};
export { departmentFields };
