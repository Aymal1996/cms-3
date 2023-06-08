import React from 'react';
import { useParams } from 'react-router-dom';
import StudentCategory from 'Molecules/StudentCategory';
import StudentTemp from '../StudentTemp';

export default (props) => {

  const { id } = useParams();

  return (
    <>
    <StudentTemp id={id} document={true} request={true} setLoading={props.setLoading}>
        <StudentCategory id={id} />
    </StudentTemp>
    </>
  );
};
