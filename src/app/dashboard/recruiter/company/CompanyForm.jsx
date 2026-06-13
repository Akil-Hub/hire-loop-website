'use client'

import { useRef, useState } from 'react'
import { TextField, Input, TextArea, Label, FieldError, Select, ListBox, Button, toast } from '@heroui/react'
import { OfficeBadge, Camera, XmarkShape, Pencil } from '@gravity-ui/icons'
import { createCompany, updateCompany } from '@/lib/actions/companies'

const INDUSTRIES = ['Technology','Healthcare','Finance','Education','Retail','Manufacturing','Media','Consulting','Real Estate','Other']
const EMPLOYEE_RANGES = ['1-10 employees','11-50 employees','51-200 employees','201-500 employees','501-1000 employees','1000+ employees']

async function uploadToImgBB(file) {
  const formData = new FormData()
  formData.append('image', file)
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`, {
    method: 'POST', body: formData,
  })
  const data = await res.json()
  if (!data.success) throw new Error('Image upload failed')
  return data.data.url
}

export function CompanyForm({ existing, recruiter, onSuccess, onCancel }) {
  const fileInputRef = useRef(null)
  const isEditing = !!existing

  const [logoFile, setLogoFile]       = useState(null)
  const [logoPreview, setLogoPreview] = useState(existing?.logo ?? null)
  const [isLoading, setIsLoading]     = useState(false)
  const [errors, setErrors]           = useState({})

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) return setErrors(p => ({ ...p, logo: 'File must be under 5MB' }))
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
    setErrors(p => ({ ...p, logo: null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget          // ← save before any await
    const formData = new FormData(form)

    const newErrors = {}
    if (!formData.get('name'))          newErrors.name = 'Company name is required'
    if (!formData.get('industry'))      newErrors.industry = 'Industry is required'
    if (!formData.get('employeeRange')) newErrors.employeeRange = 'Employee range is required'
    if (Object.keys(newErrors).length)  return setErrors(newErrors)

    setIsLoading(true)
    try {
      let logoUrl = existing?.logo ?? null
      if (logoFile) logoUrl = await uploadToImgBB(logoFile)

      const payload = {
        name:          formData.get('name'),
        website:       formData.get('website'),
        location:      formData.get('location'),
        industry:      formData.get('industry'),
        employeeRange: formData.get('employeeRange'),
        description:   formData.get('description'),
        logo:          logoUrl,
        recruiterId:   recruiter.id,
        status: isEditing && existing.status !== 'rejected' ? existing.status : 'pending',
      }

      if (isEditing) {
        await updateCompany(existing._id, payload)
        onSuccess({ ...existing, ...payload })        // ← pass updated data up
      } else {
        const result = await createCompany(payload)   // ← only ONE call
        onSuccess({ ...payload, _id: result.insertedId })
      }

      toast.success(isEditing ? 'Company updated.' : 'Company registered successfully.')
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-10 px-4">
      <div className="max-w-2xl mx-auto">

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#222] flex items-center justify-center">
            <OfficeBadge width={20} height={20} className="text-[#4f8ef7]" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">
              {isEditing ? 'Edit Company' : 'Register New Company'}
            </h1>
            <p className="text-sm text-zinc-500">
              {isEditing ? 'Update your business details.' : 'Enter your business details to start hiring on HireLoop.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-[#111111] border border-[#222222] rounded-2xl p-6 flex flex-col gap-5">

            {errors.submit && (
              <p className="text-sm text-danger bg-danger/10 px-3 py-2 rounded-lg">{errors.submit}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField name="name" isRequired isInvalid={!!errors.name}>
                <Label className="text-sm text-zinc-300">Company Name</Label>
                <Input defaultValue={existing?.name} placeholder="e.g. Acme Corp" fullWidth className="bg-[#1a1a1a] border-[#333]" />
                <FieldError className="text-xs text-danger">{errors.name}</FieldError>
              </TextField>

              <Select name="industry" placeholder="Select industry" defaultSelectedKey={existing?.industry} isInvalid={!!errors.industry}>
                <Label className="text-sm text-zinc-300">Industry / Category</Label>
                <Select.Trigger className="bg-[#1a1a1a] border border-[#333]">
                  <Select.Value /><Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {INDUSTRIES.map(item => (
                      <ListBox.Item key={item} id={item} textValue={item}>{item}<ListBox.ItemIndicator /></ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextField name="website">
                <Label className="text-sm text-zinc-300">Website URL</Label>
                <Input defaultValue={existing?.website} placeholder="www.company.com" fullWidth className="bg-[#1a1a1a] border-[#333]" />
              </TextField>
              <TextField name="location">
                <Label className="text-sm text-zinc-300">Location</Label>
                <Input defaultValue={existing?.location} placeholder="City, Country" fullWidth className="bg-[#1a1a1a] border-[#333]" />
              </TextField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select name="employeeRange" placeholder="Select range" defaultSelectedKey={existing?.employeeRange} isInvalid={!!errors.employeeRange}>
                <Label className="text-sm text-zinc-300">Employee Count Range</Label>
                <Select.Trigger className="bg-[#1a1a1a] border border-[#333]">
                  <Select.Value /><Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {EMPLOYEE_RANGES.map(item => (
                      <ListBox.Item key={item} id={item} textValue={item}>{item}<ListBox.ItemIndicator /></ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-zinc-300">Company Logo</label>
                <div onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[#333] bg-[#1a1a1a] cursor-pointer hover:border-[#444] transition-colors min-h-[40px]">
                  {logoPreview ? (
                    <div className="relative shrink-0">
                      <img src={logoPreview} alt="Logo" className="w-9 h-9 rounded-lg object-cover" />
                      <button type="button"
                        onClick={(e) => { e.stopPropagation(); setLogoFile(null); setLogoPreview(null) }}
                        className="absolute -top-1.5 -right-1.5 bg-[#333] rounded-full p-0.5 hover:bg-danger transition-colors">
                        <XmarkShape width={10} height={10} className="text-white" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-lg bg-[#252525] border border-[#333] flex items-center justify-center shrink-0">
                      <Camera width={16} height={16} className="text-zinc-400" />
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <p className="text-sm text-zinc-300 truncate">{logoFile ? logoFile.name : 'Upload image'}</p>
                    <p className="text-xs text-zinc-500">PNG, JPG up to 5MB</p>
                  </div>
                </div>
                {errors.logo && <p className="text-xs text-danger">{errors.logo}</p>}
                <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/jpg"
                  className="hidden" onChange={handleLogoChange} />
              </div>
            </div>

            <TextField name="description">
              <Label className="text-sm text-zinc-300">Brief Description</Label>
              <TextArea defaultValue={existing?.description} placeholder="Tell us about your company's mission and culture..."
                rows={4} fullWidth className="bg-[#1a1a1a] border-[#333]" />
            </TextField>
          </div>

          <div className="flex justify-end gap-3 mt-5">
            <Button variant="flat" className="text-zinc-300 bg-[#1a1a1a] border border-[#333]" onPress={onCancel}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading} className="bg-white text-black font-semibold hover:bg-zinc-100">
              {isEditing ? 'Save Changes' : 'Register Company'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}