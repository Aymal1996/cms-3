import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Card, Image, Spin, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import { getLetterTemplateList } from '../../ducks/actions';
import ListCard from '../../../../../molecules/ListCard';
import AddEditLetterTemplate from './Components/AddEditLetteremplate';
import Search from './Components/Search';
import { allowed } from '../../../../../../routing/config/utils';
import Roles from '../../../../../../routing/config/Roles';
import { baseUrl } from '../../../../../../configs/constants';

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [teamplateData, setTemplateData] = useState('');

  const dispatch = useDispatch();
  const tempData = useSelector((state) => state.setup.letterTemplateListData);
  const ListCol = [
    {
      title: 'Template Name',
      dataIndex: 'name',
      key: 'name',
      sorted: (a, b) => a.name - b.name,
    },
  ];

  const btnList = [
    {
      text: '+ New Letter Template',
      classes: 'green-btn',
      action: () => {
        setTemplateData({ name: '', template_name: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: true,
    visibility: visible,
    content: (
      <AddEditLetterTemplate
        templateData={teamplateData}
        title={`${teamplateData.name ? 'Edit' : 'Add New'} Letter Template`}
        onClose={() => setVisible(false)}
      />
    ),
    width: 750,
    onCancel: () => {
      setVisible(false);
    },
  };
  const onCardHandler = (e) => {
    setTemplateData(e);
    setVisible(true);
  };

  const onSearch = (value) => {
    console.log('check values', value);
  };

  const onTableChange = (pagination, filters, sorter) => {
    console.log('heloo', pagination);
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getLetterTemplateList(pagination.current, pagination.pageSize, sorter.order, sorted.columnKey));
    } else {
      dispatch(getLetterTemplateList(pagination.current, pagination.pageSize, '', ''));
    }
  };

  const onPageChange = (pg) => {
    setPage(pg);
    getLetterTemplateList(pg, limit, '', '');
  };

  useEffect(() => {
    if (!visible) {
      dispatch(getLetterTemplateList(page, limit, '', ''));
    }
  }, [visible]);

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Letter Template" btnList={allowed([Roles.SETUP], 'write') ? btnList : null} />
        </Col>
        <Col span={24}>
          <Card bordered={false} className="uni-card">
            <Row gutter={[24, 20]}>
              {tempData && tempData.rows ? (
                tempData?.rows.map((value) => (
                  <Col>
                    <Card
                      hoverable={true}
                      className="mini-card b-dark-gray"
                      bordered={false}
                      onClick={() => onCardHandler({ name: value.name, template_name: value.template_name })}
                      cover={<Image preview={false} width={310} height={110} src={`${baseUrl}${value.letter_head}`} />}
                    >
                      <Card.Meta title={value.template_name} />
                    </Card>
                  </Col>
                ))
              ) : (
                <></>
              )}
            </Row>
          </Card>
          {/* <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={tempData?.rows}
            pagination={{
              total: tempData?.count,
              current: page,
              pageSize: limit,
            }}
            onChange={onTableChange}
          /> */}
        </Col>
        <Col span={24}>
          <div className="w-100 text-right mt-2">
            <Pagination
              pageSize={limit}
              current={page}
              hideOnSinglePage={false}
              onChange={onPageChange}
              total={tempData?.count}
            />
          </div>
        </Col>
      </Row>
      <Popup {...popup} />
    </>
  );
};
