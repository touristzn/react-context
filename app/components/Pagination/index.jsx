import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './style.less';

const Pagination = (props) => {
  const { currentChange, currentPage, pageSize, total } = props;
  // 总页数
  const totalPage = Math.ceil(total / pageSize);
  // pagerCount页码按钮的数量
  const pagerCount = 7;
  // 按钮的一半数量
  const halfPagerCount = (pagerCount - 1) / 2;
  // 生成page列表
  let listPage = [];
  // 左边的more图标
  let showPrevMore = false;
  // 右边的more图标
  let showNextMore = false;
  // 如果总页码数大于要显示的页码按钮数量
  if (totalPage > pagerCount) {
    //  如果当前页码大于（要显示的页码按钮数量-一半的页码按钮数量）
    if (currentPage > pagerCount - halfPagerCount) {
      //  显示左边的more图标
      showPrevMore = true;
    }
    //  如果当前页码小于（要显示的页码按钮数量-一半的页码按钮数量）
    if (currentPage < totalPage - halfPagerCount) {
      //  显示右边的more图标
      showNextMore = true;
    }
  }

  const pages = () => {
    const current = Number(currentPage);

    // 如果左边的more图标存在，右边的more图标不存在
    if (showPrevMore && !showNextMore) {
      const startPage = totalPage - (pagerCount - 2);
      for (let i = startPage; i < totalPage; i+=1) {
        listPage.push(i);
      }
    }
    // 如果左边的more图标不存在，右边的more图标存在
    else if (!showPrevMore && showNextMore) {
      for (let i = 2; i < pagerCount; i+=1) {
        listPage.push(i);
      }
    }
    // 如果左右more图标都存在
    else if (showPrevMore && showNextMore) {
      const offset = Math.floor(pagerCount / 2) - 1;
      for (let i = currentPage - offset ; i <= currentPage + offset; i+=1) {
        listPage.push(i);
      }
    }
    else {
      for (let i = 2; i < totalPage; i+=1) {
        listPage.push(i);
      }
    }
  }
  // 点击当前页
  const handleCurrentChange = (val) => {
    currentChange(val);
  }
  // 点击上一页
  const prev = () => {
    if (currentPage > 1) {
      const currentNum = currentPage - 1;
      currentChange(currentNum);
    }
  }
  // 点击下一页
  const next = () => {
    if (currentPage < totalPage) {
      const currentNum = currentPage + 1;
      currentChange(currentNum);
    }
  }
  pages();

  return (
    <div className="pagination">
      <span className="pagination__total">共 {total} 条</span>
      <div className="pagination__sizes">
        <button
          className={`btn-prev ${currentPage === 1 && 'disabled'}`}
          onClick={() => {prev()}}
        >
          上一页
        </button>
        <ul className="page">
          <li
            className={currentPage === 1 ? 'active' : null}
            onClick={() => {handleCurrentChange(1)}}
          >
            1
          </li>
          {
            showPrevMore && <li className="more"/>
          }
          {
            listPage.map(val => {
              return (
                <li
                  key={val}
                  className={currentPage === val ? 'active' : null}
                  onClick={() => {handleCurrentChange(val)}}
                >
                  { val }
                </li>
              )
            })
          }
          {
            showNextMore && <li className="more"/>
          }
          <li
            className={currentPage === totalPage ? 'active' : null}
            onClick={() => {handleCurrentChange(totalPage)}}
          >
            { totalPage }
          </li>
        </ul>
        <button
          className={`btn-next ${currentPage === totalPage && 'disabled'}`}
          onClick={() => {next()}}
        >
          下一页
        </button>
      </div>
    </div>
  )
}

Pagination.propTypes = {
  currentChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
}

export default Pagination;