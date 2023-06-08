import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Space, Tag, Card, message } from 'antd';
import { useTranslate } from 'Translate';
import { SelectField } from '../../../../../../../../atoms/FormElement';
import { getAddProjectName } from '../../../../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { CloseCircleFilled } from '@ant-design/icons';

export default (props) => {
  const dispatch = useDispatch();
  const il8n = useTranslate();
  const [selected, setSelected] = useState();
  const [options, setOptions] = useState([]);
  const { tags, setTags, deleted, setDeleted, control, data } = props;
  const projectName = useSelector((state) => state.tasks.myAddProjectData);
  const { t } = il8n;

  useEffect(() => {
    dispatch(getAddProjectName());
  }, []);

  const onAdd = () => {
    if (selected) {
      let temp = [];
      temp = [...options];
      const newtags = [...tags];
      let check = newtags.findIndex((z) => z.name == selected.value);
      if (check == -1) {
        let a = options.findIndex((y) => y.value == selected.value);
        if (a) {
          setOptions(temp);
        }

        let obj = {};
        obj['project'] = selected.value;
        obj['name'] = selected.label;
        newtags.push(obj);
        setSelected('');
        setTags(newtags);
      } else {
        message.error('Already Exist');
      }
    }
  };

  const onRemove = (e) => {
    let temp = [];
    temp = [...options];
    if (e.doctype) {
      let delProg = [];
      delProg = [...deleted];
      delProg.push(e.project);
      setDeleted(delProg);
    }
    let a = options.findIndex((y) => y.value == e.project);
    if (a) {
      setOptions(temp);
    }
    const current = tags.filter((tag) => tag.project !== e.project);
    if (current) {
      setTags(current);
    }
  };

  useEffect(() => {
    if (projectName) {
      let temp = [];
      projectName.map((item) => temp.push({ label: item.project, value: item.name }));
      setOptions(temp);
    }
  }, [projectName]);
  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <Row>
          <Col flex="auto">
            <SelectField
              class="mb-0"
              fieldname="project"
              label=""
              control={control}
              iProps={{ placeholder: 'Type project name' }}
              selectOption={
                projectName &&
                projectName?.map((e) => {
                  return { value: e.project, label: e.project };
                })
              }
              onChange={(e) => setSelected(e)}
            />
          </Col>
          <Col flex="80px">
            <Button type="primary" htmlType="button" size="large" className="green-btn" onClick={onAdd}>
              Add
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Space size={20} direction="vertical" className="w-100">
          {tags.map((tag, index) => (
            <Tag
              closable
              closeIcon={<CloseCircleFilled />}
              className="program-list"
              key={tag.name}
              onClose={() => onRemove(tag)}
            >
              <Card bordered={false} className="transparent-card">
                <Row gutter={20} align="middle">
                  <Col flex="auto">
                    <span className="p-name w-100">
                      <span className="p-detail">{tag.project}</span>
                    </span>
                  </Col>
                </Row>
              </Card>
            </Tag>
          ))}
        </Space>
      </Col>
      <Col span={24}>
        <Row gutter={20} justify="end">
          <Col>
            <Button size="large" type="primary" htmlType="submit" className="green-btn">
              Save Changes
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
