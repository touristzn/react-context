import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './style.less';

export const Table = (props) => {
  const { children, data, width } = props;
  let totalW = 0;

  if(children.length !== undefined) {
    children.forEach((val, i) => {
      if (val.props.width) {
        totalW += Number(val.props.width);
      }
    });
  } else {
    totalW = '100%';
  }

  return (
    <div className="table-list">
        <table width={width ? width : totalW} cellPadding="0" cellSpacing="0" border="0">
          <colgroup>
            {React.Children.map(children, (child, index) => {
              // 获取表格的宽度
              const w = child.props.width;
              return (
                <col width={w}/>
              )
            })}
          </colgroup>
          <thead>
            <tr>
              {React.Children.map(children, (child, index) => {
                const label = child.props.label;
                return (
                  <th>{ label }</th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  {React.Children.map(children, (child, index) => {
                    // 获取子元素的prop属性
                    const prop = child.props.prop;
                    return (
                      <td>{ prop ? item[prop] : child }</td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
  )
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
}

export const TableColumn = ({ children }) => {
  return children
}

TableColumn.propTypes = {
  prop: PropTypes.string,
  width: PropTypes.string,
  label: PropTypes.string,
}


// 使用方法
//-----------------------------
// 自适应效果
// 在Tabel上加width="100%"，然后子组件中TableColumn需要自适应宽度的不传width
//-----------------------------
// 横向滚动条效果
// Tabel上如果不传width，子组件TableColumn则需要传固定width
// 如果想要某列自适应宽度，可以不传宽，或为空

/* <Table data={items}>
  <TableColumn prop="id" width="30" label="序号" />
  <TableColumn prop="title" width="200" label="内容" />
  <TableColumn prop="date" width="150" label="日期" />
  <TableColumn>
    <span>111</span>
  </TableColumn>
</Table> */