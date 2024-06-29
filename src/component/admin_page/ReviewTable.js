import React from "react";
import { Table, Badge } from "react-bootstrap";
import { convertToKST } from "../../utils/Date";

const ReviewTable = ({ header, reviewList, openEditForm }) => {
  return (
    <div className="overflow-x">
      <Table hover>
        <thead>
            <tr>
              {header.map((title) => (
                <th>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {reviewList.length > 0 ? (
            reviewList.map((review, index) => (
              <tr onClick={() => openEditForm(review)} className="order-table-item">
                <th>{review.reservationId?.ticket.SeqTitle}</th>
                <th>{review.userId.name}</th>
                <th>{review.userId.level.toUpperCase()}</th>
                <th>{review.reviewText}</th>
                <th>{convertToKST(review.createdAt)}</th>
                <th>{review.isSuspended ? (<p>숨김</p>):("")}</th>
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
export default ReviewTable;