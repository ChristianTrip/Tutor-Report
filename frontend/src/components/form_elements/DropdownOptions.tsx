export const semesterOptions: Option[] = [
    { display: '1. semester', value: 'FIRST' },
    { display: '2. semester', value: 'SECOND' },
    { display: '3. semester', value: 'THIRD' },
    { display: '4. semester', value: 'FOURTH' },
    { display: '5. semester', value: 'FIFTH' },
];

export const durationOptions: Option[] = [
    { display: '5 minuter', value: 'FIVE_MIN' },
    { display: '10 minuter', value: 'TEN_MIN' },
    { display: '20 minuter', value: 'TWENTY_MIN' },
    { display: '30 minuter', value: 'HALF_HOUR' },
    { display: '40 minuter', value: 'FORTY_MIN' },
    { display: '50 minuter', value: 'FIFTY_MIN' },
    { display: '1 time', value: 'HOUR' },
    { display: 'Over 1 time', value: 'OVER_AN_HOUR' }
];

export const educationOptions: Option[] = [
    { display: 'Datamatiker', value: 'DAT' },
    { display: 'IT-Arkitektur', value: 'ITA' }
];

export type Option = {
    display: string;
    value: string;
}