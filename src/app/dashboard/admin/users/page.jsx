// app/admin/users/page.jsx
import UserManagementClient from "@/app/dashboard/admin/users/UserManagementClient"
import { getUserList } from "@/lib/api/users"


const AdminUsersPage = async () => {
  const data = await getUserList()
  const users = data?.users ?? []

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-6 py-8 md:px-10">
      <UserManagementClient users={users} />
    </div>
  )
}

export default AdminUsersPage