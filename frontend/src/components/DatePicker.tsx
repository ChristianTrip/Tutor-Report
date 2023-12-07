import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import da from 'date-fns/locale/da';

interface DateInputProps {
    label: string;
    selectedDate: Date | null;
    onDateChange: (date: Date | null) => void;
}

export default function DateInput ({ label, selectedDate, onDateChange }: DateInputProps) {

    registerLocale('da', da);
    setDefaultLocale('da');

    return (
        <Form.Group as={Row}>
            <Form.Label column sm={2}>
                {label}
            </Form.Label>
            <Col sm={10}>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date: Date) => onDateChange(date)}
                    dateFormat="MM/dd/yyyy"
                    isClearable
                    locale="da" // Set the locale for the date picker
                />
            </Col>
        </Form.Group>
    );
}