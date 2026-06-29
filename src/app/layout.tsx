import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Lithuanian Language School',
    description:
        'Learn Lithuanian with experienced native-speaking teachers. ' +
        'Beginner, Intermediate, and Advanced courses with flexible start dates.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
