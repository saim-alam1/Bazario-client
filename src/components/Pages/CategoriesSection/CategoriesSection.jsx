const CategoriesSection = () => {
  return (
    <section className="my-12">
      <h1 className="text-white font-semibold text-3xl text-center">
        Categories Section
      </h1>

      <div>
        <div className="card bg-[#111c2e] w-96 shadow-sm">
          <figure className="px-10 pt-10">
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Card Title</h2>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts
            </p>
            <div className="card-actions">
              <button className="btn btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
