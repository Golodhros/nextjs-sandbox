import localFont from 'next/font/local';

const digiFont = localFont({
  src: '../../../public/fonts/ds-digi.ttf',
});

type DigitalCounterProps = {
  value: number;
};

function DigitalCounter({ value }: DigitalCounterProps) {
  const paddedValue = value.toString().padStart(3, '0');

  return (
    <div className="digital-counter">
      <span className={digiFont.className}>{paddedValue}</span>
    </div>
  );
}

export { DigitalCounter };
