import React from "react";
import { Table, Badge, Button } from "react-bootstrap";
import { convertToKST } from "../../utils/Date";

const NoticeTable = ({ header, noticeList, deleteItem, openEditForm }) => {
  return (
    <div className="overflow-x">
      <Table  hover>
        <thead>
            <tr>
              {header.map((title) => (
                <th>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {noticeList?.length > 0 ? (
            noticeList?.map((notice, index) => (
              <tr className="notice-table-item">
              <th>{notice.isImportant ? (<p>중요</p>):("")}</th>
              <th>{notice.userId.name}</th>
              <th>{notice.title}</th>
              {/* <th className='text_area'>{notice.content}</th> */}
              <th>{convertToKST(notice.createdAt)}</th>
              <th>{notice.view ? notice.view : 0}</th>
              <th >
                <Button variant="light" size="sm" onClick={() => openEditForm(notice)}>
                  수정
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  onClick={() => deleteItem(notice._id, notice.title)}
                  className="mr-1"
                >
                    삭제
                  </Button>               
              </th>
              </tr>
            ))
          ) : (
            <tr>No Data to show</tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};
export default NoticeTable;