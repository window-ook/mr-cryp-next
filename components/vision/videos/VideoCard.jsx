import { styled } from '@mui/system';
import Image from 'next/image';

const ImageWrapper = styled('div')({
  position: 'relative',
  cursor: 'pointer',
  width: '100%',
  height: 'auto',
  overflow: 'hidden',
  transition: 'opacity 0.3s ease',
  borderRadius: '0.3rem',
  '&:hover': {
    opacity: 0.7,
  },
});

export default function VideoCard({ width, height, src, title, linkUrl }) {
  const handleClick = () => {
    window.open(linkUrl);
  };

  return (
    <ImageWrapper onClick={handleClick}>
      <Image
        alt={title}
        src={src}
        width={width}
        height={height}
        priority
        title={title}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </ImageWrapper>
  );
}
