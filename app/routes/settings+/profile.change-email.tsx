import { getFormProps, getInputProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import { type SEOHandle } from '@nasa-gcn/remix-seo'
import {
	json,
	redirect,
	type ActionFunctionArgs,
	type LoaderFunctionArgs,
} from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { z } from 'zod'
import { ErrorList, Field } from '#app/components/forms.tsx'
import { Icon } from '#app/components/ui/icon.tsx'
import { StatusButton } from '#app/components/ui/status-button.tsx'
import {
	prepareVerification,
	requireRecentVerification,
} from '#app/routes/_auth+/verify.server.ts'
import { requireUserId } from '#app/utils/auth.server.ts'
import { sendEmail } from '#app/utils/email.server.ts'
import { useIsPending } from '#app/utils/misc.tsx'
import { EmailSchema } from '#app/utils/user-validation.ts'
import { verifySessionStorage } from '#app/utils/verification.server.ts'
import { EmailChangeEmail } from './profile.change-email.server.tsx'
import { type BreadcrumbHandle } from './profile.tsx'

export const handle: BreadcrumbHandle & SEOHandle = {
	breadcrumb: <Icon name="envelope-closed">Change Email</Icon>,
	getSitemapEntries: () => null,
}

export const newEmailAddressSessionKey = 'new-email-address'

const ChangeEmailSchema = z.object({
	email: EmailSchema,
})

export async function loader({ request }: LoaderFunctionArgs) {
	await requireRecentVerification(request)
	const user = await requireUserId(request)
	
	if (!user) {
		const params = new URLSearchParams({ redirectTo: request.url })
		throw redirect(`/login?${params}`)
	}
	return json({ user })
}

export async function action({ request }: ActionFunctionArgs) {
	const userId = await requireUserId(request)
	const formData = await request.formData()
}

export default function ChangeEmailIndex() {
	const data = useLoaderData<typeof loader>()
	const actionData = useActionData<typeof action>()

	const [form, fields] = useForm({
		id: 'change-email-form',
		constraint: getZodConstraint(ChangeEmailSchema),
		lastResult: actionData?.result,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ChangeEmailSchema })
		},
	})

	const isPending = useIsPending()
	return (
		<div>
			<h1 className="text-h1">Change Email</h1>
			<p>You will receive an email at the new email address to confirm.</p>
			<p>
				An email notice will also be sent to your old address {data.user.email}.
			</p>
			<div className="mx-auto mt-5 max-w-sm">
				<Form method="POST" {...getFormProps(form)}>
					<Field
						labelProps={{ children: 'New Email' }}
						inputProps={{
							...getInputProps(fields.email, { type: 'email' }),
							autoComplete: 'email',
						}}
						errors={fields.email.errors}
					/>
					<ErrorList id={form.errorId} errors={form.errors} />
					<div>
						<StatusButton
							status={isPending ? 'pending' : (form.status ?? 'idle')}
						>
							Send Confirmation
						</StatusButton>
					</div>
				</Form>
			</div>
		</div>
	)
}
