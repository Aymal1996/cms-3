import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Pagination,Typography, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Search from './Search';
import { useHistory } from 'react-router';
import HeadingChip from '../../../molecules/HeadingChip';
import ListCard from '../../../molecules/ListCard';
import { WarningIcon } from '../../../atoms/CustomIcons';
import { getTimetableList } from './ducks/actions';
import UnassignTables from './Component/UnassignTables';


const ListCol = [
  {
    title: 'Module',
    dataIndex: 'module_name',
    key: 'module_name',
    sorter: true,
  },
  {
    title: 'Programme',
    dataIndex: 'program_name',
    key: 'program_name',
    sorter: true,
    width:300
  },
  {
    title: 'Faculty',
    dataIndex: 'faculty_code',
    key: 'faculty_code',
    sorter: true,
  },
  {
    title: 'Term',
    dataIndex: 'term_name',
    key: 'term_name',
    sorter: true,
  },
  {
    title: 'Learning Mode',
    dataIndex: 'learning_mode',
    key: 'learning_mode',
    sorter: true,
  },
  
  {
    title: 'Class Per Week',
    dataIndex: 'class_per_week',
    key: 'class_per_week',
    sorter: true,
  },
  {
    title: 'Classroom',
    dataIndex: 'class_room_type',
    key: 'class_room_type',
    sorter: true,
  },
  
];

export default (props) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const { Title, Text } = Typography;
  const gettimetablelist = useSelector((state) => state.timetable.alltimetablelist);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

const onClickRow = (record) => { 
  return {
    onClick: () => {
      history.push(`/faculty/timetable/editTimetable/${record.name}`)
    },
  };
}

const modulesCount = {
  value: `${gettimetablelist?.unassigned_modules} Modules Unassigned`,
  }


const onTableChange = (pagination, filters, sorter) => {
  setPage(pagination.current);
  setLimit(pagination.pageSize);

  const filterParam = {
    "page_number":page,
    "limit":limit,
    "orderby": 'modified',
    "order": 'desc',
    "filters":
            {                
                "category":"",
                "category_data":""
            }
  }
  if (sorter.order) {
    dispatch(getTimetableList(filterParam));
  } else {
    dispatch(getTimetableList(filterParam));
  }
};
 
 const onSearch = (val) => {

  if (val) {
    const searhParam = {
      "page_number":'1',
      "limit":limit,
      "orderby":"modified",
      "order":"desc",
      "filters":  {                
          "category":val?.category ? val.category.value : '',
          "category_data":val?.category_data ? val.category_data.value : ''
    }
    }
    dispatch(getTimetableList(searhParam));
  }
};

useEffect(() => {
  dispatch(getTimetableList({"page_number":page,"limit":limit,"orderby":"modified","order":"desc","filters":{"category":"","category_data":""}
}));
}, []);

    return (
        <>
<Row gutter={[20, 50]}>
            <Col span={24}>
                <Row gutter={[20,30]}>
                    <Col span={24}>
                    <HeadingChip title="OverAll Timetable" />
                    </Col>
                    <Col span={24} className="clickRow">
                    <ListCard
                      ListCol={ListCol}
                      ListData={gettimetablelist?.rows}
                      Search={Search}
                      onSearch={Search && onSearch}
                      onRow={onClickRow}
                      ExtraBlocks={UnassignTables}
                      BlocksCount={modulesCount}
                      onChange={onTableChange}
                      pagination={{
                        total: gettimetablelist?.count,
                        current: page,
                        pageSize: limit,
                      }}
                    />

                    </Col>
                </Row>
            </Col>
        </Row>

        </>
    )
}