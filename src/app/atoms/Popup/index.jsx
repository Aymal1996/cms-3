import React from 'react';
import { Modal } from 'antd';
import { QuestionCircleOutlined, CheckCircleFilled } from '@ant-design/icons';

export const Popup = (props) => {
  const { onCancel, content, title, closable, visibility, width } = props;

  return (
    <Modal
      centered
      maskClosable={false}
      closable={closable}
      wrapClassName={props.class}
      visible={visibility}
      okButtonProps={{ className: 'ag-gray-button' }}
      cancelButtonProps={{ className: 'ag-gray-button-outline' }}
      title={title && title}
      footer={null}
      width={width}
      onCancel={onCancel}
    >
      {content}
    </Modal>
  );
};

export function PopupConfirm(props) {
  Modal.confirm({
    centered: true,
    maskClosable: false,
    closable: false,
    // bodyStyle: { padding: "32px 32px 24px" },
    okText: 'Back',
    okButtonProps: { className: 'w-100', size: 'large' },
    autoFocusButton: null,
    icon: <QuestionCircleOutlined />,
    ...props,
  });
}

export function PopupSuccess(props) {
  Modal.success({
    centered: true,
    maskClosable: false,
    closable: false,
    okText: 'Back',
    okButtonProps: { className: 'w-100', size: 'large' },
    autoFocusButton: null,
    icon: <CheckCircleFilled />,
    ...props,
  });
}
