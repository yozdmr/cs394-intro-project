interface BannerProps {
  title: string;
}

const Banner = ({ title }: BannerProps) => (
  <h1 className="text-2xl font-bold">{title}</h1>
);

export default Banner;
