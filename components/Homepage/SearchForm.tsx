import React from 'react'
import Form from "next/form";
import ResetForm from './ResetForm';
import { Search } from 'lucide-react';

const SearchForm = ({query} : {query ?:  string}) => {
    // const query = "test"
    
  return (
    <Form action="/" scroll = {false} className='search-form' >
        <input 
        name= "query"
        defaultValue={query}
        className='search-input'
        placeholder='Search Startups'
         />
         <div className='flex items-center gap-4' >
            { query && <ResetForm />}
            <button type="submit" className='search-btn text-white'>
              <Search className='size-5' />
            </button>
         </div>

    </Form>
  )
}

export default SearchForm