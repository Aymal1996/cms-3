import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Breadcrumb, message, Space, Button } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import SideDetails from 'Molecules/SideDetails';
import SideDetailResponsive from 'Molecules/SideDetailResponsive';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import { BreakingPoint } from '../../../../configs/constantData';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { allowed } from '../../../../routing/config/utils';
import AllRoles from '../../../../routing/config/AllRoles';
import { getStudentdetails, getAuditStudentdetails, emptyStudentApp } from '../../Registry/Students/ducks/actions';
import { Popup } from 'Atoms/Popup';
import { getFileName, getSignedURL, uniquiFileName } from '../../../../features/utility';
import UploadDocuments from '../../Registry/Students/components/UploadDocuments';
import DocumentLayout from '../DocumentLayout';
import { deleteDocument, prevDoc, updateDocs } from '../ducks/services';
import PDFViewer from 'Molecules/PDFViewer';
import SideDocumentList from '../../../molecules/SideDocumentList';

export default (props) => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [alldocs, setAllDocs] = useState([]);
  const [visible, setVisible] = useState(false);
  const [load, setLoad] = useState(false);
  const [pdfFile, setPDFFile] = useState(null);

  const url = location.pathname.split('/')[2];
  const appData = useSelector((state) => state.students.studentAppData);

  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

  const callApi = () => {
    props.setLoading(true);
    if (url === 'auditor') {
      dispatch(getAuditStudentdetails(id, props.setLoading));
    } else {
      dispatch(getStudentdetails(id, props.setLoading));
    }
  };

  useEffect(() => {
    callApi();
    return () => {
      dispatch(emptyStudentApp());
    };
  }, []);

  useEffect(async () => {
    if (Object.keys(appData).length > 0) {
      if (appData?.success == false) {
        message.error(appData.message);
      } else {
        let temp = [];
        let finding = null;
        await Promise.all(
          appData?.documents.map(async (item, i) => {
            if (item.document_name == 'Passport Photo with White Background') {
              let yz = '';
              await prevDoc(id, item.document_name, item.document)
                .then((res) => {
                  yz = res.data.message;
                })
                .catch((err) => {
                  console.log('something went worng');
                });
              if (yz) {
                temp.push({ ...item, s3url: yz });
              }
            } else {
              temp.push(item);
            }
          }),
        );
        let doc1 = temp.find(
          (x) =>
            x.document_name == 'Student File' ||
            x.document_name == 'Application Form' ||
            x.document_name == 'Student File',
        );
        if (doc1 && !allowed([AllRoles.STUDENT.AUDIT], 'write') && url === 'auditor') {
          await prevDoc(id, doc1?.document_name, doc1?.document)
            .then((res) => {
              setPDFFile(res.data.message);
            })
            .catch((err) => {
              console.log('something went worng');
            });
        }

        setAllDocs(temp);
      }
    }
  }, [appData]);

  const sideData = [
    {
      type: 'image',
      url: alldocs.find((x) => x.document_name == 'Passport Photo with White Background')
        ? alldocs.find((x) => x.document_name == 'Passport Photo with White Background').s3url
        : '',
      size: 120,
      highlight: true,
    },
    {
      type: 'tag',
      title: appData?.status,
      noDivider: true,
      highlight: true,
    },
    {
      type: 'mainTitle',
      title: appData?.applicant_name,
      subtitle: appData?.applicant_id,
      highlight: true,
    },
    {
      type: 'titleValue',
      title: 'IC / Passport',
      value: appData?.icpassport,
      highlight: true,
    },
    {
      type: 'single',
      title: appData?.nationality,
      highlight: true,
      noLine: true,
    },
    {
      type: 'single',
      title:
        appData && appData?.students_programs && appData?.students_programs.length > 0
          ? appData?.students_programs.map((x) => x.program.program_name).join(', ')
          : '',
    },
    {
      type: 'titleValue',
      title: 'Intake Date',
      value:
        appData && appData?.students_programs && appData?.students_programs.length > 0
          ? appData?.students_programs.find((x) => x.program.program_status == 'Active')?.program.program_intake_date ||
            appData?.students_programs[0].program.program_intake_date
          : '',
    },
    {
      type: 'titleValue',
      title: 'Expected to Graduate',
      value: '',
    },
  ];

  const onUploadDocs = async (val) => {
    setLoad(true);
    let docArray = [];

    let doctype = url === 'auditor' ? 'Students Audit' : 'Students';

    await Promise.all(
      val.documents.map(async (x) => {
        if (x?.document) {
          let modifiedName = uniquiFileName(x?.document?.file?.originFileObj.name, x.type.value);
          let surl = await getSignedURL(modifiedName, x.type.value, x?.document?.file?.originFileObj);
          docArray.push({
            item: x.type.value,
            file_url: surl?.filepath,
            document_date: x.document_date,
          });
        }
      }),
    );

    const body = {
      doctype: doctype,
      student_id: id,
      files: docArray,
    };

    updateDocs(body)
      .then((res) => {
        setLoad(false);
        message.success('Document Uploaded Successfully');
        setTimeout(() => {
          callApi();
          setVisible(false);
        }, 1000);
      })
      .catch((e) => {
        const { response } = e;
        console.log('response', response);
        message.error(response?.data?.status?.message ?? 'Something went wrong');
        setLoad(false);
      });
  };

  const deleteDoc = async (val) => {
    props.setLoading(true);
    let body = {
      student_id: id,
      document_id: val,
    };

    deleteDocument(body)
      .then((res) => {
        props.setLoading(false);
        message.success('Document Deleted Successfully');
        setTimeout(() => callApi(), 1000);
      })
      .catch((e) => {
        const { response } = e;
        console.log('response', response);
        message.error(response?.data?.status?.message ?? 'Something went wrong');
        props.setLoading(false);
      });
  };

  const popup = {
    closable: false,
    visibility: visible,
    content: <UploadDocuments onClose={() => setVisible(false)} onSubmit={onUploadDocs} load={load} />,
    width: 900,
    onCancel: () => setVisible(false),
  };

  const bottomList = [
    {
      title: 'Upload Documents',
      type: 'button',
      class: 'black-btn',
      action: () => setVisible(true),
    },
  ];

  const extendcomp = {
    title: 'Documents',
    comp: (
      <SideDocumentList
        setPDFFile={setPDFFile}
        id={appData?.applicant_id}
        alldocs={alldocs}
        setLoading={props.setLoading}
      />
    ),
    permit: !allowed([AllRoles.STUDENT.AUDIT], 'write') && url === 'auditor',
  };

  // const downloadFile = (filePath) => {
  //   var link=document.createElement('a');
  //   link.href = filePath;
  //   link.download = filePath.substr(filePath.lastIndexOf('/') + 1);
  //   link.click();
  // }

  const btnList = [
    {
      text: 'Download File',
      action: () => window.open(pdfFile, 'download'),
      classes: 'green-btn',
    },
  ];

  return (
    <>
      <Breadcrumb separator=">" className="mb-1">
        <Breadcrumb.Item className="cursor-pointer" onClick={() => history.goBack()}>
          Students
        </Breadcrumb.Item>
        <Breadcrumb.Item>Student Details</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip
            title="Student Details"
            btnList={!allowed([AllRoles.STUDENT.AUDIT], 'write') && url === 'auditor' ? btnList : null}
          />
        </Col>
        <Col span={24}>
          <div
            className={`twocol-3070 ${
              !allowed([AllRoles.STUDENT.AUDIT], 'write') && url === 'auditor' ? 'twocol-3070-responsive' : ''
            }`}
          >
            <div
              className={`side-detail ${
                !allowed([AllRoles.STUDENT.AUDIT], 'write') && url === 'auditor' ? 'ignore-side-detail-responsive' : ''
              }`}
            >
              {isHDScreen || (!allowed([AllRoles.STUDENT.AUDIT], 'write') && url === 'auditor') ? (
                <SideDetails
                  data={sideData}
                  type="button"
                  bottom={allowed([AllRoles.STUDENT.AUDIT], 'write') ? bottomList : []}
                  extendcomp={extendcomp}
                />
              ) : (
                <SideDetailResponsive
                  data={sideData}
                  type="button"
                  classes="w-100"
                  bottom={allowed([AllRoles.STUDENT.AUDIT], 'write') ? bottomList : []}
                />
              )}
            </div>
            <div
              className={`side-form ${
                !allowed([AllRoles.STUDENT.AUDIT], 'write') && url === 'auditor' ? 'ignore-side-form-responsive' : ''
              }`}
            >
              <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
                <Row gutter={[20, 20]}>
                  <Col span={24}>
                    {!allowed([AllRoles.STUDENT.AUDIT], 'write') && url === 'auditor' ? (
                      <Card bordered={false} className={`uni-card`}>
                        {pdfFile && <PDFViewer pdf={pdfFile} />}
                      </Card>
                    ) : (
                      <DocumentLayout
                        deleteDoc={deleteDoc}
                        callApi={callApi}
                        alldocs={alldocs}
                        appData={appData?.applicant_id}
                        setLoading={props.setLoading}
                        doctype={url === 'auditor' ? 'Students Audit' : 'Students'}
                      />
                    )}
                  </Col>
                </Row>
              </Card>
            </div>
          </div>
        </Col>
      </Row>

      <Popup {...popup} />
    </>
  );
};
