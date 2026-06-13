'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  TextField,
  Input,
  TextArea,
  Label,
  FieldError,
  Select,
  ListBox,
  Button,
  toast,
} from '@heroui/react'
import {
  Globe,
  MapPin,
  Persons,
  Camera,
  OfficeBadge,
  XmarkShape,
  Pencil,
  BuildingColumns,
} from '@gravity-ui/icons'
import { createCompany } from '@/lib/actions/companies'
import Link from 'next/link'
import { Recursive } from 'next/font/google'


const INDUSTRIES = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
  'Manufacturing', 'Media', 'Consulting', 'Real Estate', 'Other',
]

const EMPLOYEE_RANGES = [
  '1-10 employees', '11-50 employees', '51-200 employees',
  '201-500 employees', '501-1000 employees', '1000+ employees',
]

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API

// ─── Status Badge ────────────────────────────────────────────────────────────
const STATUS_STYLES = {
  pending:  { dot: 'bg-yellow-400', text: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20', label: 'Pending Review' },
  approved: { dot: 'bg-emerald-400', text: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/20', label: 'Approved' },
  rejected: { dot: 'bg-red-400', text: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20', label: 'Rejected' },
}

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.approved
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  )
}

// ─── Company Detail View ──────────────────────────────────────────────────────
function CompanyView({ company, onEdit }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
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
          <Button
            onPress={onEdit}
            variant="flat"
            className="bg-[#1a1a1a] text-zinc-300 border border-[#333] gap-2"
            startContent={<Pencil width={14} height={14} />}
          >
            Edit
          </Button>
        </div>

        <div className="bg-[#111111] border border-[#222222] rounded-2xl overflow-hidden">
          {/* Logo + Name Banner */}
          <div className="px-6 pt-6 pb-4 border-b border-[#222] flex items-center gap-4">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="w-16 h-16 rounded-xl object-cover border border-[#333]"
              />
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

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#222]">
            {company.website && (
              <div className="px-6 py-4">
                <p className="text-xs text-zinc-500 mb-1 flex items-center gap-1.5">
                  <Globe width={12} height={12} /> Website
                </p>
                <Link href={`https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#4f8ef7] hover:underline truncate block">

              
                  {company.website}
                
                </Link>
                  

              </div>
            )}
            {company.location && (
              <div className="px-6 py-4">
                <p className="text-xs text-zinc-500 mb-1 flex items-center gap-1.5">
                  <MapPin width={12} height={12} /> Location
                </p>
                <p className="text-sm text-zinc-200">{company.location}</p>
              </div>
            )}
            {company.employeeRange && (
              <div className="px-6 py-4 border-t border-[#222]">
                <p className="text-xs text-zinc-500 mb-1 flex items-center gap-1.5">
                  <Persons width={12} height={12} /> Team Size
                </p>
                <p className="text-sm text-zinc-200">{company.employeeRange}</p>
              </div>
            )}
          </div>

          {/* Description */}
          {company.description && (
            <div className="px-6 py-4 border-t border-[#222]">
              <p className="text-xs text-zinc-500 mb-2">About</p>
              <p className="text-sm text-zinc-300 leading-relaxed">{company.description}</p>
            </div>
          )}

          {/* Rejection Notice */}
          {company.status === 'rejected' && (
            <div className="mx-6 mb-6 mt-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <p className="text-sm text-red-400 font-medium mb-0.5">Application Rejected</p>
              <p className="text-xs text-red-400/70">
                Your company was not approved. Update your details and resubmit for review.
              </p>
              <Button
                onPress={onEdit}
                size="sm"
                className="mt-3 bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
              >
                Update & Resubmit
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── No Company View ──────────────────────────────────────────────────────────
function NoCompanyView({ onRegister }) {
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
          <div className="flex items-center gap-3 bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-[#4f8ef7]/10 flex items-center justify-center shrink-0">
              <Pencil width={14} height={14} className="text-[#4f8ef7]" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-200">Fill in your details</p>
              <p className="text-xs text-zinc-500">Company name, industry, size & more</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-[#4f8ef7]/10 flex items-center justify-center shrink-0">
              <OfficeBadge width={14} height={14} className="text-[#4f8ef7]" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-200">Submit for review</p>
              <p className="text-xs text-zinc-500">Admin approves your profile</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-left">
            <div className="w-8 h-8 rounded-lg bg-[#4f8ef7]/10 flex items-center justify-center shrink-0">
              <Globe width={14} height={14} className="text-[#4f8ef7]" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-200">Start hiring</p>
              <p className="text-xs text-zinc-500">Post jobs and reach candidates</p>
            </div>
          </div>
        </div>
        <Button
          onPress={onRegister}
          className="mt-8 w-full bg-white text-black font-semibold hover:bg-zinc-100"
          size="lg"
        >
          Register Company
        </Button>
      </div>
    </div>
  )
}

// ─── Company Form ─────────────────────────────────────────────────────────────
function CompanyForm({ existing, onSuccess, onCancel,recruiter,company,setCompany }) {
  const fileInputRef = useRef(null)
  const isEditing = !!existing

  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(existing?.logo || null)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  console.log(errors)

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, logo: 'File must be under 5MB' }))
      return
    }
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
    setErrors(prev => ({ ...prev, logo: null }))
  }

  const uploadToImgBB = async (file) => {
    const formData = new FormData()
    formData.append('image', file)
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    if (!data.success) throw new Error('Image upload failed')
    return data.data.url
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const newErrors = {}
    if (!formData.get('name')) newErrors.name = 'Company name is required'
    if (!formData.get('industry')) newErrors.industry = 'Industry is required'
    if (!formData.get('employeeRange')) newErrors.employeeRange = 'Employee range is required'
    if (Object.keys(newErrors).length) return setErrors(newErrors)

    setIsLoading(true)
    try {
      let logoUrl = existing?.logo || null
      if (logoFile) logoUrl = await uploadToImgBB(logoFile)

      const payload = {
        name: formData.get('name'),
        website: formData.get('website'),
        location: formData.get('location'),
        industry: formData.get('industry'),
        employeeRange: formData.get('employeeRange'),
        description: formData.get('description'),
        logo: logoUrl,
        status: isEditing && existing.status !== 'rejected' ? existing.status : 'approved',
        recruiterId:recruiter.id
      }
  
    const result = await createCompany(payload)
    if (result.insertedId) {
      const savedCompany= {...company, _id:result.insertedId}
      setCompany(savedCompany)
        toast.success('Compnay profile created successfully.')
        
    }

      if (isEditing) {
        await updateCompany(existing._id, payload)
      } else {
        await createCompany(payload)
      }
      console.log(payload)
      onSuccess()
    } catch (err) {
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#222] flex items-center justify-center">
            <OfficeBadge width={20} height={20} className="text-[#4f8ef7]" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">
              {isEditing ? 'Edit Company' : 'Register New Company'}
            </h1>
            <p className="text-sm text-zinc-500">
              {isEditing
                ? 'Update your business details.'
                : 'Enter your business details to start hiring on HireLoop.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6 flex flex-col gap-5">

            {errors.submit && (
              <p className="text-sm text-danger bg-danger/10 px-3 py-2 rounded-lg">
                {errors.submit}
              </p>
            )}

            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField name="name" isRequired isInvalid={!!errors.name}>
                <Label className="text-sm text-zinc-300">Company Name</Label>
                <Input
                  defaultValue={existing?.name}
                  placeholder="e.g. Acme Corp"
                  fullWidth
                  className="bg-[#1a1a1a] border-[#333]"
                />
                <FieldError className="text-xs text-danger">{errors.name}</FieldError>
              </TextField>

              <Select
                name="industry"
                placeholder="Select industry"
                defaultSelectedKey={existing?.industry}
                isInvalid={!!errors.industry}
              >
                <Label className="text-sm text-zinc-300">Industry / Category</Label>
                <Select.Trigger className="bg-[#1a1a1a] border border-[#333]">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {INDUSTRIES.map((item) => (
                      <ListBox.Item key={item} id={item} textValue={item}>
                        {item}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField name="website">
                <Label className="text-sm text-zinc-300">Website URL</Label>
                <Input
                  defaultValue={existing?.website}
                  placeholder="www.company.com"
                  fullWidth
                  className="bg-[#1a1a1a] border-[#333]"
                />
              </TextField>

              <TextField name="location">
                <Label className="text-sm text-zinc-300">Location</Label>
                <Input
                  defaultValue={existing?.location}
                  placeholder="City, Country"
                  fullWidth
                  className="bg-[#1a1a1a] border-[#333]"
                />
              </TextField>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                name="employeeRange"
                placeholder="Select range"
                defaultSelectedKey={existing?.employeeRange}
                isInvalid={!!errors.employeeRange}
              >
                <Label className="text-sm text-zinc-300">Employee Count Range</Label>
                <Select.Trigger className="bg-[#1a1a1a] border border-[#333]">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {EMPLOYEE_RANGES.map((item) => (
                      <ListBox.Item key={item} id={item} textValue={item}>
                        {item}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              {/* Logo Upload */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-zinc-300">Company Logo</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[#333] bg-[#1a1a1a] cursor-pointer hover:border-[#444] transition-colors min-h-[40px]"
                >
                  {logoPreview ? (
                    <div className="relative shrink-0">
                      <img src={logoPreview} alt="Logo" className="w-9 h-9 rounded-lg object-cover" />
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setLogoFile(null); setLogoPreview(null) }}
                        className="absolute -top-1.5 -right-1.5 bg-[#333] rounded-full p-0.5 hover:bg-danger transition-colors"
                      >
                        <XmarkShape width={10} height={10} className="text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-[#252525] border border-[#333] flex items-center justify-center shrink-0">
                      <Camera width={16} height={16} className="text-zinc-400" />
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <p className="text-sm text-zinc-300 truncate">
                      {logoFile ? logoFile.name : 'Upload image'}
                    </p>
                    <p className="text-xs text-zinc-500">PNG, JPG up to 5MB</p>
                  </div>
                </div>
                {errors.logo && <p className="text-xs text-danger">{errors.logo}</p>}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </div>
            </div>

            {/* Row 4 */}
            <TextField name="description">
              <Label className="text-sm text-zinc-300">Brief Description</Label>
              <TextArea
                defaultValue={existing?.description}
                placeholder="Tell us about your company's mission and culture..."
                rows={4}
                fullWidth
                className="bg-[#1a1a1a] border-[#333]"
              />
            </TextField>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-5">
            <Button
              variant="flat"
              className="text-zinc-300 bg-[#1a1a1a] border border-[#333]"
              onPress={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              className="bg-white text-black font-semibold hover:bg-zinc-100"
            >
              {isEditing ? 'Save Changes' : 'Register Company'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Main Page Controller ─────────────────────────────────────────────────────
export default function CompanyProfile({ recruiterCompany,recruiter}) {
  const router = useRouter()
  const [company, setCompany] = useState(recruiterCompany || null)
  const [isEditing, setIsEditing] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

  const hasCompany = company?._id
  const showForm = isRegistering || isEditing

  if (showForm) {
    return (
      <CompanyForm
      setCompany={setCompany}
      company={company}
      recruiter={recruiter}
        existing={isEditing ? company : null}
        onSuccess={() => {
          setIsEditing(false)
          setIsRegistering(false)
          router.refresh()
        }}
        onCancel={() => {
          setIsEditing(false)
          setIsRegistering(false)
        }}
      />
    )
  }

  if (hasCompany) {
    return (
      <CompanyView
        company={company}
        onEdit={() => setIsEditing(true)}
      />
    )
  }

  return (
    <NoCompanyView
      onRegister={() => setIsRegistering(true)}
    />
  )
}