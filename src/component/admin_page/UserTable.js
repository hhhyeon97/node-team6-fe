import React from "react";
import { Table, Badge } from "react-bootstrap";
import { convertToKST } from "../../utils/Date";
import defaultUserImg from "../../assets/img/profile_user.png"

const UserTable = ({ header, userList, openEditForm }) => {
  
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
          {userList.length > 0 ? (
            userList.map((user, index) => (
              <tr onClick={() => openEditForm(user)} className="order-table-item">
              <th>
                <div class="profile_group">
                  {user.image ? (
                    <div className="user_profile">
                      <img
                        className='user_img'
                        src={user.image}
                        alt={user.name}
                        onError={(e) => e.target.src = defaultUserImg }
                      />
                    </div>
                  ) : (
                    <div className="user_profile">
                      <img
                        className='user_img'
                        src={defaultUserImg}
                        alt={user.name}
                      />
                    </div>
                  )}
                  {user.name}
                </div>
              </th>
              <th>
                <div class="level_group">
                  {user.level === "normal" && <div className="level_tag normal"> {user.level.toUpperCase()}</div>}
                  {user.level === "gold" && <div className="level_tag gold"> {user.level.toUpperCase()}</div>}
                  {user.level === "admin" && <div className="level_tag suspend"> {user.level.toUpperCase()}</div>}
                  {user.level === "admin" && <div className="level_tag admin"> {user.level.toUpperCase()}</div>}
                </div>
              </th>
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