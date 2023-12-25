import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type PrevNextButtonPropType = {
  enabled: boolean;
  onClick: () => void;
};

type DotButtonPropType = {
  selected: boolean;
  onClick: () => void;
};

export const DotButton: React.FC<DotButtonPropType> = (props) => {
  const {selected, onClick} = props;

  return (
    <button
      className={'embla__dot'.concat(selected ? ' embla__dot--selected' : '')}
      type="button"
      onClick={onClick}
    />
  );
};

export const PrevButton: React.FC<PrevNextButtonPropType> = (props) => {
  const {enabled, onClick} = props;

  return (
    <button
      className="embla__button embla__button--prev"
      onClick={onClick}
      disabled={!enabled}
    >
      <ArrowBackIosNewIcon className="embla__button__svg " />
    </button>
  );
};

export const NextButton: React.FC<PrevNextButtonPropType> = (props) => {
  const {enabled, onClick} = props;

  return (
    <button
      className="embla__button embla__button--next"
      onClick={onClick}
      disabled={!enabled}
    >
      <ArrowForwardIosIcon className="embla__button__svg " />
    </button>
  );
};
