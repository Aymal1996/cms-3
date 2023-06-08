import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Collapse } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { InputCheckbox } from 'Atoms/FormElement';
import PermissionCheckbox from '../PermissionCheckbox';
import { totalRoles } from '../AddEditRoles/roleList';

const { Panel } = Collapse;

export default (props) => {

    const { item, control, setValue, getValues, onCheckAll, data } = props;
    const [neutral, setNeutral] = useState(false);

    useEffect(() => {
      if(data && data.length) {
        let n = false;
        // totalRoles.map(x => {
        //   item.screens.map(y => {
        //     let d = permit.find(z => y.role == z.permission_name)
        //     if((d.read == 1 || d.write == 1 || d.delete == 1) && (d.read == 0 || d.write == 0 || d.delete == 0)) {
        //       n = true
        //     }
        //   })
        // })

        item.screens.map(x => {
          let d = data.find(z => x.role == z.permission_name);
          if (d) {
            if((d.read == 1 || d.write == 1 || d.delete == 1) && (d.read == 0 || d.write == 0 || d.delete == 0)) {
              n = true
            }
          }
        })

        if (n == true) {
          setNeutral(true)
        }
        
      }
    }, [data]);

    const onCheckParent = (e, screen, item) => {
        if (e == true) {
          setValue(`${screen}-read`, [1]);
          setValue(`${screen}-write`, [1]);
          setValue(`${screen}-delete`, [1]);
          let val = true;
          let n = false
          item.screens.map(x => {
            if(getValues(`${x.role}`) == false) {
              val = false
            } else {
              n = true;
            }
          })
          setValue(`${item.module}`, val)
          if (val == false && n == true) {
            setNeutral(true);
          } else {
            setNeutral(false);
          }
        } else {
          setValue(`${screen}-read`, []);
          setValue(`${screen}-write`, []);
          setValue(`${screen}-delete`, []);
          setValue(item.module, false);
          let n = false
          let val = true;
          item.screens.map(x => {
            if(getValues(`${x.role}`) == false) {
              val = false
            } else {
              n = true;
            }
          })
          if (val == false && n == true) {
            setNeutral(true);
          } else {
            setNeutral(false);
          }
        }
      };

    return (
        <Col span={24}>
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
                    header={item.label}
                    extra={
                    <InputCheckbox
                        fieldname={`${item.module}`}
                        label=""
                        class="mb-0 fullWidth-checbox"
                        control={control}
                        intr={neutral}
                        initValue={false}
                        onChange={(e) => {onCheckAll(e, item.screens); setNeutral(false)}}
                    />
                    }
                >
                    <Row gutter={[20,20]}>
                    {item.screens.map((x,j) => (
                    <Fragment key={j}>
                        <PermissionCheckbox 
                        item={item} 
                        x={x} 
                        onCheckParent={onCheckParent} 
                        control={control}
                        getValues={getValues}
                        setValue={setValue}
                        setNeutralP={setNeutral}
                        data={data}
                        />
                    </Fragment>
                    ))}
                    </Row>
                </Panel>
            </Collapse>
        </Col>
    )
}