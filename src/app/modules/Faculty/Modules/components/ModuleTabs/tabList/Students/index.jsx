import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StudentSearch from '../../../StudentSearch';
import ListCard from '../../../../../../../molecules/ListCard';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { getModuleStudent } from '../../../../ducks/actions';
import { getCountry } from '../../../../../../Application/ducks/actions';
import { semesterList } from '../../../../../../../../configs/constantData';

const colName = [
    {
      title: 'Studnet Name',
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
      title: 'Semester',
      dataIndex: 'semester',
      key: 'semester',
      sorter: true,
    },
];

export default (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const {id} = useParams();
    const [page, setPage]= useState(1);
    const [limit, setLimit] = useState(6);
    const [nationDrop, setNationDrop] = useState([]);
    const [sem, setSem] = useState([]);
    const data = useSelector(state => state.facultyModules.moduleStudents);
    const country = useSelector(state => state.global.countryData);
    const [search, setSearch] = useState(null);

    useEffect(() => {
      dispatch(getModuleStudent(id, page, limit, '', '', null, location.state.key1));
      dispatch(getCountry());
      let temp = [];
      semesterList.map((x, i) => {
        if (i == 0) {
          temp.push({ label: 'All Semester', value: '' });
          temp.push(x);
        } else {
          temp.push(x);
        }
      });
      setSem(temp);
    }, []);

    const onSearch = (search) => {
      if (search) {
        let searchVal = {};
        searchVal = {
          student_name: search.student_name,
          nationality: search.nationality.value,
          semester: search.semester.value,
        };
        setSearch(JSON.stringify(searchVal))
        dispatch(getModuleStudent(id, page, limit, '', '', JSON.stringify(searchVal), location.state.key1));
      } else {
        setSearch(null)
        dispatch(getModuleStudent(id, page, limit, '', '', null, location.state.key1));
      }
    };

    const onClickRow = (record) => {
        return {
            onClick: () => {
            history.push(`/faculty/students/${record['student_id']}`)
            },
        };
    };

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
    
      const onTableChange = (pagination, filters, sorter) => {
        setPage(pagination.current);
        if (sorter.order) {
          dispatch(getModuleStudent(id,pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, search, location.state.key1));
        } else {
          dispatch(getModuleStudent(id,pagination.current, pagination.pageSize, '', '', search, location.state.key1));
        }
      }

    return (
        <ListCard 
          scrolling={500}
          title='Module Students'
          field1= {nationDrop}
          field2= {sem}
          listClass="nospace-card cardinTab"
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
            pageSize: 5
          }}
        />
    )
}