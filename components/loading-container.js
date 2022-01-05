import Image from "next/image";

export default function LoadingContainer() {
  return (
    <div className="container mx-auto">
      <div className="flex place-content-center min-h-screen">
        <Image
          src="/logo.svg"
          alt="loading..."
          width={45}
          height={45}
          className="animate-[revspin_1s_ease-in-out_infinite]"
        />
      </div>
    </div>
  );
}
