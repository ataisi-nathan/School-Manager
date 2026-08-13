import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
// import { nextRequest, nextResponse } from 'next/server';

export async function login(formData: FormData) {
    const user = {username: formData.get('username'), name: 'demo', password: formData.get('password')};

}