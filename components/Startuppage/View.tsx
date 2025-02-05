import React from 'react'
import Ping from './Ping'
import {client} from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'

const View = async ({id}: {id: string}) => {
    console.log("ID : " + id)
    const {views : totalView} = await client.withConfig({useCdn: false}).fetch(STARTUP_VIEWS_QUERY, {id});
   

    console.log("Total : " + totalView)
    
  return (
    <div className='view-container'>
        <div className='absolute -top-2 -right-2'>
            <Ping/>
        </div>

        <p className='view-text'>
            <span className='font-black'>{totalView} views</span>
        </p>
    </div>
  )
}

export default View