const projectFields = () => {
  return [
    {
      label: 'Project Name',
      name: 'project',
      type: 'input',
      twocol: false,
      placeholder: 'Type project name',
      req: true,
      reqmessage: 'Project Name required',
    },
  ];
};
export { projectFields };
