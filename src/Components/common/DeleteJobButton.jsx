'use client'
import { Button } from "@heroui/react"
import { FiTrash2 } from "react-icons/fi"
import { deleteJob } from "@/lib/actions/job"

const DeleteJobButton = ({ jobId }) => {
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this job?')) return
    await deleteJob(jobId)
  }

  return (
    <Button
      isIconOnly
      size="sm"
      variant="light"
      color="danger"
      aria-label="Delete job"
      onPress={handleDelete}
    >
      <FiTrash2 size={16}className="text-red-500" />
    </Button>
  )
}

export default DeleteJobButton