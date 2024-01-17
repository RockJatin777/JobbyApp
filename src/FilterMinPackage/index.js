import './index.css'

const FilterMinPackage = props => {
  const {salaryRangeId, label, OnFilterPackage} = props

  const onRadioButton = () => {
    OnFilterPackage(salaryRangeId)
  }

  return (
    <li className="label-container">
      <input
        type="radio"
        value={salaryRangeId}
        name="salaryRange"
        id={salaryRangeId}
        onClick={onRadioButton}
      />
      <label className="label" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default FilterMinPackage
