import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StudentSearch from '../../StudentSearch';
import ListCard from 'Molecules/ListCard';
import { useHistory, useParams } from 'react-router-dom';
import { getAllPrograms, getCountry } from '../../../../../Application/ducks/actions';
import { getModuleStudentsBySemester } from '../../../ducks/actions';

const colName = [
    {
      title: 'Name',
      dataIndex: 'student_name',
      key: 'student_name',
      sorter: true,
    },
    {
      title: 'Nationality',
      dataIndex: 'nationality',
      key: 'nationality',
      sorter: true,
    },
    {
        title: 'Programmes',
        dataIndex: 'program_name',
        key: 'program_name',
        sorter: true,
      },
      {
        title: 'Faculty',
        dataIndex: 'faculty_code',
        key: 'faculty_code',
        sorter: true,
      },
    {
      title: 'Semester',
      dataIndex: 'semester',
      key: 'semester',
      sorter: true,
    },
];

export default (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const {id} = useParams();
    const [page, setPage]= useState(1);
    const [limit, setLimit] = useState(10);
    const [nationDrop, setNationDrop] = useState([]);
    const [program, setProgram] = useState([]);
    const [search, setSearch] = useState(null);
    const data = useSelector(state => state.classroom.moduleStudents);
    const programList = useSelector(state => state.global.programmes);
    const country = useSelector(state => state.global.countryData);

    useEffect(() => {
      dispatch(getModuleStudentsBySemester(id, props.semester, page, limit, '', '', null, props.tt_id));
      dispatch(getCountry());
      dispatch(getAllPrograms())
    }, []);

    useEffect(() => {
      if (country && country.length > 0) {
        let temp = [];
        country.map((x, i) => {
          if (i == 0) {
            temp.push({ label: 'All Nationalities', value: '' });
            temp.push({ label: x.name, value: x.name });
          } else {
            temp.push({ label: x.name, value: x.name });
          }
        });
        setNationDrop(temp);
      }
    }, [country]);

    useEffect(() => {
      if (programList && programList.length > 0) {
        let temp = []
        programList.map((x, i) => {
          if (i == 0) {
            temp.push({label: 'All Programmes', value: ''})
            temp.push({label: x.program_name, value: x.program_code})
          } else {
            temp.push({label: x.program_name, value: x.program_code})
          }
        });
        setProgram(temp);
      }
    }, [programList]);

    const onSearch = (search) => {
      if (search) {
        let searchVal = {};
        searchVal = {
          student_name: search.student_name,
          program_code: search.program.value,
          country: search.nationality.value,
        };
        setSearch(JSON.stringify(searchVal))
        setPage(1);
        dispatch(getModuleStudentsBySemester(id, props.semester, 1, limit, '', '', JSON.stringify(searchVal), props.tt_id));
      } else {
        setPage(1);
        setSearch(null)
        dispatch(getModuleStudentsBySemester(id, props.semester, 1, limit, '', '', null, props.tt_id));
      }
    };

    const onClickRow = (record) => {
        return {
            onClick: () => {
            history.push(`/faculty/students/details/${record['student_id']}`)
            },
        };
    };
    
      const onTableChange = (pagination, filters, sorter) => {
        setPage(pagination.current);
        if (sorter.order) {
            dispatch(getModuleStudentsBySemester(id, props.semester, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, search, props.tt_id));
        } else {
            dispatch(getModuleStudentsBySemester(id, props.semester, pagination.current, pagination.pageSize, '', '', search, props.tt_id));
        }
      }

    return (
        <ListCard 
          scrolling={500}
          title='Module Students'
          field1= {program}
          field2= {nationDrop}
          listClass="nospace-card"
          classes='clickRow'
          onRow={onClickRow}
          Search={StudentSearch}
          onSearch={onSearch}
          ListData={data?.rows}
          ListCol={colName}
          onChange={onTableChange}
          pagination={{
            total: data?.count,
            current: page,
            pageSize: limit
          }}
        />
    )
}