import { NextResponse } from 'next/server';
import { server } from "~/config";

export function middleware(req) {

    const url = req.nextUrl
    const { pathname } = url

    if (pathname.startsWith(`/api/`)) {
        const isAllowed = req.headers.get("referer").includes(server);
        if (!isAllowed) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
    }

    return NextResponse.next()

}

export const config = {
    matcher: ['/((?!_next|fonts|examples|svg|[\\w-]+\\.\\w+).*)'],
}