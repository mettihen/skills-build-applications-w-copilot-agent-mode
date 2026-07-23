import ResourceTable from './ResourceTable.jsx'

const columns = [
  { key: 'name', label: 'Name', render: (user) => user.name },
  { key: 'username', label: 'Username', render: (user) => user.username },
  { key: 'email', label: 'Email', render: (user) => user.email },
  { key: 'team', label: 'Team', render: (user) => user.team },
]

function Users({ endpoint }) {
  return (
    <ResourceTable
      title="Users"
      description="Athlete profiles connected to activity and team data."
      endpoint={endpoint}
      columns={columns}
    />
  )
}

export default Users