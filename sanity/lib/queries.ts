import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(
    `*[_type=="startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc){
        slug,
        views, 
        author -> {
            _id, name,image, bio
        }, 
        description, 
        title,
        _id,
        image,
        _createdAt, 
        category,
        pitch
    }`
);

export const STARTUP_BY_ID_QUERY = defineQuery(
    `*[_type=="startup" && _id == $id] | order(_createdAt desc){
        slug,
        views, 
        author -> {
            _id, name,image, bio, username
        }, 
        description, 
        title,
        _id,
        image,
        _createdAt, 
        category,
        pitch
    }`
)

export const STARTUP_VIEWS_QUERY=defineQuery(`
    *[_type == "startup" && _id == $id][0]{
        _id, views
    }
    `);