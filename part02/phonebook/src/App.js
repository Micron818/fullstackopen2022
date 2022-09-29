import { useEffect, useState } from "react";
import axios from "axios";

const Filter = ({ setFilterName }) => {
  const handleFilter = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <div>
      filter shown with:
      <input onChange={handleFilter} />
    </div>
  );
};

const Person = ({ person }) => {
  return (
    <li>
      {person.name} {person.number}
    </li>
  );
};

const PersonForm = ({ persons, setPersons }) => {
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const addPhone = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }
    const newPersons = persons.concat({
      name: newPerson.name,
      number: newPerson.number,
      id: persons.length + 1,
    });
    setPersons(newPersons);
    setNewPerson({ name: "", number: "" });
  };

  return (
    <form onSubmit={addPhone}>
      <div>
        name:
        <input
          value={newPerson.name}
          onChange={(event) =>
            setNewPerson({ ...newPerson, name: event.target.value })
          }
        />
      </div>

      <div>
        number:
        <input
          value={newPerson.number}
          onChange={(event) =>
            setNewPerson({ ...newPerson, number: event.target.value })
          }
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, filterName }) => {
  const showPersons = persons.filter((person) =>
    person.name.toUpperCase().includes(filterName.toUpperCase())
  );

  return (
    <ul style={{ paddingLeft: 0 }}>
      {showPersons.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilterName={setFilterName} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} />
    </div>
  );
};

export default App;
