import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AssessmentSearch from '../../AssessmentSearch';
import ListCard from 'Molecules/ListCard';
import { useParams } from 'react-router-dom';
import { getModuleAssessment } from '../../../ducks/actions';
import AssessmentDetails from '../../AssessmentDetails';
import { capitalizeFirstLetter } from '../../../../utills/CalendarCases';

function sortObj(sr, arr) {
  let data =  arr.filter(x => x['title'].includes(sr))
  if (data.length > 0) {
    data.sort(function(a,b) {
      var x = a.title.toLowerCase();
      var y = b.title.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    })
  }
  return data;
}

function colorGrade(col) {
  switch(col) {
    case 'A+' : return 'c-success';
    case 'A' : return 'c-success';
    case 'B' : return 'c-pending';
    default : return 'c-error';
  }
} 

export default (props) => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const [page, setPage]= useState(1);
    const [limit, setLimit] = useState(10);
    const [visible, setVisible] = useState(false);
    const [colName, setColname] = useState([]);
    const [data, setData] = useState([]);
    const [sID, setID] = useState(null);
    const dataAssessment = useSelector(state => state.classroom.assessment);

    const updateAssessment = () => {
      dispatch(getModuleAssessment(id, props.semester, page, limit, null, props.tt_id))
    }

    useEffect(() => {
      updateAssessment();
    }, []);
    
    useEffect(() => {
      if (dataAssessment && Object.keys(dataAssessment).length > 0 && dataAssessment.rows.length > 0) {
        let col = [
          {
            title : 'Student Name',
            dataIndex: 'student_name',
            key : 'student_name',
          },
        ];
        let col2 = [];
        let temp = [];
        Object.entries(dataAssessment.rows[0]).map(([KEY, VAL]) => {
          if (KEY.indexOf('__') != -1) {
            col2.push({
              title: capitalizeFirstLetter(KEY.replace('__', ' (').replace('_', ' ').replace('%', '%)').replace(' exam', '')),
              dataIndex: KEY.slice(0, KEY.indexOf('__')),
              key: KEY.slice(0, KEY.indexOf('__')),
            })
          }
        })

        col = [...col, ...sortObj('Quiz',col2), ...sortObj('Assignment',col2), ...sortObj('Midterm',col2), ...sortObj('Final',col2)];
        col.push({
            title : 'Overall (100%)',
            dataIndex: 'overall',
            key : 'overall',
          });
          col.push({
            title : 'Grade',
            dataIndex: 'grade',
            key : 'grade',
            align: 'center',
            render: (text) => <span className={colorGrade(text)}>{text}</span>
          })
          
        dataAssessment.rows.map(x => {
          let obj = {};
          Object.entries(x).map(([KEY, VAL]) => {
            let k = KEY.indexOf('__') != -1 ? KEY.slice(0, KEY.indexOf('__')) : KEY;
            obj[`${k}`] = VAL;
          })
          temp.push(obj);
        })
        setColname(col);
        setData(temp);
      } else {
        setData([]);
      }
    }, [dataAssessment]);

    const onSearch = (val) => {
      if (val) {
        console.log('submit',val);
        dispatch(getModuleAssessment(id, props.semester, page, limit, val, props.tt_id))
      }
    }

    const onClickRow = (record) => {
      return {
        onClick: () => {
            setID(record.assessment_name);
            setVisible(true)
        }
      };
    };
    
      const onTableChange = (pagination, filters, sorter) => {
        setPage(pagination.current);
        dispatch(getModuleAssessment(id,pagination.current, pagination.pageSize, null, props.tt_id))
        if (sorter.order) {
        //   dispatch(getModuleStudent(id,pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
        } else {
        //   dispatch(getModuleStudent(id,pagination.current, pagination.pageSize, '', ''));
        }
      }

    return (
      <>
      {!visible ? 
        <ListCard 
          scrolling={500}
          title='Module Students'
          listClass="nospace-card"
          classes='clickRow'
          onRow={onClickRow}
          Search={AssessmentSearch}
          onSearch={onSearch}
          ListData={data}
          ListCol={colName}
          onChange={onTableChange}
          pagination={{
            total: dataAssessment?.count,
            current: page,
            pageSize: 10
          }}
        />
        :
        <AssessmentDetails type={2} setVisible={setVisible} id={sID} updateApi={updateAssessment} />
      }
      </>
    )
}