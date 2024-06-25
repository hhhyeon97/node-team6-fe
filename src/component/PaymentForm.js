import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import Cards from "react-credit-cards-2";
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const PaymentForm = ({
    handleInputFocus,
    cardValue,
    handlePaymentInfoChange,
    showState,
}) => {

    return (
        <Row className="creditCard display-flex">
            <Col md={5} xs={12}>
                <Cards
                    cvc={cardValue.cvc}
                    expiry={cardValue.expiry}
                    focused={cardValue.focus}
                    name={cardValue.name}
                    number={cardValue.number}
                />
            </Col>
            <Col md={6} xs={12}>
                <div className="form-area">
                    <Form.Control
                        type="tel"
                        name="number"
                        placeholder="Card Number"
                        onChange={handlePaymentInfoChange}
                        onFocus={handleInputFocus}
                        required
                        maxLength={16}
                        minLength={16}
                        value={cardValue.number}
                        className="card_textInfo"
                    />

                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handlePaymentInfoChange}
                        onFocus={handleInputFocus}
                        required
                        value={cardValue.name}
                        className="card_textInfo"
                    />
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                name="expiry"
                                placeholder="MM/DD"
                                onChange={handlePaymentInfoChange}
                                onFocus={handleInputFocus}
                                required
                                value={cardValue.expiry}
                                maxLength={7}
                                className="card_textInfo"
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                name="cvc"
                                placeholder="CVC"
                                onChange={handlePaymentInfoChange}
                                onFocus={handleInputFocus}
                                required
                                maxLength={3}
                                value={cardValue.cvc}
                                className="card_textInfo"
                            />
                        </Col>
                    </Row>
                </div>
                <div className={`off ${showState} ? 'on' :'' `}>결제 정보를 모두 입력해주세요!</div>
            </Col>
        </Row>
    );
};

export default PaymentForm;
