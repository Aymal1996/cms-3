import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SchemeSearch from '../../../SchemeSearch';
import ListCard from 'Molecules/ListCard';
import moment from 'moment';

const column = [
    {
      title: 'Billing Date',
      dataIndex: 'billing_date',
      key: 'billing_date',
      sorter: true,
    //   render : (text,record) => text ? moment(text, 'Do MMMM YYYY') : ''
    },
    {
      title: 'Invoice No.',
      dataIndex: 'invoice_no',
      key: 'invoice_no',
      sorter: true,
    },
    {
      title: 'Code',
      dataIndex: 'invoice_code',
      key: 'invoice_code',
      sorter: true,
    },
    {
      title: 'Name',
      dataIndex: 'biller_name',
      key: 'biller_name',
      sorter: true,
    },
  ];

  const data  = [
      {
        billing_date: '2021-02-16',
        invoice_no: 'BRUNEI/LUCT/1302/1',
        invoice_code: '1233345',
        biller_name: 'Roy Stanley'
      },
      {
        billing_date: '2021-02-16',
        invoice_no: 'BRUNEI/LUCT/1302/1',
        invoice_code: '1233345',
        biller_name: 'Roy Stanley'
      },
      {
        billing_date: '2021-02-16',
        invoice_no: 'BRUNEI/LUCT/1302/1',
        invoice_code: '1233345',
        biller_name: 'Roy Stanley'
      },
      {
        billing_date: '2021-02-16',
        invoice_no: 'BRUNEI/LUCT/1302/1',
        invoice_code: '1233345',
        biller_name: 'Roy Stanley'
      },
      {
        billing_date: '2021-02-16',
        invoice_no: 'BRUNEI/LUCT/1302/1',
        invoice_code: '1233345',
        biller_name: 'Roy Stanley'
      },
      {
        billing_date: '2021-02-16',
        invoice_no: 'BRUNEI/LUCT/1302/1',
        invoice_code: '1233345',
        biller_name: 'Roy Stanley'
      },
      {
        billing_date: '2021-02-16',
        invoice_no: 'BRUNEI/LUCT/1302/1',
        invoice_code: '1233345',
        biller_name: 'Roy Stanley'
      },
      {
        billing_date: '2021-02-16',
        invoice_no: 'BRUNEI/LUCT/1302/1',
        invoice_code: '1233345',
        biller_name: 'Roy Stanley'
      },
      {
        billing_date: '2021-02-16',
        invoice_no: 'BRUNEI/LUCT/1302/1',
        invoice_code: '1233345',
        biller_name: 'Roy Stanley'
      },
  ]

export default (props) => {

    const dispatch = useDispatch();
    const [schemeDrop, setSchemeDrop] = useState([]);
    const [page, setPage] =  useState(1);
    const [limit, setLimit] =  useState(10);
    const scholorshipSingleData = useSelector((state) => state.scholarship.scholorshipSingleData);

    const onSearch = (search) => {

    }

    const onTableChange = (pagination, filters, sorter) => {
        setPage(pagination.current);
        setLimit(pagination.pageSize);
        if (sorter.order) {
            updateApi(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey)
        } else {
            updateApi(pagination.current, pagination.pageSize, '', '')
        }
      }

    useEffect(() => {
        if (scholorshipSingleData && Object.keys(scholorshipSingleData).length > 0) {
          if (scholorshipSingleData?.schemes) {
            let temp = [];
            scholorshipSingleData.schemes.map(x => {
              temp.push({
                label: x.scheme_name,
                value: x.name,
              })
              setSchemeDrop(temp);
            })
          }
        }
      }, [scholorshipSingleData]);

    return (
        <ListCard 
        Search={SchemeSearch} 
        onSearch={onSearch} 
        ListCol={column} 
        ListData={data} 
        listClass={'transparent-card'}
        scrolling={500}
        onChange={onTableChange}
        field1={schemeDrop}
        pagination={{
            total: 20,
            current: page,
            pageSize: limit
        }}
        />
    )
}