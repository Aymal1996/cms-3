import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Space, Button, Image } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import UpdateSection from 'Molecules/UpdateSection';
import { useHistory } from 'react-router-dom';
import Base64Downloader from 'common-base64-downloader-react';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, emptyComments } from '../../Application/ducks/actions';
import SideDetails from 'Molecules/SideDetails';
import SideDetailResponsive from 'Molecules/SideDetailResponsive';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../configs/constantData';
import { LeftOutlined } from '@ant-design/icons';
import ListCard from 'Molecules/ListCard';
import { DownloadIcon } from 'Atoms/CustomIcons';

import { allowed } from '../../../../routing/config/utils';
import Roles from '../../../../routing/config/Roles';
import { Popup } from 'Atoms/Popup';
import UploadDocuments from './UploadDocuments';
import { baseUrl } from '../../../../configs/constants';

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    section,
    id,
    onChangePos,
    listDocs,
    employeeDocuments,
    updateApi,
    uploadBtn,
    specifies,
    myProfile,
    doctype,
    nobutton,
    nodocument
  } = props;
  const [pos, setPos] = useState('');
  const [visible, setVisible] = useState(false);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const commentsApi = useSelector((state) => state.global.comments);
  const data = useSelector((state) => state.advancement.advData);
  const token = JSON.parse(localStorage.getItem('token')).access_token;

  const ListCol = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sorter: true,
    },
    // {
    //   title: 'Description',
    //   dataIndex: 'description',
    //   key: 'description',
    //   sorter: true,
    // },
    // {
    //   title: 'Applied',
    //   dataIndex: 'applied',
    //   key: 'applied',
    //   sorter: true,
    // },
    // {
    //   title: 'Expiry',
    //   dataIndex: 'expiry',
    //   key: 'expiry',
    //   sorter: true,
    // },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        // <Button type="link" htmlType="button" onClick={() => downloadDocument(record)} className="p-0" icon={<DownloadIcon className="c-success" />} />
        <Base64Downloader
          base64={record?.document}
          downloadName={record?.type + record?.name}
          className="p-0"
          style={{ cursor: 'pointer', background: 'transparent', border: 0 }}
        >
          <DownloadIcon className="c-success" />
        </Base64Downloader>
      ),
    },
    // {
    //   title: 'Delete',
    //   dataIndex: 'delete',
    //   key: 'delete',
    //   align: 'center',
    //   render: (text, record) => (
    //     <Button type="link" htmlType="button" onClick={() => downloadDocument(record)} className="p-0" icon={<CloseCircleFilled  className='c-error'/>} />
    //   ),
    // },
  ];

  useEffect(() => {
    updateComment();
    return () => dispatch(emptyComments());
  }, []);

  const changePosition = (e) => {
    setPos(e.target.value);
  };

  useEffect(() => {
    if (data && data.position) {
      setPos(data.position[0]);
    }
  }, [data]);

  const sideData = [
    {
      type: 'image',
      url: `${baseUrl}${data?.image}`,
      size: 120,
      highlight: true,
    },
    {
      type: 'tag',
      title: 'Staff',
      noDivider: true,
      highlight: true,
    },
    {
      type: 'mainTitle',
      title: data?.employee_name,
      subtitle: data?.employee_id,
      highlight: true,
    },
    {
      type: 'titleValue',
      title: 'Fit Index',
      value: data?.index_ratio || data?.index_status,
    },
    {
      type: 'single',
      title: data?.country,
      highlight: true,
      noLine: true,
    },
    {
      type: 'radios',
      title: 'Job Title',
      value: data?.position || '',
      current: pos,
      onChange: changePosition,
    },
    // {
    //   type: 'titleValue',
    //   title: 'Company',
    //   value: data?.company || '',
    // },
    {
      type: 'titleValue',
      title: 'Team',
      value: data?.team_name,
      //   noDivider: true,
    },
  ];

  const uploadDocs = () => {
    setVisible(true);
  };

  const updateComment = () => {
    dispatch(getComments(section, id, doctype));
  };

  const bottomList = [
    {
      title: 'Issue Warning Letter',
      type: 'button',
      class: 'black-btn',
      action: () =>
        history.push({
          pathname: `/hrms/employment/${id}`,
          state: { tab: '2', param: 'warn' },
        }),
    },
  ];

  const popup = {
    closable: false,
    visibility: visible,
    content: (
      <UploadDocuments
        title="Upload Documents"
        onClose={() => setVisible(false)}
        updateApi={updateApi}
        setVisible={setVisible}
      />
    ),
    width: 536,
    onCancel: () => setVisible(false),
  };

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <Space direction="vertical" size={18}>
            <Button type="link" className="c-gray-linkbtn p-0" onClick={() => history.goBack()} htmlType="button">
              <LeftOutlined /> Back
            </Button>
            <HeadingChip title="Staff Details" />
          </Space>
        </Col>

        <Col span={24}>
          <div className="twocol-3070">
            <div className="side-detail">
              {isHDScreen ? (
                <SideDetails
                  data={sideData}
                  type="button"
                  bottom={allowed([Roles.EMPLOYMENT], 'write') || !nobutton ? bottomList : null}
                />
              ) : (
                <SideDetailResponsive
                  data={sideData}
                  type="button"
                  bottom={allowed([Roles.EMPLOYMENT], 'write') ? bottomList : null}
                />
              )}
            </div>
            <div className="side-form">
              <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
                <Row gutter={[20, 20]}>
                  <Col span={24}>
                    <Space direction="vertical" className="w-100" size={20}>
                      {props.children}
                    </Space>
                  </Col>
                  {!nodocument && (
                    <Col span={24}>
                      <ListCard
                        scrolling={500}
                        title="Documents"
                        ListCol={ListCol}
                        ListData={employeeDocuments}
                        pagination={false}
                        extraBtn={uploadBtn && '+ Upload Documents'}
                        extraAction={uploadBtn && uploadDocs}
                      />
                    </Col>
                  )}
                  <Col span={24}>
                    <UpdateSection
                      data={commentsApi}
                      code={id}
                      module={section}
                      updateComment={updateComment}
                      specifies={specifies}
                      myProfile={myProfile}
                    />
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
