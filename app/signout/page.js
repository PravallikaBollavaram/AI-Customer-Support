// app/signout/page.js

import dynamic from 'next/dynamic';

// Dynamically import the SignOutComponent with no SSR
const SignOutComponent = dynamic(() => import('@/app/signout/SignOutComponent'), {
  ssr: false,
});

export default function SignOutPage() {
  return <SignOutComponent />;
}
