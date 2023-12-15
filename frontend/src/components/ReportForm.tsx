import React, {CSSProperties, useState} from 'react';
import {Form, Row, Col, Container, Alert, Modal} from 'react-bootstrap';
import DateInput from "./form_elements/DatePicker";
import DropdownMenu from "./form_elements/Dropdown";
import {format} from "date-fns";
import Button from "react-bootstrap/Button";
import TextArea from "./form_elements/TextArea";
import {createRequestWithToken} from "./CreateRequest";
import MissingInfoAlert from "./form_elements/MissingInfoAlert";

// Register the Danish locale


const semesterOptions = [
    { display: '1. semester', value: 'FIRST' },
    { display: '2. semester', value: 'SECOND' },
    { display: '3. semester', value: 'THIRD' },
    { display: '4. semester', value: 'FOURTH' },
    { display: '5. semester', value: 'FIFTH' },
];

const durationOptions = [
    { display: '5 min', value: 'FIVE_MIN' },
    { display: '10 min', value: 'TEN_MIN' },
    { display: '20 min', value: 'TWENTY_MIN' },
    { display: '30 min', value: 'HALF_HOUR' },
    { display: '40 min', value: 'FORTY_MIN' },
    { display: '50 min', value: 'FIFTY_MIN' },
    { display: '1 time', value: 'HOUR' },
    { display: 'Over 1 time', value: 'OVER_AN_HOUR' }
    // Add more options as needed
];

// Create the MyForm component
const MyForm: React.FC = () => {



    // useState is a hook, and returns an array.
    // first thing in the array is the current state, the second is the function that updates the state.
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const [problem, setProblem] = useState<string>('');
    const [solution, setSolution] = useState<string>('');
    const [duration, setDuration] = useState<string | null>(null);
    const [semester, setSemester] = useState<string | null>(null);
    const [courseClassName, setCourseClassName] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };
    const handleSemesterChange = (eventKey: string | null) => {
        setSemester(eventKey);
    };
    const handleDurationChange = (eventKey: string | null) => {
        setDuration(eventKey);
    };
    const handleCourseNameChange = (eventKey: string | null) => {
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
        if (!selectedDate || !semester || !duration || !courseClassName || !problem || !solution) {
            setShowAlert(true);
            return;
        }

        //const isConfirmed = window.confirm('Er du sikker på at du vil indsende rapporten?');
        setShowConfirmation(true);
    };

    const handleConfirmation = (confirmed: boolean) => {
        // Close the confirmation modal
        setShowConfirmation(false);

        if (confirmed){
            sendRequest().then();

        }
    };

    const sendRequest = async () => {
        const url: string = 'http://localhost:8080/reports/add/' + localStorage.getItem("email");
        const endpoint: string = 'api/reports/add/' + localStorage.getItem("email");

        const date = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';

        const reportRequest = createRequestWithToken(
            'POST',
            {problem, solution, duration, semester, courseClassName, date}
        )

        try {
            const response = await fetch(url, reportRequest);

            if (response.ok) {
                console.log('Report got send');
            } else {
                console.error('Report failed');
            }
        } catch (error) {
            console.log(reportRequest.body);
            console.error('Error during report creation:', error);
        }
        setShowAlert(false);
        console.log('Form submitted successfully!');
    }


    return (
        <Container className="mt-5">
            <Form style={{ maxWidth: '700px', margin: 'auto', padding: '20px' }}>
                {
                    showAlert && (
                    <MissingInfoAlert
                        errorMessage={"Emner mangler at blive udfyldt"}
                        answer={"Alle informationer er vigtige :)"}
                        onClose={() => setShowAlert(false)}
                    />
                    )
                }
                <DateInput
                    key={"Dato"}
                    label="Dato"
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                />
                <DropdownMenu
                    key={"Semester"}
                    label='Semester'
                    options={semesterOptions.map(option => option.display)}
                    selectedOption={semester}
                    event={handleSemesterChange}
                    style={boxStyle}
                />
                <DropdownMenu
                    key={"Varighed"}
                    label='Varighed'
                    options={durationOptions.map(option => option.display)}
                    selectedOption={duration}
                    event={handleDurationChange}
                    style={boxStyle}
                />
                <DropdownMenu
                    key={"Klasse"}
                    label='Klasse'
                    options={['Dat21a', "Dat21b"]}
                    selectedOption={courseClassName}
                    event={handleCourseNameChange}
                    style={boxStyle}
                />
                <TextArea
                    key={"Problem"}
                    label="Problem"
                    value={problem}
                    placeholder="Hvad handlede henvendelsen om?"
                    handleTextChange={handleProblemChange}
                    width={2}
                    height={10}
                />
                <TextArea
                    key={"Løsning"}
                    label="Løsning"
                    value={solution}
                    placeholder="Hvad var løsningen?"
                    handleTextChange={handleSolutionChange}
                    width={2}
                    height={8}
                />
                <Button
                    key={"Indsend"}
                    style={boxStyle}
                    variant="primary"
                    type="button"
                    onClick={handleSubmit}
                >
                    Indsend rapport
                </Button>
            </Form>

            <Modal show={showConfirmation} onHide={() => handleConfirmation(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Indsend Rapport</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Er du sikker på at du vil indsende rapporten?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleConfirmation(false)}>
                        Annuller
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmation(true)}>
                        Indsend
                    </Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};

const boxStyle: CSSProperties = {width: '150px', color: 'white', background: 'gray', border: '1px solid black'};




export default MyForm;
