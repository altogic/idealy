import React from 'react';
import Divider from './Divider';
import Input from './Input';

export default function GuestForm({ register, errors, vertical }) {
  return (
    <>
      <div className={`flex gap-4 ${vertical ? 'flex-col' : 'max-h-[46px]'} my-4 relative`}>
        {!vertical && (
          <span className="inline-block text-slate-600 text-base tracking-sm whitespace-nowrap m-auto">
            Your details
          </span>
        )}
        <Input
          type="text"
          name="guestName"
          id="guestName"
          placeholder="Name"
          register={register('guestName')}
          error={errors.guestName}
        />
        <Input
          type="text"
          name="guestEmail"
          id="guestEmail"
          register={register('guestEmail')}
          error={errors.guestEmail}
          placeholder="Email"
        />
      </div>
      <div className="flex items-center mt-10">
        <Input
          id="privacyPolicy"
          aria-describedby="privacyPolicy"
          name="privacyPolicy"
          type="checkbox"
          register={register('privacyPolicy')}
          error={errors.privacyPolicy}
          label="I consent to my information being stored and used according to
                                      the Privacy Policy."
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
      </div>
      {!vertical && <Divider className="m-8" />}
    </>
  );
}
