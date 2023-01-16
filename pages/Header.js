import Link from "next/link";

export default function Header() {
  return (
    <>
      <p>
        <Link href="/">home</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link href="/api/exec">exec</Link>
      </p>
    </>
  );
}
