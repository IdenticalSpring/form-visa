// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// interface PageTransitionProps {
//   children: React.ReactNode;
// }

// const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
//   const [transitionState, setTransitionState] = useState("page-enter");
//   const router = useRouter();

//   const navigateWithTransition = (url: string) => {
//     if (!url) {
//       console.error("URL is undefined");
//       return;
//     }

//     setTransitionState("page-exit");
//     setTimeout(() => {
//       router.push(url);
//     }, 500); 
//   };

//   return (
//     <div className={transitionState}>
//       {React.cloneElement(children as React.ReactElement<any>, {
//         onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
//           e.preventDefault();
//           const url = (e.currentTarget as HTMLButtonElement).dataset.url;
//           navigateWithTransition(url!);
//         },
//       })}
//     </div>
//   );
// };

// export default PageTransition;
