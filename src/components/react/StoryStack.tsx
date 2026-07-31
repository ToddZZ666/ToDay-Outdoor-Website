import Stack from './Stack';

const storyImages = [
  { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80&auto=format&fit=crop', alt: 'Modern outdoor dining space with warm lighting' },
  { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop', alt: 'Cozy outdoor lounge area in golden hour' },
  { src: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&auto=format&fit=crop', alt: 'Sustainable wooden deck with plants' },
  { src: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80&auto=format&fit=crop', alt: 'Outdoor living room with cushions and greenery' },
];

const StoryStack = () => {
  return (
    <Stack
      randomRotation={false}
      sensitivity={200}
      autoplay={true}
      autoplayDelay={4000}
      pauseOnHover={true}
      cards={storyImages.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.alt}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ))}
    />
  );
};

export default StoryStack;
