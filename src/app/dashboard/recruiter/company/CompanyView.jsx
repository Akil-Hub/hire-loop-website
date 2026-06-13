import { Button } from '@heroui/react'
import { Globe, MapPin, Persons, OfficeBadge, Pencil } from '@gravity-ui/icons'
import Link from 'next/link'

const STATUS_STYLES = {
  pending:  { dot: 'bg-yellow-400', text: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20', label: 'Pending Review' },
  approved: { dot: 'bg-emerald-400', text: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20', label: 'Approved' },
  rejected: { dot: 'bg-red-400',    text: 'text-red-400',    bg: 'bg-red-400/10 border-red-400/20',    label: 'Rejected' },
}

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] ?? STATUS_STYLES.approved
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  )
}

export function CompanyView({ company, onEdit }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-10 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#222] flex items-center justify-center">
              <OfficeBadge width={20} height={20} className="text-[#4f8ef7]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">My Company</h1>
              <p className="text-sm text-zinc-500">Your registered business profile</p>
            </div>
          </div>
          <Button onPress={onEdit} variant="flat" className="bg-[#1a1a1a] text-zinc-300 border border-[#333] gap-2"
            startContent={<Pencil width={14} height={14} />}>
            Edit
          </Button>
        </div>

        <div className="bg-[#111111] border border-[#222222] rounded-2xl overflow-hidden">

          <div className="px-6 pt-6 pb-4 border-b border-[#222] flex items-center gap-4">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-xl object-cover border border-[#333]" />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-[#1a1a1a] border border-[#333] flex items-center justify-center">
                <OfficeBadge width={28} height={28} className="text-zinc-600" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-lg font-semibold text-white truncate">{company.name}</h2>
                <StatusBadge status={company.status} />
              </div>
              <p className="text-sm text-zinc-500 mt-0.5">{company.industry}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#222]">
            {company.website && (
              <div className="px-6 py-4">
                <p className="text-xs text-zinc-500 mb-1 flex items-center gap-1.5"><Globe width={12} height={12} /> Website</p>
                <Link href={`https://${company.website}`} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-[#4f8ef7] hover:underline truncate block">
                  {company.website}
                </Link>
              </div>
            )}
            {company.location && (
              <div className="px-6 py-4">
                <p className="text-xs text-zinc-500 mb-1 flex items-center gap-1.5"><MapPin width={12} height={12} /> Location</p>
                <p className="text-sm text-zinc-200">{company.location}</p>
              </div>
            )}
            {company.employeeRange && (
              <div className="px-6 py-4 border-t border-[#222]">
                <p className="text-xs text-zinc-500 mb-1 flex items-center gap-1.5"><Persons width={12} height={12} /> Team Size</p>
                <p className="text-sm text-zinc-200">{company.employeeRange}</p>
              </div>
            )}
          </div>

          {company.description && (
            <div className="px-6 py-4 border-t border-[#222]">
              <p className="text-xs text-zinc-500 mb-2">About</p>
              <p className="text-sm text-zinc-300 leading-relaxed">{company.description}</p>
            </div>
          )}

          {company.status === 'rejected' && (
            <div className="mx-6 mb-6 mt-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400 font-medium mb-0.5">Application Rejected</p>
              <p className="text-xs text-red-400/70">Your company was not approved. Update your details and resubmit for review.</p>
              <Button onPress={onEdit} size="sm" className="mt-3 bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30">
                Update & Resubmit
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}