import React, { useState, useEffect } from 'react';
import { Card, Space, Typography } from 'antd';
import { Line } from '@ant-design/charts';

const { Title } = Typography;

// const datainit = [
//     {
//         prev: 0,
//         semester: 'Sem 1',
//         value: 2.78
//     },
//     {
//         prev: 2.78,
//         semester: 'Sem 2',
//         value: 2.18
//     },
//     {
//         prev: 2.18,
//         semester: 'Sem 3',
//         value: 3.17
//     },
//     {
//         prev: 3.17,
//         semester: 'Sem 4',
//         value: 3.23
//     },
//     {
//         prev: 3.23,
//         semester: 'Sem 5',
//         value: null
//     },
//     {
//         prev: null,
//         semester: 'Sem 6',
//         value: null
//     },
//     {
//         prev: null,
//         semester: 'Sem 7',
//         value: null
//     },
//     {
//         prev: null,
//         semester: 'Sem 8',
//         value: null
//     },
// ]

export default (props) => {

    const { figure, title } = props;
    const [data, setData] = useState([])
    const [result, setResult] = useState([])

    useEffect(() => {
      if(figure) {
        let temp = [];
        Object.entries(figure).map(([KEY,VAL]) => {
          
          temp.push({
            semester: KEY,
            value: (title == 'CGPA' ? parseFloat(VAL.cgpa) : parseFloat(VAL.gpa)).toFixed(1),
          })
        })
        setData(temp);
        
        if (temp.length > 0) {
          var last = temp[temp.length - 1]
          setResult(last.value)
        }
      }
    }, [figure]);

    const config = {
        data: data,
        xField: 'semester',
        yField: 'value',
        legend: false,
        padding: 'auto',
        height: 340,
        yAxis: {
          alignTick: false,
          
          grid: {
            line: {
              style: {
                stroke: '#7c7c7c',
                lineWidth: 1,
                strokeO1pacity: 0.5,
              },
            },
          },
          label: {
            formatter: (v) => v,
          },
        },
       
        xAxis: {
          tickLine: {
            style: {
              strokeOpacity: 0,
            },
          },
          line: {
            style: {
              strokeOpacity: 0,
            },
          },
        },
        point: {
          size: 5,
          shape: 'circle',
        //   style: (data) => {
        //     return data.value > data.prev ? {fill: '#171717',lineWidth: 3, stroke: '#02A574'} : {fill: '#171717',lineWidth: 3, stroke: '#F4664A'};
        //   },
        },
        lineStyle: {
            lineWidth: 2,
            stroke: '#02A574'
        },
        tooltip: {
          showMarkers: false,
        },
        annotations: [
            {
                type: 'regionFilter',
                start: ['min', 'average'],
                end: ['max', '0'],
                color: '#F4664A',
            },
        ]
      };

    return (
        <Card className="small-card8 b-black" bordered={false}>
            <Space size={20} direction="vertical" className="w-100">
                <Space size={5} direction="vertical" className="w-100">
                    <Title level={5} className="mb-0 c-white">{title}</Title>
                    <Title level={3} className="mb-0 c-success">{result || 0}</Title>
                </Space>
                <Line {...config} />
            </Space>
        </Card>
    )
}
