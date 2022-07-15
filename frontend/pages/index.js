import Head from "next/head";
import Link from "next/link";
import { ArrowRight } from "phosphor-react";

const Home = ({ reviews, categories }) => {
  return (
    <div className="flex flex-col gap-8 items-center">
      <Head>
        <title>Movie Reviews | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex flex-col items-center gap-4">
        <Link href="/">
          <span className="text-2xl font-black cursor-pointer">
            movie reviews
          </span>
        </Link>
        <nav className="flex flex-col items-center gap-2">
          <p>
            Filter by <span className="text-orange-600">Category</span>
          </p>
          <div className="flex gap-4">
            {categories.data.map((category) => (
              <div key={category.id}>
                <Link href={`/category/${category.id}`}>
                  <span className="hover:text-orange-600 transition-colors cursor-pointer">
                    {category.attributes.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </nav>
      </header>
      <ul className="flex flex-col gap-8">
        {reviews.data.map((review) => (
          <div
            key={review.id}
            className="flex flex-col gap-4 shadow-sm bg-white p-4 rounded-xl max-w-screen-sm"
          >
            <span className="w-fit bg-orange-500 p-2 rounded-full text-white font-semibold text-xs">
              {review.attributes.rating}
            </span>
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold">
                {review.attributes.title}
              </h2>
              <ul className="flex gap-2">
                {review.attributes.categories.data.map((category) => (
                  <div
                    key={category.id}
                    className="text-sm bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-700 transition-colors py-1 px-2 rounded cursor-pointer"
                  >
                    <Link href={`/category/${category.id}`}>
                      <span>{category.attributes.name}</span>
                    </Link>
                  </div>
                ))}
              </ul>
              <p className="text-neutral-600">{review.attributes.body}</p>
            </div>
            <Link href={`/review/${review.id}`}>
              <span className="flex items-center gap-2 hover:text-orange-600 transition-colors cursor-pointer">
                Read More
                <ArrowRight color="currentColor" size={16} className="mt-0.5" />
              </span>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const res1 = await fetch("http://localhost:1337/api/reviews?populate=*");
  const reviews = await res1.json();

  const res2 = await fetch("http://localhost:1337/api/categories?populate=*");
  const categories = await res2.json();

  return {
    props: {
      reviews,
      categories,
    },
  };
}

export default Home;
