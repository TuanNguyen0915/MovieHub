"use client"
import { motion } from "framer-motion"
interface IProps {
  price: string
  month?: string
  body?: React.ReactNode
  footerCard: string
  planName?: string
}

const PricingCard = ({ price, month, body, footerCard, planName }: IProps) => {
  return (
    <motion.div
      initial={month ? { opacity: 0, x: 300 } : { opacity: 0, x: -300 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="flexCol w-full"
    >
      <div
        className={`flexCol h-full w-full items-center justify-between rounded-tr-full bg-gradient-to-r p-4 ${month ? "from-primary/80 to-indigo-600" : "from-[#fd60dc] to-[#ffa370]"}`}
      >
        <div className="flexCenter w-full flex-1 space-y-4 text-5xl font-extrabold tracking-wider">
          {planName}
        </div>
      </div>
      <div className="flex-1 bg-gradient-to-r from-black/60 to-black/40 py-2">
        <div className="flexCenter gap-2">
          <p
            className={`bg-gradient-to-r ${month ? "from-primary/80 to-indigo-600" : "from-[#fd60dc] to-[#ffa370]"} bg-clip-text text-5xl font-bold text-transparent`}
          >
            {price}
          </p>
          <p className={`italic text-muted-foreground`}>{month}</p>
        </div>
        {body}
      </div>
      <div className="flexCenter w-full">
        <div
          className={`bg-gradient-to-r ${month ? " from-primary/80 to-indigo-600" : "from-[#fd60dc] to-[#ffa370]"} flexCenter w-3/4 cursor-pointer rounded-b-2xl text-xl font-bold opacity-80 transition-all hover:opacity-100 lg:w-1/2`}
        >
          {footerCard}
        </div>
      </div>
    </motion.div>
  )
}

export default PricingCard
