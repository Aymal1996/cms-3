import React, {useEffect, useState} from 'react';
import {Row, Col } from 'antd';
import HeadingChip from '../../../molecules/HeadingChip';
import { ProgramIcon, RequestIcon, CalendarIcon } from '../../../atoms/CustomIcons';
import { useTranslate } from 'Translate';
import DashboardStatusCard from '../../../molecules/DashboardStatusCard';
import { getProgrammesStatus } from './ducks/actions';
import { useDispatch, useSelector } from 'react-redux';


let req = [
    {
        title: "Faculty Requests",
        value: 11,
        status: 'b-error',
        key: ''
    },
    {
        title: "Finance Requests",
        value: 5,
        status: 'b-error',
        key: ''
    },
    {
        title: "Registry Requests",
        value: 3,
        status: 'b-error',
        key: ''
    },
];

let calen = [
    {
        title: "Academic Calendar Requests",
        value: 6,
        status: 'b-error',
        key: ''
    },
];

export default (props) => {

    const i18n = useTranslate();
    const { t } = i18n;
    const dispatch = useDispatch();
    const programStatus = useSelector(state => state.overview.programmeStatus);
    const [progStatus, setProgStatus] = useState([]);

    useEffect(() => {
        dispatch(getProgrammesStatus())
    }, []);

    useEffect(() => {
        if (programStatus.length > 0) {
            let temp = [
                {
                    title: "Expired Accreditation",
                    value: programStatus[0].accreditation_expired || 0,
                    status: 'b-error',
                    filter: 'Expired Accreditation'
                },
                {
                    title: "Expiring Licenses",
                    value: programStatus[0].expiring_licenses || 0,
                    status: 'b-pending',
                    filter: 'Expired License'
                },
                {
                    title: "Inactive Program",
                    value: programStatus[0].inactive_programs || 0,
                    status: 'b-default',
                    filter: 'Inactive Program'
                },
            ];
            setProgStatus(temp);
        }
    }, [programStatus]);

    const data = [
        {
            title: t('AQA.Overview.programme'),
            icon: <ProgramIcon />,
            data: progStatus,
            link: '/aqa/programme',
        },
        {
            title: t('AQA.Overview.requests'),
            icon: <RequestIcon />,
            data: req,
            link: '/aqa/requests'
        },
        {
            title: t('AQA.Overview.calendar'),
            icon: <CalendarIcon />,
            data: calen,
            link: ''
        },
    ]

    return (
        <Row gutter={[30, 24]}>
            <Col span={24}>
                <HeadingChip title={t('AQA.Overview.title1')} />
            </Col>
            <Col span={24}>
                <Row gutter={[20, 20]}>
                    {data.map((item, index) =>
                        <Col flex='1 0 280px' key={index}>
                            <DashboardStatusCard data={item} />
                        </Col>
                    )}
                </Row>
            </Col>
        </Row>
    )
}