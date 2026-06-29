import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import HeroSection from '@/components/sections/HeroSection';
import CoursesSection from '@/components/sections/CoursesSection';
import RegistrationSection from '@/components/sections/RegistrationSection';
import { SCHOOL_INFO, COURSE_LEVELS } from '@/data/mock';

export default function HomePage() {
    return (
        <>
            <SiteHeader />
            <main>
                <HeroSection school={SCHOOL_INFO} />
                <CoursesSection levels={COURSE_LEVELS} />
                <RegistrationSection />
            </main>
            <SiteFooter />
        </>
    );
}
