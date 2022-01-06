import Image from "next/image";

export default function LoadingContainer(props) {
  return (
    <div className="flex flex-auto flex-col place-content-center" {...props}>
      <Image
        src="/logo.svg"
        alt="loading..."
        width={30}
        height={30}
        className="animate-[revspin_1s_ease-in-out_infinite]"
      />
      <div className="mt-4 text-center">
        <h1 className="animate-pulse text-base font-normal text-gray-600 dark:text-gray-400">
          Loading...
        </h1>
      </div>
    </div>
  );
}
