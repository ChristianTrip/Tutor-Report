import React, {CSSProperties, useState} from 'react';
import {Form, Container, Alert} from 'react-bootstrap';
import DateInput from "./form_elements/DatePicker";
import DropdownMenu from "./form_elements/Dropdown";
import {format} from "date-fns";
import Button from "react-bootstrap/Button";
import TextArea from "./form_elements/TextArea";
import {createRequestWithToken} from "./CreateRequest";
import MissingInfoAlert from "./form_elements/MissingInfoAlert";
import FormReview from "./FormReview";
import {Option, durationOptions, educationOptions, semesterOptions} from "./form_elements/DropdownOptions";

const ReportForm: React.FC = () => {

    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [problem, setProblem] = useState<string>('');
    const [solution, setSolution] = useState<string>('');
    const [duration, setDuration] = useState<Option | null>(null);
    const [semester, setSemester] = useState<Option | null>(null);
    const [education, setEducation] = useState<Option | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);


    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };
    const handleSemesterChange = (eventKey: string | null) => {
        const selectedOption = semesterOptions.find(option => option.display === eventKey);
        setSemester(selectedOption ? selectedOption : null);
    };

    const handleDurationChange = (eventKey: string | null) => {
        const selectedOption = durationOptions.find(option => option.display === eventKey);
        setDuration(selectedOption ? selectedOption : null);
    };

    const handleEducationChange = (eventKey: string | null) => {
        const selectedOption = educationOptions.find(option => option.display === eventKey);
        setEducation(selectedOption ? selectedOption : null);
    };

    const handleProblemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProblem(event.target.value);
    };

    const handleSolutionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSolution(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedDate || !semester || !duration || !education || !problem || !solution) {
            setShowAlert(true);
            return;
        }
        setShowConfirmation(true);
    };

    const handleConfirmation = (confirmed: boolean) => {
        setShowConfirmation(false);

        if (confirmed){
            sendRequest().then();
        }
    };

    const sendRequest = async () => {
        const url: string = 'http://localhost:8080/reports/add/' + localStorage.getItem("email");
        const endpoint: string = 'api/reports/add/' + localStorage.getItem("email");

        const date = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';

        let durationValue;
        if (duration){
            durationValue = duration.value;
        }
        let semesterValue;
        if (semester){
            semesterValue = semester.value;
        }
        let educationValue;
        if (education){
            educationValue = education.value;
        }
        const reportRequest = createRequestWithToken(
            'POST',
            {
                problem: problem + "\n",
                solution: solution + "\n",
                duration: durationValue,
                semester: semesterValue,
                education: educationValue,
                date: date
            }
        )
        try {
            const response = await fetch(url, reportRequest);

            console.log(reportRequest);
            if (response.ok) {
                setShowSuccessAlert(true);
                setTimeout(() => {
                    setShowSuccessAlert(false);
                }, 3000);
                console.log('Report got send');

            } else {
                console.error('Report failed');
            }
        } catch (error) {
            console.log(reportRequest.body);
            console.error('Error during report creation:', error);
        }
        setShowAlert(false);
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
                {showSuccessAlert && (
                    <Alert variant="success" className="mt-3">
                        Rapporten blev sendt succesfuldt!
                    </Alert>
                )}
                <DateInput
                    key={"Dato"}
                    label="Dato"
                    selectedDate={selectedDate}
                    onDateChange={handleDateChange}
                />
                <DropdownMenu
                    key={"Semester"}
                    label='Semester'
                    options={semesterOptions}
                    selectedOption={semester}
                    event={handleSemesterChange}
                    style={boxStyle}
                />
                <DropdownMenu
                    key={"Varighed"}
                    label='Varighed'
                    options={durationOptions}
                    selectedOption={duration}
                    event={handleDurationChange}
                    style={boxStyle}
                />
                <DropdownMenu
                    key={"Uddannelse"}
                    label='Uddannelse'
                    options={educationOptions}
                    selectedOption={education}
                    event={handleEducationChange}
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

            {showConfirmation && (
                <FormReview
                    selectedDate={selectedDate}
                    semester={semester}
                    duration={duration}
                    education={education}
                    problem={problem}
                    solution={solution}
                    onCancel={() => setShowConfirmation(false)}
                    onConfirm={async () => {
                        setShowConfirmation(false);
                        await sendRequest();
                    }}
                />
            )}

        </Container>
    );
};

const boxStyle: CSSProperties = {width: '150px', color: 'white', background: 'gray', border: '1px solid black'};




export default ReportForm;
