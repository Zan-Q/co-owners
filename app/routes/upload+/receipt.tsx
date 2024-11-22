import React, { useState } from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Storage } from '@google-cloud/storage';
import type { LoaderFunction } from '@remix-run/node';
import path from 'path';

import { sessionKey } from '#app/utils/auth.server.ts'
import { authSessionStorage } from '#app/utils/session.server.ts'
import { redirect } from '@remix-run/node';

//API
// @ts-ignore
import { transactionAPI } from '../../api/transactionAPI';
// @ts-ignore
import { userAPI } from '../../api/userAPI';

const storage = new Storage();
const bucketName = 'receipts_sk';

//Reciept Interface
interface Receipt {
    userId: string;
    _id: string;
    businessId: string;
    receiptUrl: string;
    userName: string;
    businessName: string;
    signedUrl: string;
    createdAt: Date;
}

export const loader: LoaderFunction = async ({ request }) => {

    //Confirmed we are logged in as admin
    const authSession = await authSessionStorage.getSession(
		request.headers.get('cookie'),
	)

    const session = authSession.get(sessionKey);

    if (session) {

        //Get User
        const user = await userAPI.checklogintoken(session);

        if (user && user.role === "admin") {
    
            try {

                const receipts = await transactionAPI.getReceipts();

                const signedReceipts = await Promise.all(
                    receipts.receipts.map(async (receipt: Receipt) => {
                        const fileName = path.basename(receipt.receiptUrl);
                        const file = storage.bucket(bucketName).file(fileName);
                        const [url] = await file.getSignedUrl({
                            action: 'read',
                            expires: Date.now() + 1000 * 60 * 60, // 1 hour
                        });
                        console.log(url);
                        return {
                            ...receipt,
                            signedUrl: url,
                        };
                    })
                );

                return json({ signedReceipts });
            } catch (error) {
                console.error('Error fetching files from Google Cloud Storage:', error);
                return json({ error: 'Failed to fetch files' }, { status: 500 });
            }
        } else {
            return redirect('/');
        }
    } else {
        return redirect('/');
    }
};

export default function Receipts() {
  const { signedReceipts } = useLoaderData<{ signedReceipts: Receipt[] }>();  
  
  const [selectedReceipt, setSelectedReceipt] = useState<{ _id: string; signedUrl: string; amount: string } | null>(null);

  const handleOpenModal = (receipt: { _id: string; signedUrl: string }) => {
    setSelectedReceipt({ _id: receipt._id, signedUrl: receipt.signedUrl, amount: '' });
  };

  const handleCloseModal = () => {
    setSelectedReceipt(null);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedReceipt) {
      setSelectedReceipt({ ...selectedReceipt, amount: event.target.value });
    }
  };

  const handleSave = async () => {
    // Handle save action here
    console.log('Saved amount:', selectedReceipt?.amount);
    console.log('Receipt ID:', selectedReceipt?._id);

    // Server call to deal with receipt
    await transactionAPI.processReceipt(selectedReceipt?._id, selectedReceipt?.amount);

    // Close modal
    handleCloseModal();

    //Reload the page
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">Receipts</h1>
        {signedReceipts && signedReceipts.length > 0 ? (
            <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b border-gray-200">Business Name</th>
                    <th className="py-2 px-4 border-b border-gray-200">User Name</th>
                    <th className="py-2 px-4 border-b border-gray-200">Receipt URL</th>
                </tr>
                </thead>
                <tbody>
                {signedReceipts.map(receipt => (
                    <tr key={receipt._id}>
                    <td className="py-2 px-4 border-b border-gray-200 text-center">{receipt.businessName}</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-center">{receipt.userName || 'N/A'}</td>
                    <td className="py-2 px-4 border-b border-gray-200 text-center">
                        <button onClick={() => handleOpenModal({ _id: receipt._id, signedUrl: receipt.signedUrl })} className="text-blue-500 hover:underline">
                        {receipt.receiptUrl}
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        ) : (
            <p className="text-center">No receipts found.</p>
        )}

        {selectedReceipt && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <img src={selectedReceipt.signedUrl} alt="Receipt" className="mb-4 w-full h-auto" />
                <input
                type="text"
                value={selectedReceipt.amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
                className="w-full p-2 border border-gray-300 rounded"
                />
                <div className="flex justify-center gap-5 mt-5">
                <button onClick={handleCloseModal} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
                    Cancel
                </button>
                <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Save
                </button>
                </div>
            </div>
            </div>
        )}
    </div>
  );
}