import {Button, Container, Form, ListGroup} from "react-bootstrap";
import React, {MouseEvent, useEffect, useState} from "react";
import {createGetRequestWithToken} from "./CreateRequest";
import DateInput, {DateSpanInput} from "./form_elements/DatePicker";
import ReportCard from "./form_elements/ReportCard";
import {durationOptions, educationOptions, semesterOptions} from "./form_elements/DropdownOptions";


interface Report {
    date: Date;
    semester: string;
    education: string;
    duration: string;
    problem: string;
    solution: string;
    [key: string]: Date | string;
}


function ReportList(){
    const [reports, setReports] = useState<Report[]>([]);
    const [sortAttribute, setSortAttribute] = useState<string>('date');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);
    const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);    const [filterSemester, setFilterSemester] = useState<string>('');
    //const [filterDuration, setFilterDuration] = useState<string>('');
    const [filterEducation, setFilterEducation] = useState<string>('');


    useEffect(() => {
        const fetchData = async () => {
            const url: string = 'http://localhost:8080/reports/';
            const reportListRequest = createGetRequestWithToken();

            try {
                const response = await fetch(url, reportListRequest);

                if (response.ok) {
                    const data = await response.json();
                    const reportsWithDateAsDate = data.map((report: Report) => ({
                        ...report,
                        date: new Date(new Intl.DateTimeFormat('en-US').format(new Date(report.date)))
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
            const startDateMatch = !filterStartDate || report.date >= filterStartDate;
            const endDateMatch = !filterEndDate || report.date <= filterEndDate;
            const semesterMatch = report.semester.includes(filterSemester);
            //const durationMatch = report.duration.includes(filterDuration);
            const educationMatch = report.education.includes(filterEducation); // Updated field name


            return startDateMatch && endDateMatch && semesterMatch && educationMatch;
        });
    };

    const sortedAndFilteredReports: Report[] = handleFilter().sort((a, b) => {
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
                <Button variant="link" onClick={() => handleSort('education')}>
                    Uddannelse
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
                        <option key={index} value={semester.display}>
                            {semester.display}
                        </option>
                    ))}
                </Form.Control>
                <br/>
                <Form.Control
                    as="select"
                    value={filterEducation}
                    onChange={(e) => setFilterEducation(e.target.value)}
                >
                    <option value="">Vælg uddannelse</option>
                    {educationOptions.map((education, index) => (
                        <option key={index} value={education.display}>
                            {education.display}
                        </option>
                    ))}
                </Form.Control>
                <br/>
            </div>
            <div className="mb-2">
                <strong>Antal rapporter: </strong>
                <span>{sortedAndFilteredReports.length}</span>
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
                <ReportCard report={report} showDate={false} />
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