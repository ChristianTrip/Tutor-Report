import {ListGroup} from "react-bootstrap";
import {MouseEvent} from "react";
import React from "react";

interface ListProperties{
    reports: report[],
    heading: string
}
type report = {name: string, age: number};


function ReportList({reports, heading}: ListProperties){

    return (
        <>
            <h1>{heading}</h1>
            {mapper(reports)}
        </>
    )
}


function emptyList(list: report[]){
    //return list.length === 0 && <p>no items in list..</p>;
    if (list.length === 0){
        return <p>no items in list..</p>
    }
    return null;
}

function mapper(list: report[]) {
    if (list.length === 0){
        return <p>no items in list..</p>
    }
    return list.map(item =>
        (
            <ListGroup
                key={item.age}
            >
                <ListGroup.Item
                    action variant="success"
                    onClick={event => console.log(item)}
                >
                    <p>name:</p>
                    {item.name}
                    <br/>
                    <p>age:</p>
                    {item.age}
                </ListGroup.Item>
            </ListGroup>
        )
    )
}

function mapper2(list: report[]) {
    return list.map(item =>
        (
            <ul
                className="list-group"
                key={item.age}
            >
                <li
                    className="list-group-item"
                    //onClick={event => printMouseClick(event, item)}
                    onClick={handleClick}
                >
                        <p>name:</p>
                        {item.name}
                        <br/>
                        <p>age:</p>
                        {item.age}
                </li>
            </ul>
        )
    )
}

function printMouseClick(event: MouseEvent, toPrint: any){
    console.log("x:" + event.clientX);
    console.log("y:" + event.clientY);
    console.log(toPrint);
}

const handleClick = (event: MouseEvent) => console.log(event);

export default ReportList;