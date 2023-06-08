import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Empty } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PolicyCard from 'Atoms/HRMS/PolicyCard';
import HeadingChip from 'Molecules/HeadingChip';
import { Popup } from 'Atoms/Popup';
import AddPolicy from './AddPolicy';

import { allowed } from '../../../../routing/config/utils';
import Roles from '../../../../routing/config/Roles';
import { getPolicyList } from './ducks/actions';
import { deleteAction, viewAction } from './events';

export default (props) => {
  const dispatch = useDispatch();
  const policyListData = useSelector((state) => state.policy.policyListData);
  const [visible, setVisible] = useState(false);
  const apiCall = () => dispatch(getPolicyList());

  const btnList = [
    {
      text: '+ New Policy',
      action: () => setVisible(true),
      classes: 'green-btn',
    },
  ];

  useEffect(() => apiCall(), []);

  const popup = {
    closable: false,
    visibility: visible,
    class: 'black-modal',
    content: <AddPolicy title="Add New Policy" onClose={() => setVisible(false)} onUpdate={apiCall} />,
    width: 536,
    onCancel: () => setVisible(false),
  };

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Policy" btnList={allowed([Roles.POLICY], 'write') ? btnList : null} />
        </Col>
        {policyListData &&
          policyListData?.rows?.length > 0 &&
          policyListData?.rows?.map((resp, i) => (
            <Fragment key={i}>
              <Col span={24}>
                <PolicyCard
                  data={resp}
                  onDelete={(e) => deleteAction(e, apiCall, props.setLoading)}
                  onView={(e) => viewAction(e, apiCall)}
                />
              </Col>
            </Fragment>
          ))}

        {policyListData?.rows?.length > 0 && policyListData?.rows?.length == 0 && (
          <Col span={24}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Col>
        )}
      </Row>
      <Popup {...popup} />
    </>
  );
};
