const Filter = ({newFilter, setNewFilter}) => {
  return(
    <form>
      <div>
        filter shown with
        <input
        value={newFilter}
        onChange={event => setNewFilter(event.target.value)}/>
      </div>
    </form>
  )
}

export default Filter