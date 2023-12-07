import React from 'react';
import Button from 'react-bootstrap/Button';

interface Props {
    name: string;
    age: number;
    onClick: () => void;
}
const MyComponent: React.FC<Props> = ({ name, age, onClick }) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>Age: {age}</p>
            <Button variant="primary" onClick={onClick}>Click me!</Button>{' '}
        </div>
    );
};

MyComponent.defaultProps = {
    name: 'John',
    age: 25,
    onClick: () => {console.log("click!")},
};

export default MyComponent;