import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-[-.01em] text-center sm:text-left">
          Smart Notes
        </h1>
        <p className="text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          A simple note-taking app that uses AI to help you organize your notes
          <br />
          and make them more useful.
        </p>

        <GoogleSignInButton />
      </main>
    </div>
  );
}
