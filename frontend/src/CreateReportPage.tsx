// src/components/CreateReportPage.tsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

const CreateReportPage: React.FC = () => {

    function createRequest(method: string, bodyValues: any): RequestInit{
        return  {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify(bodyValues)
        }
    }



    const [problem, setProblem] = useState<string>('');
    const [solution, setSolution] = useState<string>('');
    const [duration, setDuration] = useState<string>('');
    const [semester, setSemester] = useState<string>('');
    const [courseClassName, setCourseClassName] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);



    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const endpoint: string = 'api/reports/add/' + localStorage.getItem("email");
        console.log(endpoint);

        const date = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';

        const reportRequest = createRequest(
            'POST',
            {problem, solution, duration, semester, courseClassName, date}
        )

        try {
            const response = await fetch(endpoint, reportRequest);
            console.log(JSON.stringify({problem, solution, duration, semester, courseClassName, date}))

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                console.log('It updated, so i dont have to redeploy each time!!');


            } else {
                // Handle login failure
                console.error('Report failed');
            }
        } catch (error) {
            console.error('Error during report creation:', error);
        }
    };



    return (
        <div className="container mt-5">
            <h2>Create Report</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="datePicker" className="form-label">Select Date:</label>
                    <DatePicker
                        id="datePicker"
                        className="form-control"
                        selected={selectedDate}
                        onChange={(date: Date | null) => setSelectedDate(date)}
                        dateFormat="dd/MM/yyyy" // Adjust the date format as needed
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="problem" className="form-label">Problem:</label>
                    <input
                        type="text"
                        id="problem"
                        className="form-control"
                        value={problem}
                        placeholder="What was the problem.."
                        onChange={(e) => setProblem(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="solution" className="form-label">Solution:</label>
                    <input
                        type="text"
                        id="solution"
                        className="form-control"
                        value={solution}
                        placeholder="What was the solution.."
                        onChange={(e) => setSolution(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Duration:</label>
                    <input
                        type="text"
                        id="duration"
                        className="form-control"
                        value={duration}
                        placeholder="How long did it take.."
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="semester" className="form-label">Semester:</label>
                    <input
                        type="text"
                        id="semester"
                        className="form-control"
                        value={semester}
                        placeholder="What was the semester.."
                        onChange={(e) => setSemester(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="courseClass" className="form-label">Class:</label>
                    <input
                        type="text"
                        id="courseClass"
                        className="form-control"
                        value={courseClassName}
                        placeholder="What was the courseClass.."
                        onChange={(e) => setCourseClassName(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>add report</button>
                </div>
            </form>
        </div>
    );
};

export default CreateReportPage;
