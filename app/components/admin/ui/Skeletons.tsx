export function CustomersOverMonthsSkeleton() {
  return (
    <div className="bg-primary-0 p-6 rounded-lg shadow-sm animate-pulse">
      {/* Header Section Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="h-8 bg-primary-300 rounded w-1/4 mb-4 md:mb-0"></div>
        <div className="h-10 bg-primary-300 rounded w-1/4"></div>
      </div>

      {/* Chart Section Skeleton */}
      <div className="w-full h-[450px] bg-primary-300 rounded"></div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-primary-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-primary-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-primary-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-primary-200" />
      </div>
    </div>
  );
}

// export function ModalSkeleton() {
//   return (

//   );
// }

export function ModalSkeleton() {
  return (
    <div className="fixed  w-screen h-screen p-4 bg-primary-100 animate-pulse"></div>
  );
}
export function PageLoadingSkeleton() {
  return (
    <div className="  w-full h-full p-4 bg-primary-100 animate-pulse"></div>
  );
}
