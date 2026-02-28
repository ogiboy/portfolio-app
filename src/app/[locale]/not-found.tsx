import { Link } from '@/i18n/navigation';

export default function NotFound() {
  return (
    <div className="w-screen h-screen bg-mainColor/90 font-robotoSlab italic flex flex-col justify-center items-center pb-5">
      <h2 className="text-[#f9f9f9] ">Not Found</h2>
      <p className="text-[#f9f9f9] ">Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
