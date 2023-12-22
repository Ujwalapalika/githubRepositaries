const RepositoryItem = props => {
  const {reposItems} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = reposItems
  return (
    <div>
      <p>{name}</p>
      <p>{issuesCount}</p>
      <p>{forksCount}</p>
      <p>{starsCount}</p>
      <img src={avatarUrl} alt={name} />
    </div>
  )
}
export default RepositoryItem
