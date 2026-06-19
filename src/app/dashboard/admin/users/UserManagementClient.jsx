// app/admin/users/_components/UserManagementClient.jsx
"use client"

import { useMemo, useState } from "react"
import { Magnifier, ArrowDownToLine, ArrowChevronDown } from "@gravity-ui/icons"
import UserStatsCards from "@/app/dashboard/admin/users/UserStatsCards"
import UsersTable from "@/app/dashboard/admin/users/UsersTable"


const PAGE_SIZE = 10
const ROLE_OPTIONS = ["All Roles", "Seeker", "Recruiter", "Admin"]

const exportToCsv = (users) => {
  const header = ["Name", "Email", "Role", "Join Date", "Status"]
  const rows = users.map((u) => [
    u.name,
    u.email,
    u.role,
    new Date(u.createdAt).toLocaleDateString(),
    u.banned ? "Suspended" : "Active",
  ])

  const csv = [header, ...rows].map((row) => row.join(",")).join("\n")
  const blob = new Blob([csv], { type: "text/csv" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "users.csv"
  link.click()
  URL.revokeObjectURL(url)
}

const UserManagementClient = ({ users }) => {
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("All Roles")
  const [page, setPage] = useState(1)

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesRole =
        roleFilter === "All Roles" ||
        user.role?.toLowerCase() === roleFilter.toLowerCase()

      const matchesSearch =
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())

      return matchesRole && matchesSearch
    })
  }, [users, roleFilter, search])

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE))
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            User Management
          </h1>
          <p className="mt-1 text-sm text-neutral-400">
            Review, filter, and manage platform access for all users.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value)
                setPage(1)
              }}
              className="appearance-none rounded-lg border border-[#2a2a2a] bg-[#111111] px-4 py-2 pr-9 text-sm text-white outline-none"
            >
              {ROLE_OPTIONS.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <ArrowChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          </div>

          <button
            onClick={() => exportToCsv(filteredUsers)}
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black"
          >
            <ArrowDownToLine className="h-4 w-4" />
            Export List
          </button>
        </div>
      </div>

      <UserStatsCards users={users} />

      <div className="rounded-xl border border-[#1f1f1f] bg-[#111111]">
        <div className="flex items-center gap-3 border-b border-[#1f1f1f] p-4">
          <div className="relative w-full max-w-xs">
            <Magnifier className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="Search by name or email"
              className="w-full rounded-lg border border-[#2a2a2a] bg-[#0a0a0a] py-2 pl-9 pr-3 text-sm text-white outline-none placeholder:text-neutral-500"
            />
          </div>
        </div>

        <UsersTable users={paginatedUsers} />

        <div className="flex items-center justify-between border-t border-[#1f1f1f] p-4 text-sm text-neutral-400">
          <span>
            Showing {paginatedUsers.length ? (page - 1) * PAGE_SIZE + 1 : 0} to{" "}
            {Math.min(page * PAGE_SIZE, filteredUsers.length)} of{" "}
            {filteredUsers.length.toLocaleString()} users
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-md px-3 py-1 disabled:opacity-40"
            >
              Prev
            </button>
            <span className="text-white">{page}</span>
            <span>/ {totalPages}</span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-md px-3 py-1 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserManagementClient