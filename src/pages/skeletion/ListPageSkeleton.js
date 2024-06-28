import React from "react";
import Placeholder from 'react-bootstrap/Placeholder';
import '../../style/css/skeleton/ListPageSkeleton.css'
import { Col, Row } from "react-bootstrap";

const ListPageSkeleton = () => {

    return (
        <div className="ListPage_skeleton">
            {[...Array(10)].map((_, index) => (
                <Placeholder animation="glow">
                    <Row className="ListItem" key={index}>
                        <Placeholder lg={4} md={4} sm={4} className="image_col" style={{ backgroundColor: '#bbb' }}>
                        </Placeholder>
                        <Col lg={8} md={8} sm={8} className="item_info_box">
                            <div className="item_info_box_top">
                                <Placeholder xs={9} style={{ backgroundColor: '#bbb' }}></Placeholder>
                                <Placeholder xs={10} style={{ backgroundColor: '#bbb' }}></Placeholder>
                                <Placeholder xs={8} style={{ backgroundColor: '#bbb' }}></Placeholder>
                            </div>

                            <Placeholder xs={2} style={{ backgroundColor: '#bbb' }}></Placeholder>

                            <div className="item_info_box_like">
                                <Placeholder xs={1} style={{ backgroundColor: '#bbb' }}></Placeholder>
                            </div>
                        </Col>
                    </Row>
                </Placeholder>
            ))
            }
        </div >
    )
}

export default ListPageSkeleton