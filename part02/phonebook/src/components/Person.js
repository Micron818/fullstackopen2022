import personService from "../services/person";

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
  
  export default Persons;