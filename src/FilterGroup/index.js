import FilterEmploymentType from '../FilterEmploymentType'
import FilterMinPackage from '../FilterMinPackage'
import './index.css'

const FilterGroup = props => {
  const {
    employTypeList,
    salaryRangeList,
    filteringPackage,
    filteringEmployeeType,
  } = props

  const OnFilterPackage = salaryRangeId => {
    filteringPackage(salaryRangeId)
  }

  const OnFilterEmployeeType = employmentTypeId => {
    filteringEmployeeType(employmentTypeId)
  }

  return (
    <div className="filter-group-container">
      <hr className="line" />
      <h1 className="heading1">Type of Employment</h1>
      <ul className="employee-container">
        {employTypeList.map(each => (
          <FilterEmploymentType
            key={each.employmentTypeId}
            employmentTypeId={each.employmentTypeId}
            label={each.label}
            onFiltering={OnFilterEmployeeType}
          />
        ))}
      </ul>
      <hr className="line" />
      <h1 className="heading1">Salary Range</h1>
      <ul className="employee-container">
        {salaryRangeList.map(each => (
          <FilterMinPackage
            key={each.salaryRangeId}
            salaryRangeId={each.salaryRangeId}
            label={each.label}
            OnFilterPackage={OnFilterPackage}
          />
        ))}
      </ul>
    </div>
  )
}

export default FilterGroup
