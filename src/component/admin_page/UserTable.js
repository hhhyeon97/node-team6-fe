import React from "react";
import { Table, Badge } from "react-bootstrap";

const UserTable = ({ header, userList, openEditForm }) => {
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
          {userList.length > 0 ? (
            userList.map((user, index) => (
              <tr onClick={() => openEditForm(user)} className="order-table-item">
              <th>{user.image}{user.name}</th>
              <th>{user.level.toUpperCase()}</th>
              <th>{user.email}</th>
              <th>{user.contact}</th>
              <th>{user.createdAt}</th>
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
export default UserTable;