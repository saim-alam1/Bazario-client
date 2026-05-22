import CardsSlider from "../../Shared/CardsSlider/CardsSlider";

const FlashSaleSection = () => {
  return (
    <section className="my-24 px-3">
      <div className="text-center space-y-4 max-w-11/12 mx-auto">
        <h1 className="text-headings font-semibold text-5xl">
          Flash Sale Going One
        </h1>
        <p className="text-xl text-descriptions">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          qui adipisci dolore ratione cum maxime, suscipit exercitationem
          repudiandae provident blanditiis.
        </p>
      </div>

      {/* Count Down */}
      <div className="flex justify-center my-12">
        <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span
                style={{ "--value": 15 } /* as React.CSSProperties */}
                aria-live="polite"
                aria-label={"15"}
              >
                15
              </span>
            </span>
            days
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span
                style={{ "--value": 10 } /* as React.CSSProperties */}
                aria-live="polite"
                aria-label={"15"}
              >
                10
              </span>
            </span>
            hours
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span
                style={{ "--value": 24 } /* as React.CSSProperties */}
                aria-live="polite"
                aria-label={"15"}
              >
                24
              </span>
            </span>
            min
          </div>
          <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
            <span className="countdown font-mono text-5xl">
              <span
                style={{ "--value": 59 } /* as React.CSSProperties */}
                aria-live="polite"
                aria-label={"15"}
              >
                59
              </span>
            </span>
            sec
          </div>
        </div>
      </div>

      {/* Flash Discounts Products */}
      <CardsSlider />
    </section>
  );
};

export default FlashSaleSection;
