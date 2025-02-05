import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { auth, signIn, signOut } from '@/auth'; 

const Navbar = async () => {
  const session = await auth();
    // console.log(session)
  return (
    <header className='bg-black text-white shadow-md font-work-sans'>
      <nav className='container mx-auto flex justify-between items-center py-4 px-6'>
        <Link href='/'>
          <Image src='/pp.png' alt='logo' width={200} height={30} className=''/>
        </Link>
        <div className='flex items-center gap-6 text-xl'>
          {session && session.user ? (
            <>
              <Link href="/startup/create" className='hover:text-gray-400'>
                <span>Create</span>
              </Link>
              <Link href={`/user/${session?.id}`} className='hover:text-gray-400'>
                <span>{session?.user?.name}</span>
              </Link>
              <form action={async () => {
                    "use server"; 
                    await signOut({redirectTo: "/"}); 
                }}>
                <button type="submit" className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md'>
                  <span>LogOut</span>
                </button>
              </form>
            </>
          ) : (
            <form action={async () => { 
              "use server"; 
              await signIn('github'); 
              }}>
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