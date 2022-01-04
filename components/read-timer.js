import ClockIcon from "./icons/clock";

export default function ReadTimer({ readTime, ...rest }) {
  return (
    <div className="flex items-center" {...rest}>
      <ClockIcon />
      <span className="ml-1 sm:ml-2">{readTime} min</span>
    </div>
  );
}
