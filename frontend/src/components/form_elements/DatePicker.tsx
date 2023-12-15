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
                    dateFormat="dd/MM/yyyy"
                    //dateFormat="yyyy/MM/dd"
                    isClearable
                    locale="da" // Set the locale for the date picker
                />
            </Col>
        </Form.Group>
    );
}

interface DateSpanInputProps {
    label: string;
    startDate: Date | null;
    endDate: Date | null;
    onDateChange: (startDate: Date | null, endDate: Date | null) => void;
}

export function DateSpanInput({label, startDate, endDate, onDateChange}: DateSpanInputProps) {
    registerLocale('da', da);
    setDefaultLocale('da');

    return (
        <Form.Group as={Row}>
            <Form.Label column sm={1}>
                <h3>{label}</h3>
            </Form.Label>
            <Col sm={5}>
                <div className="d-flex">
                    <div className="mr-2">
                        <Form.Label htmlFor={`${label}_from`} srOnly>
                            <strong> Fra </strong>
                        </Form.Label>
                        <DatePicker
                            id={`${label}_from`}
                            selected={startDate}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(date) => onDateChange(date, endDate)}
                            dateFormat="dd/MM/yyyy"
                            isClearable
                            locale="da"
                        />
                    </div>
                    <div>
                        <Form.Label htmlFor={`${label}_to`} srOnly>
                            <strong> Til </strong>
                        </Form.Label>
                        <DatePicker
                            id={`${label}_to`}
                            selected={endDate}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(date) => onDateChange(startDate, date)}
                            dateFormat="dd/MM/yyyy"
                            isClearable
                            locale="da"
                        />
                    </div>
                </div>
            </Col>
        </Form.Group>
    );
}