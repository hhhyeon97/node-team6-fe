import React from "react";
import { Table, Badge, Button } from "react-bootstrap";
import { convertToKST } from "../../utils/Date";

const NoticeTable = ({ header, noticeList, deleteItem, openEditForm }) => {
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
              <tr className="notice-table-item" onClick={() => openEditForm(notice)}>
              <th>{notice.isImportant ? (<p>중요</p>):("")}</th>
              <th>{notice.userId.name}</th>
              <th>{notice.title}</th>
              <th>{notice.content}</th>
              <th>{notice.view ? notice.view : 0}</th>
              <th>{convertToKST(notice.createdAt)}</th>
              <th>
                <Button size="sm" onClick={() => openEditForm(notice)}>
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => deleteItem(notice._id, notice.title)}
                  className="mr-1"
                >
                    -
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