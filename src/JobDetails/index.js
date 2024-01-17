import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {MdBusinessCenter} from 'react-icons/md'

import './index.css'

const JobDetails = props => {
  const {jobsData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsData

  return (
    <Link className="link" to={`/jobs/${id}`}>
      <li className="list">
        <div className="employee-type-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo"
          />
          <div>
            <h1 className="heading1">{title}</h1>
            <div className="rating-container">
              <FaStar className="star-icon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-type-container">
          <div className="job-location-container">
            <IoLocationSharp className="location-icon" />
            <p>{location}</p>
            <MdBusinessCenter className="bag-icon" />
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="heading1">Description</h1>
        <p>{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobDetails
