import PricingCard from "@/components/shared/PricingCard"

const PricingPage = () => {
  const freePlan = (
    <ul className="w-full py-4 pl-12 text-lg">
      <li className="w-full">Watching 5 movies a day</li>
      <li className="w-full">Watching with ads</li>
      <li className="w-full">Limited bandwidth</li>
      <li className="w-full">No Customer support</li>
    </ul>
  )

  const premiumPlan = (
    <ul className="w-full py-4 pl-12 text-lg">
      <li className="w-full">Unlimited watching</li>
      <li className="w-full">No ads</li>
      <li className="w-full">Customer support 24/7</li>
      <li className="w-full">Unlimited bandwidth</li>
    </ul>
  )
  return (
    <section className="flexCenter h-[80vh] w-full flex-col items-center space-y-10">
      <h1 className=" w-full text-center text-6xl max-lg:text-3xl">
        Choose your best plan
      </h1>

      <div className="flexBetween w-3/4 gap-20 rounded-xl p-8 max-lg:flex-col max-lg:p-4 lg:gap-10">
        <PricingCard
          price="Free"
          body={freePlan}
          footerCard="Current Plan"
          planName="Basic"
        />
        <PricingCard
          planName="Premium"
          price="$9.99"
          month="per month"
          body={premiumPlan}
          footerCard="Join Us"
        />
      </div>
    </section>
  )
}

export default PricingPage
