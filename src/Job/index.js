import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {MdBusinessCenter} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Job extends Component {
  state = {
    jobData: {},
    similarJobData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const jobDetails = fetchedData.job_details
      console.log(fetchedData)
      const updatedData = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: jobDetails.life_at_company,
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills,
        title: jobDetails.title,
      }

      const similarJobs = fetchedData.similar_jobs
      const updatedSimilarProductsData = similarJobs.map(
        eachSimilarProduct => ({
          companyLogoUrl: eachSimilarProduct.company_logo_url,
          employmentType: eachSimilarProduct.employment_type,
          id: eachSimilarProduct.id,
          jobDescription: eachSimilarProduct.job_description,
          location: eachSimilarProduct.location,
          packagePerAnnum: eachSimilarProduct.package_per_annum,
          rating: eachSimilarProduct.rating,
          title: eachSimilarProduct.title,
        }),
      )
      this.setState({
        jobData: updatedData,
        similarJobData: updatedSimilarProductsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetry = () => {
    this.getJobData()
  }

  renderJobView = () => {
    const {jobData, similarJobData} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      skills,
      lifeAtCompany,
      companyWebsiteUrl,
    } = jobData

    return (
      <div className="container">
        <div className="specific-job-container">
          <div className="employee-type-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div>
              <h1>{title}</h1>
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
          <div className="visit-container">
            <h1>Description</h1>
            <a href={companyWebsiteUrl}>Visit</a>
          </div>
          <p>{jobDescription}</p>
          <h1>Skills</h1>
          <ul className="skills-list-container">
            {skills.map(each => (
              <li className="skills-list" key={each.id}>
                <img
                  src={each.image_url}
                  alt={each.name}
                  className="skills-image"
                />
                <p>{each.name}</p>
              </li>
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div className="employee-type-container">
            <p>{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.image_url}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <ul className="similar-job-container">
          {similarJobData.map(each => (
            <li className="similar-list" key={each.id}>
              <div className="employee-type-container">
                <img
                  src={each.companyLogoUrl}
                  alt="similar job company logo"
                  className="company-logo"
                />
                <div>
                  <h1 className="heading1">{each.title}</h1>
                  <div className="rating-container">
                    <FaStar className="star-icon" />
                    <p>{each.rating}</p>
                  </div>
                </div>
              </div>
              <h1>Description</h1>
              <p>{each.jobDescription}</p>
              <div className="job-location-container">
                <IoLocationSharp className="location-icon" />
                <p>{each.location}</p>
                <MdBusinessCenter className="bag-icon" />
                <p>{each.employmentType}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderResultView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Navbar />
        {this.renderResultView()}
      </>
    )
  }
}

export default Job
