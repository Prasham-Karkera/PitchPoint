import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import React, { Suspense } from 'react'
import { client } from '@/sanity/lib/client'
import { formatDate } from '@/lib/utils'
import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton'
import View from '@/components/Startuppage/View'

export const experimental_ppr = true 
const md = markdownit()

const page = async({params } : {params : Promise<{id : string}>}) => {
  const id = (await params).id
  const post = await client.fetch(STARTUP_BY_ID_QUERY, {id});
  const temp = post[0]
  // console.log(temp)
  // console.log(temp?._createdAt)
  // console.log(temp.image)
  if (!post) return notFound();

  // console.log(temp.image)
  const parsedContent = md.render(temp?.pitch || '') 

  // console.log(parsedContent)
  
  return (
    <>
        <section className='violet_container !min-h-[230px]'>
          <p className='tag'>{formatDate(temp?._createdAt)}</p>
          <h1 className='heading'>{temp.title}</h1>
          <p className='sub-heading !max-w-5xl'>{temp.description}</p>
        </section>
        <section className='flex flex-col items-center justify-center'>
          <div className='blue_container'>
            <img src={temp.image} alt="thumbnail" className='w-auto h-auto rounded-xl'/>
          </div>
          
          <div className='space-y-5 mt-10 max-w-4xl mx-auto p-10 text-xl bg-yellow-50'>
              <div className='flex-between gap-5 items-center '>
                  <Link href={`/user/${temp.author?.id}`} className='flex gap-2 items-center mb-3'>
                    <Image src={temp.author.image} alt="avatar" width={64} height={64} className='rounded-full drop-shadow-lg' />

                    <div>
                      <p className='text-20-medium'> {temp.author?.name} </p>
                      <p className='text-16-medium !text-black-300'> {temp.author?.username} </p>
                    </div>
                  </Link>
                  <p className='category-tag'>{temp.category}</p>
              </div>
              <h3 className='text-30-bold mt-10'>
                  Pitch Details
              </h3>
              {parsedContent ? 
              (
                <article dangerouslySetInnerHTML={{__html : parsedContent}} className='prose max-w-4xl font-work-sans break-all'/>
              ) :
              (
                <p className='no-result'>
                  No details provided
                </p>
              )}
          </div>

          <hr className='divider'/>

          {/* TODO : EDITOR SELECTED STARTUPS */}
        </section>
        {/* <h1 className='text-3xl'> {temp.title}</h1> */}
        <Suspense fallback={<Skeleton className='view_skeleton '/>}>
              <View id={id}/>
        </Suspense>
    </>
  )
}

export default page