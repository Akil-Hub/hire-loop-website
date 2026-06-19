// app/admin/users/_components/UserRowActions.jsx
"use client"

import { useTransition } from "react"
import { Button, toast } from "@heroui/react"
import {
  makeRecruiterAction,
  makeSeekerAction,
  makeAdminAction,
  suspendUserAction,
  unsuspendUserAction,
  archiveUserAction,
  deleteUserAction,
} from "@/lib/actions/usersAction"
import ConfirmDialog from "@/Components/common/ConfirmDialog"

const triggerClass =
  "h-auto min-w-0 bg-transparent p-0 text-sm font-normal hover:bg-transparent disabled:opacity-50"

const UserRowActions = ({ user }) => {
  const [isPending, startTransition] = useTransition()

  const runAction = (action, successMessage) => {
    startTransition(async () => {
      try {
        await action(user.id)
        toast.success(successMessage, { timeout: 1500 })
      } catch (error) {
        toast.danger(error.message || "Something went wrong", {
          timeout: 1500,
        })
      }
    })
  }

  if (user.banned) {
    return (
      <div className="flex items-center justify-end gap-3 text-sm">
        <ConfirmDialog
          trigger={
            <Button
              variant="tertiary"
              isDisabled={isPending}
              className={`${triggerClass} text-neutral-300 hover:text-white`}
            >
              Unsuspend
            </Button>
          }
          heading="Unsuspend user?"
          description={`${user.name} will be able to sign in again.`}
          confirmLabel="Unsuspend"
          status="success"
          onConfirm={() => runAction(unsuspendUserAction, "User unsuspended")}
        />

        <ConfirmDialog
          trigger={
            <Button
              variant="tertiary"
              isDisabled={isPending}
              className={`${triggerClass} text-neutral-300 hover:text-white`}
            >
              Archive
            </Button>
          }
          heading="Archive user?"
          description={`${user.name} will be archived and hidden from active lists.`}
          confirmLabel="Archive"
          onConfirm={() => runAction(archiveUserAction, "User archived")}
        />

        <ConfirmDialog
          trigger={
            <Button
              variant="tertiary"
              isDisabled={isPending}
              className={`${triggerClass} text-red-500 hover:text-red-400`}
            >
              Delete
            </Button>
          }
          heading="Delete user?"
          description={`This permanently deletes ${user.name}. This cannot be undone.`}
          confirmLabel="Delete"
          status="danger"
          onConfirm={() => runAction(deleteUserAction, "User deleted")}
        />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-end gap-3 text-sm">
      {user.role === "recruiter" ? (
        <ConfirmDialog
          trigger={
            <Button
              variant="tertiary"
              isDisabled={isPending}
              className={`${triggerClass} text-neutral-300 hover:text-white`}
            >
              Make Seeker
            </Button>
          }
          heading="Change role to Seeker?"
          description={`${user.name}'s role will be changed from Recruiter to Seeker.`}
          confirmLabel="Change Role"
          onConfirm={() => runAction(makeSeekerAction, "User is now a seeker")}
        />
      ) : user.role !== "admin" ? (
        <ConfirmDialog
          trigger={
            <Button
              variant="tertiary"
              isDisabled={isPending}
              className={`${triggerClass} text-neutral-300 hover:text-white`}
            >
              Make Recruiter
            </Button>
          }
          heading="Change role to Recruiter?"
          description={`${user.name}'s role will be changed to Recruiter.`}
          confirmLabel="Change Role"
          onConfirm={() =>
            runAction(makeRecruiterAction, "User is now a recruiter")
          }
        />
      ) : null}

      {user.role !== "admin" && (
        <ConfirmDialog
          trigger={
            <Button
              variant="tertiary"
              isDisabled={isPending}
              className={`${triggerClass} text-neutral-300 hover:text-white`}
            >
              Make Admin
            </Button>
          }
          heading="Change role to Admin?"
          description={`${user.name} will be granted full admin access.`}
          confirmLabel="Make Admin"
          status="warning"
          onConfirm={() => runAction(makeAdminAction, "User is now an admin")}
        />
      )}

      <ConfirmDialog
        trigger={
          <Button
            variant="tertiary"
            isDisabled={isPending}
            className={`${triggerClass} text-red-500 hover:text-red-400`}
          >
            Suspend
          </Button>
        }
        heading="Suspend user?"
        description={`${user.name} will be signed out and blocked from signing in.`}
        confirmLabel="Suspend"
        status="danger"
        onConfirm={() => runAction(suspendUserAction, "User suspended")}
      />
    </div>
  )
}

export default UserRowActions