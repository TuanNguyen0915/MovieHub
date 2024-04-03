const LoadingCard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="h-[250px] w-full animate-pulse rounded-xl bg-gradient-to-b from-slate-900 to-slate-800" />
      <div className="space-y-2">
        <div className="h-8 w-3/4 animate-pulse bg-gradient-to-b from-slate-900 to-slate-800" />
        <div className="h-8 w-2/3 animate-pulse bg-gradient-to-b from-slate-900 to-slate-800" />
      </div>
    </div>
  )
}

export default LoadingCard
