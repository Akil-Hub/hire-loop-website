// app/admin/users/_components/UsersTable.jsx
import UserRowActions from "@/app/dashboard/admin/users/UserRowActions"
import { Table } from "@heroui/react"

const RoleBadge = ({ role }) => {
  const isRecruiter = role === "recruiter"
  return (
    <span
      className={`rounded-md px-2.5 py-1 text-xs capitalize ${
        isRecruiter
          ? "bg-white text-black"
          : "border border-[#2a2a2a] text-neutral-300"
      }`}
    >
      {role}
    </span>
  )
}

const StatusBadge = ({ banned }) => (
  <span className="flex items-center gap-1.5 text-xs">
    <span
      className={`h-1.5 w-1.5 rounded-full ${
        banned ? "bg-red-500" : "bg-green-500"
      }`}
    />
    <span className={banned ? "text-red-500" : "text-green-500"}>
      {banned ? "Suspended" : "Active"}
    </span>
  </span>
)

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })

const UsersTable = ({ users }) => (
  <Table>
    <Table.ScrollContainer>
      <Table.Content aria-label="Users table">
        <Table.Header>
          <Table.Column isRowHeader>User Name</Table.Column>
          <Table.Column>Email Address</Table.Column>
          <Table.Column>Role</Table.Column>
          <Table.Column>Join Date</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>
            <span className="block text-right">Actions</span>
          </Table.Column>
        </Table.Header>
        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a1a1a] text-xs font-medium text-white">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </span>
                  <span className="text-white">{user.name}</span>
                </div>
              </Table.Cell>
              <Table.Cell>
                <span className="text-neutral-400">{user.email}</span>
              </Table.Cell>
              <Table.Cell>
                <RoleBadge role={user.role} />
              </Table.Cell>
              <Table.Cell>
                <span className="text-neutral-400">
                  {formatDate(user.createdAt)}
                </span>
              </Table.Cell>
              <Table.Cell>
                <StatusBadge banned={user.banned} />
              </Table.Cell>
              <Table.Cell>
                <UserRowActions user={user} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Content>
    </Table.ScrollContainer>
  </Table>
)

export default UsersTable