import React from "react";
import { Table, Badge, Button } from "react-bootstrap";
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
              <tr className="notice-table-item">
              <th>{notice.userId.name}</th>
              <th>{notice.title}</th>
              <th>{notice.content}</th>
              <th>{notice.view ? notice.view : 0}</th>
              <th>{convertToKST(notice.createdAt)}</th>
              <th>
                <Button size="sm" onClick={() => openEditForm(notice)}>
                  Edit
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