import React, { useState, useEffect } from 'react';
import { Row, Col, message } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import ListCard from 'Molecules/ListCard';
import { fire, database } from '../../../../features/firebaseConfig';
import { collection, onSnapshot, query, where, orderBy, startAt, endBefore, Timestamp } from 'firebase/firestore';
import moment from 'moment';
import ActivitySearch from '../components/ActivitySearch';

const ListCol = [
  {
    title: 'User ID',
    dataIndex: 'id',
    key: 'id',
    sorter: false,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: false,
  },
  {
    title: 'Event',
    dataIndex: 'event',
    key: 'event',
    sorter: false,
  },
  {
    title: 'Activity',
    dataIndex: 'activity',
    key: 'activity',
    sorter: false,
  },
  // {
  //   title: 'Company',
  //   dataIndex: 'company',
  //   key: 'company',
  //   sorter: false,
  // },
  {
    title: 'Time',
    dataIndex: 'timestamp',
    key: 'timestamp',
    sorter: false,
    render: (text) => <span>{text ? new Date(text.seconds * 1000).toLocaleString("en-US") : ''}</span> 
  },
];

export default (props) => {

  const collectionRef = collection(database, 'activity');
  const company = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company;
  const [data, setData] = useState([]);
  

  const getData = () => {
    let d = [];
      let q = query(collectionRef, where("company", "==", company), orderBy('timestamp', 'desc'));
    onSnapshot(q, (snapshot) => {
      d = snapshot.docs.map(item => { return {...item.data(), uid: item.id } });
        setData(d);
    })
  }


  useEffect(() => {
    getData(null);
  }, []);

  const onSearch = (value) => {
    let filter = [];
    let d =[];
    let q = null;
    let startTime = '';
    let endTime ='';
    if (value.id && value.date) {
      startTime = Timestamp.fromDate(new Date(value.date[0]));
      endTime = Timestamp.fromDate(new Date(value.date[1]));
      q = query(collectionRef, where("company", "==", company), where("id", "==", value.id), orderBy('timestamp', 'desc'), where('timestamp', '>', startTime), where('timestamp', '<', endTime));
      onSnapshot(q, (snapshot) => {
        d = snapshot.docs.map(item => { return {...item.data(), uid: item.id } });
        setData(d)
      });
    } else if (value.id) {
      console.log('i am hre')
      q = query(collectionRef, where("company", "==", company), orderBy('timestamp', 'desc'), where("id", "==", value.id));
      onSnapshot(q, (snapshot) => {
        d = snapshot.docs.map(item => { return {...item.data(), uid: item.id } });
        setData(d)
      });
    } else if (value.date) {
      startTime = Timestamp.fromDate(new Date(value.date[0]));
      endTime = Timestamp.fromDate(new Date(value.date[1]));

      q = query(collectionRef, where("company", "==", company), orderBy('timestamp', 'desc'), where('timestamp', '>', startTime), where('timestamp', '<', endTime));
      onSnapshot(q, (snapshot) => {
        d = snapshot.docs.map(item => { return {...item.data(), uid: item.id } });
        setData(d)
      });
    } else {
      q = query(collectionRef, where("company", "==", company), orderBy('timestamp', 'desc'));
      onSnapshot(q, (snapshot) => {
        d = snapshot.docs.map(item => { return {...item.data(), uid: item.id } });
        setData(d)
      })
    }
  }

  return (
    <Row gutter={[30, 24]}>
      <Col span={24}>
        <HeadingChip title={'Activity Logs'} />
      </Col>
      <Col span={24}>
        <ListCard
          ListCol={ListCol}
          ListData={data}
          Search={ActivitySearch}
          onSearch={onSearch}
          pagination={true}
        />
      </Col>
    </Row>
  );
};
