import {Col, Dropdown, Form, Row} from "react-bootstrap";
import React, {CSSProperties} from "react";
import {Option} from "./DropdownOptions";


interface Props {
    label: string;
    options: Option[];
    selectedOption: Option | null;
    event: (eventKey: string | null) => void;
    style: CSSProperties | undefined;
}

export default function DropdownMenu({label, options, selectedOption, event, style}: Props){

    return (
        <Form.Group as={Row} className="mb-3 w-100">
            <Form.Label column sm={2}>
                {label}
            </Form.Label>
            <Col sm={10}>
                <Dropdown onSelect={event}>
                    <Dropdown.Toggle variant="success" id={`dropdown-${label}`} style={style}>
                        {selectedOption?.display || label }
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {mapItems(options)}
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Form.Group>
    )
}

function mapItems(list: Option[]) {
    if (list.length === 0){
        return <p>no items in list..</p>
    }
    return list.map(option =>
        (
            <Dropdown.Item eventKey={option.display}>{option.display}</Dropdown.Item>
        )
    )
}