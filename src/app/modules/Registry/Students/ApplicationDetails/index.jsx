import React, { useState, useEffect } from 'react';
import { Breadcrumb, Row, Col, Space, Typography, Card, Button } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import SideDetails from '../../../../molecules/SideDetails';
import { PhoneIcon, MailIcon, TickIcon } from '../../../../atoms/CustomIcons';
import ApplicationStatus from '../../../../molecules/ApplicationStatus';
import { PopupSuccess } from '../../../../atoms/Popup';
import StudentForm from '../../components/StudentForm';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router';
import { getStudentAppdetails, emptyStudentApp } from '../ducks/actions';
import { CloseCircleFilled } from "@ant-design/icons";
import moment from 'moment';
import UpdateSection from '../../../../molecules/UpdateSection';
import {getComments, emptyComments} from '../../../Application/ducks/actions';
import { useMediaQuery } from 'react-responsive';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { BreakingPoint } from '../../../../../configs/constantData';
import { generateOfferLetter, releaseOfferLetter } from '../ducks/services';
import ApplicationDocuments from '../../../../molecules/ApplicationDocuments';

const { Title, Text } = Typography;

export default (props) => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const location = useLocation();
    const url = location.pathname;
    const history = useHistory();
    const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
    const appData = useSelector(state => state.students.studentAppData);
    const commentsApi = useSelector(state => state.global.comments);

    useEffect(() => {
        callApi();
        if (url.includes('students')) {
            dispatch(getComments('Students', `${id}`))
        } else {
            dispatch(getComments('Application', `${id}`))
        }
        return () => {dispatch(emptyStudentApp()); dispatch(emptyComments()) };
    }, []);

    const callApi = () => {
        dispatch(getStudentAppdetails(id))
    }

    const popup = {
        closable: false,
        className: 'black-modal',
        title: 'Offer Letter Released',
        content: 'The offer letter for Rebecca Holmes has successfully been released.',
        width: 536,
    };

    const sideData = [
        {
            type:'image',
            imgurl:'',
            size: 120,
            highlight: true,
        },
        {
            type:'tag',
            title:'Application',
            noDivider: true,
            highlight: true,
        },
        {
            type:'mainTitle',
            title: appData?.applicant_name,
            subtitle: appData?.applicant_id,
            highlight: true,
        },
        {
            type:'single',
            title: appData?.nationality,
            highlight: true,
            noLine: true,
        },
        {
            type:'titleValue',
            title: 'Counselor',
            value: appData?.counsellor
        },
        {
            type:'titleValue',
            title: 'Application Date',
            value: appData?.creation ? moment(appData?.creation).format('Do MMMM YYYY') : '' ,
            noDivider: true
        },
    ]

    const bottomList = [
        {
            icon: <PhoneIcon />,
            text: appData?.contact_no
        },
        {
            icon: <MailIcon />,
            text: appData?.email
        },
    ]
    // const documents = [
    //     {
    //         name: 'Passport Photo with White Background',
    //         type: 'Passport Photo with White Background',
    //         url: '',
    //     },
    //     {
    //         name: 'IC/Passport (Scanned)',
    //         type: 'IC/Passport (Scanned)',
    //         url: '',
    //     },
    //     {
    //         name: 'Academic Transcript 1',
    //         type: 'Academic Transcript 1',
    //         url: '',
    //     },
    //     {
    //         name: 'Academic Certificate 1',
    //         type: 'Academic Certificate 1',
    //         url: '',
    //     },
    //     {
    //         name: 'English Proficiency Certificate',
    //         type: 'English Proficiency Certificate',
    //         url: appData && appData.qualifications ? appData.qualifications[0]?.certificate : '',
    //     },
    //     {
    //         name: 'Offer Letter',
    //         type: 'Offer Letter',
    //         url: '',
    //     },
    //     {
    //         name: 'Resume/CV',
    //         type: 'CV',
    //         url: '',
    //     },
    //     {
    //         name: 'Portfolio',
    //         type: 'Portfolio',
    //         url: '',
    //     },
    //     {
    //         name: 'Visa Approval Letter',
    //         type: 'Visa Approval Letter',
    //         url: '',
    //     },
    //     {
    //         name: 'Accommodation Offer Letter',
    //         type: 'Accommodation Offer Letter',
    //         url: '',
    //     },
    //     {
    //         name: 'Arrival Form',
    //         type: 'Arrival Form',
    //         url: '',
    //     },
    //     {
    //         name: 'Accommodation Form',
    //         type: 'Accommodation Form',
    //         url: '',
    //     },
    //     {
    //         name: 'Sponsorship Recommendation Letter',
    //         type: 'Sponsorship Recommendation Letter',
    //         url: '',
    //     },
    // ]

    // useEffect(() => {
    //     if(Object.keys(appData).length > 0) {
    //         appData?.documents.map((item,index) => {
    //             let ax = documents.findIndex(y => y?.type == item?.document_name);
    //             if (ax >= 0) {
    //              documents[ax].url = item?.document;
    //             }
    //         })
    //     }
    // }, [appData]);

    const onAction = () => {
        generateOfferLetter(appData?.applicant_id).then(res => {
            releaseOfferLetter(res2 => {
                PopupSuccess(popup);
                setTimeout(() => history.push('/registry/pending-offerletter'), 1000)
            }).catch(e => {
                const { response } = err;
                console.log('checking', err);
                message.error('Something went wrong');
            })
        }).catch(err => {
            const { response } = err;
            console.log('checking', err);
            message.error('Something went wrong');
        })
    }

    const onNotify = () => {

    }

    const stepping = [
        {
            title: 'Medical Checkup',
            status: 'done',
        },
        {
            title: 'Visa Sticker',
            status: 'done',
        },
        {
            title: 'Tuition Fee',
            status: 'done',
        },
        {
            title: 'Student Registration',
            status: 'pending',
            reason: 'The applicant need to verify their course structure and semester in the Student Portal. Please contact Marketing Department to notify the applicant.',
            pending: appData.application_date ? moment(appData.application_date).fromNow() : '',
            button: 'Notify Marketing Department',
            action: onNotify
        },
    ]

    const stepping1 = [
        {
            title: 'Registration Fee',
            status: 'Completed',
        },
        {
            title: 'Offer Letter Release',
            status: 'pending',
            depart: 'Registry Department',
            pending: appData.application_date ? moment(appData.application_date).fromNow() : '',
        },
    ]

    const updateComment= () => {
        if (url.includes('students')) {
            dispatch(getComments('Students', `${id}`));
        } else {
            dispatch(getComments('Application', `${id}`));
        }
    }

    const PendingRegistrationVisa = () => {
        return (
            <>            
                <Col span={24}>
                    <Space size={3} direction='vertical' className='w-100'>
                        <Text className='c-gray'>Stage 3</Text>
                        <Title level={4} className='c-default mb-0'>Pending Registration & Visa</Title>
                    </Space>
                </Col>
                {stepping1.map((item,index) => (
                    <>
                    

                    {item.status == 'pending' ? (
                    <Col span={8}>
                        <Card bordered={false} className='red-card h-100'>
                            <Space direction='vertical' size={50} className='w-100'>
                                <Space direction='vertical' className='w-100' size={3}>
                                    <Title level={5} className='mb-0'>{item.title}</Title>
                                    <Text className='op-6'>{item.depart}</Text>
                                </Space>
                                <Title level={3} className='mb-0'>{item.pending}</Title>
                            </Space>
                        </Card>
                    </Col>)
                    :
                    <Col span={8}>
                        <Card bordered={false} className='uni-card-small b-black'>
                            <Space direction='vertical' size={30} className='w-100'>
                                <Title level={5} className='mb-0'>{item.title}</Title>
                                <Space direction='vertical' className='w-100' size={20} align='center'>
                                    <span className='sole-icon b-success'><TickIcon /></span>
                                    <Title level={4} className='mb-0'>{item.status}</Title>
                                </Space>
                            </Space>
                        </Card>
                    </Col>
                    }
                </>))}
                <Col span={24}>
                    <Space size={20} direction='vertical' className='w-100'>
                        <Card bordered={false} className='uni-card-small b-black'>
                            <Row gutter={[20,20]}>
                                <Col flex='auto'>
                                    <Title level={5} className='mb-0 lineHeight40'>Offer Letter Release</Title>
                                </Col>
                                <Col>
                                    <Button type='primary' size='large' htmlType='button' className='green-btn' onClick={onAction}>Release Offer Letter</Button>
                                </Col>
                            </Row>
                        </Card>
                        <Text className='c-gray'>Please verify the programme offered before releasing the offer letter</Text>
                    </Space>
                </Col>

                {/* <Col span={24}>
                    <Space size={3} direction='vertical' className='w-100'>
                        <Text className='c-gray'>Step 2</Text>
                        <Title level={4} className='c-gray mb-0'>Pending Visa Processing Fee</Title>
                    </Space>
                </Col> */}
            </>
        )
    }

    const PendingEnrollment = () => {
        return (
            <>  
            {stepping.map((item,index) => (
                <Col span={24} key={index}>
                    <Card bordered={false} className={`uni-card-small ${item.status == 'done' ? 'b-black' : 'b-error'}`}>
                        <Row gutter={[20,20]} align='middle'>
                            <Col flex='auto'>
                                <Space size={3} direction='vertical' className='w-100'>
                                    <Text className={`${item.status == 'done' ? 'c-gray' : 'c-white'}`}>Step {index + 1}</Text>
                                    <Title level={4} className={`mb-0 ${item.status == 'done' ? 'c-default' : 'c-white'}`}>{item.title}</Title>
                                </Space>
                            </Col>
                            <Col>
                                <span className={`sole-icon-small ${item.status == 'done' ? 'b-success' : 'fontSize20'}`}>{item.status == 'pending' ? <CloseCircleFilled className='c-white' /> : <TickIcon />}</span>
                            </Col>
                            {item.status == 'pending' && (
                                <>
                                    <Col span={24}>
                                        <Text className='op-6'>The applicant need to verify their course structure and semester in the Student Portal. Please contact Marketing Department to notify the applicant.</Text>
                                    </Col>
                                    <Col span={24}>
                                        <Title level={3} className='mb-0'>{`${item.pending} Days`}</Title>
                                    </Col>
                                    <Col span={24}>
                                        <Button type='button' className='btnoutline-white w-100' onClick={item.action} size='large'>{item.button}</Button>
                                    </Col>
                                </>
                            )}
                        </Row>
                    </Card>
                </Col>
            ))}
            </>
        )
    }

    const props1 = {
        title: 'Pending Registration & Visa',
        appStage: '3',
        stage: 2,
        type: 'app',
        noTitle: false,
        component: <PendingRegistrationVisa />
    }
    const props2 = {
        title: 'Pending Enrolment',
        appStage: '5',
        stage: 4,
        type: 'app',
        noTitle: false,
        component: <PendingEnrollment />
    }

    return (
        <>
            <Breadcrumb separator=">" className='mb-1'>
                <Breadcrumb.Item href="/registry/students">Students</Breadcrumb.Item>
                {url.includes('offerletter') &&
                <Breadcrumb.Item href="/registry/pending-offerletter">Pending Offer Letter Release</Breadcrumb.Item>
                }
                {url.includes('registration') &&
                <Breadcrumb.Item href="/registry/pending-registration">Pending Student Registration</Breadcrumb.Item>
                }
                <Breadcrumb.Item>Application Details</Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={[20, 30]}>
                <Col span={24}>
                    <HeadingChip title={'Application Details'}  />
                </Col>
                <Col span={24}>
                    <div className='twocol-3070'>
                        <div className='side-detail'>
                            {isHDScreen ?
                            <SideDetails data={sideData} type='info' bottom={bottomList} />
                            :
                            <SideDetailResponsive data={sideData} type='info' bottom={bottomList} />
                            }
                        </div>
                        <div className='side-form'>
                            <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
                                <Row gutter={[20, 20]}>
                                    <Col span={24}>
                                        <ApplicationStatus {...url.includes('registration') ? props2 : props1} />
                                    </Col>
                                    <Col span={24}>
                                        <StudentForm data={appData} />
                                    </Col>
                                    <Col span={24}>
                                        <ApplicationDocuments 
                                        id={id} 
                                        doc={appData.documents}
                                        setLoading={props.setLoading}
                                        updateApi={callApi}
                                        />
                                    </Col>
                                    <Col span={24}>
                                        <UpdateSection data={commentsApi} code={appData.applicant_id} module={'Application'} updateComment={updateComment} />
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}