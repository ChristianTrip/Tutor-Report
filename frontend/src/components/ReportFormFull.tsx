import React, { useState } from 'react';
import { Form, Row, Col, Container } from 'react-bootstrap';
import DateInput from "./DatePicker";
import MyDropdown from "./Dropdown";
import {format} from "date-fns";
import Button from "react-bootstrap/Button";

// Register the Danish locale


// Create the MyForm component
const MyForm: React.FC = () => {


    // useState is a hook, and returns an array.
    // first thing in the array is the current state, the second is the function that updates the state.
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const [problem, setProblem] = useState<string>('');
    const [solution, setSolution] = useState<string>('');
    const [duration, setDuration] = useState<string | null>(null);
    const [semester, setSemester] = useState<string | null>(null);
    const [courseClassName, setCourseClassName] = useState<string | null>(null);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    const handleSemesterChange = (eventKey: string | null) => {
        setSemester(eventKey);
    }; const handleDurationChange = (eventKey: string | null) => {
        setDuration(eventKey);
    }; const handleCourseNameChange = (eventKey: string | null) => {
        setCourseClassName(eventKey);
    };

    const handleProblemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProblem(event.target.value);
    };


    const handleSolutionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSolution(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const url: string = 'http://localhost:8080/reports/add/' + localStorage.getItem("email");
        const endpoint: string = 'api/reports/add/' + localStorage.getItem("email");
        console.log(endpoint);

        const date = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';

        const reportRequest = createRequest(
            'POST',
            {problem, solution, duration, semester, courseClassName, date}
        )

        try {
            const response = await fetch(url, reportRequest);


            if (response.ok) {
                const data = await response.json();
                console.log(data);
                console.log('It updated, so i dont have to redeploy each time!!');


            } else {


                console.error('Report failed');
            }
        } catch (error) {
            console.log(reportRequest.body);
            console.error('Error during report creation:', error);
        }
    };


    return (
        <Container className="mt-5">
            <Form style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '2px solid black' }}>
                {/* First input: Date picker */}
                <DateInput label="Dato" selectedDate={selectedDate} onDateChange={handleDateChange} />

                {/* Second input: Dropdown menu */}
                <MyDropdown label={'Semester'} options={['FIRST', 'SECOND', 'THIRD']} selectedOption={semester} event={handleSemesterChange}/>
                <MyDropdown label={'Tid brugt'} options={['TEN_MIN', "HALF_HOUR"]} selectedOption={duration} event={handleDurationChange}/>
                <MyDropdown label={'Klasse'} options={['Dat21a', "Dat21b"]} selectedOption={courseClassName} event={handleCourseNameChange}/>


                {/* Third input: Text input */}
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Text Input
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            type="text"
                            placeholder="Hvad var spørgsmålet eller problemmet?"
                            value={problem}
                            onChange={handleProblemChange}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Text Input
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            type="text"
                            placeholder="Hvad var svaret eller løsningen?"
                            value={solution}
                            onChange={handleSolutionChange}
                        />
                    </Col>
                </Form.Group>
                <Button
                    variant="primary"
                    type="button"
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

function createRequest(method: string, bodyValues: any): RequestInit{
    return  {
        method: method,
        headers: {
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            'Authorization': 'Bearer ' + localStorage.getItem("token"),
            'Connection': 'keep-alive',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyValues)
    }
}


export default MyForm;
