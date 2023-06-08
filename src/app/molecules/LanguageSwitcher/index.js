import React, {useState, Fragment} from 'react';
import {PageHeader, Button, Image} from 'antd';
import {
  useTranslate,
  useTranslateDispatch,
  useTranslateState
} from 'Translate';
import MalaysiaFlag from '../../../assets/img/malaysia.svg';
import USAFlag from '../../../assets/img/uk.svg';


function LanguageSwitcher() {
  const { language } = useTranslateState(); // we get the current language
  const i18n = useTranslate(); // we get the utils functions
  const { t, getLanguages } = i18n;
  const dispatch = useTranslateDispatch();

  const items = getLanguages().map((key, index) => {
    return key !== language ? (
        <>
        <PageHeader
          ghost={false}
          extra={[
            <Button 
              type="text"
              className="p-0"
              onClick={
                (e) => {
                  dispatch({ type: 'CHANGE_LANGUAGE', language: 'ms' });
                  localStorage.setItem('lang', 'ms');
                }
              }
            >
              <Image width={50} src={MalaysiaFlag} preview={false} />
            </Button>,
            <Button 
              type="text"
              className="p-0"
              onClick={
                (e) => {
                  dispatch({ type: 'CHANGE_LANGUAGE', language: 'en' });
                  localStorage.setItem('lang', 'en');
                }
              }
            >
              <Image width={50} src={USAFlag} preview={false} />
            </Button>,
          ]}
        />
        {/* <Switch key={index} defaultChecked checked={check}  /> */}
        </>
    ) : (
      ''
    );
  });

  return (
    <>
      <div className="site-page-header-ghost-wrapper">{items}</div>
    </>
  );
}

export default LanguageSwitcher;