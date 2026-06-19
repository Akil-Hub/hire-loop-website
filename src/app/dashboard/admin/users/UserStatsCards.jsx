// app/admin/users/_components/UserStatsCards.jsx
const StatCard = ({ label, value, hint, hintColor }) => (
  <div className="rounded-xl border border-[#1f1f1f] bg-[#111111] p-5">
    <p className="text-sm text-neutral-400">{label}</p>
    <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    <p className={`mt-1 text-xs ${hintColor}`}>{hint}</p>
  </div>
)

const UserStatsCards = ({ users }) => {
  const total = users.length
  const active = users.filter((u) => !u.banned).length
  const recruiters = users.filter((u) => u.role === "recruiter").length
  const suspended = users.filter((u) => u.banned).length
  const newSignups = users.filter((u) => {
    const created = new Date(u.createdAt).getTime()
    return Date.now() - created <= 24 * 60 * 60 * 1000
  }).length

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <StatCard
        label="Total Active Users"
        value={active.toLocaleString()}
        hint={`${total.toLocaleString()} total users`}
        hintColor="text-green-500"
      />
      <StatCard
        label="Recruiter Growth"
        value={recruiters.toLocaleString()}
        hint="High demand"
        hintColor="text-green-500"
      />
      <StatCard
        label="Suspended Accounts"
        value={suspended.toLocaleString()}
        hint={`${total ? ((suspended / total) * 100).toFixed(1) : 0}% of total`}
        hintColor="text-neutral-400"
      />
      <StatCard
        label="New Signups (24h)"
        value={newSignups.toLocaleString()}
        hint="Steady activity"
        hintColor="text-orange-400"
      />
    </div>
  )
}

export default UserStatsCards