import React from 'react';
import { Card } from 'react-bootstrap';
import { format } from 'date-fns';

interface ReportCardProps {
    report: Report;
    showDate: boolean;
}

interface Report {
    date: Date;
    semester: string;
    education: string;
    duration: string;
    problem: string;
    solution: string;
    [key: string]: Date | string;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, showDate }) => {
    const {
        date,
        semester,
        education,
        duration,
        problem,
        solution,
    } = report;

    const cardTextStyle: React.CSSProperties = {
        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
        fontSize: '16px', // Set the font size to match Bootstrap's default
        // Other styles...
    };

    return (
        <Card style={{ width: 'auto', margin: '10px' }}>
            <Card.Body>
                <Card.Title>Report detaljer</Card.Title>
                {showDate ? <Card.Subtitle className="mb-2 text-muted">
                    Date: {format(date, 'dd-MM-yyyy')}
                </Card.Subtitle> : null
                }
                <Card.Text>
                    <strong>Semester:</strong> {semester}
                </Card.Text>
                <Card.Text>
                    <strong>Uddannelse:</strong> {education}
                </Card.Text>
                <Card.Text>
                    <strong>Varighed:</strong> {duration}
                </Card.Text>
                <Card.Text style={cardTextStyle}>
                    <strong>Problem:</strong>{' '}
                    <pre style={{ whiteSpace: 'pre-wrap', ...cardTextStyle }}>{problem}</pre>
                </Card.Text>
                <Card.Text style={cardTextStyle}>
                    <strong>Solution:</strong>{' '}
                    <pre style={{ whiteSpace: 'pre-wrap', ...cardTextStyle }}>{solution}</pre>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ReportCard;
