import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt, { JwtPayload } from "jsonwebtoken";

export async function proxy(request: NextRequest) {
    console.log("Proxy middleware running for:", request.url);
    const accessToken = request.cookies.get("accessToken")?.value;

    console.log("Access Token:", accessToken);

    // ❌ No token → go to login
    if (!accessToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
        const decoded = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET as string
        ) as JwtPayload;

        // ❌ Not admin → go to login
        if (decoded.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/login", request.url));
        }

        // ✅ Admin → allow
        return NextResponse.next();

    } catch (error) {
        // ❌ Invalid token → clear + redirect
        const res = NextResponse.redirect(new URL("/login", request.url));
        res.cookies.delete("accessToken");
        res.cookies.delete("refreshToken");
        return res;
    }
}

export const config = {
    matcher: ['/admin/:path*'], // 🔒 ONLY protect admin routes
};


// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// // This function can be marked `async` if using `await` inside
// export function proxy(request: NextRequest) {
//     return NextResponse.redirect(new URL('/home', request.url))
// }

// // Alternatively, you can use a default export:
// // export default function proxy(request: NextRequest) { ... }

// export const config = {
//     matcher: '/about/:path*',
// } 