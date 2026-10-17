"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
	const { user, loading, logout } = useAuth();
	const pathname = usePathname();
	const navLinks = [
		{ href: "/", label: "Home" },
		{ href: "/product", label: "Shop" },
		{ href: "/cart", label: "Cart" },
	];

	return (
		<nav className="sticky top-0 z-50">
			<div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4">
				<Link href="/" className="flex items-center gap-3 text-xl font-extrabold tracking-tight">
					<span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-lime-200 text-xl" style={{ background: "#d8f36a" }}>m</span>
					<span>market<span style={{ color: "#176b4d" }}>.</span></span>
				</Link>
				<div className="flex items-center gap-2 sm:gap-5">
					{navLinks.map((link) => (
						<Link key={link.href} href={link.href}
							className={`rounded-full px-3 py-2 text-sm font-semibold ${pathname === link.href ? "bg-green-50 text-green-800" : "text-gray-600 hover:text-green-800"}`}>
							{link.label}
						</Link>
					))}
					{loading ? <span className="text-sm text-gray-400">Loading…</span> : user ? (
						<>
							<Link href="/user/order" className="hidden text-sm font-semibold text-gray-600 sm:inline">My Orders</Link>
							<button onClick={logout} className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: "#176b4d" }}>Logout</button>
						</>
					) :
						(
							<>
								<Link href="/login" className="px-2 py-2 text-sm font-semibold text-gray-700">Login</Link>
								<Link href="/register" className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: "#176b4d" }}>Get started</Link>


							</>

						)}
				</div>
			</div>
		</nav>
	);
};
export default Navbar;
