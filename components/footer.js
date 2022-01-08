function Footer({ children }) {
  return (
    <footer className="flex-none">
      <div className="flex justify-between items-center gap-3 border-t border-gray-200 text-gray-500 text-sm max-w-3xl mx-auto px-4 py-4 sm:text-base sm:px-6 lg:px-8 dark:text-gray-400 dark:border-gray-600">
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
  return <span className="space-x-1 inline-flex items-center">{children}</span>;
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
