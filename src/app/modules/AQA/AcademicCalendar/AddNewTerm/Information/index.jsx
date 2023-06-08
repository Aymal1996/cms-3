import React, { useEffect } from 'react';
import {Row, Col, Card, Typography, Tabs, Space, Button } from 'antd';
import {InputField, SelectField, DateField } from '../../../../../atoms/FormElement';
import { useDispatch, useSelector } from 'react-redux';
import { getProgrmList } from '../../../Faculty/ducks/actions';
import OfferedProgrammes from '../../../../components/OfferedProgrammes';
import { termTear } from '../../../../../../configs/constantData';
import { getCourseGroupType, getProgrammeDropList } from '../../ducks/actions';

const { TabPane } = Tabs;
const { Title } = Typography;

export default (props) => {

    const { control, errors, mode } = props;
    const dispatch = useDispatch();
    const courseGroupData = useSelector(state => state.calendar.courseTypeList);
    const programmeDropData = useSelector(state => state.calendar.programmeDropList);
    
    useEffect(() => {
        dispatch(getProgrmList());
        dispatch(getCourseGroupType());
    }, []);


    const degreeChange = (val) => {
        if (val) {
            dispatch(getProgrammeDropList(val.label));
        }
    }

    return (
        <Card bordered={false} className={`${mode == 'edit' ? 'transparent-card' : 'uni-card h-auto'}`}>
        <Row gutter={[30, 20]}>
            
            <Col span={24}>
                <Title level={4} className='mb-0'>Module Details</Title>
            </Col>

            <Col span={24}>
                <Tabs defaultActiveKey="1" type="card" className='custom-tabs -space30'>
                    <TabPane tab="Summary" key="1" forceRender={true}>
                        <Row gutter={[20, 30]}>
                            <Col span={24}>
                                <InputField 
                                    fieldname='termTag'
                                    label='Term Tag(Optional)'
                                    control={control}
                                    class='mb-0'
                                    iProps={{ placeholder: 'Please state', size: 'large'}}
                                    initValue=''
                                />
                            </Col>
                            <Col span={12}>
                                <InputField 
                                    isRequired={true}
                                    fieldname='termName'
                                    label='Term Name'
                                    control={control}
                                    class='mb-0'
                                    iProps={{ placeholder: 'Please state', size: 'large'}}
                                    rules={{required: 'Enter Term Name'}}
                                    initValue=''
                                    validate={errors.termName && 'error'}
                                    validMessage={errors.termName && errors.termName.message}
                                />
                            </Col>
                            <Col span={12}>
                                {/* <SelectField 
                                    isRequired={true}
                                    fieldname='termYear'
                                    label='Term Year'
                                    control={control}
                                    class='mb-0'
                                    iProps={{ placeholder: 'Please select'}}
                                    rules={{required: 'Term Year'}}
                                    initValue=''
                                    
                                    selectOption={termTear}
                                    validate={errors.termYear && 'error'}
                                    validMessage={errors.termYear && errors.termYear.message}
                                />
                                <DatePicker onChange={onChange} picker="year" /> */}
                                <DateField 
                                    fieldname='termYear'
                                    label='Term Year'
                                    control={control}
                                    class='mb-0'
                                    iProps={{ placeholder: 'Please Select year', size: 'large', picker: 'year'}}
                                    initValue=''
                                    isRequired={true}
                                    validate={errors.termYear && 'error'}
                                    validMessage={errors.termYear && errors.termYear.message}
                                />
                            </Col>
                            <Col span={12}>
                                <DateField 
                                    fieldname='termStart'
                                    label='Term Start'
                                    control={control}
                                    class='mb-0'
                                    iProps={{ placeholder: 'Please Select date', size: 'large', format: "DD-MM-YYYY"}}
                                    initValue=''
                                    isRequired={true}
                                    validate={errors.termStart && 'error'}
                                    validMessage={errors.termStart && errors.termStart.message}
                                />
                            </Col>
                            <Col span={12}>
                                <DateField 
                                    fieldname='termEnd'
                                    label='Term End'
                                    control={control}
                                    class='mb-0'
                                    iProps={{ placeholder: 'Please Select date', size: 'large', format: "DD-MM-YYYY"}}
                                    initValue=''
                                    isRequired={true}
                                    validate={errors.termEnd && 'error'}
                                    validMessage={errors.termEnd && errors.termEnd.message}
                                />
                            </Col>
                            <Col span={12}>
                                <DateField 
                                    fieldname='registrationStart'
                                    label='Registration Start'
                                    control={control}
                                    class='mb-0'
                                    iProps={{ placeholder: 'Please Select date', size: 'large', format: "DD-MM-YYYY"}}
                                    initValue=''
                                    isRequired={true}
                                    validate={errors.registrationStart && 'error'}
                                    validMessage={errors.registrationStart && errors.registrationStart.message}
                                />
                            </Col>
                            <Col span={12}>
                                <DateField 
                                    fieldname='registrationEnd'
                                    label='Registration End'
                                    control={control}
                                    class='mb-0'
                                    iProps={{ placeholder: 'Please Select date', size: 'large', format: "DD-MM-YYYY"}}
                                    initValue=''
                                    isRequired={true}
                                    validate={errors.registrationEnd && 'error'}
                                    validMessage={errors.registrationEnd && errors.registrationEnd.message}
                                />
                            </Col>
                            <Col span={12}>
                                <DateField 
                                    fieldname='classStart'
                                    label='Class Start'
                                    control={control}
                                    class='mb-0'
                                    iProps={{ placeholder: 'Please Select date', size: 'large', format: "DD-MM-YYYY"}}
                                    initValue=''
                                    isRequired={true}
                                    validate={errors.classStart && 'error'}
                                    validMessage={errors.classStart && errors.classStart.message}
                                />
                            </Col>
                            <Col span={12}>
                                <DateField 
                                    fieldname='classEnd'
                                    label='Class End'
                                    control={control}
                                    class='mb-0'
                                    iProps={{ placeholder: 'Please Select date', size: 'large', format: "DD-MM-YYYY"}}
                                    initValue=''
                                    isRequired={true}
                                    validate={errors.classEnd && 'error'}
                                    validMessage={errors.classEnd && errors.classEnd.message}
                                />
                            </Col>                        
                        </Row>
                    </TabPane>  
                    <TabPane tab="Offered Courses" key="2" forceRender={true}>
                        <Row gutter={[20, 30]}>
                            <Col span={24}>
                                <SelectField 
                                    isRequired={true}
                                    fieldname='course_group'
                                    label='Course Group Type'
                                    control={control}
                                    class='mb-0'
                                    onChange={degreeChange}
                                    iProps={{ placeholder: 'Please select'}}
                                    rules={{required: 'Course Group Type'}}
                                    initValue=''
                                    selectOption={
                                        courseGroupData &&
                                        courseGroupData.map((e) => {
                                            return { value: e.name, label: e.name };
                                        })
                                    }
                                    validate={errors.course_group && 'error'}
                                    validMessage={errors.course_group && errors.course_group.message}
                                />
                            </Col>
                            {/* <Col span={24}>
                                <SelectField 
                                    isRequired={true}
                                    fieldname='programmes'
                                    label=''
                                    control={control}
                                    class='mb-0'
                                    iProps={{ placeholder: 'Please select'}}
                                    rules={{required: 'Course Group Type'}}
                                    initValue=''
                                    selectOption={
                                        programmeDropData &&
                                        programmeDropData.map((e) => {
                                            return { value: e.name, label: e.name };
                                        })
                                    }
                                    validate={errors.programmes && 'error'}
                                    validMessage={errors.programmes && errors.programmes.message}
                                />
                            </Col> */}
                            <Col span={12}>
                                <DateField 
                                    fieldname='boe_start'
                                    label='BOE Date'
                                    control={control}
                                    class='mb-0'
                                    iProps={{ placeholder: 'Please Select date', size: 'large', format: "DD-MM-YYYY"}}
                                    initValue=''
                                    isRequired={true}
                                    validate={errors.boe_start && 'error'}
                                    validMessage={errors.boe_start && errors.boe_start.message}
                                />
                            </Col>
                            <Col span={12}>
                                <DateField 
                                    fieldname='boe_end'
                                    label='Graduating BOE Date'
                                    control={control}
                                    class='mb-0'
                                    iProps={{ placeholder: 'Please Select date', size: 'large', format: "DD-MM-YYYY"}}
                                    initValue=''
                                    isRequired={true}
                                    validate={errors.boe_end && 'error'}
                                    validMessage={errors.boe_end && errors.boe_end.message}
                                />
                            </Col>
                            <Col span={24}>
                                <OfferedProgrammes 
                                    control={control}
                                    programmeDropData={programmeDropData}
                                />  
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </Col>
            {mode == 'edit' &&
                <Col span={24}>
                    <Row gutter={20} justify='end'>
                        <Col>
                            <Button size='large' type='primary' htmlType='submit' className='green-btn'>Save Changes</Button>
                        </Col>
                    </Row>
                </Col>
            }
        </Row>
        </Card>
    )
    
}