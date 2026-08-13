'use client'

import { signup } from '@/app/actions/auth';
import { useActionState } from 'react';
 
export function SignupForm() {
    const [state, action, pending] = useActionState(signup, undefined)
  return (
    <form 
        action={signup}
        className = 'bg-white rounded-2xl p-5 w-[60vw] text-center space-y-2'
        >
      <h3 className='text-indigo-500 font-bold text-2xl'>Create Account</h3>
      <p>Create an account to begin your 7 days free trial</p>
      <div className='flex w-full text-left items-center'>
        <label htmlFor="name" className='w-[15%]'>Name: </label>
        <input id="name" name="name" placeholder="Name" className='w-[90%] p-2 rounded border border-gray-300 required'/>
      </div>
      {state?.errors?.name && <p>{state.errors.name}</p>}
      <div className='flex w-full text-left items-center'>
        <label htmlFor="email" className='w-[15%]'>Email: </label>
        <input id="email" name="email" type="email" placeholder="Email" className='w-[90%] p-2 rounded border border-gray-300" required ' />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <div className='flex w-full text-left items-center'>
        <label htmlFor="password" className='w-[15%] '>Password: </label>
        <input id="password" name="password" type="password" required className='w-[90%] p-2 rounded border border-gray-300"' />
      </div>
      {state?.errors?.password && (
        <div>
          <p>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
      <button disabled={pending} type="submit" className='bg-indigo-500 text-white p-3 rounded'>Create Account</button>
    </form>
  )
}