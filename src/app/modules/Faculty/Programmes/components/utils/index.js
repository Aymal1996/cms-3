export const getDate = (days) => {
  return days / 365 < 1
    ? days / 30.417 < 1
      ? `${days} Days`
      : `${(days / 30.417).toFixed(1)} Months`
    : `${(days / 365).toFixed(1)} Years`;
};

export function getDetailsColumn(details) {
  const company_currency = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company_currency;
  const {
    program_name,
    campus,
    version,
    credit_hours,
    course_fees,
    study_duration,
    program_level,
    course_synopsis,
    requirements,
  } = details;
  return [
    {
      label: 'Programme Name',
      value: program_name ? program_name : '',
    },
    {
      label: 'Campus',
      value: campus ? campus : '',
    },
    {
      label: 'Version',
      value: version ? `Version ${version}` : '',
    },
    {
      label: 'Credit Hours',
      value: credit_hours ? `${credit_hours} Credits` : '',
    },
    {
      label: 'Course Fee',
      value: course_fees ? `${company_currency}${course_fees}` : '',
    },
    {
      label: 'Study Duration',

      value: study_duration ?? '',
    },
    {
      label: 'Study Level',
      value: program_level ? program_level : '',
    },
    {
      label: 'Course Synopsis',
      value: course_synopsis ? course_synopsis : '',
    },
    {
      label: 'Requirements',
      value: `${
        requirements?.length > 0
          ? requirements.map(
              (eligibilty) =>
                `${eligibilty?.qualification} with minimum ${eligibilty.cgpa ? eligibilty.cgpa + ' CGPA' : ''}<br/>`,
            )
          : ''
      }`.replaceAll(',', ''),
    },
  ];
}
