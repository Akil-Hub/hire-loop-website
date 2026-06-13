import { Button } from '@heroui/react'
import { Globe, OfficeBadge, Pencil } from '@gravity-ui/icons'

export function NoCompanyView({ onRegister }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-2xl bg-[#1a1a1a] border border-[#222] flex items-center justify-center mx-auto mb-6">
          <OfficeBadge width={36} height={36} className="text-zinc-600" />
        </div>
        <h2 className="text-2xl font-semibold text-white mb-2">No Company Yet</h2>
        <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
          Register your company to start posting jobs and hiring on HireLoop.
          Your profile will be reviewed before going live.
        </p>
        <div className="flex flex-col gap-3">
          {[
            { icon: <Pencil width={14} height={14} className="text-[#4f8ef7]" />, title: 'Fill in your details', sub: 'Company name, industry, size & more' },
            { icon: <OfficeBadge width={14} height={14} className="text-[#4f8ef7]" />, title: 'Submit for review', sub: 'Admin approves your profile' },
            { icon: <Globe width={14} height={14} className="text-[#4f8ef7]" />, title: 'Start hiring', sub: 'Post jobs and reach candidates' },
          ].map(({ icon, title, sub }) => (
            <div key={title} className="flex items-center gap-3 bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-left">
              <div className="w-8 h-8 rounded-lg bg-[#4f8ef7]/10 flex items-center justify-center shrink-0">{icon}</div>
              <div>
                <p className="text-sm font-medium text-zinc-200">{title}</p>
                <p className="text-xs text-zinc-500">{sub}</p>
              </div>
            </div>
          ))}
        </div>
        <Button onPress={onRegister} className="mt-8 w-full bg-white text-black font-semibold hover:bg-zinc-100" size="lg">
          Register Company
        </Button>
      </div>
    </div>
  )
}