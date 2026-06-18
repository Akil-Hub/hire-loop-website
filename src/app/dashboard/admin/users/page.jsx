import { getUserList } from "@/lib/api/users"


const AdminUsersPage =async () => {
    const data = await getUserList()
    const users = data?.users
    console.log(users)
  return (
    <div>AdminUsersPage
    {users?.length}</div>
  )
}

export default AdminUsersPage