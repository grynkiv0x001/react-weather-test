import { Slider } from "@mui/material";

export const TempSlider = ({ temp, handleChange }) => {
  return (
    <div className="container">
      <Slider
        className="slider"
        value={temp}
        onChange={handleChange}
        step={1}
      />
    </div>
  );
};
