import React from "react";
import "./App.css";
const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  const Content = ({ parts }) => {
    const partsList = parts.map((part) => (
      <div className="partsList" key={part.id}>
        {part.name} {part.exercises}
      </div>
    ));
    return partsList;
  };

  const Total = ({ parts }) => {
    const total = (parts) => {
      return Array.from(parts, (value) => value.exercises).reduce(
        (previousValue, currentValue) => {
          return previousValue + currentValue;
        }
      );
    };
    return <h3>Total of {total(parts)} exercises </h3>;
  };

  const Course = ({ courses }) => {
    const courseList = courses.map((course) => (
      <div key={course.id}>
        <h2>{course.name}</h2>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ));
    return courseList;
  };

  return (
    <>
      <h1>Web development curriculum</h1>
      <Course courses={courses} />
    </>
  );
};
export default App;
