import React, { useState, useEffect } from 'react';
import AddFaculty from './AddFaculty';
import FacultyList from './FacultyList';

const importView = compName =>
  lazy(() =>
    import(`./${compName}`).catch(() => import(`./NOTHERE`))
  );

export default (props) => {

    return (
        <>
        {FacultyComp}
        </>
    )
}