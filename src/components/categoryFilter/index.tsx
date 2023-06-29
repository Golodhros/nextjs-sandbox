import Link from 'next/link';

function CategoryFilter({ categories, active = '' }) {
  return (
    <ul className="category-toggles">
      {categories.length
        ? categories.map(({ id, title }) => {
            const isActive = active === title;

            return (
              <li key={id}>
                <Link
                  className={`btn-category-toggle ${
                    isActive ? 'is-active' : ''
                  }`}
                  href={`/category/${encodeURIComponent(title)}`}
                >
                  {title}
                </Link>
              </li>
            );
          })
        : null}
    </ul>
  );
}

export { CategoryFilter };
