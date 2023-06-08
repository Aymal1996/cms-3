import React, { useState, useEffect } from 'react';
import { Row, Col, Form, message } from 'antd';
import ListCard from 'Molecules/ListCard';
import ListFormComp from 'Molecules/ListFormComp';
import { useForm } from 'react-hook-form';
import { sendWarning, delWarning } from '../../../../../ducks/services';
import { useDispatch, useSelector } from 'react-redux';
import { getWarnLetter } from '../../../../../ducks/action';
import moment from 'moment';
import { createRequest, getRequest, getApproverLead } from '../../../../../../Requests/ducks/services';
import { allowed } from '../../../../../../../../../routing/config/utils';
import Roles from '../../../../../../../../../routing/config/Roles';

const colName = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: text => text ? moment(text).format('Do MMMM YYYY') : ''
  },
  {
    title: 'Type',
    dataIndex: 'warning_label',
    key: 'warning_label',
  },
];

export default (props) => {

    const { data, updateApi, id, setLoad, setVisible, mode, dTab } = props;
    const { control, errors, setValue, reset, handleSubmit } = useForm();
    const [formVisible, setFormVisible] = useState(false);
    const [recordData, setRecord] = useState(null);
    const dispatch = useDispatch();
    const letters = useSelector(state => state.employment.warnLetter);
    const staffData = useSelector(state => state.advancement.advData)
    const [letterList, setLetterList] = useState([]);
    const user = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0];
    
    useEffect(() => {
      dispatch(getWarnLetter());
    }, []);

    useEffect(() => {
      if(dTab?.param) {
        addNew();
      }
    }, [dTab]);

    const insuranceFields = [
      {
        type: 'select',
        label: 'Warning Letter Type',
        name: 'warning_letter',
        twocol: false,
        options: letterList,
        req: true,
        reqmessage: 'Please enter type',
      },
    ]

    useEffect(() => {
      if (letters && letters.length) {
        let temp = [];
        letters.map(x => {
          temp.push({
            value: x.name,
            label: x.writing_letter_name,
          });
        })
        setLetterList(temp);
      }
    }, [letters]);


    const onClickRow = (record) => {

      return {
        onClick: () => {
          setRecord([
            {
              field: 'warning_letter',
              value: record.name
            },
            {
              field: 'warning_letter',
              value: record.type ? {label: record.warning_label, value: record.type_name} : ''
            },
          ]);
          setVisible({
              set1: false,
              set2: false,
              set3: false,
              set4: true,
          });
          setFormVisible(true);
        },
      };
    }
    
    const addNew = () => {
        setVisible({
            set1: false,
            set2: false,
            set3: false,
            set4: true,
        });
      setFormVisible(true);
    }

    const onBack = () => {
        reset();
        setFormVisible(false);
        setRecord(null)
        setVisible({
            set1: true,
            set2: true,
            set3: true,
            set4: true,
        });
    }

    const onFinish = async (val) => {
      setLoad(true)
      getRequest('Warning Letter Approval').then(req => {
        getApproverLead(id).then(appr => {
          console.log('check approver', appr, req.data)

          let approvetemp = [];
          req?.data?.message?.approvers.map(x => {
            let aid = '';
            if (x.approvers == 'Manager') {
              aid = appr?.data?.message[0]?.manager_id;
            } else if (x.approvers == 'Supervisor') {
              aid = appr?.data?.message[0]?.supervisor_id;
            } else if(x.approvers == 'Team Leader') {
              aid = appr?.data?.message[0]?.team_leader;
            }
            console.log('check', aid);
            approvetemp.push({
                approvers: x.approvers,
                approver_detail: x.approver_detail || '',
                approver_id: aid,
                Status:"Pending",
                remarks:""
            })
          })
          
          const body1 = {
              form_name: req.data.message.form_name,
              sender: req.data.message.sender,
              category: req.data.message.category,
              approvers: approvetemp,
              status: 'Pending',
              form_fields: [
              { 
                field_label: "Requester",
                field_type: "Text",
                field_value:user.full_name
              },
              {
                field_label: "Requester ID",
                field_type: "Text",
                field_value:user.name
              },    
              {
                field_label: "Requester Team",
                field_type: "Text",
                field_value:user.team_name
              },
              {
                field_label: "Date",
                field_type: "Date",
                field_value: moment().format('YYYY-MM-DD')
              },
              {
                field_label: "Request For",
                field_type: "Text",
                field_value: staffData?.employee_name
              },
              {
                field_label: "Staff ID",
                field_type: "Text",
                field_value: id
              },
              {
                field_label: "Company",
                field_type: "Text",
                field_value:staffData?.company || ''
              },
              {
                field_label: "Request For Team",
                field_type: "Text",
                field_value:staffData?.team_name[0] || ''
              },
              {
                field_label: "Warning Letter ID",
                field_type: "Text",
                field_value:val.warning_letter.value
              },
              {
                field_label: "Warning Letter",
                field_type: "Text",
                field_value:val.warning_letter.label
              },
            ]
          }
          console.log('----',body1,appr.data.message)
          createRequest(body1).then(resi => {
            message.success('Warning letter request created');
            reset();
            
            setFormVisible(false);
            setVisible({
                set1: true,
                set2: true,
                set3: true,
                set4: true,
            });
            setLoad(false);
          }).catch(e => {
            console.log('e',e)
          })

        })
      })
    }

    const onDelete = () => {
      setLoad(true)
      delWarning(recordData[0].value, {status:"Deleted"}).then(res => {
        message.success('Warning letter deleted');
        reset();
        setFormVisible(false);
        setVisible({
            set1: true,
            set2: true,
            set3: true,
            set4: true,
        });
        setLoad(false);
        updateApi();
      }).catch(e => {
        console.log(e);
        setLoad(false);
        const {response} = e;
        message.error(response);
      })

    }

    return (
        <Row gutter={[20,20]}>
          {!formVisible ? 
            <Col span={24}>
                <ListCard
                scrolling={500}
                title="Warning Letter History"
                onRow={onClickRow}
                ListCol={colName}
                ListData={data?.warningLetter}
                pagination={false}
                extraBtn={allowed([Roles.EMPLOYMENT], 'write') ? 'Issue Warning Letter' : null}
                extraAction={addNew}
                btnClass='red-btn'
                listClass="nospace-card"
                classes='clickRow'
                />
            </Col>
            :
            <Col span={24}>
              <Form layout='vertical' onFinish={handleSubmit(onFinish)}>
                <ListFormComp 
                control={control}
                errors={errors}
                record={recordData}
                onBack={onBack}
                setValue={setValue}
                mode={mode}
                title={'Issue Warning Letter'}
                fieldsList={insuranceFields}
                backbtnTitle='Warning Letter History'
                btnMain={allowed([Roles.EMPLOYMENT], 'write') ? {
                  title: 'Proceed',
                  class: 'red-btn',
                  nomain: recordData != null,
                }: null}
                extrabtn={allowed([Roles.EMPLOYMENT], 'delete') ? {
                    title: 'Delete',
                    class: 'red-btn',
                    onAction: onDelete
                } : null}
                />
              </Form>
            </Col>}
        </Row>

    )
}