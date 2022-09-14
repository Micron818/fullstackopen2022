import React from "react";
const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  const Header = ({ course }) => <h1>{course}</h1>;

  const Content = ({ parts }) => {
    const partsList = parts.map((part) => (
      <p key={part.name}>
        {part.name}
        {part.exercises}
      </p>
    ));
    return partsList;
  };

  const summaryExercises = (parts) => {
    /**use array.foreach() */
    // let total = 0;
    // parts.forEach((currentValue) => {
    //   total += currentValue.exercises;
    // });
    // return total;

    /**use array.from() and reduce() */
    return Array.from(parts, (value) => value.exercises).reduce(
      (previousValue, currentValue) => {
        return previousValue + currentValue;
      }
    );
  };

  const Total = ({ parts }) => (
    <p>Number of exercises {summaryExercises(parts)}</p>
  );

  return (
    <>
      <div>
        <Header course={course} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
    </>
  );
};

export default App;
