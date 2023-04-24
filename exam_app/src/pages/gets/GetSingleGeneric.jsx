import React from 'react';
import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

const drawStudent = (jsl) =>{
    return (
      <article>
        <header>ID: {jsl.student_id}</header>
        <p>First Name: {jsl.first_name}</p>
        <p>Last Name: {jsl.last_name}</p>
        <p>Cohort: {jsl.cohort}</p>
        <p>Email: {jsl.email}</p>
      </article>
    )
  };

function Student() {
    const { id } = useParams();
    const [student, setstudent] = useState([]);
    
    const [grades, setgrades] = useState([]);
    
    const [modules, setmodules] = useState([]);
    const [delivered, setcohort] = useState();

    useEffect(() => {
      if (student == 0){
        fetch1();
      }
      
      if (grades == 0){
        fetch2();
      }
      
      if (modules == 0){
        fetch3();
      }
    });
    
    const drawGrades = (jsl) => {
      return (
        <article>
          <header>{jsl.id}</header>
          <p>Module: {jsl.module}</p>
          <p>Ca mark: {jsl.ca_mark}</p>
          <p>Exam mark: {jsl.exam_mark}</p>
          <p>Total Grade: {jsl.total_grade}</p>
        </article>
      )
  };

  const drawModule = (jsl) => {
    return (
      <article>
        <header>{jsl.code}</header>
        <p>Full Name: {jsl.full_name}</p>
        <p>Ca Weight: {jsl.ca_split}</p>
        <li>
              <Link to={`/students/${id}/${jsl.code}`}>Edit Grade</Link>
          </li>
      </article>
    )
  };
  

    const fetch1 = async () =>{
      const resp = await fetch(`http://127.0.0.1:8000/api/student/${id}`);
      const newdata = await resp.json();
        setstudent(newdata);
        setcohort(newdata.cohort.split("/").slice(-2, -1));
    };

    const fetch2 = async() =>{
      const resp = await fetch(`http://127.0.0.1:8000/api/grade/?student=${id}`)
      const newdata = await resp.json()
        setgrades(newdata);
    };
    
    const fetch3 = async() =>{
      if (delivered !== undefined) {
        const resp = await fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${delivered}`)
        const newdata = await resp.json();
        setmodules(newdata);
      }
    };

    const displayGrades = () => {
      return grades.map(element => <div>{drawGrades(element)}</div>);
    };
    
    const displayModules = () => {
      return modules.map(element => <div>{drawModule(element)}</div>);
    };
    

    return (
      <div>
        <hr/>
        {drawStudent(student)}
        <h1> Modules</h1>
        {displayModules(modules)}
        <h1>Grades</h1>
        {displayGrades(grades)}        
      </div>
    )
  }

export default Student