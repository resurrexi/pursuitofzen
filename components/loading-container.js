import Image from "next/image";

export default function LoadingContainer() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col place-content-center min-h-screen">
        <Image
          src="/logo.svg"
          alt="loading..."
          width={45}
          height={45}
          className="animate-[revspin_1s_ease-in-out_infinite]"
        />
        <div className="pt-6 text-center">
          <h1 className="animate-pulse text-lg font-bold text-gray-600 dark:text-gray-400">
            Loading...
          </h1>
        </div>
      </div>
    </div>
  );
}
