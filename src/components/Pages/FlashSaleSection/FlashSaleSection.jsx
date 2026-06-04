import CardsSlider from "../../Shared/CardsSlider/CardsSlider";

const FlashSaleSection = () => {
  return (
    <section className="my-24 px-3">
      <div className="text-center space-y-4 max-w-11/12 mx-auto">
        <h1 className="text-headings font-semibold text-5xl">
          Flash Sale Going One
        </h1>
        <p className="text-xl text-descriptions">
          In e-commerce, flash sales are one of the most widely used marketing
          tools for generating maximum sales over a limited period of time. This
          promotional sale can take many forms, and offers many advantages. But
          is it a solution to be deployed at all costs? And what are the best
          practices for a successful flash sale?
        </p>
      </div>

      {/* Flash Discounts Products */}
      <CardsSlider />
    </section>
  );
};

export default FlashSaleSection;
