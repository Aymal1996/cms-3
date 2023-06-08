import React, {Fragment, useState, useEffect} from 'react';
import {Row, Col, Typography, Collapse, Button, Form } from 'antd';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import FormGroup from '../../../../../../molecules/FormGroup';
import StudentSemester from './StudentSemester';

const { Panel } = Collapse;
const {Title, Text} = Typography;
const _ = require("lodash");


export default (props) => {
    const [iconPos, setIconPos] = useState(false);
    const { data, updateParent } = props;
    const [panelActive, setPanelActive] = useState(["1"]);
    const countryList = useSelector(state => state.global.countryData);
    const progList = useSelector(state => state.global.progData);
    const selectProg = useSelector((state) => state.students.selected);
    const [semesters, setSemesters] = useState([]);
    
    const { control, errors, setValue } = useForm();

    const callback = (key) => {
        setPanelActive(key);
      };

    const formFields = [
        {
            name: 'faculty_name',
            label: 'Faculty',
            req: false,
            placeholder: 'Please select',
            type: 'select',
            twocol: false,
            reqmessage: 'Please Select',
            options: _.map(countryList, e => ({label: e.name, value: e.name}))
        },
        {
            name: 'program_name',
            label: 'Offered Programme',
            req: false,
            placeholder: 'Please select',
            type: 'select',
            twocol: false,
            reqmessage: 'Please Select',
            options: _.map(progList, e => ({label: e.program_name, value: e.program_name}))
        },
    ]

    const semesterHeader = (heading, index) => (
        <Row gutter={20} onClick={() => setIconPos(!iconPos)}>
              <Col flex="auto">{heading}</Col>
              {/* <Col flex="100px"><Button type="link" onClick={onRemove}>Remove</Button></Col> */}
              <Col flex="110px"><Button type="link" className='c-gray-linkbtn'>{iconPos ? 'Hide' : 'Show'}</Button></Col>
          </Row>
    )

    useEffect(() => {
        if(data && Object.keys(data).length > 0 && selectProg) {
            let pdata = data?.students_programs.find(x => x.program.program == selectProg);
            if(pdata) {
                setValue('faculty_name', {label: pdata?.program?.faculty_name, value: pdata?.program?.faculty});
                setValue('program_name', {label: pdata?.program?.program_name, value: pdata?.program?.program});
                let naming = pdata?.program?.students_semesters_modules;
                const result = _.groupBy(naming, item => item.semester)
                let temp = [];
                Object.entries(result).map(([key, val]) => {
                    let sub = [];
                    val.map(x => {
                        sub.push({
                            credit: x.credit,
                            module_code: x.module,
                            module_name: x.module_name,
                            name: x.name,
                            status: x.status,
                            type: x.type
                        })
                    })
                    temp.push({
                        intake: val[0].term,
                        intake_name: val[0].term_name,
                        semester: val[0].period,
                        semester_sequence: '',
                        subjects: sub
                    })
                })
                setSemesters(temp)
            }
        }
    }, [data, selectProg]);

    return (
        
            <Row gutter={[20, 30]} align='bottom'>
                <Col span={24}>
                    <Title level={4} className='mb-0'>Programme Details</Title>
                </Col>
                <Col span={24}>
                <Form 
                    scrollToFirstError
                    layout='vertical'>
                    <Row gutter={[20, 30]}>
                    {formFields.map((item, index) => (
                        <Fragment key={index}>
                            {item?.subheader && 
                            <Col span={24}><Title level={5} className='mb-0 c-default'>{item.subheader}</Title></Col>}
                            <FormGroup static={true} item={item} control={control} errors={errors} />
                        </Fragment>
                    ))}
                    </Row>
                </Form>
                </Col>
                <Col span={24}><Title level={5} className='mb-0 c-default'>Semester</Title></Col>
                <Col span={24}>
                <Collapse activeKey={panelActive} accordion={true} onChange={callback} className='black-card' expandIconPosition='right' bordered={false}>
                    {semesters.map((item,index) => (
                        <Fragment key={index}>
                            <Panel forceRender={true} header={semesterHeader(item.semester,index)}>
                                <StudentSemester updateParent={updateParent} data={data.students_programs} item={item} index={index} />
                            </Panel>
                        </Fragment>
                        ))}
                    </Collapse>
                </Col>
                
            </Row>
        
    )
}