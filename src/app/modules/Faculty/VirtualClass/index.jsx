import React, { useEffect } from 'react';
import { Row, Typography, Col, Card } from 'antd';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;

export default (props) => {
  const location = useLocation();
  console.log('location.state?.iframeLink', location.state?.iframeLink, location);

  return (
    <Card bordered={false} className="uni-card no-padding">
      {location.state?.iframeLink && (
        <iframe
          src={location.state?.iframeLink}
          allow="camera;microphone;display-capture;fullscreen;"
          width="100%"
          style={{ border: 0, display: 'block', float: 'left', height: 'calc(100vh - 50px)', minHeight: '600px' }}
          allowfullscreen
        />
      )}
    </Card>
  );
};
