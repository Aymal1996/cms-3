import React, { useState } from 'react';
import { Row, Col } from 'antd';
import WarningLetter from './WarningLetter';
import ContractList from './ContractList';
import ShowCauseLetter from './ShowCauseLetter';
import ResignTeminate from './ResignTeminate';

export default (props) => {

  const [visisble, setVisible] = useState({
    set1: true,
    set2: true,
    set3: true,
    set4: true,
  });

  return (
    <Row gutter={[20, 50]}>
      {visisble.set1 && <Col span={24}>
        <ContractList {...props} setVisible={setVisible} />
      </Col>}
      {props?.data?.status != 'Draft' && props.mode == 'edit' &&
      <>
      {visisble.set2 && <Col span={24}>
        <ResignTeminate {...props} setVisible={setVisible} />
      </Col>}
      {visisble.set3 && <Col span={24}>
        <ShowCauseLetter {...props} />
      </Col>}
      {visisble.set4 && <Col span={24}>
        <WarningLetter {...props} setVisible={setVisible} />
      </Col>}
      </>}
    </Row>
  );
};