import React, { useEffect } from "react";
import { useFieldArray, useWatch } from 'react-hook-form';
import { Row, Col, Button } from "antd";
import MaterialForm from "./MaterialForm";


const initQ = {
    weeks: '',
	materialType: '',
	week_name: '',
}
  
export default (props) => {
	
	const { control, errors, setValue, data } = props;
    const {fields, append, remove} = useFieldArray({
        control,
        name: `materials`,
    });

    const watchF = useWatch({
        control,
        name: 'materials'
    });
    
    useEffect(() => {
        if(data && Object.keys(data).length > 0){
            let temp = [];
            console.log('week', data.add_module_materials)
            data?.add_module_materials.map((item) => {
                temp.push({
                    materialType: item.material_type,
                    weeks: item.week, 
		            week_name: item.week_name,
                });
            });
            setValue('materials', temp)
        }
    }, [data]);

    return ( 
        <Row gutter={[20, 20]} align="bottom">
            {fields.map((item,index) => (
            <React.Fragment key={item.id}>
                <MaterialForm setValue={setValue} control={control} watcher={watchF} errors={errors} item={item} index={index} remove={remove} />
            </React.Fragment>))}
            <Col span={24}>
                <Button htmlType='button'type="dashed" size='large' className='w-100' onClick={() => append(initQ)}> + Add Row</Button>
            </Col>
        </Row>
		
    )
}