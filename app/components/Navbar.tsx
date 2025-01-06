import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { auth, signIn, signOut } from '@/auth'; // Uncomment and define these imports as needed

const Navbar = async () => {
  const session = await auth();

  return (
    <header className='bg-black text-white shadow-md'>
      <nav className='container mx-auto flex justify-between items-center py-4 px-6'>
        <Link href='/'>
          <Image src='/logo.png' alt='logo' width={200} height={30} />
        </Link>
        <div className='flex items-center gap-6 text-xl'>
          {session && session.user ? (
            <>
              <Link href="/startup/create" className='hover:text-gray-400'>
                <span>Create</span>
              </Link>
              <Link href={`/user/${session.id}`} className='hover:text-gray-400'>
                <span>{session?.user?.name}</span>
              </Link>
              <form action={async () => { "use server"; await signOut(); }}>
                <button type="submit" className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md'>
                  <span>LogOut</span>
                </button>
              </form>
            </>
          ) : (
            <form action={async () => { "use server"; await signIn('github'); }}>
              <button type="submit" className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md'>
                <span>Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;