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
      <div className="flex items-center justify-center truncate rounded-xl bg-primary-0 px-4 py-8">
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
// export function SideBarSkeleton() {
//   return (
//     <div className="fixed top-0 left-0 right-0 h-full w-[270px] z-50 bg-primary-100 animate-pulse border-r border-primary-200">
//       <div className="p-4">
//         {/* Skeleton header */}
//         <div className="h-8 bg-primary-200 rounded w-3/4 mb-6"></div>

//         {/* Skeleton navigation items */}
//         <div className="space-y-4">
//           {[...Array(5)].map((_, i) => (
//             <div
//               key={`sidebar-item-${i}`}
//               className="h-6 bg-primary-200 rounded"
//             ></div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export function RightSideBarSkeleton() {
//   return (
//     <div className="fixed inset-0 w-80  h-full bg-primary-100 animate-pulse border-l border-primary-200">
//       <div className="p-4">
//         {/* Skeleton header */}
//         <div className="h-8 bg-primary-200 rounded w-3/4 mb-6"></div>

//         {/* Skeleton content */}
//         <div className="space-y-4">
//           {[...Array(3)].map((_, i) => (
//             <div key={`rightsidebar-item-${i}`} className="space-y-2">
//               <div className="h-4 bg-primary-200 rounded w-full"></div>
//               <div className="h-4 bg-primary-200 rounded w-5/6"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
export function RightSideBarSkeleton() {
  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-primary-100 animate-pulse border-l border-primary-200">
      {/* Close button area */}
      <div className="absolute top-4 right-4 w-6 h-6 bg-primary-200 rounded-full" />

      {/* Content area with top margin */}
      <div className="h-full mt-20 p-4">
        {/* Header */}
        <div className="h-8 bg-primary-200 rounded w-3/4 mb-6" />

        {/* Notification items */}
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-3 border-b border-primary-50">
              <div className="h-4 bg-primary-200 rounded w-full mb-2" />
              <div className="h-3 bg-primary-200 rounded w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SideBarSkeleton() {
  return (
    <div className="fixed top-0 left-0 w-[270px] h-full bg-primary-100 animate-pulse">
      {/* Logo and menu button area */}
      <div className="flex items-center justify-between p-4">
        <div className="h-14 w-14 bg-primary-200 rounded-full" />
        <div className="w-6 h-6 bg-primary-200 rounded" />
      </div>

      {/* Nav links area */}
      <div className="flex-1 space-y-2 p-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-10 bg-primary-200 rounded" />
        ))}
      </div>

      {/* User menu area */}
      <div className="p-4">
        <div className="h-16 bg-primary-200 rounded" />
      </div>
    </div>
  );
}
export function PageLoadingSkeleton() {
  return (
    <div className="  w-full h-full p-4 bg-primary-100 animate-pulse"></div>
  );
}
