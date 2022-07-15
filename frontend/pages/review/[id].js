import Link from "next/link";
import { ArrowLeft } from "phosphor-react";

const Review = ({ review }) => {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-4">
        <Link href="/">
          <span className="flex items-center gap-2 hover:text-orange-600 transition-colors cursor-pointer">
            <ArrowLeft color="currentColor" size={16} className="mt-0.5" />
            All Reviews
          </span>
        </Link>
      </header>
      <div className="flex flex-col gap-4 shadow-sm bg-white p-4 rounded-xl max-w-screen-sm">
        <span className="w-fit bg-orange-500 p-2 rounded-full text-white font-semibold text-xs">
          {review.data.attributes.rating}
        </span>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">
            {review.data.attributes.title}
          </h2>
          <ul className="flex gap-2">
            {review.data.attributes.categories.data.map((category) => (
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
          <p className="text-neutral-600">{review.data.attributes.body}</p>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const res = await fetch("http://localhost:1337/api/reviews?populate=*");
  const reviews = await res.json();

  const paths = reviews.data.map((review) => ({
    params: { id: review.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `http://localhost:1337/api/reviews/${params.id}?populate=*`
  );
  const review = await res.json();

  return {
    props: { review },
  };
}

export default Review;
