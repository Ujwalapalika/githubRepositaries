import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]
const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class GithubPopularRepos extends Component {
  state = {
    activeId: languageFiltersData[0].id,
    repos: [],
    activeApiStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getRepositories()
  }

  updateActiveId = id => {
    console.log(id)
    this.setState({activeId: id}, this.getRepositories)
  }

  getRepositories = async () => {
    const {activeId} = this.state
    this.setState({activeApiStatus: apiStatus.inProgress})
    const options = {
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.map(repo => ({
        name: repo.name,
        id: repo.id,
        issuesCount: repo.issues_count,
        forksCount: repo.forks_count,
        starsCount: repo.starts_count,
        avatarUrl: repo.avatar_url,
      }))
      this.setState({
        repos: formattedData,
        activeApiStatus: apiStatus.success,
      })
    } else if (response.ok === 401) {
      this.setState({activeApiStatus: apiStatus.failure})
    }
  }

  renderSuccess = () => {
    const {repos} = this.state
    return (
      <div>
        {repos.map(repoItem => (
          <RepositoryItem key={repoItem} reposItems={repoItem} />
        ))}
      </div>
    )
  }

  renderFailure = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
      alt="api_failure"
    />
  )

  renderInProgress = () => (
    <div>
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderApi = () => {
    const {activeApiStatus} = this.state
    switch (activeApiStatus) {
      case apiStatus.success:
        return this.renderSuccess()
      case apiStatus.failure:
        return this.renderFailure()
      case apiStatus.inProgress:
        return this.renderInProgress()
      default:
        return null
    }
  }

  render() {
    const {activeId} = this.state
    return (
      <div>
        {languageFiltersData.map(eachlanguage => (
          <LanguageFilterItem
            key={eachlanguage.id}
            languages={eachlanguage}
            isActive={activeId === eachlanguage.id}
            updateActiveId={this.updateActiveId}
          />
        ))}
        {this.renderApi()}
      </div>
    )
  }
}

export default GithubPopularRepos
