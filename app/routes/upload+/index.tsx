import { Form, useActionData, useLoaderData } from '@remix-run/react';
import { json, redirect } from '@remix-run/node';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import {
	redirectWithToast,
} from '#app/utils/toast.server.ts'
import { Storage } from '@google-cloud/storage';

import { sessionKey } from '#app/utils/auth.server.ts'
import { authSessionStorage } from '#app/utils/session.server.ts'

//API
import { transactionAPI } from '../../api/transactionAPI';

const storage = new Storage();
const bucketName = 'receipts_sk';

export const loader: LoaderFunction = async ({ request }) => {

  const url = new URL(request.url);
  const businessName = url.searchParams.get('businessName');
  const logoUrl = url.searchParams.get('logoUrl');
  const businessId = url.searchParams.get('businessId');

  //See if we are logged in by checking the session
  const authSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)

  if (authSession) {
    const session = authSession.get(sessionKey);

    return { businessName, logoUrl, businessId, session };
  } else {
    return { businessName, logoUrl, businessId };
  }

};


/**
 * Upload Image to Google CLoud Storage while sending information to the server
 * @param param
 * @returns 
 */
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get('image') as Blob | null;
  const id = formData.get('id') as string | null;
  const businessName = formData.get('businessname') as string | null;
  const session = formData.get('session') as string | null;

  if (!file || typeof file === 'string' || !id) {
    return json({ error: 'No file uploaded or missing ID' }, { status: 400 });
  }

  try {

    //Get original file name
    const originalFileName = file.name;
    
    //Get today's date and time in unix format
    const date = new Date();
    const unixDate = date.getTime();

    //Get file extension
    const file_extension = file.name.split('.').pop();

    const fileName = `${originalFileName}_${unixDate}.${file_extension}`;
    const fileUpload = storage.bucket(bucketName).file(fileName);

    const buffer = Buffer.from(await file.arrayBuffer());

    await new Promise((resolve, reject) => {
      const blobStream = fileUpload.createWriteStream({
        resumable: false,
        gzip: true,
      });

      blobStream
        .on('finish', resolve)
        .on('error', reject)
        .end(buffer);
    });

    const upload = await transactionAPI.uploadReceipt(id, `https://storage.googleapis.com/${bucketName}/${fileName}`, session);

    return redirectWithToast(
      `/stocks/${id}`,
      {
        title: 'Upload Successful',
        description: `Thank you for uploading your receipt for ${businessName}.`,
      },
    )
  } catch (error) {
    console.error('Failed to upload image:', error);
    return json({ error: 'Failed to upload image' }, { status: 500 });
  }
};

export default function Upload() {
  const { businessName, logoUrl, businessId, session } = useLoaderData<{
    businessName: string;
    logoUrl: string;
    businessId: string;
    session: string | undefined;
  }>();
  const actionData = useActionData<{ error?: string }>();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="bg-white p-4 sm:p-8 rounded shadow-md w-full max-w-md">
        <img src={logoUrl} alt={`${businessName} Logo`} className="w-24 h-24 object-contain mb-4 mx-auto" />
        <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Upload Receipt for {businessName}</h1>
        <Form method="post" encType="multipart/form-data" className="space-y-4">
          <input type="hidden" name="id" value={businessId} />
          <input type="hidden" name="businessname" value={businessName} />
          <input type="hidden" name="session" value={session} />
          <div className="flex flex-col items-center">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 text-center sm:text-left">
              Choose an image or pdf of the receipt
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="mt-3 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Upload
          </button>
        </Form>
        {actionData?.error && (
          <p className="mt-4 text-red-500 text-sm text-center">{actionData.error}</p>
        )}
      </div>
    </div>
  );
}
