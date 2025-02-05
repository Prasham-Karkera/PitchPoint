
import SearchForm from "../../components/Homepage/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/Homepage/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";

export default async function Home( {searchParams} : {searchParams : Promise<{query ?: string}>}){

  const query = (await searchParams).query;
  // const posts = await client.fetch(STARTUPS_QUERY)
  const params = {search: query || null}
  const {data : posts} = await sanityFetch({query: STARTUPS_QUERY, params})
  console.log(JSON.stringify(posts, null, 2));
  // const posts = [{
  //   _id: 1,
  //   _createdat: new Date().toISOString(), 
  //   views: 58,
  //   author: { _id: 1, name: "Prasham"},
  //   description: "This is a description",
  //   image: "https://t4.ftcdn.net/jpg/10/02/56/11/360_F_1002561147_qTieSSmuZhpjth96pKdhfozuEcZzHr4z.jpg",
  //   category: "Scientist",
  //   title: "Albert Einstein"
  // }]
  return (
    <>
      <div className="violet_container">
      <h1 className="text-2xl heading">
      Share. Connect. Inspire. 🚀
        </h1>
        <p className="sub-heading">
        Showcase your startup, discover groundbreaking ideas, and connect with innovators from around the globe.
        Join the community that's shaping the future of entrepreneurship
        </p>
        
        <SearchForm query={query} /> 
        
      </div>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
