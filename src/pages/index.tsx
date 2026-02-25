import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Panel In — Oregon Therapist Credentialing Guide</title>
        <meta
          name="description"
          content="Navigate Oregon insurance paneling with personalized, step-by-step credentialing guidance for therapists."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex flex-col items-center py-12 text-center sm:items-start sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Panel In
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          Personalized, step-by-step credentialing guidance for Oregon
          therapists. Answer three questions and get your complete paneling
          pathway.
        </p>
        <Link
          href="/start"
          className="mt-8 inline-flex min-h-[44px] items-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Get Started
        </Link>
      </div>
    </>
  );
}
