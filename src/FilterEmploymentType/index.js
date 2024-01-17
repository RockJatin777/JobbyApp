import './index.css'

const FilterEmploymentType = props => {
  const {employmentTypeId, label, onFiltering} = props

  const onClickCheckBox = () => {
    onFiltering(employmentTypeId)
  }

  return (
    <li className="label-container">
      <input
        value={employmentTypeId}
        type="checkbox"
        id={employmentTypeId}
        onChange={onClickCheckBox}
      />
      <label className="label" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default FilterEmploymentType
