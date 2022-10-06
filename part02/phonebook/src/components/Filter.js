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
  
export default Filter;  