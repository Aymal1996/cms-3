import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Space, Typography, Card, Button, message } from 'antd';
import HeadingChip from 'Molecules/HeadingChip';
import { MenuOutlined } from '@ant-design/icons';
import { arrayMoveImmutable } from 'array-move';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import { useSelector } from 'react-redux';
import { getSorting } from '../../../../ducks/actions';
import { setRegistationFee } from '../../../../ducks/services';
import { useDispatch } from 'react-redux';

const { Title, Text} = Typography;
const DragHandle = SortableHandle(() => (
    <MenuOutlined
      style={{
        cursor: 'grab',
        color: '#999',
      }}
    />
  ));

    const columns = [
        {
            title: 'Sort',
            dataIndex: 'sort',
            width: 50,
            className: 'drag-visible',
            render: () => <DragHandle />,
        },
        {
            title: 'fee_name',
            dataIndex: 'fee_name',
            className: 'drag-visible',
        },
    ]

    const SortableItem = SortableElement((props) => <tr {...props} />);
    const SortableBody = SortableContainer((props) => <tbody {...props} />);

export default (props) => {

    const dispatch = useDispatch();
    const { setVisible } = props;
    const data = useSelector((state) => state.finance.sortlist)
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if(data.length > 0) {
            console.log('checking data',data)
            let temp=[];
            data.map((x,i) => {
                temp.push({
                    fee_name: x.fee_name,
                    index: i,
                })
            })
            setDataSource(temp)
        }
    }, [data]);

    const onSortEnd = ({ oldIndex, newIndex }) => {
        if (oldIndex !== newIndex) {
          const newData = arrayMoveImmutable(dataSource.slice(), oldIndex, newIndex).filter(
            (el) => !!el,
          );
          setDataSource(newData);
        }
    };

    const DraggableContainer = (props) => (
        <SortableBody
          useDragHandle
          disableAutoscroll
          helperClass="row-dragging"
          onSortEnd={onSortEnd}
          {...props}
        />
    );
    
    const DraggableBodyRow = ({ className, style, ...restProps }) => {
        const index = dataSource.findIndex((x) => x.index === restProps['data-row-key']);
        return <SortableItem index={index} {...restProps} />;
    };

    const onSortFinish = () => {
        let priority = [];
        dataSource.map(x => {
            priority.push({
                fee_name: x.fee_name
            })
        })
        let body = {
            fee_priority: priority
          }
          setRegistationFee(body).then(res => {
            message.success('Fee Structure Sort Successfully');
            dispatch(getSorting())
            setVisible(false);
          }).catch(e => {
            const {response} = e
            console.log('err', response)
            message.error('Something went wrong');
          })
    }
    
    return (
        <Row gutter={[20, 30]}>
            <Col span={24}><HeadingChip title="Fee Structure" /></Col>
            <Col span={24}>
                <Card bordered={false} className='uni-card-small b-success'>
                    <Space direction='vertical' size={4}>
                        <Text className='smallFont12 c-white op-6'>Note</Text>
                        <Title level={5} className='mb-0 c-white'>Top = Most priority, Bottom = Least priority</Title>
                    </Space>
                </Card>
            </Col>
            <Col span={24}>
                <Table
                    className='custom-table-sort'
                    pagination={false}
                    dataSource={dataSource}
                    columns={columns}
                    size='large'
                    rowKey="index"
                    showHeader={false}
                    components={{
                        body: {
                        wrapper: DraggableContainer,
                        row: DraggableBodyRow,
                        },
                    }}
                />
            </Col>
            <Col span={24}>
                <Row gutter={[20,20]} justify='end'>
                    <Col><Button size="large" type="primary" htmlType="button" className="gray-btn w-200px" onClick={() => setVisible(false)}>Cancel</Button></Col>
                    <Col><Button size="large" type="primary" htmlType="button" className="w-200px" onClick={() => onSortFinish()}>Done</Button></Col>
                </Row>
            </Col>
        </Row>
    )
}

