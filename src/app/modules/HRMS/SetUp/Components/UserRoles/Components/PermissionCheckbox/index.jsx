import React, { useState, useEffect } from 'react';
import { Col, Collapse } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { CheckboxGroup, InputCheckbox } from 'Atoms/FormElement';

const { Panel } = Collapse;

export default (props) => {

    const [neutral, setNeutral] = useState(false)
    const { item, x, onCheckParent, control, getValues, setValue, setNeutralP, data } = props;

    const onSingleCheck = (screen, item) => {
        let a = true;
        
        if(getValues(`${screen}-read`).length && getValues(`${screen}-write`).length && getValues(`${screen}-delete`).length) {
          setValue(screen, true);
          setNeutral(false)
          // setNeutralP(false)
        } else if (getValues(`${screen}-read`).length || getValues(`${screen}-write`).length || getValues(`${screen}-delete`).length) {
          setValue(screen, false);
          setNeutral(true)
          setNeutralP(true);
        } else {
          setNeutral(false)
          // setNeutralP(false)
          setValue(screen, false);
        }
    
        item.screens.map(x => {
          if(getValues(`${x.role}`) == false) {
            a = false;
          }
        })
    
        setValue(`${item.module}`, a)
    
      };

      useEffect(() => {
        if (data) {
          let d = data.find(z => x.role == z.permission_name)
          if (d) {
            if ((d.read == 1 || d.write == 1 || d.delete == 1) && (d.read == 0 || d.write == 0 || d.delete == 0)) {
              setNeutral(true)
            }
          }
        }
      }, [data]);

    return (
        <Col span={12}>
            <Collapse
            className="custom-collapse"
            bordered={false}
            collapsible={'header'}
            expandIcon={({ isActive }) =>
                !isActive ? <PlusOutlined /> : <MinusOutlined />
            }
            >
                <Panel
                forceRender={true}
                style={{ border: '0px' }}
                header={x.label}
                extra={
                    <InputCheckbox
                    fieldname={`${x.role}`}
                    label=""
                    class="mb-0 fullWidth-checbox"
                    control={control}
                    intr={neutral}
                    initValue={false}
                    onChange={(e) => {setNeutral(false); onCheckParent(e, x.role, item)}}
                    />
                }
                >
                  {(x.label != 'Is Manager' && x.label != 'Is Dean') && <>
                    <CheckboxGroup
                    fieldname={`${x.role}-read`}
                    label=""
                    class="mb-0 fullWidth-checbox"
                    control={control}
                    initValue=""
                    option={[{ label: 'Visibility', value: 1 }]}
                    onChange={() => onSingleCheck(x.role, item)}
                    />
                    <CheckboxGroup
                    fieldname={`${x.role}-write`}
                    label=""
                    class="mb-0 fullWidth-checbox"
                    control={control}
                    initValue=""
                    option={[{ label: 'Modify', value: 1 }]}
                    onChange={() => {onSingleCheck(x.role, item)}}
                    />
                    <CheckboxGroup
                    fieldname={`${x.role}-delete`}
                    label=""
                    class="mb-0 fullWidth-checbox"
                    control={control}
                    initValue=""
                    option={[{ label: 'Delete', value: 1 }]}
                    onChange={() => onSingleCheck(x.role, item)}
                    />
                    </>}
                </Panel>
            </Collapse>
            
        </Col>
    )
}