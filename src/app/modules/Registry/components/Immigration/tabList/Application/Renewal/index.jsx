import React from 'react';
import ListCard from 'Molecules/ListCard';
import moment from 'moment';
import { useHistory } from 'react-router';
import { prevDoc } from '../../../../../../StudentFile/ducks/services';
import { Button } from 'antd';
import { DownloadIcon } from '../../../../../../../atoms/CustomIcons';

export default (props) => {
  const { data } = props;
  const history = useHistory();

  const addNew = () => {
    history.push({
      pathname: `/visa/renewal/expired/${data?.applicant_id}`,
    });
  };

  const previewDoc = async (docname, url) => {
    props.setLoading(true);
    let fileurl = '';
    await prevDoc(data?.applicant_id, docname, url)
      .then((res) => {
        fileurl = res.data.message;
        props.setLoading(false);
        window.open(fileurl, '_blank');
      })
      .catch((err) => {
        props.setLoading(false);
        message.error('Something went worng');
        console.log('something went worng');
      });
  };

  const colName = [
    {
      title: 'Visa No.',
      dataIndex: 'visa_no',
      key: 'visa_no',
    },
    {
      title: 'Visa Expiry',
      dataIndex: 'visa_expiry',
      key: 'visa_expiry',
      render: (text) => (text ? moment(text).format('Do MMMM YYYY') : ''),
    },
    {
      title: 'Passport No.',
      dataIndex: 'passport_no',
      key: 'passport_no',
    },
    {
      title: 'Status',
      dataIndex: 'visa_status',
      key: 'visa_status',
    },
    {
      title: 'Visa',
      dataIndex: 'visa_filepath',
      key: 'visa_filepath',
      align: 'center',
      width: 150,
      render: (text) => (
        <>
        {text ? 
        <Button
          type="link"
          onClick={() => previewDoc('Visa Sticker', text)}
          htmlType="button"
          className="p-0"
          icon={<DownloadIcon className="c-success" />}
        />
        : 'N/A'}
        </>
      ),
    },
  ];

  return (
    <ListCard
      scrolling={500}
      title="Visa Renewal"
      ListCol={colName}
      ListData={
        (data?.passport_and_visa &&
          data?.passport_and_visa.length &&
          data?.passport_and_visa?.filter((x) => !x?.visa_status?.includes('VisaCancel') && x?.visa_no)) ||
        []
      }
      pagination={{
        pageSize: 5,
        showSizeChanger: false,
        hideOnSinglePage: true,
      }}
      extraBtn={'Create Application'}
      extraAction={addNew}
      btnClass="green-btn"
      listClass="nospace-card"
      classes="clickRow"
    />
  );
};
