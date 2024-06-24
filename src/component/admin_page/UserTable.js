import React from "react";
import { Table, Badge } from "react-bootstrap";
import { convertToKST } from "../../utils/Date";

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
              <th>
                {user.image ? (
                  <img 
                    src={user.image}
                    alt={user.name} 
                    style={{ width: '23px', height: '23px', objectFit: 'cover' }} 
                    onError={(e) => e.target.src = 'https://iconspng.com/_next/image?url=https%3A%2F%2Ficonspng.com%2Fimages%2Fabstract-user-icon-3%2Fabstract-user-icon-3.jpg&w=1080&q=75'}
                  />
                ) : (
                  <img 
                    src='https://iconspng.com/_next/image?url=https%3A%2F%2Ficonspng.com%2Fimages%2Fabstract-user-icon-3%2Fabstract-user-icon-3.jpg&w=1080&q=75'
                    alt={user.name} 
                    style={{ width: '23px', height: '23px', objectFit: 'cover' }} 
                  />
                )}
                {user.name}
              </th>
              <th>{user.level.toUpperCase()}</th>
              <th>{user.email}</th>
              <th>{user.contact}</th>
              <th>{convertToKST(user.createdAt)}</th>
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