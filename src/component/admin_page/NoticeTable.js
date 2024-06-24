import React from "react";
import { Table, Badge } from "react-bootstrap";
import { convertToKST } from "../../utils/Date";

const NoticeTable = ({ header, noticeList, openEditForm }) => {
  return (
    <div className="overflow-x">
      <Table striped bordered hover>
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
              <tr onClick={() => openEditForm(notice)} className="notice-table-item">
              <th>{notice.userId.name}</th>
              <th>{notice.title}</th>
              <th>{notice.content}</th>
              <th>{notice.view ? notice.view : 0}</th>
              <th>{convertToKST(notice.createdAt)}</th>
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