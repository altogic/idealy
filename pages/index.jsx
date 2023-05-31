import Button from '@/components/Button';
import {
  Announcements,
  Github,
  Notification,
  People,
  Realtime,
  Roadmap,
  Theme
} from '@/components/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Index() {
  const router = useRouter();
  return (
    <>
      <header className="flex items-center justify-between w-full bg-indigo-900 border-b p-4 lg:py-6 lg:px-12 sm:mb-8 lg:mb-16">
        <div className="flex items-center">
          <img src="/logo_white.svg" alt="logo" className=" w-20 h-11 text-xl" />
        </div>
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-4">
            <li>
              <Link href="/login">
                <a className="inline-flex text-indigo-50 text-sm tracking-sm">Login</a>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <a className="inline-flex text-indigo-400 text-sm tracking-sm">Signup</a>
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <main className="container px-8 sm:px-12 w-full mx-auto flex flex-col items-center justify-center flex-1 text-center max-w-6xl">
        <div className="py-4 my-4">
          <h1 className="text-4xl lg:text-7xl tracking-tighter font-bold leading-snug">
            Innovative ways to get customer feedback
          </h1>
          <p className="mt-3 text-2xl">
            Get customer feedback and improve your products and services
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <Button
              variant="indigo"
              text="Get Started"
              size="xl"
              onClick={() => {
                router.push('/register');
              }}
            />
            <Button
              variant="blank"
              text={
                <div className="flex items-center gap-2">
                  <Github />
                  <span>View on Github</span>
                </div>
              }
              size="xl"
              onClick={() => {
                router.push('https://github.com/altogic/idealy');
              }}
            />
          </div>
        </div>

        <div className="py-4 my-4 flex items-center justify-center mt-6 px-2">
          <img src="/hero.png" alt="hero" className="rounded-lg shadow-lg" />
        </div>

        <div className="py-4 my-4 max-w-2xl m-8">
          <p className="text-4xl font-bold">
            Developed to help teams improve their products and processes, and get them to market
            faster.
          </p>
        </div>

        <div className="py-4 my-4 lg:grid lg:grid-rows-2 lg:grid-cols-3 space-y-8 gap-4 px-2">
          <div className="p-8 bg-white shadow-lg rounded-lg text-left">
            <div className="flex justify-center flex-col space-y-2">
              <People className="w-10 h-10 icon" />
              <h4 className="text-lg font-bold">Team</h4>
              <p className="text-sm">
                Invite your team members to collaborate on your product roadmap
              </p>
            </div>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-lg text-left">
            <div className="flex justify-center flex-col space-y-2">
              <Realtime className="w-10 h-10 icon" />
              <h4 className="text-lg font-bold">Realtime</h4>
              <p className="text-sm">Experience real-time updates instantly!</p>
            </div>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-lg text-left">
            <div className="flex justify-center flex-col space-y-2">
              <Announcements className="w-10 h-10 icon" />
              <h4 className="text-lg font-bold">Scheduled Announcement</h4>
              <p className="text-sm">Schedule announcements to be posted at a later date</p>
            </div>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-lg text-left">
            <div className="flex justify-center flex-col space-y-2">
              <Theme className="w-10 h-10 icon" />
              <h4 className="text-lg font-bold">Themes</h4>
              <p className="text-sm">Choose from a variety of themes to customize the look.</p>
            </div>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-lg text-left">
            <div className="flex justify-center flex-col space-y-2">
              <Roadmap className="w-10 h-10 icon" />
              <h4 className="text-lg font-bold">Fluid Roadmaps</h4>
              <p className="text-sm">Customize and Adapt with Drag & Drop Ease.</p>
            </div>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-lg text-left">
            <div className="flex justify-center flex-col space-y-2">
              <Notification className="w-10 h-10 icon" />
              <h4 className="text-lg font-bold">Notifications</h4>
              <p className="text-sm">Stay up to date with instant notifications!</p>
            </div>
          </div>
        </div>
        <div className="py-4 my-4">
          <div className="flex items-center justify-center flex-col lg:flex-row mt-6 gap-8">
            <img src="/hero-dashboard.png" alt="hero" className="rounded-lg shadow-lg md:w-1/2" />
            <div className="text-left space-y-4">
              <h4 className="text-2xl lg:text-4xl font-bold">Admin View</h4>
              <p className="text-md text-slate-500">
                Take control of your feedback collection process with our interactive dashboard.
                Filter, edit, and customize feedback statuses and other attributes to effectively
                manage and prioritize user input.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center flex-col lg:flex-row-reverse mt-6 gap-8 space-y-4 my-16">
            <img
              src="/hero-announcement.png"
              alt="hero"
              className="rounded-lg shadow-lg md:w-1/2"
            />
            <div className="text-left space-y-4">
              <h4 className="text-2xl lg:text-4xl font-bold">Announcements</h4>
              <p className="text-md text-slate-500">
                Announcements serve as your dedicated platform for sharing updates on new features.
                Stay connected and informed about the latest enhancements and changes.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center flex-col lg:flex-row mt-6 gap-8 space-y-4">
            <img src="/hero-roadmap.png" alt="hero" className="rounded-lg shadow-lg md:w-1/2" />
            <div className="text-left space-y-4">
              <h4 className="text-2xl lg:text-4xl font-bold">Roadmap</h4>
              <p className="text-md text-slate-500">
                Navigate your journey with a clear roadmap. Explore the future direction and
                upcoming milestones.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center flex-col lg:flex-row-reverse mt-6 gap-8 space-y-4 my-16">
            <img src="/hero-user.png" alt="hero" className="rounded-lg shadow-lg md:w-1/2" />
            <div className="text-left space-y-4">
              <h4 className="text-2xl lg:text-4xl font-bold">Users</h4>
              <p className="text-md text-slate-500">
                Effortlessly manage user roles and segments with a comprehensive screen that
                provides insights and control over guest, admin, and moderator data within your
                company. Seamlessly view, edit, and update roles and segments, empowering you to
                effectively organize and modify user permissions based on your needs.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const wildcard = req.headers.host.split('.')[0];

  if (wildcard === 'app' || wildcard === 'www' || wildcard === 'idealy') {
    return {
      props: {}
    };
  }

  return {
    redirect: {
      destination: `https://${wildcard}.idealy.com/public-view`,
      permanent: false
    }
  };
}
