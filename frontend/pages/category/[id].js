import Link from "next/link";
import { ArrowLeft, ArrowRight } from "phosphor-react";

const Category = ({ category }) => {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">
          {category.data.attributes.name}
        </h1>
        <Link href="/">
          <span className="flex items-center gap-2 hover:text-orange-600 transition-colors cursor-pointer">
            <ArrowLeft color="currentColor" size={16} className="mt-0.5" />
            All movies
          </span>
        </Link>
      </header>
      <ul className="flex flex-col gap-8">
        {category.data.attributes.reviews.data.map((review) => (
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

export async function getStaticPaths() {
  const res = await fetch(
    "http://localhost:1337/api/categories?populate[reviews][populate]=categories"
  );
  const categories = await res.json();

  const paths = categories.data.map((category) => ({
    params: { id: category.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `http://localhost:1337/api/categories/${params.id}?populate[reviews][populate]=categories`
  );
  const category = await res.json();

  return {
    props: { category },
  };
}

export default Category;
