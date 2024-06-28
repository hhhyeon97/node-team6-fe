import React from "react";
import { Placeholder } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import '../../style/css/skeleton/SearchPageSkeleton.css'

const SearchPageSkeleton = () => {

    return (
        <Placeholder animation="glow" className='searchPage_skeleton'>
            <Row>
                {[...Array(4)].map((_, index) => (
                    <Col lg={3}>
                        <div className='search_card_area'>
                            <Placeholder className='search_card_img_box' style={{ backgroundColor: "#bbb" }}>
                                {/* <img src={item.poster} className='search_card_img' /> */}
                            </Placeholder>
                            <div className='search_card_text'>
                                <Placeholder xs={9} style={{ backgroundColor: "#bbb" }} />
                                <Placeholder xs={8} style={{ backgroundColor: "#bbb" }} />
                                <div className="skeletonBtn">
                                    <Placeholder xs={4} style={{ backgroundColor: "#bbb" }} />
                                    <Placeholder className='like' xs={2} style={{ backgroundColor: "#bbb" }} />
                                </div>
                            </div>
                        </div>
                    </Col>
                ))}

            </Row>
        </Placeholder>
    )
}

export default SearchPageSkeleton

