import React, { Fragment, useState, useEffect } from 'react';
import { Col, Card } from 'antd';
import StatusCard from '../StatusCard';

export default (props) => {

    const { data, page } = props;
    const [ statuses, setStatuses ] = useState([]);

    useEffect(() => {
        if (data) {
            let temp = [];
            let pet = false;
            data.map(x => {
                if(x.status == 0 && pet == false) {
                    temp.push({
                        val: 'true',
                        status: x.status,
                    })
                    pet = true
                } else if(x.status == 1) {
                    temp.push({
                        val: data.length > 2 ? 'false' : 'true',
                        status: x.status,
                    })
                } else {
                    temp.push({
                        val: data.length > 2 ? 'false' : 'true',
                        status: 2,
                    })
                }
            })
            setStatuses(temp)
        }
    }, [data]);

    const setOpen = (idx) => {
        let temp = [];
        statuses.map((x, i) => {
            if(i==idx) {
                temp.push({
                    val: 'true',
                    status: x.status,
                })
            } else {
                temp.push({
                    val: 'false',
                    status: x.status,
                })
            }
        })
        setStatuses(temp)
    }

    return (
        <>
        {data?.map((ids, idx) => (
            <Fragment key={idx}>
                <Col flex={(page && data.length > 2) ? statuses[idx]?.val == 'true' ? '1 0 350px' : '1 0 180px' : data.length == 1 ? '1 0 100%' : page ? '1 0 50%' : '1 0 280px'}>
                    <Card bordered={false} className ='transparent-card-wrap' onClick={() => (page && data.length > 2) ? setOpen(idx) : null}>
                    <StatusCard 
                        index={idx + 1}
                        title={ids.title} 
                        text1={ids.text1} 
                        text2={ids.text2}
                        status={statuses[idx]?.status}
                        date={ids.days}
                        page={page}
                        open={statuses[idx]?.val}
                        numb={data.length}
                        pending={ids?.pendingtext}
                        btnText={ids?.btnText}
                        btnText2={ids?.btnText2}
                        onAction={ids?.onAction}
                        onFinish={ids?.onActionForm}
                        field={ids?.fields}
                        forminfo={ids.form}
                    />
                    </Card>
                </Col>
            </Fragment>
        ))}
        </>
    )
}