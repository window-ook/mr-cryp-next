export default function VideoCard({ src, height, title }) {
  return (
    <iframe
      width="100%"
      height={height}
      src={src}
      allowFullScreen
      title={title}
    ></iframe>
  );
}
