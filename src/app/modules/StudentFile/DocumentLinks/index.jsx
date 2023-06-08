import React, { useState, useEffect } from 'react';
import { message, Typography, Button, Space, Switch } from 'antd';
import { apiMethod, baseUrl } from '../../../../configs/constants';
import { Link, useLocation } from 'react-router-dom';
import { allowed } from '../../../../routing/config/utils';
import AllRoles from '../../../../routing/config/AllRoles';
import { DownloadIcon, CloseIcon } from 'Atoms/CustomIcons';
import axios from '../../../../services/axiosInterceptor';
import { getFileName } from '../../../../features/utility';
import {
  studFile,
  studAppForm,
  studProfile,
  studTranscript,
  studTimetable,
  studCalendar,
  prevDoc,
} from '../ducks/services';
import ListCard from 'Molecules/ListCard';
import { Popup } from 'Atoms/Popup';
import { CloseCircleFilled, RedoOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { pdfFileset } from '../ducks/actions';


const { Title, Text } = Typography;

const calendarCol = [
  {
    title: 'Program',
    dataIndex: 'program_code',
    key: 'program_code',
    width: 80,
  },
  {
    title: 'Semester',
    dataIndex: 'semester_source_period',
    key: 'semester_source_period',
    ellipsis: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 80,
  },
  {
    title: 'Term',
    dataIndex: 'term_code',
    key: 'term_code',
    width: 80,
  },
  {
    title: 'Start',
    dataIndex: 'term_start',
    key: 'term_start',
    width: 100,
  },
  {
    title: 'End',
    dataIndex: 'term_end',
    key: 'term_end',
    width: 100,
  },
];

const timetableCol = [
  {
    title: 'Term',
    dataIndex: 'TermCode',
    key: 'TermCode',
    width: 80,
  },
  {
    title: 'Grp',
    dataIndex: 'SubClassCode',
    key: 'SubClassCode',
    width: 40,
  },
  {
    title: 'Day',
    dataIndex: 'WeekDayCode',
    key: 'WeekDayCode',
    width: 40,
  },
  {
    title: 'Start Date',
    dataIndex: 'AttendanceDate',
    key: 'AttendanceDate',
    width: 100,
  },
  {
    title: 'From',
    dataIndex: 'FromTime',
    key: 'FromTime',
    width: 80,
  },
  {
    title: 'To',
    dataIndex: 'ToTime',
    key: 'ToTime',
    width: 80,
  },
  {
    title: 'Type',
    dataIndex: 'AttendDateType',
    key: 'AttendDateType',
    width: 80,
  },
  {
    title: 'Lecturer',
    dataIndex: 'LecturerName',
    key: 'LecturerName',
  },
  {
    title: 'Classroom',
    dataIndex: 'ClassroomName',
    key: 'ClassroomName',
  },
  {
    title: 'Module',
    dataIndex: 'ModuleName',
    key: 'ModuleName',
    ellipsis: true,
  },
];

export default ({ docname, appData, updateApi, alldocs, deleteDoc, setLoading, doctype }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const url = location.pathname.split('/')[2];
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    if (appData && docname == 'Academic Calendar') {
      getAcademic();
    } else if (appData && docname == 'Class Time Table') {
      getTimetable();
    }
  }, [appData]);

  const checkDoc = () => {
    let a = null;
    if (alldocs) {
      a = alldocs.find((x) => x.document_name == docname);
    }
    if (
      a &&
      docname != 'Student Profile' &&
      docname != 'Application Form' &&
      docname != 'Student File' &&
      docname != 'Class Time Table' &&
      docname != 'Academic Calendar'
    ) {
      return true;
    } else {
      return false;
    }
  };

  const getDocURL = () => {
    let a = alldocs.filter((x) => x.document_name.toLowerCase() == docname.toLowerCase());
    if (a && a.length > 0) {
      return a;
    } else {
      return [];
    }
  };

  const checksystemDoc = () => {
    if (
      docname == 'Student Profile' ||
      docname == 'Application Form' ||
      docname == 'Student File' ||
      docname == 'Class Time Table' ||
      docname == 'Academic Calendar'
    ) {
      return true;
    } else {
      return false;
    }
  };

  const generatePDF = (type) => {
    setLoading(true);
    let fileurl = '';
    if (type == 'Student File') {
      studFile(appData, doctype)
        .then((res) => {
          setLoading(false);
          fileurl = res.data.message.message;
          updateApi();
          window.open(fileurl, '_blank');
        })
        .catch((e) => {
          setLoading(false);
          const { response } = e;
          console.log('error', response.data);
          message.error('Something Went Wrong');
        });
    } else if (type == 'Student Profile') {
      studProfile(appData, doctype)
        .then((res) => {
          setLoading(false);
          fileurl = res.data.message.message;
          updateApi();
          window.open(fileurl, '_blank');
        })
        .catch((e) => {
          setLoading(false);
          const { response } = e;
          console.log('error', response.data);
          message.error('Something Went Wrong');
        });
    } else if (type == 'Application Form') {
      studAppForm(appData, doctype)
        .then((res) => {
          setLoading(false);
          fileurl = res.data.message.message;
          updateApi();
          window.open(fileurl, '_blank');
        })
        .catch((e) => {
          setLoading(false);
          const { response } = e;
          console.log('error', response.data);
          message.error('Something Went Wrong');
        });
    }
  };

  // const onChange = async (status, did) => {
  //   let url = `${apiMethod}/registry.api.update_student_document_status`;
  //   const body = {
  //     name: did,
  //     parent: appData,
  //     document_enabled: status,
  //   };
  //   console.log('body', body);
  //   try {
  //     await axios.post(url, body);
  //     message.success('Document Updated');
  //     setTimeout(() => {
  //       updateApi();
  //     }, 1000);
  //   } catch (e) {
  //     const { response } = e;
  //     console.log('response', response);
  //     message.error(response?.data?.status?.message ?? 'Something went wrong');
  //   }
  // };

  const getAcademic = async () => {
    let data = await studCalendar(appData);
    if (data && data?.data && data?.data?.message && Array.isArray(data.data.message)) {
      setCalendarData(data.data.message);
    }
  };

  const getTimetable = async () => {
    let data = await studTimetable(appData);
    if (data && !data?.data?.success) {
      setCalendarData(data.data.message.data);
    }
  };

  const previewDoc = async (docid) => {
    setLoading(true);
    let fileurl = '';
    if (docname != 'Orientation Program' && docname != 'Student Manual Book & Refund Policy') {
      await prevDoc(appData, docname, docid)
        .then((res) => {
          fileurl = res.data.message;
          setLoading(false);
          window.open(fileurl, '_blank');
        })
        .catch((err) => {
          setLoading(false);
          message.error('Something went worng');
          console.log('something went worng');
        });
    } else {
      setLoading(false);
      window.open(`${baseUrl}${docid}`, '_blank');
    }
  };

  const getCol = () => {
    switch (docname) {
      case 'Academic Calendar':
        return calendarCol;
      case 'Class Time Table':
        return timetableCol;
    }
  };

  const popup = {
    closable: true,
    visibility: visible,
    content: <ListCard ListCol={getCol()} ListData={calendarData} pagination={false} />,
    width: 1200,
    onCancel: () => setVisible(false),
  };

  const kptCol = [
    {
      title: 'Program',
      dataIndex: 'program_name',
      key: 'program_name',
      ellipsis: true,
    },
    {
      title: 'Type',
      dataIndex: 'document_type',
      key: 'document_type',
      width: 100,
    },
    {
      title: 'View',
      dataIndex: 'document',
      key: 'document',
      width: 120,
      render: (text, record) => (
        <Space size={5}>
          <Button
            type="link"
            onClick={() => previewDoc(record?.document)}
            htmlType="button"
            className="p-0 w-auto h-auto"
            icon={<DownloadIcon className="c-success fontSize20" />}
          ></Button>
          {/* {allowed([AllRoles.STUDENT.AUDIT], 'write') && url === 'auditor' && (
            <Button
              type="link"
              onClick={() => deleteDoc(record?.document_id)}
              htmlType="button"
              className="p-0 w-auto h-auto"
              icon={<CloseCircleFilled className="c-error fontSize20" />}
            ></Button>
          )} */}
        </Space>
      ),
    },
  ];

  const docCol = [
    {
      title: 'Document',
      dataIndex: 'document',
      key: 'document',
      ellipsis: true,
      render: (text, record) => <span>{getFileName(text)}</span>,
    },
    // {
    //   title: 'Date',
    //   dataIndex: 'document_date',
    //   key: 'document_date',
    // },
    {
      title: 'Action',
      dataIndex: 'document_id',
      key: 'document_id',
      width: 120,
      render: (text, record) => (
        <Space size={5}>
          <Button
            type="link"
            onClick={() => previewDoc(record?.document)}
            htmlType="button"
            className="p-0 w-auto h-auto"
            icon={<DownloadIcon className="c-success fontSize20" />}
          ></Button>
          {/* <Link to={{ pathname: record?.s3url }} target="_blank">
            <DownloadIcon className="c-success" />
          </Link> */}
          {allowed([AllRoles.STUDENT.AUDIT], 'write') &&
            url === 'auditor' &&
            docname != 'Orientation Program' &&
            docname != 'Student Manual Book & Refund Policy' &&
            deleteDoc && (
              <Button
                type="link"
                onClick={() => deleteDoc(record?.document_id)}
                htmlType="button"
                className="p-0 w-auto h-auto"
                icon={<CloseCircleFilled className="c-error fontSize20" />}
              ></Button>
            )}
        </Space>
      ),
    },
  ];

  return (
    <>
      {appData ? (
        checkDoc() ? (
          <Space direction="vertical" size={5} className="w-100">
            {docname == 'Programme Approval Letter (KPT & MQA)' ? (
              <ListCard
                listClass="nospace-card"
                ListCol={kptCol}
                ListData={getDocURL()}
                pagination={false}
                scrolling={500}
              />
            ) : (
              <ListCard
                listClass="nospace-card"
                ListCol={docCol}
                ListData={getDocURL()}
                pagination={false}
                scrolling={500}
              />
            )}
            {/* <>
                {getDocURL().map((x, i) => (
                  <Space size={5}>
                    <Text className="">
                      {getFileName(x?.document)} - {x?.document_date}
                    </Text>
                    <Link
                      to={{ pathname: x?.s3url }}
                      target="_blank"
                    >
                      <DownloadIcon className="c-success" />
                    </Link>
                    {allowed([AllRoles.STUDENT.AUDIT], 'write') && url === 'auditor' && (
                    <Button
                    type="link"
                    onClick={() => deleteDoc(x?.document_id)}
                    htmlType="button"
                    className="p-0 w-auto h-auto"
                    icon={<CloseCircleFilled className="c-error fontSize20" />}
                  ></Button>)}
                  </Space>
                ))}
              </> */}
          </Space>
        ) : checksystemDoc() ? (
          <>
            {(docname == 'Academic Calendar' || docname == 'Class Time Table') && appData ? (
              <>
                {docname == 'Class Time Table' ? (
                  <Button
                    type="primary"
                    size="large"
                    htmlType="button"
                    className="green-btn"
                    onClick={() => setVisible(true)}
                  >
                    View Time Table
                  </Button>
                ) : (
                  <ListCard
                    listClass="nospace-card"
                    ListCol={getCol()}
                    ListData={calendarData}
                    pagination={false}
                    scrolling={500}
                  />
                )}
              </>
            ) : (
              <Space direction="vertical" size={10} className="w-100">
                {/* {getDocURL().map((x, i) => (
                  <Space size={5} key={i}>
                    <Text className="">
                      {getFileName(x?.document)} - {x?.document_date}
                    </Text>
                    <Link to={{ pathname: `${baseUrl}${x?.document}` }} target="_blank">
                      <DownloadIcon className="c-success" />
                    </Link>
                  </Space>
                ))} */}
                {getDocURL().length > 0 && (
                  <ListCard
                    listClass="nospace-card"
                    ListCol={docCol}
                    ListData={getDocURL()}
                    pagination={false}
                    scrolling={500}
                  />
                )}
                <Space size={5}>
                  <Text>{getDocURL().length > 0 ? 'Regenerate' : 'Preview'}</Text>
                  <Button
                    type="link"
                    onClick={() => generatePDF(docname)}
                    htmlType="button"
                    className="p-0"
                    icon={
                      getDocURL().length > 0 ? (
                        <RedoOutlined className="fontSize20 c-success" />
                      ) : (
                        <DownloadIcon className="c-success" />
                      )
                    }
                  ></Button>
                </Space>
              </Space>
            )}
          </>
        ) : (
          'N/A'
        )
      ) : (
        'N/A'
      )}
      <Popup {...popup} />
    </>
  );
};
