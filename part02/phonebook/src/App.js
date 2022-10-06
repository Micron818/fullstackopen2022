import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import Persons from "./components/Person";
import PersonForm from "./components/PersonForm";
import personService from "./services/person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState();

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter setFilterName={setFilterName} />

      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setMessage={setMessage}
      />

      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        filterName={filterName}
        setMessage={setMessage}
      />
    </div>
  );
};

export default App;
