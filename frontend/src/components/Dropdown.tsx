import {Col, Dropdown, Form, Row} from "react-bootstrap";
import React from "react";


interface Props {
    label: string;
    options: string[];
    selectedOption: String | null;
    event: (eventKey: string | null) => void;
}

export default function MyDropdown({label, options, selectedOption, event}: Props){
    return (
        <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={2}>
                {label}
            </Form.Label>
            <Col sm={10}>
                <Dropdown onSelect={event}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {selectedOption || '_'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {mapper(options)}
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Form.Group>
    )
}

function mapper(list: string[]) {
    if (list.length === 0){
        return <p>no items in list..</p>
    }
    return list.map(option =>
        (
            <Dropdown.Item eventKey={option}>{option}</Dropdown.Item>
        )
    )
}