import { get } from '@vercel/edge-config';
import { NextResponse } from 'next/server';
import { server } from '~/config';

export async function middleware(req) {

    const url = req.nextUrl
    const { pathname } = url

    if (pathname === '/api/busUpdatedAt') {
        const busUpdatedAt = await get('busUpdatedAt');
        if (busUpdatedAt) {
            return new NextResponse(JSON.stringify({ busUpdatedAt }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'public, max-age=60, stale-while-revalidate=300'
                }
            });
        }
        return new NextResponse(JSON.stringify({ message: 'Bus updated at not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=60, stale-while-revalidate=300'
            }
        });
    }
    
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