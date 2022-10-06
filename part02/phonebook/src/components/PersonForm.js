import { useState } from "react";
import personService from "../services/person";

const PersonForm = ({ persons, setPersons, setMessage }) => {
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const addPhone = (event) => {
    event.preventDefault();

    const person = persons.find((person) => person.name === newPerson.name);
    if (!person) {
      //create
      personService
        .create(newPerson)
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
          console.log(reason.response.data);
          setMessage({
            type: "error",
            content: `call create service exception: ${
              reason.response.data.error || reason
            }`,
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
            content: `call update service exception: ${
              reason.response.data.error || reason
            }`,
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

export default PersonForm;
