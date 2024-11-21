import * as React from 'react';
import { useState, useRef, useEffect } from "react";
import { Form } from '@remix-run/react';
import { TextInput, Textarea } from '@mantine/core';

import { json } from '@remix-run/node';
import { sessionKey } from '#app/utils/auth.server.ts'
import { authSessionStorage } from '#app/utils/session.server.ts'
import { LoaderFunction, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

//Toast
import { toast as showToast, toast } from 'sonner'

//API
import { businessAPI } from '../../api/businessAPI';
import { userAPI } from '../../api/userAPI';

const KeyCodes = {
    comma: 188,
    enter: 13
};

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
    
        return json({ message: 'You are an admin' });
      } else {
          return redirect('/');
      }
  } else {
      return redirect('/');
  }
};

function CreateCompany() {

    //LoaderFunction
    const data = useLoaderData();

    //Variables
    const [name, setName] = React.useState('');
    const [address, setAddress] = React.useState('');

    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const [description, setDescription] = React.useState('');
    const [website, setWebsite] = React.useState('');

    //Loading after button pressed
    const [loading, setLoading] = useState(false);

    //Profile pic
    const [image, setImage] = React.useState('');
    const [preview, setPreview] = useState<string | null>(null);

    //Google Places API
    const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    //Images of the business
    const [businessImages, setBusinessImages] = useState<File[]>([]);
    const [businessPreviews, setBusinessPreviews] = useState<string[]>([]);

    const options = {
        types: ['geocode'],
        componentRestrictions: { country: ["ca","us"] }
    };

    useEffect(() => {
      const loadScript = (url: string, callback: () => void) => {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.async = true;
        script.onload = callback;
        document.head.appendChild(script);
      };
  
      loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyCn_0w1J9f-e1m7YKb59DhsRIftV05XU7A&libraries=places`, () => {
        autoCompleteRef.current = new window.google.maps.places.Autocomplete(document.getElementById('address'), options);
        autoCompleteRef.current.addListener('place_changed', handlePlaceSelect);
      });
    }, []);


    //Upload to server
    const createBusiness = async () => {
        
      //Printout the data
      /*console.log(name);
      console.log(address);
      console.log(city);
      console.log(state);
      console.log(country);
      console.log(latitude);
      console.log(longitude);
      console.log(description);
      console.log(website);
      console.log(image);
      console.log(businessImages); */

      const response = await businessAPI.createBusiness(name, address, city, state, country, latitude, longitude, website, description, image, businessImages);
    
      if (response.status === 200) {

        //Toast
        showToast.success("Business Created", {
          description: 'Business has been created',
        })
      }
    }

    const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
        const addressObject = autoCompleteRef.current?.getPlace();

        if (!addressObject) return;
        const address = addressObject.address_components;

        if (address) {

            //Set the address
            setAddress(addressObject.formatted_address || '');

            //Get the city and state
            for (let i = 0; i < address.length; i++) {

                if (address[i]?.types.includes('locality')) {
                    console.log(address[i]?.long_name);
                    setCity(address[i]?.long_name || '');
                }
                if (address[i] && address[i]?.types.includes('administrative_area_level_1')) {
                    setState(address[i]?.long_name || '');
                }
                if (address[i] && address[i]?.types.includes('country')) {
                    setCountry(address[i]?.long_name || '');
                }
            }

            if (addressObject.geometry && addressObject.geometry.location) {
                setLatitude(addressObject.geometry.location.lat().toString());
                setLongitude(addressObject.geometry.location.lng().toString());
            }
        }
    }

    //Handle the logo image change
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    };

    //Handle the Business Image changes
    const handleBusinessImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);

      if (files.length + businessImages.length > 10) {

        showToast.error("Image Error", {
          description: 'You can only upload a maximum of 10 images',
        })

        return;
      }
  
      setBusinessImages((prevImages) => [...prevImages, ...files]);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setBusinessPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    };

    //When the user clicks on the Submit button
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
                
        //Make sure home address is filled in
        if (autoCompleteRef.current === null || autoCompleteRef.current.getPlace() === undefined) {

          showToast.error("Address Error", {
            description: 'Address cannot be empty',
          })
  
        }

        //If Name is not present on user, then it needs to be filled in
        else if (name.length < 1) {

          showToast.error("Name Error", {
            description: 'Name cannot be empty',
          })        
        }

        //If profile image is not present on user, then it needs to be filled in
        else if (image.length < 1) {

          showToast.error("Image Error", {
            description: 'Image cannot be empty',
          })        
        }

        else {
            //Set Loading
            setLoading(true);
            
            //Create the Business
            createBusiness();
        }

    };

    return (
      <div className="flex justify-center items-center w-full min-h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-lg space-y-6">
          <div className="text-2xl font-bold text-center">Add a Business</div>

                {/* Get Business Logo */}
                <div className="mb-4">
                  <input
                    type="file"
                    id="logo"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden" // Hide the default file input
                  />

                  {preview ? (
                    <label htmlFor="logo" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <img src={preview} alt="preview" className="w-24 h-24 rounded-full object-cover" />
                        <span className="mt-2 text-sm text-gray-600">Upload Business Logo</span>
                      </div>
                    </label>
                  ) : (
                    <label htmlFor="logo" className="cursor-pointer">
                      <div className="flex flex-col items-center">
                        <img className="w-24 h-24 rounded-full object-cover" src="/img/profileUpload.png" alt="default" />
                        <span className="mt-2 text-sm text-gray-600">Upload the business logo</span>
                      </div>
                    </label>
                  )}
                </div>

                {/* Business Name */}
                <div className="inputBox">
                  <TextInput
                    id="name"
                    label="Business Name"
                    styles={{ input: { borderColor: '#ccc', borderWidth: '1px', width: '100%', height: '2rem', borderRadius: '1rem', padding: '1rem' } }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                {/* Address */}
                <div className="inputBox">
                  <TextInput
                    id="address"
                    label="Address"
                    value={address}
                    ref={inputRef}
                    onChange={(e) => setAddress(e.target.value)}
                    styles={{ input: { borderColor: '#ccc', borderWidth: '1px', width: '100%', height: '2rem', borderRadius: '1rem', padding: '1rem' } }}
                  />
                </div>

                {/* Description */}
                <div className="inputBox">
                  <Textarea
                    id="description"
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    minRows={4}
                    styles={{ input: { borderColor: '#ccc', borderWidth: '1px', width: '100%', borderRadius: '1rem', padding: '1rem' } }}
                  />
                </div>

                {/* Business Images */}
                <div className="inputBox">
                  <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                    Upload Images (Max 10)
                  </label>
                  <input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleBusinessImageChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <div className="mt-2 grid grid-cols-5 gap-2">
                    {businessPreviews.map((preview, index) => (
                      <img key={index} src={preview} alt={`Preview ${index}`} className="w-16 h-16 object-cover rounded-md" />
                    ))}
                  </div>
                </div>

                {/* Website */}
                <div className="inputBox">
                  <TextInput
                    id="website"
                    label="Website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    styles={{ input: { borderColor: '#ccc', borderWidth: '1px', width: '100%', height: '2rem', borderRadius: '1rem', padding: '1rem' } }}
                  />
                </div>

                <div className="flex justify-center">
                  <Form method="post" onSubmit={handleSubmit} className="w-full">
                    <button type="submit" className="bg-blue-600 hover:bg-green-600 hover:text-white border-2 border-blue-600 text-white font-bold py-3 px-4 rounded-xl w-full">
                      Register
                    </button>
                  </Form>
                </div>
          </div>
        </div>
    );
}

export default CreateCompany;
