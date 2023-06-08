import React from 'react';
import { Row, Col, Card, Table, Radio, Typography, Space, Button } from 'antd';

const { Text, Title } = Typography;

export default (props) => {
  const {
    ListCol,
    ListData,
    filterData,
    pagination,
    onFilter,
    filterValue,
    filters,
    Search,
    ExtraBlocks,
    BlocksCount,
    onSearch,
    onRow,
    total,
    totaltitle,
    title,
    onChange,
    listClass,
    blackCard,
    extraBtn,
    extraAction,
    btnClass,
    extraBtn2,
    extraAction2,
    btnClass2,
    headclass,
    listStat,
    rowSelection
  } = props;

  const searchProps = {
    field1: props.field1,
    field2: props.field2,
    field3: props.field3,
    onChange1: props.onChange1,
  };

  return (
    <Card bordered={false} className={`uni-card ${listClass ? listClass : ''}`}>
      <Row gutter={[20, 30]}>
        {title && (
          <Col span={24}>
            <Title level={4} className={`c-default mb-0 ${headclass ? headclass : ''}`}>
              {title}
            </Title>
          </Col>
        )}
        {total && (
          <Col span={24}>
            <Space direction="vertical" size={0}>
              <Text className="c-gray">Total</Text>
              <Title level={3} className="ag-fontSize24 mb-0">{`${total} ${totaltitle}`}</Title>
            </Space>
          </Col>
        )}
        {listStat && listStat.map((x,i) => (
          <Col flex={x.width} key={i}>
            <Card bordered={false} className='red-card'>
              <Space size={20}>
                {x.icon}
                <Space size={4} direction='vertical'>
                  <Text className="op-6">{x.title}</Text>
                  <Title level={4} className=" c-white mb-0">{x.text}</Title>
                </Space>
              </Space>
            </Card>
          </Col>
        ))}
        {filters && (
          <Col span={24}>
            <Radio.Group
              size="large"
              className="radio-tabs"
              buttonStyle="solid"
              options={filters}
              onChange={onFilter}
              value={filterValue}
              optionType="button"
            />
          </Col>
        )}
        {ExtraBlocks ? (
          <Col span={24}>
            <ExtraBlocks data={BlocksCount} />
          </Col>
        ) : null}
        {onSearch && (
          <Col span={24}>
            <Search onSearch={onSearch} {...searchProps} />
          </Col>
        )}
        <Col span={24}>
          <Table
            scroll={{ x: props.scrolling ? props.scrolling : 1000 }}
            onRow={onRow}
            className={`custom-table ${props.classes ? props.classes : ''}`}
            bordered={false}
            columns={ListCol}
            dataSource={filterData != null ? filterData : ListData}
            pagination={pagination}
            onChange={onChange}
            rowSelection={rowSelection}
          />
        </Col>
        {(extraBtn || extraBtn2) && 
        <Col span={24} className='text-right'>
          <Space size={10}>
          {extraBtn2 && <Button type='primary' size='large' htmlType='button' className={btnClass2 ? btnClass2 : ''} onClick={extraAction2}>{extraBtn2}</Button>}
          {extraBtn && <Button type='primary' size='large' htmlType='button' className={btnClass ? btnClass : ''} onClick={extraAction}>{extraBtn}</Button>}
          </Space>
        </Col>}
      </Row>
    </Card>
  );
};
