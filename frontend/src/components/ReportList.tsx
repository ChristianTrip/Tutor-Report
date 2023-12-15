import {Button, Container, Form, ListGroup} from "react-bootstrap";
import React, {MouseEvent, useEffect, useState} from "react";
import {createGetRequestWithToken} from "./CreateRequest";
import DateInput, {DateSpanInput} from "./form_elements/DatePicker";


interface Report {
    date: Date;
    semester: string;
    duration: string;
    problem: string;
    solution: string;
    [key: string]: Date | string;
}


const semesterOptions = ['1. semester', '2. semester', '3. semester', '4. semester', '5. semester'];
const durationOptions = ['5 min', '10 min', '20 min', '30 min', '40 min', '50 min', '1 time', 'Over 1 time'];

function ReportList(){
    const [reports, setReports] = useState<Report[]>([]);
    const [sortAttribute, setSortAttribute] = useState<string>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
    const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);    const [filterSemester, setFilterSemester] = useState<string>('');
    const [filterDuration, setFilterDuration] = useState<string>('');

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchData = async () => {
            const url: string = 'http://localhost:8080/reports/';
            const endpoint: string = 'api/reports/add/' + localStorage.getItem("email");

            const reportListRequest = createGetRequestWithToken();

            try {
                const response = await fetch(url, reportListRequest);

                if (response.ok) {
                    const data = await response.json();
                    const reportsWithDateAsDate = data.map((report: Report) => ({
                        ...report,
                        date: new Date(report.date),
                    }));
                    setReports(reportsWithDateAsDate);
                } else {
                    console.error('Report failed');
                }
            } catch (error) {
                console.error('Error during report creation:', error);
            }
            console.log('Form submitted successfully!');
        }

        fetchData();
    }, []);


    const handleSort = (attribute: string) => {
        if (attribute === sortAttribute) {
            // Toggle sort order if clicking on the same attribute
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new attribute and default to ascending order
            setSortAttribute(attribute);
            setSortOrder('asc');
        }
    };


    const handleDateFilterChange = (startDate: Date | null, endDate: Date | null) => {
        setFilterStartDate(startDate);
        setFilterEndDate(endDate);
    };

    const handleFilter = () => {
        return reports.filter(report => {
            console.log("report.date: " + report.date);
            console.log("filterStartDate: " + filterStartDate);
            console.log("filterEndDate: " + filterEndDate);
            const startDateMatch = !filterStartDate || report.date >= filterStartDate;
            const endDateMatch = !filterEndDate || report.date <= filterEndDate;
            const semesterMatch = report.semester.includes(filterSemester);
            const durationMatch = report.duration.includes(filterDuration);

            return startDateMatch && endDateMatch && semesterMatch && durationMatch;
        });
    };

    const sortedAndFilteredReports = handleFilter().sort((a, b) => {
        const aValue = a[sortAttribute];
        const bValue = b[sortAttribute];

        if (sortOrder === 'asc') {
            return aValue.toString().localeCompare(bValue.toString());
        } else {
            return bValue.toString().localeCompare(aValue.toString());
        }
    });



    return (
        <Container className="mt-4">
            <h1 className="mb-4">Rapporter</h1>
            <div className="mb-2">
                <strong>Sortere efter:</strong>{' '}
                <Button variant="link" onClick={() => handleSort('date')}>
                    Dato
                </Button>
                <Button variant="link" onClick={() => handleSort('semester')}>
                    Semester
                </Button>
                <Button variant="link" onClick={() => handleSort('duration')}>
                    Varighed
                </Button>
            </div>
            <div className="mb-2">
                <strong>Filtrere ud fra:</strong>{' '}
                <DateSpanInput
                    label="dato"
                    startDate={filterStartDate}
                    endDate={filterEndDate}
                    onDateChange={handleDateFilterChange}
                />
                <br/>
                <Form.Control
                    as="select"
                    value={filterSemester}
                    onChange={(e) => setFilterSemester(e.target.value)}
                >
                    <option value="">Vælg semester</option>
                    {semesterOptions.map((semester, index) => (
                        <option key={index} value={semester}>
                            {semester}
                        </option>
                    ))}
                </Form.Control>
                <br/>
                <Form.Control
                    as="select"
                    value={filterDuration}
                    onChange={(e) => setFilterDuration(e.target.value)}
                >
                    <option value="">Vælg varighed</option>
                    {durationOptions.map((duration, index) => (
                        <option key={index} value={duration}>
                            {duration}
                        </option>
                    ))}
                </Form.Control>
                <br/>
            </div>
            <ListGroup>
                {reportMapper(sortedAndFilteredReports)}
            </ListGroup>
        </Container>
    );

}


function emptyList(list: Report[]) {
    //return list.length === 0 && <p>no items in list..</p>;
    if (list.length === 0) {
        return <p>no items in list..</p>
    }
    return null;
}

function reportMapper(list: Report[]) {
    if (list.length === 0) {
        return <p>no reports in list..</p>
    }
    return <ListGroup>
        {list.map((report, index) => (
            <ListGroup.Item key={index}>
                <strong>Uddannelse:</strong> {report.semester} <br/>
                <strong>Semester:</strong> {report.semester} <br/>
                <strong>Varighed:</strong> {report.duration} <br/>
                <strong>Problem:</strong> {report.problem.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                    {line}
                    <br/>
                </React.Fragment>
            ))}
                <br/>
                <strong>Løsning:</strong> {report.solution.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
                <br />
            </ListGroup.Item>
        ))}
    </ListGroup>

}


function printMouseClick(event: MouseEvent, toPrint: any){
    console.log("x:" + event.clientX);
    console.log("y:" + event.clientY);
    console.log(toPrint);
}

const handleClick = (event: MouseEvent) => console.log(event);

export default ReportList;