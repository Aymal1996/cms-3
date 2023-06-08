import React, { useEffect } from "react";
import { useFieldArray } from 'react-hook-form';
import { SelectField } from "Atoms/FormElement";
import { Row, Col, Typography, Button } from "antd";
import { CloseCircleFilled } from '@ant-design/icons';
import { weightage, outlineType } from "../../../../configs/constantData";

const { Title } = Typography;

const initQ = {
	weightage: '',
	outlineType: '',
}
	  
export default (props) => {
	
	const { control, errors, setValue, data } = props;
	
	const {fields, append, remove} = useFieldArray({
        control,
        name: `outlines`,
	});

	useEffect(() => {
		if (data && Object.keys(data).length > 0) {
			let temp = [];
			data?.module_outline.map((item) => {
				temp.push({
					outlineType: item.type,
					weightage: item.weight
				});
			});
			setValue('outlines', temp);
		}
	}, [data]);

    return ( 
		<Row gutter={[20, 30]} align="bottom">
			<Col span={24}><Title level={4} className="mb-0">Module Outline</Title></Col>
				{fields.map((item,index) => (
				<React.Fragment key={item.id}>
						 
					<Col span={16}>
						<SelectField 
							isRequired={true}
							fieldname={`outlines[${index}.outlineType`}
							control={control}
							label={index == 0 ? 'Type' : ''}
							class='mb-0'
							iProps={{ placeholder: 'Select Type'}}
							rules={{required: 'Select Type'}}
							initValue={item.outlineType ? { label: item.outlineType, value: item.outlineType } : ''}
							selectOption={outlineType}
							onChange={(e) => setSelected(e)}
								validate={
							Object.entries(errors).length > 0 &&
								errors?.outlines?.length > 0 &&
								errors?.outlines[index]?.outlineType &&
								"error"
							}
							validMessage={
								Object.entries(errors).length > 0 &&
								errors?.outlines?.length > 0 &&
								errors?.outlines[index]?.outlineType &&
								errors?.outlines[index]?.outlineType?.message
							}
						/>
					</Col>
					
					<Col span={6}>
						<SelectField 
							isRequired={true}
							fieldname={`outlines[${index}.weightage`}
							label={index == 0 ? 'Weightage' : ''}
							control={control}
							class='mb-0'
							iProps={{ placeholder: 'Weightage'}}
							rules={{required: 'Select Weightage'}}
							initValue={item.weightage ? { label: item.weightage, value:item.weightage } : ''}
							selectOption={weightage}
							validate={
							Object.entries(errors).length > 0 &&
								errors?.outlines?.length > 0 &&
								errors?.outlines[index]?.weightage &&
								"error"
							}
							validMessage={
								Object.entries(errors).length > 0 &&
								errors?.outlines?.length > 0 &&
								errors?.outlines[index]?.weightage &&
								errors?.outlines[index]?.weightage?.message
							}
							
						/>
					</Col>
						
					<Col flex="40px">
						<Button type='link' size="large" className='cross-iconbtn' htmlType='button' icon={<CloseCircleFilled />} onClick={() => remove(index)} />
					</Col>
				</React.Fragment>))}
				<Col span={24}>
					<Button htmlType='button'type="dashed" size='large' className='w-100' onClick={() => append(initQ)}> + Add Row</Button>
				</Col>
					
			</Row>
		
    )
}