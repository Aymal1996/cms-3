import React, {useEffect, useState, Fragment} from 'react';
import {Row, Col, Collapse, Button, Space, Typography } from 'antd';
import {InputField, SelectField } from '../../../../../../../atoms/FormElement';
import { useFieldArray } from 'react-hook-form';
import SemesterModules from './SemesterModules';
import { useDispatch, useSelector } from 'react-redux';
import {getModules} from '../../../../ducks/actions';
import { periodList, currencyList } from '../../../../../../../../configs/constantData';
import SemesterHeader from './SemesterHeader';


const initQ = {
    structure_code: '',
    structure_name: '',
    totalCredits: 0,
    moduletotal: 0,
    level_year: '',
    resource_fees: 0,
    currency: '',
}

const { Panel } = Collapse;

export default (props) => {

    const { control, errors, mode, getValues, setValue, delSem, setDelSem, t, delSub, setDelSub } = props;
    const [panelActive, setPanelActive] = useState(["1"]);
    const [totalFee, setTotalFee] = useState(0);
    const [totalCredit, setTotalCredit] = useState(0);
    const dispatch = useDispatch();
    

    const { fields, append, remove } = useFieldArray({
        control,
        name: "semester_structure",
      });

      useEffect(() => {
          dispatch(getModules())
      }, []);

      const callback = (key) => {
        setPanelActive(key);
      };

      const onAdd = () => {
        append(initQ)
        let leng = `${fields.length + 1}`;
        setPanelActive([leng]);
      }

      

    return (
        <Row gutter={[20, 30]}>
            <Col span={24}>
                <Collapse activeKey={panelActive} accordion={true} onChange={callback} className='black-card' expandIconPosition={'right'} bordered={false}>
                    {fields.map((item,index) => (
                        <Panel forceRender={true} header={<SemesterHeader remove={remove} delSem={delSem} setDelSem={setDelSem} setValue={setValue} index={index} control={control}/>} key={item.id}>
                            <Row gutter={[20,30]} align='bottom'>
                            <InputField 
                                fieldname={`semester_structure[${index}].name`}
                                label=''
                                control={control}
                                class='d-none mb-0'
                                initValue={item.name || ''}
                                iProps={{ size: 'large',}}
                            />
                            <InputField 
                                fieldname={`semester_structure[${index}].structure_code`}
                                label=''
                                control={control}
                                class='d-none mb-0'
                                initValue={item.structure_code || ''}
                                iProps={{ size: 'large',}}
                            />
                            <InputField 
                                fieldname={`semester_structure[${index}].structure_name`}
                                label=''
                                control={control}
                                class='d-none mb-0'
                                initValue={`Semester ${index + 1}`}
                                iProps={{ size: 'large',}}
                            />
                                <Col span={24}>
                                <SelectField
                                    fieldname={`semester_structure[${index}].period`}
                                    label=''
                                    class='mb-0 w-100'
                                    initValue={item.period ? {label: item.period, value: item.period} : ''}
                                    control={control}
                                    iProps={{ placeholder: 'Select one'}}
                                    selectOption={periodList}
                                    // rules={{ required: 'Select one' }}
                                    // validate={
                                    //     Object.entries(errors).length > 0 &&
                                    //     errors?.semester_structure?.length > 0 &&
                                    //     errors?.semester_structure[index]?.level_year &&
                                    //     "error"
                                    // }
                                    // validMessage={
                                    //     Object.entries(errors).length > 0 &&
                                    //     errors?.semester_structure?.length > 0 &&
                                    //     errors?.semester_structure[index]?.level_year &&
                                    //     errors?.semester_structure[index]?.level_year?.message
                                    // }
                                />
                                </Col>
                                <Col span={24}>
                                    <InputField 
                                        fieldname={`semester_structure[${index}].resource_fees`}
                                        label='Resource Fee'
                                        control={control}
                                        class='mb-0 inputGroupWithClose'
                                        initValue={item.resource_fees || 0}
                                        iProps={{ placeholder: 'Please state', size: 'large', type: 'number', 
                                        addonBefore: <SelectField 
                                        noStyle={true}
                                        fieldname={`semester_structure[${index}].currency`}
                                        label=''
                                        control={control}
                                        class='mb-0'
                                        initValue={item.currency ? { label: item.currency, value: item.currency } : ""}
                                        selectOption={currencyList}
                                    />}}
                                        // rules={{
                                        //     required: 'Resource Fee Required',
                                        //     }}
                                        // validate={
                                        //     Object.entries(errors).length > 0 &&
                                        //     errors?.semester_structure?.length > 0 &&
                                        //     errors?.semester_structure[index]?.resource_fees &&
                                        //     "error"
                                        // }
                                        // validMessage={
                                        //     Object.entries(errors).length > 0 &&
                                        //     errors?.semester_structure?.length > 0 &&
                                        //     errors?.semester_structure[index]?.resource_fees &&
                                        //     errors?.semester_structure[index]?.resource_fees?.message
                                        // }
                                    />
                                </Col>
                                <Col span={24}>
                                <SemesterModules 
                                    control={control}
                                    aitem={item}
                                    mode={mode}
                                    getValues={getValues}
                                    delSub={delSub}
                                    setDelSub={setDelSub}
                                    t={t}
                                    pIndex={index}
                                />
                                </Col>
                            </Row>
                        </Panel>
                    ))}
                </Collapse>
            </Col>
            <Col span={24}>
                <Button htmlType='button'type="dashed" size='large' className='w-100' onClick={onAdd}>+ Add other semester</Button>
            </Col>
        </Row>
    )
}