import { Slider } from "@mui/material";

export const TempSlider = ({ temp, handleChange }) => {
  return (
    <div className="container">
      <Slider
        className="slider"
        min={0}
        max={40}
        defaultValue={10}
        onChange={handleChange}
      />
    </div>
  );
};
