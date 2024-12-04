function Footer({ children }) {
  return (
    <footer className="flex-none">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 border-t border-gray-200 px-4 py-4 text-sm text-gray-500 dark:border-gray-600 dark:text-gray-400 sm:px-6 sm:text-base lg:px-8">
        {children}
      </div>
    </footer>
  );
}

function Copyright({ siteName }) {
  return (
    <span>
      &copy; {new Date().getFullYear()} {siteName}
    </span>
  );
}

function SocialBar({ children }) {
  return <span className="inline-flex items-center space-x-1">{children}</span>;
}

function SocialLink({ icon, href }) {
  return (
    <a
      href={href}
      className="inline-block p-2 hover:text-primary-500 dark:hover:text-primary-600"
    >
      {icon}
    </a>
  );
}

Footer.Copyright = Copyright;
Footer.SocialBar = SocialBar;
Footer.SocialLink = SocialLink;

export default Footer;
