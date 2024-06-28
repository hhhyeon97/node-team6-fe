import React from "react";
import Placeholder from 'react-bootstrap/Placeholder';
import '../../style/css/skeleton/MainPageSkeleton.css'

const MainPageSkelton = ({ num }) => {
    return (
        <div className="mainPage_skeleton">
            {[...Array(num)].map((_, index) => (
                <div key={index} className='performance_card_area'>
                    <Placeholder className='performance_card_img_box' animation='glow'>
                        <Placeholder xs={12} style={{ backgroundColor: "#bbb" }} className='performance_card_img'>
                        </Placeholder>
                    </Placeholder>
                    <div>
                        <Placeholder animation='glow'>
                            <Placeholder xs={9} style={{ backgroundColor: "#bbb" }} />
                            <Placeholder xs={8} style={{ backgroundColor: "#bbb" }} />
                            <div className="skeletonBtn">
                                <Placeholder xs={7} style={{ backgroundColor: "#bbb" }} />
                                <Placeholder xs={1} style={{ backgroundColor: "#bbb" }} />
                            </div>
                        </Placeholder>
                    </div>
                </div>
            ))
            }
        </div >
    )
}

export default MainPageSkelton
