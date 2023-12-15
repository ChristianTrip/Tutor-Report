import {Col, Form, Row} from "react-bootstrap";
import React from "react";

interface Props{
    label: string;
    value: string;
    placeholder: string;
    handleTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    width: number;
    height: number;
}

export default function TextArea({label, value, placeholder, handleTextChange, height, width}: Props){
    return (
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={width}>
                {label}
            </Form.Label>
            <Col sm={10}>
                <Form.Control
                    as="textarea"
                    rows={height}
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(text: React.ChangeEvent<HTMLInputElement>) => handleTextChange(text)}
                />
            </Col>
        </Form.Group>
    )
}