import { useEffect, useState } from "react";
import Notification from "./components/Notification";
import personService from "./services/person";

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

const PersonForm = ({ persons, setPersons, setMessage }) => {
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const addPhone = (event) => {
    event.preventDefault();

    const person = persons.find((person) => person.name === newPerson.name);
    if (!person) {
      //create new id
      const id = Math.max(...persons.map((person) => person.id), 0) + 1;
      personService
        .create({
          ...newPerson,
          id: id,
        })
        .then((returnPerson) => {
          setPersons([...persons, returnPerson]);
          setNewPerson({ name: "", number: "" });
          setMessage({
            type: "success",
            content: `Added ${returnPerson.name}`,
          });
          setTimeout(() => setMessage(null), 5000);
        })
        .catch((reason) => {
          setMessage({
            type: "error",
            content: `call create service exception: ${reason}`,
          });
          setTimeout(() => setMessage(null), 5000);
        });
      return;
    }

    if (
      window.confirm(
        `${newPerson.name} is already added to phonebook,replace the old number with a new one?`
      )
    ) {
      //update
      personService
        .update(person.id, {
          ...person,
          number: newPerson.number,
        })
        .then((returnPerson) => {
          setPersons(
            persons.map((person) =>
              person.name !== returnPerson.name ? person : returnPerson
            )
          );
          setMessage({
            type: "success",
            content: `Updated ${person.name} number: ${person.number} to ${returnPerson.number}`,
          });
          setTimeout(() => setMessage(null), 5000);
        })
        .catch((reason) => {
          setMessage({
            type: "error",
            content: `call update service exception: ${reason}`,
          });
          setTimeout(() => setMessage(null), 5000);
        });
    }
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

const Persons = ({ persons, setPersons, filterName, setMessage }) => {
  const filteredPersons = persons.filter((person) =>
    person.name.toUpperCase().includes(filterName.toUpperCase())
  );

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      //delete
      personService
        .drop(person.id)
        .then(() => {
          setPersons(persons.filter((value) => value.id !== person.id));
          setMessage({ type: "success", content: `Deleted ${person.name}!` });
          setTimeout(() => setMessage(null), 5000);
        })
        .catch((reason) => {
          setMessage({
            type: "error",
            content: `call Delete service exception: ${reason}`,
          });
          setTimeout(() => setMessage(null), 5000);
        });
    }
  };

  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person)}>delete</button>
        </div>
      ))}
    </>
  );
};

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
