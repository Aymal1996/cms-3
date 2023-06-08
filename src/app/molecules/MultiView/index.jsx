import React, { useState, useEffect, Fragment } from 'react';
import ListCard from '../ListCard';
import { Row, Col, Radio, Space, Typography, Select, Pagination, Button, Empty } from 'antd';
import { useHistory } from 'react-router';
import { AppstoreFilled, DatabaseFilled, BarChartOutlined } from '@ant-design/icons';
import MainStatusCard from 'Atoms/MainStatusCard';
import { Column } from '@ant-design/charts';

const _ = require('lodash');
const { Title } = Typography;
const { Option } = Select;

export default (props) => {
  const { iProps } = props;
  const history = useHistory();
  const {
    link,
    listCol,
    listdata,
    updateApi,
    filters,
    Search,
    listcount,
    carddata,
    cardcount,
    searchDropdowns,
    addon,
    statusKey,
    addonkey,
    listLink,
    topbtn,
    teamDrop,
    extraComp1,
    extraComp2,
    cardLimit,
    listKey,
    statData,
    hide,
    listLimit,
    noSwitch,
    same,
    graph,
    extraData,
    emptyError,
    applicant,
  } = iProps;
  const [filterVal, setFilterVal] = useState(filters && filters[0]?.value);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(cardLimit ? cardLimit : 6);
  const [view, setView] = useState('card');
  const [sorting, setSorting] = useState('');
  const [searchVal, setSearchVal] = useState(null);
  const [teamSelected, setTeamSelected] = useState('');

  var config = {
    data: carddata,
    xField: 'employee_name',
    yField: 'fit_index_number',
    label: {
      position: 'top',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    color: '#02A574',
    // color: ('employee_name*fit_index_number', (val) => {
    //   console.log('checking', val)
    // if(fit_index_number > 70){
    //   return '#02A574';
    // } else if(fit_index_number > 40) {
    //   return '#E89005';
    // } else {
    //   return '#C3423F';
    // }
    // }),
    yAxis: {
      minLimit: 0,
      maxLimit: 100,
      grid: {
        line: {
          style: { opacity: 0.2 },
        },
      },
    },
    columnStyle: {
      strokeOpacity: 0.2,
    },
    minColumnWidth: 20,
    maxColumnWidth: 20,
    tooltip: false,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  useEffect(() => {
    updateApi(filterVal, page, limit, '', '', view, null, teamSelected);
  }, []);

  useEffect(() => {
    if (teamDrop) {
      setTeamSelected(teamDrop[0]?.team_name);
      updateApi(filterVal, page, limit, '', '', view, null, teamDrop[0]?.team_name);
    }
  }, [teamDrop]);

  const onHide = async (id) => {
    updateApi(filterVal, page, cardLimit ? cardLimit : 6, sorting, '', view, null, teamSelected, id);
  };

  // Card Pagination
  const onPageChange = (pg) => {
    setPage(pg);
    updateApi(filterVal, pg, cardLimit ? cardLimit : 6, sorting, '', view, null, teamSelected);
  };

  const onSorting = () => {
    if (sorting == 'ASC') {
      setSorting('DESC');
      updateApi(filterVal, page, limit, 'DESC', '', view, null, teamSelected);
    } else {
      setSorting('ASC');
      updateApi(filterVal, page, limit, 'ASC', '', view, null, teamSelected);
    }
  };

  // Switching Views

  const onViewChange = (e) => {
    setView(e.target.value);
    if (!same) {
      setPage(1);
      if (e.target.value == 'list') {
        setLimit(listLimit);
        updateApi(filterVal, 1, listLimit, '', '', e.target.value, null, teamSelected);
      } else if (e.target.value == 'graph') {
      } else {
        setLimit(cardLimit ? cardLimit : 6);
        updateApi(filterVal, 1, cardLimit ? cardLimit : 6, '', '', e.target.value, null, teamSelected);
      }
    }
  };

  const SwitchView = () => {
    return (
      <Space size={15} className="optionsTabs">
        {view == 'card' && (
          <Space>
            <Title level={5} className="mb-0 c-default">
              Sort by:
            </Title>
            <Button type="button" className="gray-btn" onClick={onSorting}>
              {sorting == 'ASC' ? 'Oldest' : 'Latest'}
            </Button>
          </Space>
        )}
        {!noSwitch && (
          <Space>
            <Title level={5} className="mb-0 c-default">
              View:
            </Title>
            <Radio.Group onChange={onViewChange} value={view} buttonStyle="solid">
              {graph == true && (
                <Radio.Button value={'graph'}>
                  <BarChartOutlined />
                </Radio.Button>
              )}
              <Radio.Button value={'list'}>
                <DatabaseFilled />
              </Radio.Button>
              <Radio.Button value={'card'}>
                <AppstoreFilled />
              </Radio.Button>
            </Radio.Group>
          </Space>
        )}
        {topbtn && (
          <Button type="primary" size="large" className="green-btn" onClick={topbtn.topAction}>
            {topbtn.title}
          </Button>
        )}
      </Space>
    );
  };

  // List/ Table Function

  const onFilter = (e) => {
    setFilterVal(e.target.value);
    updateApi(e.target.value, 1, listLimit, '', '', view, null, teamSelected);
  };

  const onSearch = (val) => {
    setSearchVal(val);
    setPage(1);
    updateApi(filterVal, 1, listLimit, '', '', view, val, teamSelected);
  };

  const onClickRow = (record) => {
    return {
      onClick: (e) => {
        console.log('checking', e.target.tagName);
        if (e.target.tagName == 'path') {
          onHide(record[listKey]);
        } else {
          history.push({
            pathname: `${listLink || link}${record[listKey]}`,
            state: props?.param
              ? { [props.param.key1]: record[props.param.val1], [props.param.key2]: record[props.param.val2] }
              : null,
          });
        }
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      updateApi(
        filterVal,
        pagination.current,
        pagination.pageSize,
        sorter.order,
        sorter.columnKey,
        view,
        searchVal,
        teamSelected,
      );
    } else {
      updateApi(filterVal, pagination.current, pagination.pageSize, '', '', view, searchVal, teamSelected);
    }
  };

  const onTeamChange = (e) => {
    setTeamSelected(e);
    setPage(1);
    updateApi(filterVal, 1, limit, '', '', view, null, e);
  };

  return (
    <>
      <SwitchView />
      <Row gutter={[20, 30]}>
        <Col span={24}>
          {teamDrop && teamDrop.length > 0 && (
            <Select
              className="customSelect mb-1"
              value={teamSelected}
              onChange={onTeamChange}
              size="large"
              style={{ width: 200 }}
            >
              {teamDrop?.map((item, ind) => (
                <Fragment key={ind}>
                  <Option value={item?.team_name}>{item?.team_name}</Option>
                </Fragment>
              ))}
            </Select>
          )}
          {view == 'list' && (
            <ListCard
              classes="clickRow"
              onRow={onClickRow}
              filters={filters && filters}
              Search={Search && Search}
              onSearch={Search && onSearch}
              filterValue={filterVal}
              onFilter={onFilter}
              ListCol={listCol}
              ListData={listdata}
              onChange={onTableChange}
              {...searchDropdowns}
              pagination={{
                total: listcount,
                current: page,
                pageSize: limit,
              }}
            />
          )}
          {view == 'card' && (
            <>
              {carddata?.length > 0 ? (
                <div className="flexibleRow">
                  {carddata.map((item, index) => (
                    <Fragment key={index}>
                      <div className="requestPanel">
                        <MainStatusCard
                          extraData={extraData}
                          data={item}
                          link={link}
                          addon={addon || item[addonkey]}
                          statusKey={statusKey}
                          statData={statData}
                          onHide={onHide}
                          hide={hide}
                          app={applicant}
                          s3={true}
                        />
                      </div>
                    </Fragment>
                  ))}
                </div>
              ) : (
                <div style={{ width: '100%' }}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={emptyError ?? 'No Data'} />
                </div>
              )}
              <div className="w-100 text-right mt-2">
                <Pagination
                  pageSize={cardLimit ? cardLimit : 6}
                  current={page}
                  hideOnSinglePage={true}
                  showSizeChanger={false}
                  onChange={onPageChange}
                  total={cardcount}
                />
              </div>
            </>
          )}
          {view == 'graph' && (
            <>
              <Column {...config} />
              <div className="w-100 text-right mt-2">
                <Pagination
                  pageSize={cardLimit ? cardLimit : 6}
                  current={page}
                  hideOnSinglePage={true}
                  showSizeChanger={false}
                  onChange={onPageChange}
                  total={cardcount}
                />
              </div>
            </>
          )}
        </Col>
        {extraComp1 && <Col span={24}>{extraComp1}</Col>}
        {extraComp2 && <Col span={24}>{extraComp2}</Col>}
      </Row>
    </>
  );
};
