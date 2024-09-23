export default function IframeUI({ src, height, title }) {
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
