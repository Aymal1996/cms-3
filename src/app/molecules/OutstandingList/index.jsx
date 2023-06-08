import React, {useState} from 'react';
import ListCard from '../ListCard';
import { useHistory } from 'react-router-dom';

export default (props) => {

    const history = useHistory();
    const { column, data, count, Search, onSearch, balance, heading, updateApi, link, id, ExtraBlocks, scroll } = props;
    const [page, setPage] =  useState(1);
    const [limit, setLimit] =  useState(5);

    const onClickRow = (record) => {
        return {
          onClick: () => {
            history.push(`${link}${record[id]}`)
          },
        };
    }

    const onTableChange = (pagination, filters, sorter) => {
        setPage(pagination.current);
        setLimit(pagination.pageSize);
        if (sorter.order) {
            updateApi(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey)
        } else {
            updateApi(pagination.current, pagination.pageSize, '', '')
        }
      }

    return (
            <ListCard 
                title={heading}
                onRow={link && onClickRow} 
                Search={Search} 
                onSearch={onSearch} 
                ListCol={column} 
                ListData={data} 
                scrolling={500}
                ExtraBlocks={ExtraBlocks}
                onChange={onTableChange}
                scroll={scroll}
                field1={props.field1}
                pagination={{
                    total: count,
                    current: page,
                    pageSize: limit
                }}
            />
    )
}