import React, { useEffect, useCallback } from 'react';
import {Row, Col, Card, Typography, Tabs, Space, Button } from 'antd';
import {InputField, SelectField, SelectFieldAsync} from '../../../../../atoms/FormElement';
import { useDispatch, useSelector } from 'react-redux';
import { getProgrmList } from '../../../Faculty/ducks/actions';
import AttachProgram from '../../../../components/AttachProgram';
import Materials from '../../../../components/Materials';
import Outline from '../../../../components/Outline';
import { currencyList, learningMode, classroomType,typeList } from '../../../../../../configs/constantData';
// import { getModules } from '../../../Programme/ducks/actions';
import { moduleGet } from '../../ducks/services';
import debounce from "lodash/debounce";

const { TabPane } = Tabs;
const { Title } = Typography;

export default (props) => {

    const { control, errors, tags, setTags, setValue, moduleApi, mode, t, status, onDraft } = props;
    const dispatch = useDispatch();

    // const moduleList = useSelector((state) => state.programme.module);
    
    useEffect(() => {
        dispatch(getProgrmList());
        
    }, []);

    const getAsyncOptions = (inputText) => {
        return moduleGet(inputText)
        .then((response) => {
            return response.data.message.map((x) => (
            {
                value: x.name,
                label: x.module_name,
            }
            ));
        })
        .catch((error) => {
            console.log(JSON.stringify(error));
        });
    };
      

    const loadOptions = useCallback(
        debounce((inputText, callback) => {
          getAsyncOptions(inputText).then((options) => callback(options));
        }, 2000),
        []
    );
    
    

    const prefixSelector = (
        <SelectField 
            noStyle={true}
            isRequired={true}
            fieldname='currency'
            label=''
            control={control}
            class='mb-0'
            initValue={currencyList[0]}
            selectOption={currencyList}
        />
      );
    
    return (
	
    <Card bordered={false} className="uni-card h-auto">
        
        <Row gutter={[30, 20]}>
            
            <Col span={24}>
                <Title level={4}>Module Details</Title>
            </Col>
            <Col span={24}>
                
				<Tabs defaultActiveKey="1" type="card" className='custom-tabs -space30'>
                    <TabPane tab="Summary" key="1" forceRender>
                        <Row gutter={[20,50]}>
                            <Col span={24}>
                            <Row gutter={[20, 30]}>
                                <Col span={24}>
                                    <InputField 
                                        isRequired={true}
                                        fieldname='name'
                                        label='Module Name'
                                        control={control}
                                        class='mb-0'
                                        iProps={{ placeholder: 'Please state', size: 'large'}}
                                        rules={{
                                            required: 'Module Name Required',
                                            }}
                                        initValue=''
                                        validate={errors.name && 'error'}
                                        validMessage={errors.name && errors.name.message}
                                    />
                                </Col>
                                
                                <Col span={12}>
                                    <InputField 
                                        isRequired={true}
                                        fieldname='code'
                                        label='Module Code'
                                        control={control}
                                        class='mb-0'
                                        iProps={{ placeholder: 'Please state', size: 'large'}}
                                        rules={{required: 'Enter Module Code'}}
                                        initValue=''
                                        validate={errors.code && 'error'}
                                        validMessage={errors.code && errors.code.message}
                                    />
                                </Col>
                                
                                <Col span={12}>
                                    <SelectField 
                                        isRequired={true}
                                        fieldname='type'
                                        label='Type'
                                        control={control}
                                        class='mb-0'
                                        iProps={{ placeholder: 'Please select'}}
                                        rules={{required: 'Enter Type'}}
                                        initValue=''
                                        selectOption={typeList}
                                        validate={errors.type && 'error'}
                                        validMessage={errors.type && errors.type.message}
                                    />
                                </Col>
                                <Col span={24}>
                                    <SelectFieldAsync 
                                        isRequired={false}
                                        fieldname='prequel'
                                        label='Module Prequel'
                                        control={control}
                                        class='mb-0'
                                        iProps={{ placeholder: 'Type Module Name', isMulti: true}}
                                        initValue={[]}
                                        loadOptions={loadOptions}
                                    />
                                </Col>
                                <Col span={12}>
                                    <InputField 
                                        isRequired={true}
                                        fieldname='credit'
                                        label='Credit'
                                        control={control}
                                        class='mb-0'
                                        iProps={{ type: 'number', size: 'large', placeholder: 'Please state'}}
                                        rules={{required: 'Enter Credit'}}
                                        initValue=''
                                        validate={errors.credit && 'error'}
                                        validMessage={errors.credit && errors.credit.message}
                                    />
                                </Col>
                                <Col span={12}>
                                    <InputField 
                                        isRequired={true}
                                        fieldname='hours'
                                        label='Hours'
                                        control={control}
                                        class='mb-0'
                                        iProps={{ type: 'number', size: 'large', placeholder: 'Please select'}}
                                        rules={{required: 'Enter Hours'}}
                                        initValue=''
                                        validate={errors.hours && 'error'}
                                        validMessage={errors.hours && errors.hours.message}
                                    />
                                </Col>
                                
                                    <Col span={12}>
                                    <SelectField 
                                        isRequired={true}
                                        fieldname='learningMode'
                                        label='Learning Mode'
                                        control={control}
                                        class='mb-0'
                                        iProps={{ placeholder: 'Please select'}}
                                        rules={{required: 'Enter Type'}}
                                        initValue=''
                                        selectOption={learningMode}
                                        validate={errors.learningMode && 'error'}
                                        validMessage={errors.learningMode && errors.learningMode.message}
                                    />
                                </Col>
                                
                                <Col span={12}>
                                    <SelectField 
                                        isRequired={true}
                                        fieldname='classroomType'
                                        label='Classroom Type'
                                        control={control}
                                        class='mb-0'
                                        iProps={{ placeholder: 'Please select'}}
                                        rules={{required: 'Enter Type'}}
                                        initValue=''
                                        selectOption={classroomType}
                                        validate={errors.classroomType && 'error'}
                                        validMessage={errors.classroomType && errors.classroomType.message}
                                    />
                                </Col>
                                
                                
                                <Col span={12}>
                                    <InputField 
                                        isRequired={true}
                                        fieldname='classperWeek'
                                        label='Class per Week'
                                        control={control}
                                        class='mb-0'
                                        iProps={{ placeholder: 'Please Input Value', size: 'large', type: 'number'}}
                                        rules={{ required: 'Class Per Week Required' }}
                                        initValue=''
                                        validate={errors.classperWeek && 'error'}
                                        validMessage={errors.classperWeek && errors.classperWeek.message}
                                    />
                                </Col>
                                
                            
                                <Col span={12}>
                                    <InputField 
                                        isRequired={true}
                                        fieldname='fee'
                                        label='Module Fee'
                                        control={control}
                                        class='mb-0 inputGroupWithClose'
                                        iProps={{ placeholder: 'Please state', size: 'large', type: 'number', addonBefore: prefixSelector}}
                                        rules={{ required: 'Module Fee Required' }}
                                        initValue=''
                                        validate={errors.fee && 'error'}
                                        validMessage={errors.fee && errors.fee.message}
                                    />
                                </Col>

                               
                                
                            </Row>
                            </Col>
                            <Col span={24}>
					            <Outline control={control} errors={errors} data={moduleApi} setValue={setValue} />
                            </Col>
                        </Row>
                    </TabPane>  
					
					<TabPane tab="Materials" key="2" forceRender>
                        <Materials control={control} errors={errors} setValue={setValue} data={moduleApi} />
                    </TabPane>
					{mode == 'edit' &&
                        <TabPane tab="Programmes" key="3" forceRender>
                            <AttachProgram tags={tags} setTags={setTags} />
                        </TabPane>
                    }

                </Tabs>
            </Col>

            {mode == 'edit' &&
            <Col span={24}>
                <Row gutter={20} justify='end'>
                    <Col>
                        <Button size='large' type='primary' htmlType={status == 'Active' ? 'submit' : 'button'} className='green-btn' onClick={() => status == 'Draft' ? onDraft() : null}>Save Changes</Button>
                    </Col>
                </Row>
            </Col>
            }
        </Row>
    </Card>
    )
    
}
