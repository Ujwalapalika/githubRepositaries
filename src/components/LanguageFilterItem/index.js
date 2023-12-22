// Write your code here
const LanguageFilterItem = props => {
  const {languages, updateActiveId} = props
  const {id, language} = languages
  const SelectRepo = () => {
    console.log(id)
    updateActiveId(id)
  }
  return (
    <div>
      <button type="button" onClick={SelectRepo()}>
        {language}
      </button>
    </div>
  )
}
export default LanguageFilterItem
