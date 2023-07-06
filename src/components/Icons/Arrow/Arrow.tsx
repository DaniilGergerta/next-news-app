interface Props {
  direction: 'up' | 'down' | 'left' | 'right';
  size: number;
  thickness: number;
}

const Arrow = ({ direction, size, thickness }: Props) => {
  let rotate: string;
  switch (direction) {
    case 'up':
      rotate = 'rotate(-135deg)';
      break;
    case 'down':
      rotate = 'rotate(45deg)';
      break;
    case 'left':
      rotate = 'rotate(135deg)';
      break;
    case 'right':
      rotate = 'rotate(45deg)';
      break;
  }
  return (
    <i
      style={{
        width: `${size}px`,
        height: `${size}px`,
        border: 'solid white',
        borderWidth: `0 ${thickness}px ${thickness}px 0`,
        display: 'inline-block',
        transition: 'transform 200ms',
        transformOrigin: `${size - thickness}px `.repeat(2),
        transform: `${rotate}`,
      }}
    ></i>
  );
};
export default Arrow;
